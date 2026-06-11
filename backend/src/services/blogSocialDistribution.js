import { db, uid, nowIso, parseJson } from "../db.js";
import { cleanText } from "../utils/sanitize.js";

const PLATFORMS = ["linkedin", "facebook", "x", "instagram"];
const SITE_URL = (process.env.SITE_URL || "https://dewebam.com").replace(/\/$/, "");

export function toSocialPost(row) {
  if (!row) return null;
  return {
    id: row.id,
    blogPostId: row.blog_post_id,
    platform: row.platform,
    content: row.content,
    status: row.status,
    scheduledAt: row.scheduled_at,
    postedAt: row.posted_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    postTitle: row.post_title || null,
    postSlug: row.post_slug || null,
  };
}

function getPostRow(postId) {
  return db
    .prepare(
      `SELECT p.*, c.name AS category_name, c.slug AS category_slug
       FROM blog_posts p
       JOIN blog_categories c ON c.id = p.category_id
       WHERE p.id = ?`
    )
    .get(postId);
}

function blogUrl(slug) {
  return `${SITE_URL}/en/blog/${slug}`;
}

function dewebCta() {
  return "Need Shopify, AI, SaaS or marketplace development? Contact DEWEB → dewebam.com/contact";
}

function buildLinkedIn(post, aiMeta, url) {
  const existing = cleanText(aiMeta.linkedinPost || aiMeta.linkedinDraft, 3000);
  if (existing && existing.includes(url)) return existing;
  const parts = [
    existing || `🚀 ${post.title}`,
  ];
  if (post.excerpt) parts.push(post.excerpt);
  if (aiMeta.targetKeyword) parts.push(`Keyword: ${aiMeta.targetKeyword}`);
  if (aiMeta.buyerStage) parts.push(`For teams in the ${aiMeta.buyerStage} stage.`);
  parts.push(`Read more: ${url}`);
  parts.push(dewebCta());
  return parts.filter(Boolean).join("\n\n").slice(0, 3000);
}

function buildFacebook(post, aiMeta, url) {
  const existing = cleanText(aiMeta.facebookPost || aiMeta.facebookDraft, 2000);
  if (existing && existing.includes(url)) return existing;
  const parts = [
    existing || post.title,
    post.excerpt || "",
    `👉 ${url}`,
    dewebCta(),
  ];
  return parts.filter(Boolean).join("\n\n").slice(0, 2000);
}

function buildXThread(post, aiMeta, url) {
  const existing = Array.isArray(aiMeta.xThread)
    ? aiMeta.xThread
    : Array.isArray(aiMeta.twitterThread)
      ? aiMeta.twitterThread
      : [];
  if (existing.length > 0) {
    const joined = existing.join("\n---\n");
    if (joined.includes(url)) return joined;
  }
  const tweets = [
    `New on the DEWEB blog: ${post.title}`,
    post.excerpt ? post.excerpt.slice(0, 240) : null,
    aiMeta.targetKeyword ? `Target: ${aiMeta.targetKeyword}` : null,
    `Read: ${url}`,
    "Shopify · AI · SaaS · Marketplace dev → dewebam.com/contact",
  ].filter(Boolean);
  return tweets.map((t) => t.slice(0, 280)).join("\n---\n");
}

function buildInstagram(post, aiMeta, url) {
  const existing = cleanText(aiMeta.instagramCaption, 2200);
  if (existing && existing.includes("dewebam")) return existing;
  const tags = ["#Shopify", "#AI", "#SaaS", "#WebDevelopment", "#DEWEB", "#Ecommerce"];
  const parts = [
    existing || `${post.title} ✨`,
    post.excerpt ? post.excerpt.slice(0, 400) : "",
    `Link in bio / ${url}`,
    dewebCta(),
    tags.join(" "),
  ];
  return parts.filter(Boolean).join("\n\n").slice(0, 2200);
}

const BUILDERS = {
  linkedin: buildLinkedIn,
  facebook: buildFacebook,
  x: buildXThread,
  instagram: buildInstagram,
};

/**
 * Create social drafts for a published post (idempotent per platform).
 */
export function ensureSocialDraftsForPost(postId) {
  const post = getPostRow(postId);
  if (!post) return { created: 0, skipped: 0, error: "Post not found." };
  if (post.status !== "published") {
    return { created: 0, skipped: 0, error: "Post is not published." };
  }

  const aiMeta = parseJson(post.ai_meta, {});
  const content = parseJson(post.content, {});
  const url = blogUrl(post.slug);
  const t = nowIso();
  let created = 0;
  let skipped = 0;

  for (const platform of PLATFORMS) {
    const exists = db
      .prepare(
        "SELECT id FROM blog_social_posts WHERE blog_post_id = ? AND platform = ?"
      )
      .get(postId, platform);
    if (exists) {
      skipped++;
      continue;
    }

    const builder = BUILDERS[platform];
    const contentText = builder(
      { ...post, excerpt: post.excerpt, title: post.title },
      aiMeta,
      url
    );

    db.prepare(`
      INSERT INTO blog_social_posts (
        id, blog_post_id, platform, content, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, 'draft', ?, ?)
    `).run(uid(), postId, platform, contentText, t, t);
    created++;
  }

  return { created, skipped, postId, slug: post.slug };
}

export function ensureSocialDraftsForPublishedPosts({ limit = 50 } = {}) {
  const rows = db
    .prepare(
      `SELECT p.id FROM blog_posts p
       WHERE p.status = 'published'
       AND NOT EXISTS (
         SELECT 1 FROM blog_social_posts s WHERE s.blog_post_id = p.id
       )
       ORDER BY p.published_at DESC
       LIMIT ?`
    )
    .all(limit);

  let totalCreated = 0;
  for (const row of rows) {
    const result = ensureSocialDraftsForPost(row.id);
    totalCreated += result.created || 0;
  }
  return { postsProcessed: rows.length, totalCreated };
}

export function listSocialPosts({ platform, status, postId } = {}) {
  let sql = `
    SELECT s.*, p.title AS post_title, p.slug AS post_slug
    FROM blog_social_posts s
    JOIN blog_posts p ON p.id = s.blog_post_id
    WHERE 1=1
  `;
  const params = [];
  if (platform) {
    sql += " AND s.platform = ?";
    params.push(platform);
  }
  if (status) {
    sql += " AND s.status = ?";
    params.push(status);
  }
  if (postId) {
    sql += " AND s.blog_post_id = ?";
    params.push(postId);
  }
  sql += " ORDER BY s.updated_at DESC, p.published_at DESC";
  return db.prepare(sql).all(...params).map(toSocialPost);
}

export function updateSocialPost(id, { content, status, scheduledAt }) {
  const existing = db.prepare("SELECT * FROM blog_social_posts WHERE id = ?").get(id);
  if (!existing) return null;

  const t = nowIso();
  const newContent = content !== undefined ? cleanText(content, 10000) : existing.content;
  const newStatus = status !== undefined ? cleanText(status, 30) : existing.status;
  const newScheduled = scheduledAt !== undefined ? scheduledAt : existing.scheduled_at;

  db.prepare(`
    UPDATE blog_social_posts
    SET content = ?, status = ?, scheduled_at = ?, updated_at = ?
    WHERE id = ?
  `).run(newContent, newStatus, newScheduled, t, id);

  const row = db
    .prepare(
      `SELECT s.*, p.title AS post_title, p.slug AS post_slug
       FROM blog_social_posts s
       JOIN blog_posts p ON p.id = s.blog_post_id
       WHERE s.id = ?`
    )
    .get(id);
  return toSocialPost(row);
}
