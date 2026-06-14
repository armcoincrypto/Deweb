/**
 * Test X posting to @dewebam — run on server with credentials in .env
 * Usage: node scripts/testXPost.js
 */
import "../src/loadEnv.js";
import { getXMe } from "../src/services/xOAuth.js";
import { publishToPlatform, getPublishConfigStatus } from "../src/services/dewebamPublish.js";
import { createSocialPost, updateSocialPost } from "../src/services/dewebamSocialPosts.js";

const testText =
  process.argv[2] ||
  "DeWeb builds premium Shopify stores, AI chatbots & automation for growing brands. https://dewebam.com";

async function main() {
  console.log("X config:", getPublishConfigStatus().x ? "OK" : "MISSING");

  try {
    const me = await getXMe();
    console.log("Authenticated as:", `@${me.data?.username || "unknown"} (${me.data?.name || ""})`);
  } catch (err) {
    console.error("Auth check failed:", err.message);
    process.exit(1);
  }

  const post = createSocialPost({
    platform: "x",
    topic: "test",
    title: "X API test",
    content: {
      postText: testText,
      hashtags: ["DeWeb", "Shopify", "AI"],
      cta: "https://dewebam.com/en/contact",
    },
    status: "approved",
    telegramUserId: "test",
  });

  console.log("Publishing draft:", post.id);
  const result = await publishToPlatform("x", post);

  if (result.ok) {
    updateSocialPost(post.id, {
      status: "published",
      published_at: new Date().toISOString(),
    });
    console.log("SUCCESS");
    console.log("Tweet ID:", result.platformId);
    console.log("URL:", result.url);
  } else {
    updateSocialPost(post.id, { status: "failed", error_message: result.error });
    console.error("FAILED:", result.error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
