import {
  sendMessage,
  editMessageText,
  answerCallbackQuery,
  sendPhoto,
  inlineKeyboard,
  btn,
  urlBtn,
  getUpdates,
  deleteWebhook,
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
import { generateSocialImage, absoluteImageUrl } from "./dewebamImage.js";

const BOT_NAME = "DeWebam";

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
    [btn("📝 DeWeb Blog", "menu:blog"), btn("💼 LinkedIn", "menu:linkedin")],
    [btn("📸 Instagram", "menu:instagram"), btn("📘 Facebook", "menu:facebook")],
    [btn("🐦 X", "menu:x")],
    [btn("✨ Generate Content", "action:generate"), btn("📋 Pending Posts", "action:pending")],
    [btn("ℹ️ Help", "action:help"), btn("📊 Status", "action:status")],
  ]);
}

function topicKeyboard(platform) {
  const rows = [
    [btn("🛒 Shopify", `topic:${platform}:shopify`), btn("🤖 AI Chatbot", `topic:${platform}:ai_chatbot`)],
    [btn("🌐 Web Dev", `topic:${platform}:web_development`), btn("⚡ Automation", `topic:${platform}:automation`)],
    [btn("☁️ SaaS", `topic:${platform}:saas`), btn("🎯 Landing Page", `topic:${platform}:landing_page`)],
    [btn("✏️ Custom Topic", `topic:${platform}:custom`)],
    [btn("« Back to Menu", "menu:main")],
  ];
  return inlineKeyboard(rows);
}

function previewKeyboard(postId) {
  return inlineKeyboard([
    [btn("✅ Approve", `post:approve:${postId}`), btn("✏️ Edit", `post:edit:${postId}`)],
    [btn("🔄 Regenerate", `post:regen:${postId}`), btn("📤 Publish", `post:publish:${postId}`)],
    [btn("💾 Save Draft", `post:draft:${postId}`), btn("❌ Cancel", `post:cancel:${postId}`)],
    [btn("📋 Copy Post", `post:copy:${postId}`), btn("🖼 Image Link", `post:image:${postId}`)],
    [btn("« Menu", "menu:main")],
  ]);
}

function helpText() {
  return (
    `<b>${BOT_NAME} — DeWeb Marketing Control Panel</b>\n\n` +
    `<b>Commands:</b>\n` +
    `/start /menu — Main menu\n` +
    `/blog — DeWeb Blog article\n` +
    `/social — Social platforms\n` +
    `/linkedin /instagram /facebook /x — Quick platform\n` +
    `/status — Pending counts\n` +
    `/help — This message\n\n` +
    `<b>Workflow:</b>\n` +
    `1️⃣ Choose platform\n` +
    `2️⃣ Pick topic\n` +
    `3️⃣ AI generates content + image\n` +
    `4️⃣ Preview → Approve / Edit / Publish\n\n` +
    `⚠️ Nothing publishes automatically without your approval.`
  );
}

async function rejectUnauthorized(chatId, userId) {
  await sendMessage(
    chatId,
    "⛔ Unauthorized. This bot is restricted to the DeWeb admin account only."
  );
  console.warn("[dewebam] Unauthorized access attempt from user:", userId);
}

async function showMainMenu(chatId, editMessage) {
  const text =
    `<b>👋 Welcome to ${BOT_NAME}</b>\n\n` +
    `DeWeb marketing control panel — generate, review, and approve content for LinkedIn, social media, and the DeWeb blog.\n\n` +
    `<b>LinkedIn is prioritized</b> — professional B2B content for founders and business owners.\n\n` +
    `Choose an option below:`;

  if (editMessage) {
    await editMessageText(chatId, editMessage.messageId, text, {
      replyMarkup: mainMenuKeyboard(),
    });
  } else {
    await sendMessage(chatId, text, { replyMarkup: mainMenuKeyboard() });
  }
}

