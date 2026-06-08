import { Router } from "express";
import { db, uid, nowIso, parseJson } from "../db.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { rateLimit } from "../middleware/rateLimit.js";
import {
  BLOG_STATUSES,
  RESERVED_BLOG_SLUGS,
  slugify,
  estimateReadingTime,
  getBlogStats,
  toBlogCategory,
  toBlogPost,
  toBlogPostListItem,
} from "../utils/blogHelpers.js";
import {
  cleanText,
  sanitizeBlogContent,
  sanitizeBlogText,
} from "../utils/sanitize.js";
import { generateBlogDraft, listAiGenerations } from "../services/blogAi.js";

const router = Router();
router.use(requireAdmin);

const POST_SELECT = `
  SELECT p.*, c.name AS category_name, c.slug AS category_slug
  FROM blog_posts p
  JOIN blog_categories c ON c.id = p.category_id
`;

const aiRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  keyFn: (req) => `blog-ai:${req.userId || req.ip}`,
});

function getPostTags(postId) {
  return db
    .prepare(
      `SELECT t.* FROM blog_tags t
       JOIN blog_post_tags pt ON pt.tag_id = t.id
       WHERE pt.post_id = ?`
    )
    .all(postId)
    .map((t) => t.name);
}

function upsertTags(tagNames) {
  const ids = [];
  for (const name of tagNames) {
    const n = cleanText(name, 80);
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

function validateSlug(slug, excludeId = null) {
  const s = slugify(slug);
  if (!s || s.length < 3) return { error: "Slug must be at least 3 characters." };
  if (RESERVED_BLOG_SLUGS.has(s)) {
    return { error: "This slug is reserved by a static article." };
  }
  const existing = db.prepare("SELECT id FROM blog_posts WHERE slug = ?").get(s);
  if (existing && existing.id !== excludeId) {
    return { error: "Slug already in use." };
  }
  return { slug: s };
}

function sanitizeAiMeta(raw = {}, existing = {}) {
  const merged = { ...existing, ...(raw && typeof raw === "object" ? raw : {}) };
  return {
    featuredImagePrompt: sanitizeBlogText(merged.featuredImagePrompt, 500),
    linkedinDraft: sanitizeBlogText(merged.linkedinDraft, 3000),
    twitterThread: Array.isArray(merged.twitterThread)
      ? merged.twitterThread.map((t) => sanitizeBlogText(t, 500)).filter(Boolean)
      : [],
    facebookDraft: sanitizeBlogText(merged.facebookDraft, 2000),
    targetKeyword: sanitizeBlogText(merged.targetKeyword, 200),
    tone: sanitizeBlogText(merged.tone, 100),
    wordCount: Number(merged.wordCount) || undefined,
    model: sanitizeBlogText(merged.model, 80),
  };
}

function validateStatus(status, fallback = "draft") {
  return BLOG_STATUSES.includes(status) ? status : fallback;
}

function validatePostBody(body, { isCreate = false, preserveStatus = null } = {}) {
  const title = sanitizeBlogText(body.title, 300);
  if (!title) return { error: "Title is required." };

  const categoryId = cleanText(body.categoryId, 80);
  const cat = db.prepare("SELECT id FROM blog_categories WHERE id = ?").get(categoryId);
  if (!cat) return { error: "Valid category is required." };

  const slugCheck = validateSlug(body.slug || title);
  if (slugCheck.error) return slugCheck;

  const content = sanitizeBlogContent(body.content);
  const status = preserveStatus ?? validateStatus(body.status, isCreate ? "draft" : "draft");

  const existingAiMeta =
    body.existingAiMeta && typeof body.existingAiMeta === "object" ? body.existingAiMeta : {};

  return {
    title,
    slug: slugCheck.slug,
    excerpt: sanitizeBlogText(body.excerpt, 500),
    content,
    seoTitle: sanitizeBlogText(body.seoTitle || title, 120),
    metaDescription: sanitizeBlogText(body.metaDescription || body.excerpt, 320),
    featuredImage: sanitizeBlogText(body.featuredImage, 500),
    categoryId,
    authorName: sanitizeBlogText(body.authorName || "DEWEB Editorial Team", 120),
    status,
    readingTime: cleanText(body.readingTime, 20) || estimateReadingTime(content),
    tags: Array.isArray(body.tags)
      ? body.tags.map((t) => cleanText(t, 80)).filter(Boolean).slice(0, 12)
      : [],
    aiMeta: sanitizeAiMeta(body.aiMeta, existingAiMeta),
  };
}

router.get("/categories", (_req, res) => {
  const rows = db.prepare("SELECT * FROM blog_categories ORDER BY name ASC").all();
  res.json({ categories: rows.map(toBlogCategory) });
});

router.get("/ai-generations", (_req, res) => {
  res.json({ generations: listAiGenerations(30) });
});

router.get("/pending", (_req, res) => {
  const rows = db
    .prepare(
      `${POST_SELECT} WHERE p.status IN ('pending_review', 'draft', 'approved')
       ORDER BY p.created_at DESC`
    )
    .all();
  res.json({ posts: rows.map(toBlogPostListItem) });
});

router.get("/", (_req, res) => {
  const rows = db.prepare(`${POST_SELECT} ORDER BY p.updated_at DESC`).all();
  res.json({
    stats: getBlogStats(),
    posts: rows.map(toBlogPostListItem),
  });
});

router.get("/:id", (req, res) => {
  if (req.params.id === "pending") return res.status(404).json({ error: "Post not found." });
  const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(req.params.id);
  if (!row) return res.status(404).json({ error: "Post not found." });
  res.json({ post: toBlogPost(row, getPostTags(row.id)) });
});

router.post("/", (req, res) => {
  const data = validatePostBody(req.body, { isCreate: true });
  if (data.error) return res.status(400).json({ error: data.error });

  const id = uid();
  const t = nowIso();
  const publishedAt = data.status === "published" ? t : null;

  db.prepare(`
    INSERT INTO blog_posts (
      id, title, slug, excerpt, content, seo_title, meta_description,
      featured_image, category_id, author_name, status, reading_time,
      ai_meta, created_at, updated_at, published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    data.title,
    data.slug,
    data.excerpt,
    JSON.stringify(data.content),
    data.seoTitle,
    data.metaDescription,
    data.featuredImage,
    data.categoryId,
    data.authorName,
    data.status,
    data.readingTime,
    JSON.stringify(data.aiMeta),
    t,
    t,
    publishedAt
  );

  setPostTags(id, data.tags);
  const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(id);
  res.status(201).json({ post: toBlogPost(row, getPostTags(id)) });
});

router.put("/:id", (req, res) => {
  const existing = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Post not found." });

  const existingAiMeta = parseJson(existing.ai_meta, {});
  const data = validatePostBody(
    { ...req.body, existingAiMeta },
    { preserveStatus: validateStatus(req.body.status, existing.status) }
  );
  if (data.error) return res.status(400).json({ error: data.error });

  const slugCheck = validateSlug(data.slug, req.params.id);
  if (slugCheck.error) return res.status(400).json({ error: slugCheck.error });
  data.slug = slugCheck.slug;

  const t = nowIso();
  const publishedAt = data.status === "published" ? existing.published_at || t : null;

  db.prepare(`
    UPDATE blog_posts SET
      title = ?, slug = ?, excerpt = ?, content = ?, seo_title = ?,
      meta_description = ?, featured_image = ?, category_id = ?,
      author_name = ?, status = ?, reading_time = ?, ai_meta = ?,
      updated_at = ?, published_at = ?
    WHERE id = ?
  `).run(
    data.title,
    data.slug,
    data.excerpt,
    JSON.stringify(data.content),
    data.seoTitle,
    data.metaDescription,
    data.featuredImage,
    data.categoryId,
    data.authorName,
    data.status,
    data.readingTime,
    JSON.stringify(data.aiMeta),
    t,
    publishedAt,
    req.params.id
  );

  setPostTags(req.params.id, data.tags);
  const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(req.params.id);
  res.json({ post: toBlogPost(row, getPostTags(req.params.id)) });
});

router.delete("/:id", (req, res) => {
  const existing = db.prepare("SELECT id FROM blog_posts WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Post not found." });
  db.prepare("DELETE FROM blog_posts WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

router.post("/:id/approve", (req, res) => {
  const existing = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Post not found." });
  if (existing.status === "published") {
    return res.status(400).json({ error: "Already published." });
  }
  const t = nowIso();
  db.prepare(
    "UPDATE blog_posts SET status = 'approved', updated_at = ? WHERE id = ?"
  ).run(t, req.params.id);
  const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(req.params.id);
  res.json({ post: toBlogPost(row, getPostTags(req.params.id)) });
});

router.post("/:id/publish", (req, res) => {
  const existing = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Post not found." });
  const t = nowIso();
  db.prepare(
    "UPDATE blog_posts SET status = 'published', published_at = COALESCE(published_at, ?), updated_at = ? WHERE id = ?"
  ).run(t, t, req.params.id);
  const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(req.params.id);
  res.json({ post: toBlogPost(row, getPostTags(req.params.id)) });
});

router.post("/:id/reject", (req, res) => {
  const existing = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Post not found." });
  if (existing.status === "published") {
    return res.status(400).json({ error: "Cannot reject a published article. Unpublish first." });
  }
  const t = nowIso();
  db.prepare(
    "UPDATE blog_posts SET status = 'rejected', updated_at = ? WHERE id = ?"
  ).run(t, req.params.id);
  const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(req.params.id);
  res.json({ post: toBlogPost(row, getPostTags(req.params.id)) });
});

router.post("/ai-generate", aiRateLimit, async (req, res) => {
  const topic = sanitizeBlogText(req.body.topic, 500);
  const targetKeyword = sanitizeBlogText(req.body.targetKeyword, 200);
  const categoryId = cleanText(req.body.categoryId, 80);
  const tone = sanitizeBlogText(req.body.tone || "professional", 100);
  const wordCount = Math.min(2500, Math.max(1500, Number(req.body.wordCount) || 1800));

  if (!topic) return res.status(400).json({ error: "Article topic is required." });
  if (!categoryId) return res.status(400).json({ error: "Category is required." });

  const category = db.prepare("SELECT * FROM blog_categories WHERE id = ?").get(categoryId);
  if (!category) return res.status(400).json({ error: "Invalid category." });

  try {
    const { generationId, draft } = await generateBlogDraft({
      topic,
      targetKeyword,
      categoryName: category.name,
      tone,
      wordCount,
      createdBy: req.userId,
    });

    const slugCheck = validateSlug(draft.slug);
    if (slugCheck.error) {
      draft.slug = slugify(`${topic}-${Date.now().toString(36)}`);
    } else {
      draft.slug = slugCheck.slug;
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
      draft.slug,
      draft.excerpt,
      JSON.stringify(draft.content),
      draft.seoTitle,
      draft.metaDescription,
      "",
      categoryId,
      "DEWEB Editorial Team",
      draft.readingTime,
      JSON.stringify(draft.aiMeta),
      t,
      t
    );

    setPostTags(id, draft.tags);

    db.prepare("UPDATE blog_ai_generations SET post_id = ?, category_id = ? WHERE id = ?").run(
      id,
      categoryId,
      generationId
    );

    const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(id);
    res.status(201).json({
      post: toBlogPost(row, getPostTags(id)),
      generationId,
      message: "AI article saved as pending review. Admin must approve and publish.",
    });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "AI generation failed." });
  }
});

export default router;
