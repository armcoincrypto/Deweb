#!/usr/bin/env node
/**
 * Create social media drafts for published posts missing social rows.
 * Run: npm run blog-social-cron
 */
import "../src/loadEnv.js";
import { ensureSocialDraftsForPublishedPosts } from "../src/services/blogSocialDistribution.js";

function main() {
  console.log("[blog-social-cron] Starting at", new Date().toISOString());
  const result = ensureSocialDraftsForPublishedPosts({ limit: 50 });
  console.log(
    `[blog-social-cron] Processed ${result.postsProcessed} post(s), created ${result.totalCreated} social draft(s).`
  );
  process.exit(0);
}

main();
