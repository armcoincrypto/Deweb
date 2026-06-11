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
import { listAiGenerations } from "../services/blogAi.js";
import { runBlogGenerationPipeline } from "../services/blogGenerationPipeline.js";
import { savePendingReviewPost, notifyAdminBlogDraft } from "../services/blogDraftPersist.js";
import { requeueAfterReject } from "../services/blogTopicQueue.js";
import {
  getNextPublishSlot,
  getScheduleConfig,
  parseScheduledPublishAt,
} from "../utils/blogSchedule.js";
import { ensureSocialDraftsForPost } from "../services/blogSocialDistribution.js";
import {
  generateTranslationsForPost,
  listTranslations,
  updateTranslationStatus,
} from "../services/blogTranslationAi.js";

function onBlogPostPublished(postId) {
  try {
    ensureSocialDraftsForPost(postId);
  } catch (err) {
    console.warn("[adminBlog] Social draft error:", err.message);
  }
}

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
  const xThread = Array.isArray(merged.xThread)
    ? merged.xThread
    : Array.isArray(merged.twitterThread)
      ? merged.twitterThread
      : [];

  return {
    featuredImagePrompt: sanitizeBlogText(merged.featuredImagePrompt, 500),
    featuredImageUrl: sanitizeBlogText(merged.featuredImageUrl, 500),
    linkedinPost: sanitizeBlogText(merged.linkedinPost || merged.linkedinDraft, 3000),
    facebookPost: sanitizeBlogText(merged.facebookPost || merged.facebookDraft, 2000),
    xThread: xThread.map((t) => sanitizeBlogText(t, 500)).filter(Boolean),
    instagramCaption: sanitizeBlogText(merged.instagramCaption, 2200),
    linkedinDraft: sanitizeBlogText(merged.linkedinPost || merged.linkedinDraft, 3000),
    twitterThread: xThread.map((t) => sanitizeBlogText(t, 500)).filter(Boolean),
    facebookDraft: sanitizeBlogText(merged.facebookPost || merged.facebookDraft, 2000),
    targetKeyword: sanitizeBlogText(merged.targetKeyword, 200),
    buyerStage: sanitizeBlogText(merged.buyerStage, 50),
    searchIntent: sanitizeBlogText(merged.searchIntent, 80),
    tone: sanitizeBlogText(merged.tone, 100),
    wordCount: Number(merged.wordCount) || undefined,
    model: sanitizeBlogText(merged.model, 80),
    qualityScore:
      merged.qualityScore && typeof merged.qualityScore === "object"
        ? merged.qualityScore
        : existing.qualityScore,
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

router.get("/schedule-config", (_req, res) => {
  res.json(getScheduleConfig());
});

router.get("/pending", (_req, res) => {
  const rows = db
    .prepare(
      `${POST_SELECT} WHERE p.status IN ('pending_review', 'draft', 'approved', 'scheduled')
       ORDER BY
         CASE p.status
           WHEN 'pending_review' THEN 0
           WHEN 'scheduled' THEN 1
           WHEN 'approved' THEN 2
           ELSE 3
         END,
         p.scheduled_publish_at ASC,
         p.created_at DESC`
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

router.get("/:id/translations", (req, res) => {
  const existing = db.prepare("SELECT id, status FROM blog_posts WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Post not found." });
  res.json({ translations: listTranslations(req.params.id) });
});

router.post("/:id/translations/generate", async (req, res) => {
  try {
    const result = await generateTranslationsForPost(req.params.id);
    if (result.error) return res.status(400).json({ error: result.error });
    res.json(result);
  } catch (err) {
    console.error("[adminBlog] translation generate", err);
    res.status(500).json({ error: err.message || "Translation generation failed." });
  }
});

router.patch("/translations/:translationId", (req, res) => {
  const status = cleanText(req.body.status, 30);
  if (!status) return res.status(400).json({ error: "status is required." });
  const updated = updateTranslationStatus(req.params.translationId, status);
  if (!updated) return res.status(404).json({ error: "Translation not found." });
  res.json({ translation: updated });
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
  if (existing.status === "rejected") {
    return res.status(400).json({ error: "Cannot approve a rejected article." });
  }

  const publishMode = cleanText(req.body.publishMode || "scheduled", 30);
  const t = nowIso();
  const approvedBy = req.userId || null;

  if (publishMode === "immediate") {
    db.prepare(`
      UPDATE blog_posts SET
        status = 'published', published_at = ?, approved_at = ?, approved_by = ?,
        publish_mode = 'immediate', scheduled_publish_at = NULL, updated_at = ?
      WHERE id = ?
    `).run(t, t, approvedBy, t, req.params.id);

    onBlogPostPublished(req.params.id);
    const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(req.params.id);
    return res.json({
      post: toBlogPost(row, getPostTags(req.params.id)),
      message: "Article approved and published immediately.",
    });
  }

  let scheduledAt = parseScheduledPublishAt(req.body.scheduledPublishAt);
  let mode = "scheduled";

  if (req.body.scheduledPublishAt && !scheduledAt) {
    return res.status(400).json({ error: "scheduledPublishAt must be a future date/time." });
  }

  if (!scheduledAt) {
    scheduledAt = getNextPublishSlot();
    mode = "scheduled";
  } else {
    mode = "custom";
  }

  db.prepare(`
    UPDATE blog_posts SET
      status = 'scheduled', approved_at = ?, approved_by = ?,
      scheduled_publish_at = ?, publish_mode = ?, updated_at = ?
    WHERE id = ?
  `).run(t, approvedBy, scheduledAt, mode, t, req.params.id);

  const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(req.params.id);
  res.json({
    post: toBlogPost(row, getPostTags(req.params.id)),
    message: `Article approved and scheduled for ${scheduledAt}.`,
    scheduledPublishAt: scheduledAt,
  });
});

router.post("/:id/publish", (req, res) => {
  const existing = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Post not found." });
  if (existing.status === "rejected") {
    return res.status(400).json({ error: "Cannot publish a rejected article." });
  }
  const t = nowIso();
  db.prepare(`
    UPDATE blog_posts SET
      status = 'published',
      published_at = COALESCE(published_at, ?),
      publish_mode = COALESCE(publish_mode, 'immediate'),
      scheduled_publish_at = NULL,
      updated_at = ?
    WHERE id = ?
  `).run(t, t, req.params.id);
  onBlogPostPublished(req.params.id);
  const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(req.params.id);
  res.json({ post: toBlogPost(row, getPostTags(req.params.id)) });
});

router.post("/:id/reject", (req, res) => {
  const existing = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Post not found." });
  if (existing.status === "published") {
    return res.status(400).json({ error: "Cannot reject a published article." });
  }
  if (existing.status === "scheduled") {
    db.prepare(
      "UPDATE blog_posts SET scheduled_publish_at = NULL, publish_mode = NULL WHERE id = ?"
    ).run(req.params.id);
  }
  const t = nowIso();
  db.prepare(
    "UPDATE blog_posts SET status = 'rejected', updated_at = ? WHERE id = ?"
  ).run(t, req.params.id);

  let requeued = null;
  const hasAiOrigin =
    existing.ai_meta ||
    db.prepare("SELECT id FROM blog_ai_generations WHERE post_id = ?").get(req.params.id) ||
    db.prepare("SELECT id FROM blog_topic_queue WHERE generated_post_id = ?").get(req.params.id);

  if (hasAiOrigin) {
    const queueResult = requeueAfterReject(req.params.id);
    if (queueResult?.item) {
      requeued = queueResult.item;
    }
  }

  const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(req.params.id);
  res.json({
    post: toBlogPost(row, getPostTags(req.params.id)),
    requeued,
    message: requeued
      ? "Article rejected. A new topic was queued for improved AI regeneration."
      : "Article rejected.",
  });
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
    const { generationId, draft } = await runBlogGenerationPipeline({
      topic,
      targetKeyword,
      categoryName: category.name,
      categoryId,
      tone,
      wordCount,
      createdBy: req.userId,
    });

    const { postId } = savePendingReviewPost({
      draft,
      generationId,
      categoryId,
      slugFallbackTopic: topic,
      featuredImage: draft.featuredImage,
    });

    await notifyAdminBlogDraft({ topic, targetKeyword: targetKeyword || topic });

    const row = db.prepare(`${POST_SELECT} WHERE p.id = ?`).get(postId);
    res.status(201).json({
      post: toBlogPost(row, getPostTags(postId)),
      generationId,
      message: "AI article saved as pending review. Admin must approve and publish.",
    });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "AI generation failed." });
  }
});

export default router;
