import { db, uid, nowIso } from "../db.js";
import { slugify, RESERVED_BLOG_SLUGS } from "../utils/blogHelpers.js";
import { sendAdminEmail } from "./mail.js";

const POST_SELECT = `
  SELECT p.*, c.name AS category_name, c.slug AS category_slug
  FROM blog_posts p
  JOIN blog_categories c ON c.id = p.category_id
`;

function upsertTags(tagNames) {
  const ids = [];
  for (const name of tagNames) {
    const n = String(name || "").trim();
    if (!n) continue;
    const s = slugify(n);
    let row = db.prepare("SELECT id FROM blog_tags WHERE slug = ?").get(s);
    if (!row) {
      const id = uid();
      db.prepare(
        "INSERT INTO blog_tags (id, name, slug, created_at) VALUES (?, ?, ?, ?)"
      ).run(id, n, s, nowIso());
      ids.push(id);
    } else {
      ids.push(row.id);
    }
  }
  return ids;
}

function setPostTags(postId, tagNames) {
  db.prepare("DELETE FROM blog_post_tags WHERE post_id = ?").run(postId);
  const tagIds = upsertTags(tagNames);
  const insert = db.prepare(
    "INSERT OR IGNORE INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)"
  );
  for (const tagId of tagIds) insert.run(postId, tagId);
}

/**
 * Persist an AI draft as pending_review. Never publishes automatically.
 */
export function savePendingReviewPost({
  draft,
  generationId,
  categoryId,
  slugFallbackTopic,
  featuredImage,
}) {
  let slug = slugify(draft.slug || slugFallbackTopic || draft.title);
  const slugRow = db.prepare("SELECT id FROM blog_posts WHERE slug = ?").get(slug);
  if (!slug || slug.length < 3 || RESERVED_BLOG_SLUGS.has(slug) || slugRow) {
    slug = slugify(`${slugFallbackTopic || draft.title}-${Date.now().toString(36)}`);
  }

  const id = uid();
  const t = nowIso();

  db.prepare(`
    INSERT INTO blog_posts (
      id, title, slug, excerpt, content, seo_title, meta_description,
      featured_image, category_id, author_name, status, reading_time,
      ai_meta, created_at, updated_at, published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_review', ?, ?, ?, ?, NULL)
  `).run(
    id,
    draft.title,
    slug,
    draft.excerpt,
    JSON.stringify(draft.content),
    draft.seoTitle,
    draft.metaDescription,
    featuredImage || draft.featuredImage || "",
    categoryId,
    "DEWEB Editorial Team",
    draft.readingTime,
    JSON.stringify(draft.aiMeta),
    t,
    t
  );

  setPostTags(id, draft.tags || []);

  if (generationId) {
    db.prepare("UPDATE blog_ai_generations SET post_id = ?, category_id = ? WHERE id = ?").run(
      id,
      categoryId,
      generationId
    );
  }

  const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(id);
  return { postId: id, row };
}

export async function notifyAdminBlogDraft({ topic, targetKeyword }) {
  const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://dewebam.com";
  const reviewUrl = `${siteUrl}/en/admin/blog/pending`;

  return sendAdminEmail({
    subject: "[DEWEB] New AI blog draft ready for review",
    text:
      `A new blog draft was generated and is waiting for approval.\n\n` +
      `Topic: ${topic}\n` +
      `Keyword: ${targetKeyword || topic}\n\n` +
      `Review here: ${reviewUrl}`,
    html:
      `<p>A new blog draft was generated and is waiting for approval.</p>` +
      `<p><strong>Topic:</strong> ${topic}<br>` +
      `<strong>Keyword:</strong> ${targetKeyword || topic}</p>` +
      `<p><a href="${reviewUrl}">Review pending articles</a></p>`,
  });
}
