const BOT_TOKEN = () => process.env.TELEGRAM_BOT_TOKEN?.trim() || "";

function apiUrl(method) {
  const token = BOT_TOKEN();
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  return `https://api.telegram.org/bot${token}/${method}`;
}

async function callTelegram(method, body = {}) {
  const res = await fetch(apiUrl(method), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!data.ok) {
    const desc = data.description || res.statusText || "Telegram API error";
    throw new Error(desc);
  }
  return data.result;
}

export function isTelegramConfigured() {
  return !!BOT_TOKEN();
}

export async function getMe() {
  return callTelegram("getMe");
}

export async function deleteWebhook() {
  return callTelegram("deleteWebhook", { drop_pending_updates: false });
}

export async function getUpdates(offset, timeout = 30) {
  return callTelegram("getUpdates", {
    offset,
    timeout,
    allowed_updates: ["message", "callback_query"],
  });
}

export async function sendMessage(chatId, text, extra = {}) {
  return callTelegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: extra.parseMode || "HTML",
    disable_web_page_preview: extra.disablePreview ?? true,
    reply_markup: extra.replyMarkup || undefined,
  });
}

export async function editMessageText(chatId, messageId, text, extra = {}) {
  return callTelegram("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: extra.parseMode || "HTML",
    disable_web_page_preview: extra.disablePreview ?? true,
    reply_markup: extra.replyMarkup || undefined,
  });
}

export async function answerCallbackQuery(callbackQueryId, text) {
  return callTelegram("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text: text?.slice(0, 200) || undefined,
    show_alert: !!text && text.length > 60,
  });
}

export async function sendPhoto(chatId, photoUrl, extra = {}) {
  return callTelegram("sendPhoto", {
    chat_id: chatId,
    photo: photoUrl,
    caption: extra.caption?.slice(0, 1024) || undefined,
    parse_mode: extra.parseMode || "HTML",
    reply_markup: extra.replyMarkup || undefined,
  });
}

export function inlineKeyboard(rows) {
  return { inline_keyboard: rows };
}

export function btn(text, callbackData) {
  return { text, callback_data: callbackData.slice(0, 64) };
}

export function urlBtn(text, url) {
  return { text, url };
}
