import { db, uid, nowIso, parseJson } from "../db.js";
import { runBlogGenerationPipeline } from "./blogGenerationPipeline.js";
import { savePendingReviewPost, notifyAdminBlogDraft } from "./blogDraftPersist.js";
import { cleanText } from "../utils/sanitize.js";

export const QUEUE_STATUSES = ["queued", "generating", "done", "failed"];
export const REGENERATE_MARKER = "REGENERATE_AFTER_REJECT";
export const REGENERATION_HINT =
  "The previous article was rejected by a human editor. Generate a significantly stronger article with different structure, deeper business insights, better SEO, stronger examples, more actionable advice, and improved conversion potential. Do not repeat wording or article structure.";
export const MAX_REGENERATION_ATTEMPTS = 3;
export const REJECTION_QUEUE_PRIORITY = 90;

export function toTopicQueueItem(row) {
  if (!row) return null;
  const topicMeta = parseJson(row.topic_meta, {});
  return {
    id: row.id,
    topic: row.topic,
    targetKeyword: row.target_keyword,
    categoryId: row.category_id,
    priority: row.priority,
    status: row.status,
    scheduledFor: row.scheduled_for,
    generatedPostId: row.generated_post_id,
    lastError: row.last_error,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    categoryName: row.category_name || null,
    generatedPostSlug: row.generated_post_slug || null,
    generatedPostTitle: row.generated_post_title || null,
    searchIntent: topicMeta.searchIntent || null,
    buyerStage: topicMeta.buyerStage || null,
    suggestedCta: topicMeta.suggestedCta || null,
    whyThisCanRank: topicMeta.whyThisCanRank || null,
    trendType: topicMeta.trendType || null,
    urgencyScore: topicMeta.urgencyScore ?? null,
    expectedLeadValue: topicMeta.expectedLeadValue || null,
    recommendedService: topicMeta.recommendedService || null,
  };
}

export function listTopicQueue() {
  const rows = db
    .prepare(
      `SELECT q.*, c.name AS category_name,
              p.slug AS generated_post_slug, p.title AS generated_post_title
       FROM blog_topic_queue q
       JOIN blog_categories c ON c.id = q.category_id
       LEFT JOIN blog_posts p ON p.id = q.generated_post_id
       ORDER BY q.priority DESC, q.scheduled_for ASC, q.created_at ASC`
    )
    .all();
  return rows.map(toTopicQueueItem);
}

export function getTopicQueueItem(id) {
  const row = db
    .prepare(
      `SELECT q.*, c.name AS category_name,
              p.slug AS generated_post_slug, p.title AS generated_post_title
       FROM blog_topic_queue q
       JOIN blog_categories c ON c.id = q.category_id
       LEFT JOIN blog_posts p ON p.id = q.generated_post_id
       WHERE q.id = ?`
    )
    .get(id);
  return toTopicQueueItem(row);
}

function validateCategoryId(categoryId) {
  const id = cleanText(categoryId, 80);
  const cat = db.prepare("SELECT id FROM blog_categories WHERE id = ?").get(id);
  if (!cat) return { error: "Valid category is required." };
  return { categoryId: id };
}

export function createTopicQueueItem({
  topic,
  targetKeyword,
  categoryId,
  priority = 0,
  scheduledFor,
  lastError = null,
  topicMeta = null,
}) {
  const t = cleanText(topic, 500);
  if (!t) return { error: "Topic is required." };

  const catCheck = validateCategoryId(categoryId);
  if (catCheck.error) return catCheck;

  const now = nowIso();
  const sched = scheduledFor || now;
  const id = uid();

  const metaJson = topicMeta ? JSON.stringify(topicMeta) : null;

  db.prepare(`
    INSERT INTO blog_topic_queue (
      id, topic, target_keyword, category_id, priority, status,
      scheduled_for, generated_post_id, last_error, topic_meta, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, 'queued', ?, NULL, ?, ?, ?, ?)
  `).run(
    id,
    t,
    cleanText(targetKeyword, 200) || t,
    catCheck.categoryId,
    Number(priority) || 0,
    sched,
    lastError,
    metaJson,
    now,
    now
  );

  return { item: getTopicQueueItem(id) };
}

