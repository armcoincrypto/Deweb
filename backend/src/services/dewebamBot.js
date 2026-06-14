import {
  sendMessage,
  answerCallbackQuery,
  sendPhoto,
  sendPhotoFile,
  inlineKeyboard,
  btn,
  urlBtn,
  getUpdates,
  deleteWebhook,
  setWebhook,
  getMe,
  isTelegramConfigured,
} from "./telegramApi.js";
import {
  createSocialPost,
  getSocialPost,
  updateSocialPost,
  listSocialPosts,
  countByStatus,
  saveSession,
  clearSession,
  getSession,
} from "./dewebamSocialPosts.js";
import {
  DEWEBAM_PLATFORMS,
  DEWEBAM_TOPICS,
  generateSocialContent,
  generateBlogFromTelegram,
  formatPostPreview,
  formatCopyText,
} from "./dewebamContentAi.js";
import { generateSocialImage, absoluteImageUrl, localImagePath } from "./dewebamImage.js";
import { publishToPlatform, getPublishConfigStatus } from "./dewebamPublish.js";

const BOT_NAME = "DeWebam";

/** Best default topic per platform for one-click generation */
const PLATFORM_DEFAULT_TOPIC = {
  linkedin: "shopify",
  instagram: "landing_page",
  facebook: "web_development",
  x: "ai_chatbot",
  blog: "shopify",
};

function adminUserId() {
  return String(process.env.TELEGRAM_ADMIN_USER_ID || "").trim();
}

function siteUrl() {
  return process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://dewebam.com";
}

function isAuthorized(userId) {
  const allowed = adminUserId();
  if (!allowed) return false;
  return String(userId) === allowed;
}

function mainMenuKeyboard() {
  return inlineKeyboard([
    [btn("📝 DeWeb Blog", "gen:blog"), btn("💼 LinkedIn", "gen:linkedin")],
    [btn("📸 Instagram", "gen:instagram"), btn("📘 Facebook", "gen:facebook")],
    [btn("🐦 X", "gen:x")],
    [btn("📋 Pick Topic First", "action:topics"), btn("📊 Status", "action:status")],
    [btn("ℹ️ Help", "action:help")],
  ]);
}

function topicKeyboard(platform) {
  return inlineKeyboard([
    [btn("🛒 Shopify", `topic:${platform}:shopify`), btn("🤖 AI Chatbot", `topic:${platform}:ai_chatbot`)],
    [btn("🌐 Web Dev", `topic:${platform}:web_development`), btn("⚡ Automation", `topic:${platform}:automation`)],
    [btn("☁️ SaaS", `topic:${platform}:saas`), btn("🎯 Landing Page", `topic:${platform}:landing_page`)],
    [btn("✏️ Custom Topic", `topic:${platform}:custom`)],
    [btn("« Menu", "menu:main")],
  ]);
}

function platformPickerKeyboard() {
  return inlineKeyboard([
    [btn("💼 LinkedIn", "pick:linkedin"), btn("📸 Instagram", "pick:instagram")],
    [btn("📘 Facebook", "pick:facebook"), btn("🐦 X", "pick:x")],
    [btn("📝 DeWeb Blog", "pick:blog")],
    [btn("« Menu", "menu:main")],
  ]);
}

/** Simple 2-button preview — Recreate + Post */
function previewKeyboard(postId) {
  return inlineKeyboard([
    [btn("🔄 Recreate", `post:recreate:${postId}`), btn("📤 Post", `post:post:${postId}`)],
    [btn("« Menu", "menu:main")],
  ]);
}

function helpText() {
  const cfg = getPublishConfigStatus();
  return (
    `<b>${BOT_NAME} — DeWeb Marketing Control Panel</b>\n\n` +
    `<b>How to use:</b>\n` +
    `1. Tap a platform (LinkedIn, Instagram, etc.)\n` +
    `2. AI generates professional content + image\n` +
    `3. Tap <b>Recreate</b> to regenerate or <b>Post</b> to publish\n\n` +
    `<b>API status:</b>\n` +
    `LinkedIn: ${cfg.linkedin ? "✅" : "❌ add keys to .env"}\n` +
    `Instagram: ${cfg.instagram ? "✅" : "❌ add keys to .env"}\n` +
    `Facebook: ${cfg.facebook ? "✅" : "❌ add keys to .env"}\n` +
    `X: ${cfg.x ? "✅" : "❌ add keys to .env"}\n` +
    `Blog CMS: ✅\n\n` +
    `<b>Commands:</b> /start /menu /linkedin /instagram /facebook /x /blog /status /help`
  );
}

async function rejectUnauthorized(chatId, userId) {
  await sendMessage(chatId, "⛔ Unauthorized. Admin only.");
  console.warn("[dewebam] Unauthorized:", userId);
}

