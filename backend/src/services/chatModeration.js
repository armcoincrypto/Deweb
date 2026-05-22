/** Remove contact details from deal chat messages (keep conversation on-platform). */

const PATTERNS = [
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  /\b\+?\d[\d\s().-]{8,}\d\b/g,
  /\b(?:telegram|tg|whatsapp|wa\.me|discord|signal|viber|skype|zoom)\s*[:@]?\s*\S+/gi,
  /\b(?:t\.me|wa\.me|discord\.gg)\/\S+/gi,
  /@\w{3,}/g
];

export function sanitizeChatMessage(body) {
  let text = String(body || "").trim();
  if (!text) return { body: "", removed: false };

  let removed = false;
  for (const re of PATTERNS) {
    const next = text.replace(re, "[removed — keep contact on DEWEB only]");
    if (next !== text) removed = true;
    text = next;
  }
  return { body: text.trim(), removed };
}