export function updateTopicQueueItem(id, body) {
  const existing = db.prepare("SELECT * FROM blog_topic_queue WHERE id = ?").get(id);
  if (!existing) return { error: "Queue item not found." };
  if (existing.status === "generating") {
    return { error: "Cannot edit an item while it is generating." };
  }

  const topic = body.topic !== undefined ? cleanText(body.topic, 500) : existing.topic;
  if (!topic) return { error: "Topic is required." };

  let categoryId = existing.category_id;
  if (body.categoryId !== undefined) {
    const catCheck = validateCategoryId(body.categoryId);
    if (catCheck.error) return catCheck;
    categoryId = catCheck.categoryId;
  }

  const targetKeyword =
    body.targetKeyword !== undefined
      ? cleanText(body.targetKeyword, 200) || topic
      : existing.target_keyword;

  const priority =
    body.priority !== undefined ? Number(body.priority) || 0 : existing.priority;

  let scheduledFor = existing.scheduled_for;
  if (body.scheduledFor !== undefined) {
    scheduledFor = body.scheduledFor || nowIso();
  }

  let status = existing.status;
  if (body.status !== undefined && QUEUE_STATUSES.includes(body.status)) {
    status = body.status;
  }

  const t = nowIso();
  db.prepare(`
    UPDATE blog_topic_queue SET
      topic = ?, target_keyword = ?, category_id = ?, priority = ?,
      status = ?, scheduled_for = ?, updated_at = ?
    WHERE id = ?
  `).run(topic, targetKeyword, categoryId, priority, status, scheduledFor, t, id);

  return { item: getTopicQueueItem(id) };
}

export function deleteTopicQueueItem(id) {
  const existing = db.prepare("SELECT id, status FROM blog_topic_queue WHERE id = ?").get(id);
  if (!existing) return { error: "Queue item not found." };
  if (existing.status === "generating") {
    return { error: "Cannot delete an item while it is generating." };
  }
  db.prepare("DELETE FROM blog_topic_queue WHERE id = ?").run(id);
  return { ok: true };
}

export function retryTopicQueueItem(id) {
  const existing = db.prepare("SELECT * FROM blog_topic_queue WHERE id = ?").get(id);
  if (!existing) return { error: "Queue item not found." };
  if (existing.status === "generating") {
    return { error: "Item is currently generating." };
  }

  const t = nowIso();
  db.prepare(`
    UPDATE blog_topic_queue SET
      status = 'queued', last_error = NULL, scheduled_for = ?, updated_at = ?
    WHERE id = ?
  `).run(t, t, id);

  return { item: getTopicQueueItem(id) };
}

/**
 * Pick and process the next eligible queue item. Returns null if none due.
 */