async function showMainMenu(chatId) {
  await sendMessage(
    chatId,
    `<b>👋 Welcome to ${BOT_NAME}</b>\n\n` +
      `Tap a platform to instantly generate professional DeWeb marketing content.\n\n` +
      `<b>LinkedIn</b> is optimized for B2B — founders, Shopify sellers, agencies.\n\n` +
      `After generation: <b>Recreate</b> or <b>Post</b>.`,
    { replyMarkup: mainMenuKeyboard() }
  );
}

async function generateAndPreview(chatId, userId, platform, topicKey, customTopic) {
  const label = DEWEBAM_PLATFORMS[platform]?.label || platform;
  const waitMsg = await sendMessage(
    chatId,
    `⏳ Generating <b>${label}</b> content…\nPlease wait 30–90 seconds.`
  );

  try {
    let post;
    let content;
    let imageUrl = null;
    let blogPostId = null;

    if (platform === "blog") {
      const result = await generateBlogFromTelegram(topicKey, customTopic);
      content = result.content;
      imageUrl = result.imageUrl;
      blogPostId = result.postId;
      post = createSocialPost({
        platform: "blog",
        topic: topicKey === "custom" ? customTopic : topicKey,
        title: content.title,
        content,
        imagePrompt: content.imagePrompt,
        imageUrl,
        status: "pending",
        blogPostId,
        telegramUserId: userId,
        telegramChatId: chatId,
      });
    } else {
      const result = await generateSocialContent(platform, topicKey, customTopic);
      content = result.content;
      const image = await generateSocialImage(content.imagePrompt, result.topicInfo.label, platform);
      imageUrl = image?.publicUrl || null;

      post = createSocialPost({
        platform,
        topic: topicKey === "custom" ? customTopic : topicKey,
        title: content.title,
        content,
        imagePrompt: content.imagePrompt,
        imageUrl,
        status: "pending",
        telegramUserId: userId,
        telegramChatId: chatId,
      });
    }

    saveSession(userId, {
      state: "preview",
      platform,
      topic: topicKey,
      current_post_id: post.id,
    });

    const preview = formatPostPreview(platform, content, imageUrl);
    await sendMessage(chatId, preview, { replyMarkup: previewKeyboard(post.id) });

    if (imageUrl) {
      const localPath = localImagePath(imageUrl);
      const abs = absoluteImageUrl(imageUrl);
      const photoOpts = {
        caption: `🖼 ${label} banner`,
        replyMarkup: previewKeyboard(post.id),
      };

      try {
        if (localPath) {
          await sendPhotoFile(chatId, localPath, photoOpts);
        } else if (abs) {
          await sendPhoto(chatId, abs, photoOpts);
        }
      } catch (photoErr) {
        console.warn("[dewebam] Photo send failed:", photoErr.message);
        if (abs) {
          await sendMessage(chatId, `🖼 Image ready:\n${abs}`, {
            replyMarkup: previewKeyboard(post.id),
          });
        }
      }
    }

    if (platform === "blog" && blogPostId) {
      await sendMessage(
        chatId,
        `📝 Blog saved to CMS (pending review):\n${siteUrl()}/en/admin/blog/pending`,
        { replyMarkup: previewKeyboard(post.id) }
      );
    }

    // Remove wait message indicator — optional cleanup skipped to avoid edit errors
  } catch (err) {
    console.error("[dewebam] Generation failed:", err.message);
    await sendMessage(
      chatId,
      `❌ Generation failed:\n${escapeHtml(err.message)}\n\nTry again from the menu.`,
      { replyMarkup: inlineKeyboard([[btn("« Menu", "menu:main")]]) }
    );
  }
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function showStatus(chatId) {
  const counts = countByStatus();
  const cfg = getPublishConfigStatus();
  await sendMessage(
    chatId,
    `<b>📊 ${BOT_NAME} Status</b>\n\n` +
      `Pending: ${counts.pending || 0} | Draft: ${counts.draft || 0}\n` +
      `Published: ${counts.published || 0} | Failed: ${counts.failed || 0}\n\n` +
      `<b>Publishing APIs:</b>\n` +
      `LinkedIn ${cfg.linkedin ? "✅" : "❌"} | Instagram ${cfg.instagram ? "✅" : "❌"}\n` +
      `Facebook ${cfg.facebook ? "✅" : "❌"} | X ${cfg.x ? "✅" : "❌"}`,
    { replyMarkup: mainMenuKeyboard() }
  );
}

async function handlePostAction(action, postId, chatId, userId, callbackQuery) {
  const post = getSocialPost(postId);
  if (!post) {
    await answerCallbackQuery(callbackQuery.id, "Post not found");
    return;
  }

  const content = post.contentParsed;

  if (action === "recreate") {
    await answerCallbackQuery(callbackQuery.id, "Recreating…");
    const topicKey = DEWEBAM_TOPICS[post.topic] ? post.topic : "custom";
    const customTopic = topicKey === "custom" ? post.topic : undefined;
    await generateAndPreview(chatId, userId, post.platform, topicKey, customTopic);
    return;
  }

  if (action === "post") {
    await answerCallbackQuery(callbackQuery.id, "Publishing…");
    const publishingMsg = await sendMessage(
      chatId,
      `📤 Publishing to <b>${DEWEBAM_PLATFORMS[post.platform]?.label || post.platform}</b>…`
    );

    try {
      const result = await publishToPlatform(post.platform, post);

      if (result.ok) {
        updateSocialPost(postId, {
          status: "published",
          published_at: new Date().toISOString(),
          error_message: null,
        });

        let msg = `✅ <b>Published successfully!</b>`;
        if (result.url) msg += `\n\n🔗 ${result.url}`;
        if (result.note) msg += `\n\n${result.note}`;
        if (result.platformId) msg += `\n\nID: <code>${escapeHtml(result.platformId)}</code>`;

        await sendMessage(chatId, msg, { replyMarkup: mainMenuKeyboard() });
      } else {
        updateSocialPost(postId, { status: "failed", error_message: result.error });
        const copyText = formatCopyText(post.platform, content);
        const imageUrl = absoluteImageUrl(post.image_url);

        let msg =
          `❌ <b>Auto-post failed</b>\n` +
          `${escapeHtml(result.error)}\n\n` +
          `Add the required API keys to server <code>.env</code> (see .env.example).\n\n` +
          `<b>Copy & post manually:</b>\n<pre>${escapeHtml(copyText)}</pre>`;

        const rows = [];
        if (imageUrl) rows.push([urlBtn("🖼 Download Image", imageUrl)]);
        rows.push([btn("🔄 Recreate", `post:recreate:${postId}`), btn("« Menu", "menu:main")]);

        await sendMessage(chatId, msg, { replyMarkup: inlineKeyboard(rows) });
      }
    } catch (err) {
      updateSocialPost(postId, { status: "failed", error_message: err.message });
      await sendMessage(chatId, `❌ Publish error: ${escapeHtml(err.message)}`, {
        replyMarkup: previewKeyboard(postId),
      });
    }
    clearSession(userId);
    return;
  }

  await answerCallbackQuery(callbackQuery.id, "Unknown action");
}

async function handleCommand(text, chatId, userId) {
  const cmd = text.split(/\s+/)[0].toLowerCase().replace(/@\w+$/, "");

  switch (cmd) {
    case "/start":
    case "/menu":
      clearSession(userId);
      await showMainMenu(chatId);
      break;
    case "/help":
      await sendMessage(chatId, helpText(), { replyMarkup: mainMenuKeyboard() });
      break;
    case "/status":
      await showStatus(chatId);
      break;
    case "/blog":
      await generateAndPreview(chatId, userId, "blog", PLATFORM_DEFAULT_TOPIC.blog);
      break;
    case "/linkedin":
      await generateAndPreview(chatId, userId, "linkedin", PLATFORM_DEFAULT_TOPIC.linkedin);
      break;
    case "/instagram":
      await generateAndPreview(chatId, userId, "instagram", PLATFORM_DEFAULT_TOPIC.instagram);
      break;
    case "/facebook":
      await generateAndPreview(chatId, userId, "facebook", PLATFORM_DEFAULT_TOPIC.facebook);
      break;
    case "/x":
      await generateAndPreview(chatId, userId, "x", PLATFORM_DEFAULT_TOPIC.x);
      break;
    default:
      await sendMessage(chatId, "Use /menu to open the control panel.", {
        replyMarkup: mainMenuKeyboard(),
      });
  }
}

async function handleCallback(callbackQuery) {
  const userId = callbackQuery.from?.id;
  const chatId = callbackQuery.message?.chat?.id;
  const data = callbackQuery.data || "";

  if (!isAuthorized(userId)) {
    await answerCallbackQuery(callbackQuery.id, "Unauthorized");
    await rejectUnauthorized(chatId, userId);
    return;
  }

  try {
    if (data === "menu:main") {
      clearSession(userId);
      await answerCallbackQuery(callbackQuery.id);
      await showMainMenu(chatId);
      return;
    }

    // One-click generate: gen:linkedin, gen:instagram, etc.
    if (data.startsWith("gen:")) {
      const platform = data.slice(4);
      if (DEWEBAM_PLATFORMS[platform] || platform === "blog") {
        await answerCallbackQuery(callbackQuery.id, "Generating…");
        const topicKey = PLATFORM_DEFAULT_TOPIC[platform] || "shopify";
        await generateAndPreview(chatId, userId, platform, topicKey);
      }
      return;
    }

    if (data === "action:topics") {
      await answerCallbackQuery(callbackQuery.id);
      await sendMessage(chatId, "<b>Pick platform, then topic:</b>", {
        replyMarkup: platformPickerKeyboard(),
      });
      return;
    }

    if (data.startsWith("pick:")) {
      const platform = data.slice(5);
      await answerCallbackQuery(callbackQuery.id);
      await sendMessage(chatId, `<b>${DEWEBAM_PLATFORMS[platform]?.label || platform}</b> — choose topic:`, {
        replyMarkup: topicKeyboard(platform),
      });
      return;
    }

    if (data.startsWith("topic:")) {
      const [, platform, topicKey] = data.split(":");
      await answerCallbackQuery(callbackQuery.id, "Generating…");

      if (topicKey === "custom") {
        saveSession(userId, { state: "awaiting_custom_topic", platform, topic: "custom" });
        await sendMessage(chatId, "✏️ Send your custom topic:");
        return;
      }

      await generateAndPreview(chatId, userId, platform, topicKey);
      return;
    }

    if (data === "action:status") {
      await answerCallbackQuery(callbackQuery.id);
      await showStatus(chatId);
      return;
    }

    if (data === "action:help") {
      await answerCallbackQuery(callbackQuery.id);
      await sendMessage(chatId, helpText(), { replyMarkup: mainMenuKeyboard() });
      return;
    }

    if (data.startsWith("post:")) {
      const [, action, postId] = data.split(":");
      await handlePostAction(action, postId, chatId, userId, callbackQuery);
      return;
    }

    await answerCallbackQuery(callbackQuery.id, "Unknown action");
  } catch (err) {
    console.error("[dewebam] Callback error:", err.message);
    await answerCallbackQuery(callbackQuery.id, "Error — try /menu");
    await sendMessage(chatId, `⚠️ Error: ${escapeHtml(err.message)}\n\nTry /menu`, {
      replyMarkup: mainMenuKeyboard(),
    });
  }
}

async function handleMessage(message) {
  const userId = message.from?.id;
  const chatId = message.chat?.id;
  const text = message.text?.trim() || "";

  if (!text) return;

  if (!isAuthorized(userId)) {
    await rejectUnauthorized(chatId, userId);
    return;
  }

  if (text.startsWith("/")) {
    await handleCommand(text, chatId, userId);
    return;
  }

  const session = getSession(userId);

  if (session.state === "awaiting_custom_topic") {
    const platform = session.platform || "linkedin";
    await generateAndPreview(chatId, userId, platform, "custom", text);
    return;
  }

  await sendMessage(chatId, "Use /menu to open the control panel.", {
    replyMarkup: mainMenuKeyboard(),
  });
}

export async function handleTelegramUpdate(update) {
  try {
    if (update.callback_query) {
      await handleCallback(update.callback_query);
      return;
    }
    if (update.message) {
      await handleMessage(update.message);
    }
  } catch (err) {
    console.error("[dewebam] Update error:", err.message);
  }
}

let polling = false;
let offset = 0;

export async function startDeWebamBot() {
  if (!isTelegramConfigured()) {
    console.warn("[dewebam] TELEGRAM_BOT_TOKEN not set — bot disabled");
    return;
  }

  if (!adminUserId()) {
    console.warn("[dewebam] TELEGRAM_ADMIN_USER_ID not set — bot disabled");
    return;
  }

  try {
    const me = await getMe();
    const webhookUrl = process.env.TELEGRAM_WEBHOOK_URL?.trim();

    if (webhookUrl) {
      await setWebhook(webhookUrl, process.env.TELEGRAM_WEBHOOK_SECRET?.trim());
      console.log(`[dewebam] Webhook mode: @${me.username} → ${webhookUrl}`);
      return;
    }

    await deleteWebhook();
    console.log(`[dewebam] Polling mode: @${me.username} (dev only — set TELEGRAM_WEBHOOK_URL on server)`);

    if (polling) return;
    polling = true;

    const poll = async () => {
      while (polling) {
        try {
          const updates = await getUpdates(offset > 0 ? offset : undefined, 25);
          for (const update of updates) {
            offset = update.update_id + 1;
            await handleTelegramUpdate(update);
          }
        } catch (err) {
          if (!err.message?.includes("Conflict")) {
            console.error("[dewebam] Polling error:", err.message);
          }
          await new Promise((r) => setTimeout(r, 3000));
        }
      }
    };

    poll();
  } catch (err) {
    console.error("[dewebam] Failed to start:", err.message);
  }
}

export function stopDeWebamBot() {
  polling = false;
}
