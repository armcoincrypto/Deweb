#!/usr/bin/env node
/**
 * Process one blog topic from the queue and generate a pending_review draft.
 * Run manually: node scripts/generateBlogCron.js
 * Or via cron/systemd (see docs/BLOG_AUTOMATION.md).
 */
import "../src/loadEnv.js";
import { processNextQueuedTopic } from "../src/services/blogTopicQueue.js";

async function main() {
  console.log("[blog-cron] Starting at", new Date().toISOString());

  const result = await processNextQueuedTopic({ createdBy: "blog-cron" });

  if (!result.processed) {
    console.log("[blog-cron]", result.reason || result.error || "Nothing processed.");
    process.exit(result.error ? 1 : 0);
    return;
  }

  console.log(
    `[blog-cron] Generated draft postId=${result.postId} queueId=${result.queueId} topic="${result.topic}"` +
      (result.regenerated ? " (regenerated after reject)" : "")
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("[blog-cron] Fatal error:", err.message);
  process.exit(1);
});
