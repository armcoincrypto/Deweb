import { db, uid, nowIso, parseJson } from "../db.js";
import { slugify, estimateReadingTime } from "../utils/blogHelpers.js";
import { cleanText } from "../utils/sanitize.js";

const SERVICE_LINKS = [
  { href: "/services/shopify-development", label: "Shopify Development" },
  { href: "/services/shopify-store-design", label: "Shopify Store Design" },
  { href: "/services/ai-chatbot-development", label: "AI Chatbot Development" },
  { href: "/services/ai-business-automation", label: "AI Business Automation" },
  { href: "/services/saas-development", label: "SaaS Development" },
  { href: "/services/marketplace-development", label: "Marketplace Development" },
  { href: "/services/web-application-development", label: "Web Application Development" },
];

function getOpenAiKey() {
  return process.env.OPENAI_API_KEY?.trim() || null;
}

function buildSystemPrompt({ tone, wordCount, categoryName }) {
  return `You are an expert SEO content writer for DEWEB (dewebam.com), an IT marketplace for Shopify, AI, SaaS, web and marketplace development.

Write useful, original, non-spam content. No fake claims, no keyword stuffing, no copied content.
Tone: ${tone || "professional and helpful"}.
Target length: approximately ${wordCount || 1800} words in intro + sections combined.
Category: ${categoryName || "Technology"}.

Return ONLY valid JSON with this exact structure:
{
  "seoTitle": "string max 60 chars",
  "metaDescription": "string max 155 chars",
  "slug": "kebab-case-url-slug",
  "excerpt": "string max 160 chars",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "featuredImagePrompt": "describe an image for this article",
  "intro": ["paragraph1", "paragraph2", "paragraph3"],
  "sections": [{"title": "H2 title", "paragraphs": ["p1", "p2"]}],
  "faqs": [{"question": "...", "answer": "..."}],
  "internalLinks": [{"href": "/services/...", "label": "..."}],
  "cta": {
    "title": "string",
    "description": "string mentioning Shopify, AI, SaaS or Marketplace development and contacting DEWEB",
    "primaryLabel": "Get a Free Consultation",
    "primaryHref": "/contact"
  },
  "linkedinDraft": "LinkedIn post text",
  "twitterThread": ["tweet1", "tweet2", "tweet3"],
  "facebookDraft": "Facebook post text"
}

Requirements:
- At least 10 sections with 2 paragraphs each
- At least 6 FAQ items
- Include 2-3 internal links to DEWEB service pages from: ${SERVICE_LINKS.map((l) => l.href).join(", ")}
- CTA must feel natural, not spammy
- Use natural SEO writing for the target keyword`;
}

export async function generateBlogDraft({
  topic,
  targetKeyword,
  categoryName,
  tone,
  wordCount,
  createdBy,
  regenerationHint = null,
}) {
  const openaiKey = getOpenAiKey();
  if (!openaiKey) {
    const err = new Error("OPENAI_API_KEY is not configured. Add it to backend .env");
    err.status = 503;
    throw err;
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  let userPrompt = `Topic: ${topic}
Target keyword: ${targetKeyword || topic}
Category: ${categoryName}
Write a comprehensive SEO article.`;

  if (regenerationHint) {
    userPrompt += `\n\nIMPORTANT: ${regenerationHint}`;
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildSystemPrompt({ tone, wordCount, categoryName }) },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 8000,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    const err = new Error(`OpenAI API error (${res.status}): ${errBody.slice(0, 200)}`);
    err.status = 502;
    throw err;
  }

  const completion = await res.json();
  const raw = completion.choices?.[0]?.message?.content?.trim();
  if (!raw) {
    const err = new Error("AI returned empty response.");
    err.status = 502;
    throw err;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const err = new Error("AI returned invalid JSON.");
    err.status = 502;
    throw err;
  }

  const slug = slugify(parsed.slug || topic);
  const content = {
    intro: Array.isArray(parsed.intro) ? parsed.intro.map((p) => cleanText(p, 8000)) : [],
    sections: Array.isArray(parsed.sections)
      ? parsed.sections.map((s) => ({
          title: cleanText(s.title, 300),
          paragraphs: (s.paragraphs || []).map((p) => cleanText(p, 8000)),
        }))
      : [],
    faqs: Array.isArray(parsed.faqs)
      ? parsed.faqs.map((f) => ({
          question: cleanText(f.question, 500),
          answer: cleanText(f.answer, 3000),
        }))
      : [],
    internalLinks: Array.isArray(parsed.internalLinks)
      ? parsed.internalLinks.slice(0, 5).map((l) => ({
          href: cleanText(l.href, 200),
          label: cleanText(l.label, 200),
        }))
      : SERVICE_LINKS.slice(0, 3),
    cta: parsed.cta || {
      title: "Need Shopify, AI, SaaS or Marketplace development?",
      description: "Contact DEWEB to discuss your project with verified developers.",
      primaryLabel: "Get a Free Consultation",
      primaryHref: "/contact",
    },
  };

  const aiMeta = {
    featuredImagePrompt: cleanText(parsed.featuredImagePrompt, 500),
    linkedinDraft: cleanText(parsed.linkedinDraft, 3000),
    twitterThread: Array.isArray(parsed.twitterThread)
      ? parsed.twitterThread.map((t) => cleanText(t, 500))
      : [],
    facebookDraft: cleanText(parsed.facebookDraft, 2000),
    targetKeyword: cleanText(targetKeyword, 200),
    tone: cleanText(tone, 100),
    wordCount,
    model,
  };

  const generationId = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO blog_ai_generations (id, post_id, topic, target_keyword, category_id, tone, word_count, result_json, created_by, created_at)
    VALUES (?, NULL, ?, ?, NULL, ?, ?, ?, ?, ?)
  `).run(
    generationId,
    cleanText(topic, 500),
    cleanText(targetKeyword, 200),
    cleanText(tone, 100),
    wordCount || 1800,
    JSON.stringify({ parsed, aiMeta }),
    createdBy || null,
    t
  );

  return {
    generationId,
    draft: {
      title: cleanText(parsed.seoTitle?.replace(/\s*\|.*$/, "") || topic, 300),
      seoTitle: cleanText(parsed.seoTitle, 120),
      metaDescription: cleanText(parsed.metaDescription, 320),
      slug,
      excerpt: cleanText(parsed.excerpt, 500),
      tags: Array.isArray(parsed.tags) ? parsed.tags.map((t) => cleanText(t, 80)).slice(0, 8) : [],
      content,
      readingTime: estimateReadingTime(content),
      aiMeta,
      status: "draft",
    },
  };
}

export function listAiGenerations(limit = 20) {
  const rows = db
    .prepare(
      `SELECT id, post_id, topic, target_keyword, tone, word_count, created_by, created_at
       FROM blog_ai_generations ORDER BY created_at DESC LIMIT ?`
    )
    .all(limit);
  return rows.map((r) => ({
    id: r.id,
    postId: r.post_id,
    topic: r.topic,
    targetKeyword: r.target_keyword,
    tone: r.tone,
    wordCount: r.word_count,
    createdBy: r.created_by,
    createdAt: r.created_at,
  }));
}

export function getAiGeneration(id) {
  const row = db.prepare("SELECT * FROM blog_ai_generations WHERE id = ?").get(id);
  if (!row) return null;
  return {
    id: row.id,
    postId: row.post_id,
    topic: row.topic,
    result: parseJson(row.result_json, {}),
    createdAt: row.created_at,
  };
}
