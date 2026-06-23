const VALID_LOCALES = new Set(["en", "es", "ru", "am"]);

/** Public site URL for links in emails — never use CORS_ORIGIN here. */
export function getFrontendBaseUrl() {
  const raw =
    process.env.FRONTEND_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.PUBLIC_WEB_URL?.trim() ||
    "https://dewebam.com";

  return raw.replace(/\/$/, "");
}

export function normalizeLocale(locale) {
  const value = String(locale || "en")
    .toLowerCase()
    .split("-")[0];
  return VALID_LOCALES.has(value) ? value : "en";
}

export function localeFromRequest(req) {
  if (req.body?.locale) return normalizeLocale(req.body.locale);
  const accept = String(req.headers["accept-language"] || "");
  const first = accept.split(",")[0]?.trim().split("-")[0];
  return normalizeLocale(first);
}

/** Build https://dewebam.com/{locale}/account/...?token=... */
export function buildAccountAuthUrl(accountPath, { locale = "en", token } = {}) {
  const loc = normalizeLocale(locale);
  const base = getFrontendBaseUrl();
  const path = accountPath.startsWith("/") ? accountPath : `/${accountPath}`;
  const params = new URLSearchParams();
  if (token) params.set("token", token);
  const qs = params.toString();
  return `${base}/${loc}${path}${qs ? `?${qs}` : ""}`;
}

/** Log link host + path only — never log query/token. */
export function logAuthEmailLink(kind, url) {
  try {
    const u = new URL(url);
    console.log(`[auth-email] ${kind}`, { host: u.host, path: u.pathname });
  } catch {
    console.log(`[auth-email] ${kind}`, { host: "unknown", path: "invalid-url" });
  }
}