async function showTopicMenu(chatId, platform, editMessage) {
  const label = DEWEBAM_PLATFORMS[platform]?.label || platform;
  const text = `<b>${label}</b>\n\nChoose a topic for your content:`;
  const kb = topicKeyboard(platform);

  if (editMessage) {
    await editMessageText(chatId, editMessage.messageId, text, { replyMarkup: kb });
  } else {
    await sendMessage(chatId, text, { replyMarkup: kb });
  }
}

async function generateAndPreview(chatId, userId, platform, topicKey, customTopic) {
  const waitMsg = await sendMessage(
    chatId,
    `⏳ Generating ${DEWEBAM_PLATFORMS[platform]?.label || platform} content…\nThis may take 30–90 seconds.`
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
    await editMessageText(chatId, waitMsg.message_id, preview, {
      replyMarkup: previewKeyboard(post.id),
    });

    if (imageUrl) {
      const abs = absoluteImageUrl(imageUrl);
      if (abs) {
        await sendPhoto(chatId, abs, {
          caption: `🖼 ${DEWEBAM_PLATFORMS[platform]?.label || platform} banner preview`,
          replyMarkup: previewKeyboard(post.id),
        });
      }
    }

    if (platform === "blog" && blogPostId) {
      await sendMessage(
        chatId,
        `✅ Blog article saved as <b>pending review</b> in DeWeb CMS.\n` +
          `Review: ${siteUrl()}/en/admin/blog/pending`,
        { replyMarkup: previewKeyboard(post.id) }
      );
    }
  } catch (err) {
    console.error("[dewebam] Generation failed:", err.message);
    await editMessageText(
      chatId,
      waitMsg.message_id,
      `❌ Generation failed: ${escapeHtml(err.message)}\n\nTry again or pick another topic.`,
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

async function showPending(chatId) {
  const posts = listSocialPosts({ status: "pending", limit: 10 });
  const drafts = listSocialPosts({ status: "draft", limit: 5 });

  if (!posts.length && !drafts.length) {
    await sendMessage(chatId, "📋 No pending posts or drafts.", {
      replyMarkup: mainMenuKeyboard(),
    });
    return;
  }

  let text = "<b>📋 Pending & Draft Posts</b>\n\n";
  for (const p of [...posts, ...drafts].slice(0, 10)) {
    const plat = DEWEBAM_PLATFORMS[p.platform]?.label || p.platform;
    text += `• <b>${plat}</b> — ${escapeHtml(p.title || p.topic)} [${p.status}]\n`;
  }
  text += "\nGenerate new content or open a post from your last preview.";

  await sendMessage(chatId, text, { replyMarkup: mainMenuKeyboard() });
}

async function showStatus(chatId) {
  const counts = countByStatus();
  const text =
    `<b>📊 ${BOT_NAME} Status</b>\n\n` +
    `Draft: ${counts.draft || 0}\n` +
    `Pending: ${counts.pending || 0}\n` +
    `Approved: ${counts.approved || 0}\n` +
    `Published: ${counts.published || 0}\n` +
    `Failed: ${counts.failed || 0}\n\n` +
    `Bot: ✅ Active\n` +
    `Site: ${siteUrl()}`;

  await sendMessage(chatId, text, { replyMarkup: mainMenuKeyboard() });
}

async function handlePostAction(action, postId, chatId, userId, callbackQuery) {
  const post = getSocialPost(postId);
  if (!post) {
    await answerCallbackQuery(callbackQuery.id, "Post not found");
    return;
  }

  const content = post.contentParsed;

  switch (action) {
    case "approve": {
      updateSocialPost(postId, { status: "approved" });
      await answerCallbackQuery(callbackQuery.id, "✅ Approved");
      await sendMessage(chatId, `✅ Post approved.\n\nPress <b>Publish</b> when ready, or copy the content manually.`, {
        replyMarkup: previewKeyboard(postId),
      });
      break;
    }
    case "draft": {
      updateSocialPost(postId, { status: "draft" });
      await answerCallbackQuery(callbackQuery.id, "💾 Saved as draft");
      await sendMessage(chatId, "💾 Saved as draft.", { replyMarkup: mainMenuKeyboard() });
      clearSession(userId);
      break;
    }
    case "cancel": {
      updateSocialPost(postId, { status: "draft" });
      await answerCallbackQuery(callbackQuery.id, "Cancelled");
      clearSession(userId);
      await sendMessage(chatId, "❌ Cancelled. Content saved as draft.", {
        replyMarkup: mainMenuKeyboard(),
      });
      break;
    }
    case "edit": {
      saveSession(userId, { state: "awaiting_edit", current_post_id: postId });
      await answerCallbackQuery(callbackQuery.id, "Send edited text");
      await sendMessage(
        chatId,
        "✏️ Send your edited post text. It will replace the current post body.\n\nSend /menu to cancel."
      );
      break;
    }
    case "regen": {
      await answerCallbackQuery(callbackQuery.id, "Regenerating…");
      clearSession(userId);
      const topicKey = DEWEBAM_TOPICS[post.topic] ? post.topic : "custom";
      const customTopic = topicKey === "custom" ? post.topic : undefined;
      await generateAndPreview(chatId, userId, post.platform, topicKey, customTopic);
      break;
    }
    case "copy": {
      const copyText = formatCopyText(post.platform, content);
      await answerCallbackQuery(callbackQuery.id, "Copied below");
      await sendMessage(chatId, `<b>📋 Copy this post:</b>\n\n<pre>${escapeHtml(copyText)}</pre>`, {
        parseMode: "HTML",
        replyMarkup: previewKeyboard(postId),
      });
      break;
    }
    case "image": {
      const url = absoluteImageUrl(post.image_url);
      await answerCallbackQuery(callbackQuery.id, url ? "Image link sent" : "No image");
      if (url) {
        await sendMessage(chatId, `🖼 <b>Download image:</b>\n${url}`, {
          replyMarkup: inlineKeyboard([[urlBtn("⬇️ Open Image", url)], [btn("« Back", `post:back:${postId}`)]]),
        });
      } else {
        await sendMessage(chatId, "No image generated for this post.");
      }
      break;
    }
    case "publish": {
      if (post.status !== "approved" && post.status !== "pending") {
        await answerCallbackQuery(callbackQuery.id, "Approve first");
        await sendMessage(chatId, "⚠️ Please press <b>Approve</b> before publishing.", {
          replyMarkup: previewKeyboard(postId),
        });
        break;
      }

      // Direct API publishing not connected — manual copy + download flow
      const copyText = formatCopyText(post.platform, content);
      const imageUrl = absoluteImageUrl(post.image_url);

      updateSocialPost(postId, {
        status: "published",
        published_at: new Date().toISOString(),
      });

      await answerCallbackQuery(callbackQuery.id, "Marked published");

      let msg =
        `<b>📤 Published (manual posting)</b>\n\n` +
        `Direct API posting is not connected yet. Copy the content below and post manually:\n\n` +
        `<pre>${escapeHtml(copyText)}</pre>`;

      if (post.platform === "blog" && post.blog_post_id) {
        msg +=
          `\n\n📝 Blog article is in DeWeb CMS as <b>pending review</b>.\n` +
          `Approve in admin: ${siteUrl()}/en/admin/blog/pending`;
      }

      const rows = [[btn("📋 Copy Post", `post:copy:${postId}`)]];
      if (imageUrl) rows.push([urlBtn("🖼 Download Image", imageUrl)]);
      rows.push([btn("« Menu", "menu:main")]);

      await sendMessage(chatId, msg, { replyMarkup: inlineKeyboard(rows) });
      clearSession(userId);
      break;
    }
    case "back": {
      await answerCallbackQuery(callbackQuery.id);
      await sendMessage(chatId, formatPostPreview(post.platform, content, post.image_url), {
        replyMarkup: previewKeyboard(postId),
      });
      break;
    }
    default:
      await answerCallbackQuery(callbackQuery.id, "Unknown action");
  }
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
      saveSession(userId, { state: "idle", platform: "blog" });
      await showTopicMenu(chatId, "blog");
      break;
    case "/social":
      await sendMessage(chatId, "<b>Choose a social platform:</b>", {
        replyMarkup: inlineKeyboard([
          [btn("💼 LinkedIn", "menu:linkedin"), btn("📸 Instagram", "menu:instagram")],
          [btn("📘 Facebook", "menu:facebook"), btn("🐦 X", "menu:x")],
          [btn("« Menu", "menu:main")],
        ]),
      });
      break;
    case "/linkedin":
      await showTopicMenu(chatId, "linkedin");
      break;
    case "/instagram":
      await showTopicMenu(chatId, "instagram");
      break;
    case "/facebook":
      await showTopicMenu(chatId, "facebook");
      break;
    case "/x":
      await showTopicMenu(chatId, "x");
      break;
    default:
      await sendMessage(chatId, "Unknown command. Use /menu or /help.", {
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
      await showMainMenu(chatId, callbackQuery.message);
      return;
    }

    if (data.startsWith("menu:")) {
      const platform = data.slice(5);
      if (platform === "blog" || DEWEBAM_PLATFORMS[platform]) {
        saveSession(userId, { state: "idle", platform });
        await answerCallbackQuery(callbackQuery.id);
        await showTopicMenu(chatId, platform, callbackQuery.message);
      }
      return;
    }

    if (data.startsWith("topic:")) {
      const [, platform, topicKey] = data.split(":");
      await answerCallbackQuery(callbackQuery.id);

      if (topicKey === "custom") {
        saveSession(userId, { state: "awaiting_custom_topic", platform, topic: "custom" });
        await sendMessage(chatId, "✏️ Send your custom topic (one message):");
        return;
      }

      saveSession(userId, { state: "generating", platform, topic: topicKey });
      await generateAndPreview(chatId, userId, platform, topicKey);
      return;
    }

    if (data === "action:generate") {
      await answerCallbackQuery(callbackQuery.id);
      await sendMessage(chatId, "<b>Choose platform to generate content:</b>", {
        replyMarkup: inlineKeyboard([
          [btn("💼 LinkedIn", "menu:linkedin"), btn("📸 Instagram", "menu:instagram")],
          [btn("📘 Facebook", "menu:facebook"), btn("🐦 X", "menu:x")],
          [btn("📝 DeWeb Blog", "menu:blog")],
          [btn("« Menu", "menu:main")],
        ]),
      });
      return;
    }

    if (data === "action:pending") {
      await answerCallbackQuery(callbackQuery.id);
      await showPending(chatId);
      return;
    }

    if (data === "action:help") {
      await answerCallbackQuery(callbackQuery.id);
      await sendMessage(chatId, helpText(), { replyMarkup: mainMenuKeyboard() });
      return;
    }

    if (data === "action:status") {
      await answerCallbackQuery(callbackQuery.id);
      await showStatus(chatId);
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
    await answerCallbackQuery(callbackQuery.id, "Error — try again");
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
    saveSession(userId, { state: "generating", topic: "custom", session_data: { customTopic: text } });
    await generateAndPreview(chatId, userId, platform, "custom", text);
    return;
  }

  if (session.state === "awaiting_edit" && session.current_post_id) {
    const post = getSocialPost(session.current_post_id);
    if (!post) {
      await sendMessage(chatId, "Post not found.", { replyMarkup: mainMenuKeyboard() });
      clearSession(userId);
      return;
    }
    const content = { ...post.contentParsed, postText: text, caption: text };
    updateSocialPost(session.current_post_id, { content, status: "pending" });
    saveSession(userId, { state: "preview" });
    await sendMessage(chatId, "✅ Post updated.\n\n" + formatPostPreview(post.platform, content, post.image_url), {
      replyMarkup: previewKeyboard(session.current_post_id),
    });
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
    console.error("[dewebam] Update handler error:", err.message);
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
    await deleteWebhook();
    const me = await getMe();
    console.log(`[dewebam] Bot started: @${me.username} (${BOT_NAME})`);
  } catch (err) {
    console.error("[dewebam] Failed to start bot:", err.message);
    return;
  }

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
        console.error("[dewebam] Polling error:", err.message);
        await new Promise((r) => setTimeout(r, 5000));
      }
    }
  };

  poll();
}

export function stopDeWebamBot() {
  polling = false;
}
