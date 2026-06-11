const VISITOR_KEY = "deweb_visitor_id";
const LAST_BLOG_SLUG_KEY = "deweb_last_blog_slug";
const UTM_KEY = "deweb_utm";

const API_BASE =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL ||
      (window.location.hostname === "localhost"
        ? "http://localhost:3000/api"
        : "/api")
    : "";

export type BlogAttributionPayload = {
  visitorId: string;
  lastBlogSlug?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  landingPage?: string;
};

function safeStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getVisitorId(): string {
  const storage = safeStorage();
  if (!storage) return "";
  let id = storage.getItem(VISITOR_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `v-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    storage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function setLastBlogSlug(slug: string) {
  const storage = safeStorage();
  if (!storage || !slug) return;
  storage.setItem(LAST_BLOG_SLUG_KEY, slug);
}

function captureUtmFromUrl() {
  const storage = safeStorage();
  if (!storage || typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm = {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  };
  if (utm.utmSource || utm.utmMedium || utm.utmCampaign) {
    storage.setItem(UTM_KEY, JSON.stringify(utm));
  }
}

function getStoredUtm(): Pick<
  BlogAttributionPayload,
  "utmSource" | "utmMedium" | "utmCampaign"
> {
  const storage = safeStorage();
  if (!storage) return {};
  try {
    const raw = storage.getItem(UTM_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Pick<
      BlogAttributionPayload,
      "utmSource" | "utmMedium" | "utmCampaign"
    >;
  } catch {
    return {};
  }
}

export function getBlogAttribution(): BlogAttributionPayload {
  if (typeof window !== "undefined") captureUtmFromUrl();
  const storage = safeStorage();
  return {
    visitorId: getVisitorId(),
    lastBlogSlug: storage?.getItem(LAST_BLOG_SLUG_KEY) || undefined,
    ...getStoredUtm(),
    referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    landingPage: typeof window !== "undefined" ? window.location.pathname : undefined,
  };
}

function trackPost(path: string, body: Record<string, unknown>) {
  if (!API_BASE) return;
  fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

export function trackBlogView(slug: string, locale?: string) {
  const visitorId = getVisitorId();
  if (!visitorId || !slug) return;
  setLastBlogSlug(slug);
  trackPost("/blog/track-view", {
    slug,
    visitorId,
    locale,
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    referrer: typeof document !== "undefined" ? document.referrer : undefined,
  });
}

export function trackBlogEvent(
  slug: string,
  eventType: string,
  eventData?: Record<string, unknown>
) {
  const visitorId = getVisitorId();
  if (!visitorId || !slug) return;
  trackPost("/blog/track-event", {
    slug,
    visitorId,
    eventType,
    eventData: eventData || {},
  });
}
