import { getVisitorId } from "@/lib/blog/tracking";

const API_BASE =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL ||
      (window.location.hostname === "localhost"
        ? "http://localhost:3000/api"
        : "/api")
    : "";

export type CtaEventType = "cta_click" | "contact_click";

export type CtaTrackPayload = {
  placement: string;
  label: string;
  href: string;
  locale?: string;
};

function trackHomeEvent(eventType: CtaEventType, data: CtaTrackPayload) {
  const visitorId = getVisitorId();
  if (!visitorId || !API_BASE) return;

  fetch(`${API_BASE}/blog/track-event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug: "homepage",
      visitorId,
      eventType,
      eventData: {
        ...data,
        path: typeof window !== "undefined" ? window.location.pathname : undefined,
      },
    }),
    keepalive: true,
  }).catch(() => {});
}

/** Track hero and homepage CTA clicks for conversion analysis. */
export function trackHomeCta(
  eventType: CtaEventType,
  data: CtaTrackPayload
) {
  trackHomeEvent(eventType, data);
}
