export function cleanText(value, maxLen = 5000) {
  return String(value || "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function cleanEmail(value) {
  return cleanText(value, 254).toLowerCase();
}

export function cleanPhone(value) {
  return cleanText(value, 40).replace(/[^\d+\-() .@a-zA-Z]/g, "");
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function parsePrice(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}
