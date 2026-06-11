import { db, uid, nowIso, parseJson } from "../db.js";
import { slugify } from "../utils/blogHelpers.js";
import { cleanText, sanitizeBlogContent } from "../utils/sanitize.js";

const TARGET_LOCALES = ["ru", "am", "es"];
const LOCALE_NAMES = { ru: "Russian", am: "Armenian", es: "Spanish" };

export function toTranslation(row) {
  if (!row) return null;
  return {
    id: row.id,
    sourcePostId: row.source_post_id,
    locale: row.locale,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    content: parseJson(row.content_json, {}),
    seoTitle: row.seo_title || "",
    seoDescription: row.seo_description || "",
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function localizeInternalLinks(content, locale) {
  const links = content?.internalLinks;
  if (!Array.isArray(links)) return content;
  return {
    ...content,
    internalLinks: links.map((link) => ({
      ...link,
      href: String(link.href || "").replace(/^\/en\//, `/${locale}/`),
    })),
  };
}

function getSourcePost(postId) {
  return db
    .prepare(
      `SELECT p.*, c.slug AS category_slug, c.name AS category_name
       FROM blog_posts p
       JOIN blog_categories c ON c.id = p.category_id
       WHERE p.id = ?`
    )
    .get(postId);
}

async function translateWithOpenAI({ post, locale, content }) {
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  if (!openaiKey) {
    const err = new Error("OPENAI_API_KEY is not configured.");
    err.status = 503;
    throw err;
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const lang = LOCALE_NAMES[locale] || locale;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You translate DEWEB blog articles from English to ${lang}.
Preserve SEO quality, professional tone, and technical accuracy.
Localize CTAs naturally for ${lang} readers.
Return JSON: { "title", "slug", "excerpt", "seoTitle", "seoDescription", "content": { "intro": [], "sections": [{"title","paragraphs":[]}], "faqs": [{"question","answer"}], "cta": {"title","description","primaryLabel","primaryHref","secondaryLabel","secondaryHref"} } }
Keep href paths as provided — they will be localized separately.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            title: post.title,
            excerpt: post.excerpt,
            seoTitle: post.seo_title,
            seoDescription: post.meta_description,
            content,
          }),
        },
      ],
      max_tokens: 8000,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`OpenAI API error (${res.status}): ${errBody.slice(0, 200)}`);
  }

  const completion = await res.json();
  const raw = completion.choices?.[0]?.message?.content?.trim();
  return JSON.parse(raw);
}

export function listTranslations(sourcePostId) {
  const rows = db
    .prepare(
      "SELECT * FROM blog_post_translations WHERE source_post_id = ? ORDER BY locale ASC"
    )
    .all(sourcePostId);
  return rows.map(toTranslation);
}

export async function generateTranslationsForPost(postId) {
  const post = getSourcePost(postId);
  if (!post) return { error: "Post not found." };
  if (post.status !== "published") {
    return { error: "Translations can only be generated for published English articles." };
  }

  const content = parseJson(post.content, {});
  const created = [];
  const skipped = [];

  for (const locale of TARGET_LOCALES) {
    const existing = db
      .prepare(
        "SELECT id FROM blog_post_translations WHERE source_post_id = ? AND locale = ?"
      )
      .get(postId, locale);
    if (existing) {
      skipped.push(locale);
      continue;
    }

    const translated = await translateWithOpenAI({ post, locale, content });
    const localizedContent = localizeInternalLinks(
      sanitizeBlogContent(translated.content || {}),
      locale
    );

    let slug = slugify(translated.slug || `${post.slug}-${locale}`);
    const slugTaken = db
      .prepare(
        "SELECT id FROM blog_post_translations WHERE slug = ? AND source_post_id != ?"
      )
      .get(slug, postId);
    if (slugTaken) slug = slugify(`${post.slug}-${locale}-${Date.now().toString(36)}`);

    const id = uid();
    const t = nowIso();

    db.prepare(`
      INSERT INTO blog_post_translations (
        id, source_post_id, locale, title, slug, excerpt, content_json,
        seo_title, seo_description, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_review', ?, ?)
    `).run(
      id,
      postId,
      locale,
      cleanText(translated.title, 300) || post.title,
      slug,
      cleanText(translated.excerpt, 500),
      JSON.stringify(localizedContent),
      cleanText(translated.seoTitle, 200),
      cleanText(translated.seoDescription, 320),
      t,
      t
    );

    created.push(toTranslation(db.prepare("SELECT * FROM blog_post_translations WHERE id = ?").get(id)));
  }

  return { created, skipped, postId };
}

export function updateTranslationStatus(id, status) {
  const allowed = new Set(["draft", "pending_review", "approved", "published", "rejected"]);
  if (!allowed.has(status)) return null;
  const t = nowIso();
  db.prepare("UPDATE blog_post_translations SET status = ?, updated_at = ? WHERE id = ?").run(
    status,
    t,
    id
  );
  return toTranslation(db.prepare("SELECT * FROM blog_post_translations WHERE id = ?").get(id));
}
