import { serviceCategories, type ServiceCategory } from "@/lib/home-services-data";
import {
  serviceBanners,
  type ServiceBanner,
  type ServiceBannerVisual,
} from "@/lib/service-banners-data";

export type PinnedSceneKey = "ecosystem" | "shopify" | "ai" | "automation" | "web" | "none";

export type PinnedHomeSlide =
  | {
      id: "hero";
      kind: "hero";
      sceneKey: "ecosystem";
      accent: string;
    }
  | {
      id: string;
      kind: "service";
      category: ServiceCategory;
      banner: ServiceBanner;
      visual: ServiceBannerVisual;
      sceneKey: PinnedSceneKey;
      accent: string;
    };

const bannerByHref: Record<string, string> = {
  "/services/shopify-development": "shopify",
  "/services/web-application-development": "custom-software",
  "/services/ai-chatbot-development": "ai-chatbots",
  "/services/ai-business-automation": "ai-chatbots",
  "/services/saas-development": "marketplace",
  "/services/landing-page-development": "uiux",
};

const sceneByHref: Record<string, PinnedSceneKey> = {
  "/services/shopify-development": "shopify",
  "/services/web-application-development": "web",
  "/services/ai-chatbot-development": "ai",
  "/services/ai-business-automation": "automation",
  "/services/saas-development": "web",
  "/services/landing-page-development": "none",
};

const visualByHref: Record<string, ServiceBannerVisual> = {
  "/services/shopify-development": "shopify",
  "/services/web-application-development": "software",
  "/services/ai-chatbot-development": "ai",
  "/services/ai-business-automation": "ai",
  "/services/saas-development": "marketplace",
  "/services/landing-page-development": "uiux",
};

function getBanner(href: string): ServiceBanner {
  const id = bannerByHref[href];
  return serviceBanners.find((b) => b.id === id) ?? serviceBanners[0];
}

export const pinnedHomeSlides: PinnedHomeSlide[] = [
  {
    id: "hero",
    kind: "hero",
    sceneKey: "ecosystem",
    accent: "#00f2ff",
  },
  ...serviceCategories.map((category) => {
    const banner = getBanner(category.href);
    return {
      id: category.title.toLowerCase().replace(/\s+/g, "-"),
      kind: "service" as const,
      category,
      banner,
      visual: visualByHref[category.href] ?? banner.visual,
      sceneKey: sceneByHref[category.href] ?? "none",
      accent: category.accent,
    };
  }),
];
