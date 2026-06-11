#!/usr/bin/env node
/**
 * Process one rejection-triggered blog regeneration from the topic queue.
 * Run every 30 minutes via cron (see docs/BLOG_AUTOMATION.md).
 */
import "../src/loadEnv.js";
import { processNextRejectedRegeneration } from "../src/services/blogTopicQueue.js";

async function main() {
  console.log("[blog-regenerate-cron] Starting at", new Date().toISOString());

  const result = await processNextRejectedRegeneration({ createdBy: "blog-regenerate-cron" });

  if (!result.processed) {
    console.log("[blog-regenerate-cron]", result.reason || result.error || "Nothing processed.");
    process.exit(result.error ? 1 : 0);
    return;
  }

  console.log(
    `[blog-regenerate-cron] Regenerated draft postId=${result.postId} queueId=${result.queueId} ` +
      `topic="${result.topic}" attempt=${result.regenerationCount ?? "?"}`
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("[blog-regenerate-cron] Fatal error:", err.message);
  process.exit(1);
});