export async function processNextQueuedTopic({ createdBy = null } = {}) {
  const now = nowIso();

  const item = db
    .prepare(
      `SELECT * FROM blog_topic_queue
       WHERE status = 'queued'
         AND scheduled_for <= ?
         AND (last_error IS NULL OR last_error != ?)
         AND (
           topic_meta IS NULL
           OR (
             topic_meta NOT LIKE '%"fromRejection":true%'
             AND topic_meta NOT LIKE '%"fromRejection": true%'
           )
         )
       ORDER BY priority DESC, scheduled_for ASC, created_at ASC
       LIMIT 1`
    )
    .get(now, REGENERATE_MARKER);

  if (!item) return { processed: false, reason: "No queued topics due." };

  const itemMeta = parseJson(item.topic_meta, {});
  const isRegeneration = item.last_error === REGENERATE_MARKER || itemMeta.fromRejection === true;
  const t = nowIso();

  db.prepare(
    `UPDATE blog_topic_queue SET status = 'generating', last_error = NULL, updated_at = ? WHERE id = ?`
  ).run(t, item.id);

  const category = db.prepare("SELECT * FROM blog_categories WHERE id = ?").get(item.category_id);
  if (!category) {
    db.prepare(
      `UPDATE blog_topic_queue SET status = 'failed', last_error = ?, updated_at = ? WHERE id = ?`
    ).run("Invalid category.", t, item.id);
    return { processed: false, queueId: item.id, error: "Invalid category." };
  }

  try {
    const { generationId, draft } = await runBlogGenerationPipeline({
      topic: item.topic,
      targetKeyword: item.target_keyword || item.topic,
      categoryName: category.name,
      categoryId: item.category_id,
      categorySlug: category.slug,
      tone: "professional",
      wordCount: 2000,
      createdBy,
      regenerationHint: isRegeneration ? REGENERATION_HINT : null,
      buyerStage: itemMeta.buyerStage,
      searchIntent: itemMeta.searchIntent,
      trendType: itemMeta.trendType,
      regenerationCount: itemMeta.regenerationCount,
      rejectedFromPostId: itemMeta.rejectedPostId,
      rejectedFromPostTitle: itemMeta.rejectedPostTitle,
      originalRejectedPostId: itemMeta.originalRejectedPostId,
    });

    const { postId } = savePendingReviewPost({
      draft,
      generationId,
      categoryId: item.category_id,
      slugFallbackTopic: item.topic,
      featuredImage: draft.featuredImage,
    });

    db.prepare(
      `UPDATE blog_topic_queue SET
        status = 'done', generated_post_id = ?, last_error = NULL, updated_at = ?
       WHERE id = ?`
    ).run(postId, nowIso(), item.id);

    await notifyAdminBlogDraft({
      topic: item.topic,
      targetKeyword: item.target_keyword || item.topic,
    });

    return {
      processed: true,
      queueId: item.id,
      postId,
      topic: item.topic,
      regenerated: isRegeneration,
    };
  } catch (err) {
    const message = err.message || "AI generation failed.";
    db.prepare(
      `UPDATE blog_topic_queue SET status = 'failed', last_error = ?, updated_at = ? WHERE id = ?`
    ).run(message.slice(0, 2000), nowIso(), item.id);
    return { processed: false, queueId: item.id, error: message };
  }
}

/**
 * Process the next rejection-triggered regeneration queue item (high-priority).
 */
