#!/usr/bin/env node
/**
 * Generate 5–10 fresh SEO blog topics and queue them for cron generation.
 * Run: npm run blog-topics
 */
import "../src/loadEnv.js";
import { generateFreshBlogTopics } from "../src/services/blogTopicIntelligence.js";

async function main() {
  const count = Number(process.argv[2]) || 8;
  console.log("[blog-topics] Generating fresh topics at", new Date().toISOString());

  const result = await generateFreshBlogTopics({ count });

  console.log(`[blog-topics] Ideas from AI: ${result.total}`);
  console.log(`[blog-topics] Queued: ${result.created.length}`);
  console.log(`[blog-topics] Skipped: ${result.skipped.length}`);

  for (const item of result.created) {
    console.log(`  + [p${item.priority}] ${item.topic} → ${item.targetKeyword}`);
  }
  for (const s of result.skipped) {
    console.log(`  - skipped: ${s.topic} (${s.reason})`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("[blog-topics] Fatal:", err.message);
  process.exit(1);
});
