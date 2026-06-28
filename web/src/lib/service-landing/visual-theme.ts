import type { ServiceBannerVisual } from "@/lib/service-banners-data";
import type { ServiceLandingSlug } from "./types";

export type ServiceLandingTheme = {
  visual: ServiceBannerVisual;
  accent: string;
  glow: string;
};

const themes: Record<ServiceLandingSlug, ServiceLandingTheme> = {
  "shopify-development": {
    visual: "shopify",
    accent: "#95BF47",
    glow: "rgba(149,191,71,0.35)",
  },
  "shopify-store-design": {
    visual: "shopify",
    accent: "#95BF47",
    glow: "rgba(149,191,71,0.3)",
  },
  "shopify-custom-apps": {
    visual: "shopify",
    accent: "#00f2ff",
    glow: "rgba(0,242,255,0.3)",
  },
  "ai-chatbot-development": {
    visual: "ai",
    accent: "#00f2ff",
    glow: "rgba(0,242,255,0.4)",
  },
  "ai-business-automation": {
    visual: "ai",
    accent: "#34d399",
    glow: "rgba(52,211,153,0.35)",
  },
  "web-application-development": {
    visual: "software",
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.35)",
  },
  "marketplace-development": {
    visual: "marketplace",
    accent: "#00f2ff",
    glow: "rgba(0,242,255,0.3)",
  },
  "saas-development": {
    visual: "software",
    accent: "#7c3aed",
    glow: "rgba(124,58,237,0.35)",
  },
  "landing-page-development": {
    visual: "uiux",
    accent: "#f472b6",
    glow: "rgba(244,114,182,0.3)",
  },
  "telegram-bot-development": {
    visual: "ai",
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.35)",
  },
  seo: {
    visual: "seo",
    accent: "#10b981",
    glow: "rgba(16,185,129,0.3)",
  },
  mobile: {
    visual: "mobile",
    accent: "#00f2ff",
    glow: "rgba(0,242,255,0.35)",
  },
};

export function getServiceLandingTheme(slug: string): ServiceLandingTheme {
  return themes[slug as ServiceLandingSlug] ?? {
    visual: "software",
    accent: "#00f2ff",
    glow: "rgba(0,242,255,0.35)",
  };
}