export async function processNextRejectedRegeneration({ createdBy = null } = {}) {
  const now = nowIso();

  const item = db
    .prepare(
      `SELECT * FROM blog_topic_queue
       WHERE status = 'queued'
         AND scheduled_for <= ?
         AND (
           last_error = ?
           OR topic_meta LIKE '%"fromRejection":true%'
           OR topic_meta LIKE '%"fromRejection": true%'
         )
       ORDER BY priority DESC, scheduled_for ASC, created_at ASC
       LIMIT 1`
    )
    .get(now, REGENERATE_MARKER);

  if (!item) return { processed: false, reason: "No rejected-topic regenerations due." };

  const itemMeta = parseJson(item.topic_meta, {});
  const t = nowIso();

  db.prepare(
    `UPDATE blog_topic_queue SET status = 'generating', last_error = NULL, updated_at = ? WHERE id = ?`
  ).run(t, item.id);

  const category = db.prepare("SELECT * FROM blog_categories WHERE id = ?").get(item.category_id);
  if (!category) {
    db.prepare(
      `UPDATE blog_topic_queue SET status = 'failed', last_error = ?, updated_at = ? WHERE id = ?`
    ).run("Invalid category.", t, item.id);
    return { processed: false, queueId: item.id, error: "Invalid category." };
  }

  try {
    const { generationId, draft } = await runBlogGenerationPipeline({
      topic: item.topic,
      targetKeyword: item.target_keyword || item.topic,
      categoryName: category.name,
      categoryId: item.category_id,
      categorySlug: category.slug,
      tone: "professional",
      wordCount: 2000,
      createdBy,
      regenerationHint: REGENERATION_HINT,
      buyerStage: itemMeta.buyerStage,
      searchIntent: itemMeta.searchIntent,
      trendType: itemMeta.trendType,
      regenerationCount: itemMeta.regenerationCount,
      rejectedFromPostId: itemMeta.rejectedPostId,
      rejectedFromPostTitle: itemMeta.rejectedPostTitle,
      originalRejectedPostId: itemMeta.originalRejectedPostId,
    });

    const { postId } = savePendingReviewPost({
      draft,
      generationId,
      categoryId: item.category_id,
      slugFallbackTopic: item.topic,
      featuredImage: draft.featuredImage,
    });

    db.prepare(
      `UPDATE blog_topic_queue SET
        status = 'done', generated_post_id = ?, last_error = NULL, updated_at = ?
       WHERE id = ?`
    ).run(postId, nowIso(), item.id);

    await notifyAdminBlogDraft({
      topic: item.topic,
      targetKeyword: item.target_keyword || item.topic,
    });

    return {
      processed: true,
      queueId: item.id,
      postId,
      topic: item.topic,
      regenerated: true,
      regenerationCount: itemMeta.regenerationCount,
    };
  } catch (err) {
    const message = err.message || "AI regeneration failed.";
    db.prepare(
      `UPDATE blog_topic_queue SET status = 'failed', last_error = ?, updated_at = ? WHERE id = ?`
    ).run(message.slice(0, 2000), nowIso(), item.id);
    return { processed: false, queueId: item.id, error: message };
  }
}

/**
 * Re-queue topic after admin rejects an AI-generated post.
 */
export function requeueAfterReject(postId) {
  const post = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(postId);
  if (!post) return null;

  const queueRow = db
    .prepare("SELECT * FROM blog_topic_queue WHERE generated_post_id = ? ORDER BY created_at DESC")
    .get(postId);

  const genRow = db
    .prepare("SELECT * FROM blog_ai_generations WHERE post_id = ? ORDER BY created_at DESC")
    .get(postId);

  const aiMeta = parseJson(post.ai_meta, {});

  const currentCount = aiMeta.regenerationCount || 0;
  if (currentCount >= MAX_REGENERATION_ATTEMPTS) {
    return {
      error: `Max regeneration attempts (${MAX_REGENERATION_ATTEMPTS}) reached for this article chain.`,
    };
  }

  const nextCount = currentCount + 1;
  const originalRejectedPostId = aiMeta.originalRejectedPostId || postId;

  const topic = queueRow?.topic || genRow?.topic || post.title;
  const targetKeyword =
    queueRow?.target_keyword || genRow?.target_keyword || aiMeta.targetKeyword || topic;
  const categoryId = queueRow?.category_id || genRow?.category_id || post.category_id;
  const priority = Math.max((queueRow?.priority ?? 0) + 10, REJECTION_QUEUE_PRIORITY);

  const baseTopicMeta = queueRow?.topic_meta
    ? parseJson(queueRow.topic_meta, {})
    : {
        buyerStage: aiMeta.buyerStage,
        searchIntent: aiMeta.searchIntent,
        trendType: aiMeta.trendType,
      };

  const topicMeta = {
    ...baseTopicMeta,
    fromRejection: true,
    rejectedPostId: postId,
    rejectedPostTitle: post.title,
    regenerationCount: nextCount,
    originalRejectedPostId,
  };

  db.prepare("UPDATE blog_posts SET ai_meta = ?, updated_at = ? WHERE id = ?").run(
    JSON.stringify({
      ...aiMeta,
      regenerationCount: nextCount,
      originalRejectedPostId,
    }),
    nowIso(),
    postId
  );

  return createTopicQueueItem({
    topic,
    targetKeyword,
    categoryId,
    priority,
    scheduledFor: nowIso(),
    lastError: REGENERATE_MARKER,
    topicMeta,
  });
}
