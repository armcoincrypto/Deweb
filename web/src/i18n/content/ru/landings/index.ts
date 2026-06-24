import type { LandingTexts } from "@/lib/i18n/content/types";
import type { ServiceLandingSlug } from "@/lib/service-landing/types";
import { aiBusinessAutomation } from "./ai-business-automation";
import { aiChatbotDevelopment } from "./ai-chatbot-development";
import { landingPageDevelopment } from "./landing-page-development";
import { marketplaceDevelopment } from "./marketplace-development";
import { saasDevelopment } from "./saas-development";
import { shopifyCustomApps } from "./shopify-custom-apps";
import { shopifyDevelopment } from "./shopify-development";
import { shopifyStoreDesign } from "./shopify-store-design";
import { webApplicationDevelopment } from "./web-application-development";

export const landings: Partial<Record<ServiceLandingSlug, LandingTexts>> = {
  "shopify-development": shopifyDevelopment,
  "shopify-store-design": shopifyStoreDesign,
  "shopify-custom-apps": shopifyCustomApps,
  "ai-chatbot-development": aiChatbotDevelopment,
  "ai-business-automation": aiBusinessAutomation,
  "web-application-development": webApplicationDevelopment,
  "marketplace-development": marketplaceDevelopment,
  "saas-development": saasDevelopment,
  "landing-page-development": landingPageDevelopment,
};
