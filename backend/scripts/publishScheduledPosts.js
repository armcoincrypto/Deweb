#!/usr/bin/env node
/**
 * Publish approved scheduled blog posts when scheduled_publish_at <= now.
 * Run: npm run blog-publish-cron
 */
import "../src/loadEnv.js";
import { db, nowIso } from "../src/db.js";

function main() {
  const now = nowIso();
  console.log("[blog-publish-cron] Starting at", now);

  const due = db
    .prepare(
      `SELECT id, title, slug, scheduled_publish_at
       FROM blog_posts
       WHERE status = 'scheduled'
         AND scheduled_publish_at IS NOT NULL
         AND scheduled_publish_at <= ?
         AND published_at IS NULL
       ORDER BY scheduled_publish_at ASC`
    )
    .all(now);

  if (due.length === 0) {
    console.log("[blog-publish-cron] No scheduled posts due for publishing.");
    process.exit(0);
    return;
  }

  const update = db.prepare(`
    UPDATE blog_posts
    SET status = 'published', published_at = ?, updated_at = ?
    WHERE id = ? AND status = 'scheduled' AND published_at IS NULL
  `);

  let published = 0;
  for (const post of due) {
    const t = nowIso();
    const result = update.run(t, t, post.id);
    if (result.changes > 0) {
      published++;
      console.log(
        `[blog-publish-cron] Published: "${post.title}" → /blog/${post.slug} (was scheduled for ${post.scheduled_publish_at})`
      );
    }
  }

  console.log(`[blog-publish-cron] Done. Published ${published} post(s).`);
  process.exit(0);
}

main();
