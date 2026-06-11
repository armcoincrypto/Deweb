import { db, parseJson } from "../db.js";

/** Reserved slugs used by static Next.js articles — CMS cannot override. */
export const RESERVED_BLOG_SLUGS = new Set([
  "shopify-development-cost-2026",
  "shopify-vs-woocommerce",
  "best-shopify-apps",
  "ai-chatbots-for-business",
  "ai-automation-for-ecommerce",
  "how-to-build-a-marketplace-website",
  "custom-web-application-development",
  "saas-development-guide",
  "best-ecommerce-platforms",
  "future-of-ai-in-business",
  "nextjs-vs-wordpress",
  "shopify-plus-vs-standard",
  "how-to-hire-software-developers",
  "mvp-development-cost-guide",
  "headless-commerce-guide",
  "technical-seo-for-ecommerce",
  "telegram-bot-development-guide",
  "marketplace-monetization-strategies",
  "outsourcing-software-development-2026",
  "competitive-bidding-it-projects",
]);

export const BLOG_STATUSES = [
  "draft",
  "pending_review",
  "approved",
  "scheduled",
  "published",
  "rejected",
];

export function wordCountFromContent(content) {
  const json = typeof content === "string" ? parseJson(content, {}) : content;
  const parts = [];
  if (json?.intro) parts.push(...json.intro);
  if (json?.sections) {
    for (const s of json.sections) {
      parts.push(s.title || "");
      parts.push(...(s.paragraphs || []));
    }
  }
  if (json?.faqs) {
    for (const f of json.faqs) {
      parts.push(f.question || "");
      parts.push(f.answer || "");
    }
  }
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

export function estimateReadingTime(content) {
  const json = typeof content === "string" ? parseJson(content, {}) : content;
  const parts = [];
  if (json?.intro) parts.push(...json.intro);
  if (json?.sections) {
    for (const s of json.sections) {
      parts.push(s.title || "");
      parts.push(...(s.paragraphs || []));
    }
  }
  if (json?.faqs) {
    for (const f of json.faqs) {
      parts.push(f.question || "");
      parts.push(f.answer || "");
    }
  }
  const words = parts.join(" ").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min`;
}

export function toBlogCategory(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || "",
    createdAt: row.created_at,
  };
}

export function toBlogTag(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    createdAt: row.created_at,
  };
}

export function toBlogPost(row, tags = []) {
  if (!row) return null;
  const content = parseJson(row.content, {
    intro: [],
    sections: [],
    faqs: [],
    internalLinks: [],
    cta: null,
  });
  const aiMeta = parseJson(row.ai_meta, {});
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    content,
    seoTitle: row.seo_title || row.title,
    metaDescription: row.meta_description || row.excerpt || "",
    featuredImage: row.featured_image || "",
    categoryId: row.category_id,
    categoryName: row.category_name || "",
    categorySlug: row.category_slug || "",
    authorName: row.author_name || "DEWEB Editorial Team",
    status: row.status,
    readingTime: row.reading_time || "5 min",
    tags,
    aiMeta,
    scheduledPublishAt: row.scheduled_publish_at || null,
    approvedAt: row.approved_at || null,
    approvedBy: row.approved_by || null,
    publishMode: row.publish_mode || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at || null,
  };
}

export function toBlogPostListItem(row) {
  const aiMeta = parseJson(row.ai_meta, {});
  const wordCount = wordCountFromContent(row.content);
  const qualityScore =
    aiMeta.qualityScore && typeof aiMeta.qualityScore === "object"
      ? aiMeta.qualityScore.score
      : null;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    categoryName: row.category_name || "",
    categorySlug: row.category_slug || "",
    authorName: row.author_name || "",
    status: row.status,
    readingTime: row.reading_time || "",
    featuredImage: row.featured_image || aiMeta.featuredImageUrl || "",
    targetKeyword: aiMeta.targetKeyword || "",
    buyerStage: aiMeta.buyerStage || "",
    qualityScore,
    qualityPassed: aiMeta.qualityScore?.passed ?? null,
    scheduledPublishAt: row.scheduled_publish_at || null,
    approvedAt: row.approved_at || null,
    publishMode: row.publish_mode || null,
    wordCount,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
  };
}

export function getBlogStats() {
  const rows = db.prepare(`
    SELECT status, COUNT(*) AS c FROM blog_posts GROUP BY status
  `).all();
  const counts = {
    total: 0,
    draft: 0,
    pending_review: 0,
    approved: 0,
    scheduled: 0,
    published: 0,
    rejected: 0,
  };
  for (const r of rows) {
    counts[r.status] = r.c;
    counts.total += r.c;
  }
  return counts;
}
