import type { LocaleContentModule } from "@/lib/i18n/content/types";
import { legal } from "./legal";
import { homeServices } from "./home-services";
import { banners } from "./banners";
import { about } from "./about";
import { services } from "./services";
import { aiBusinessAutomation } from "./landings/ai-business-automation";
import { aiChatbotDevelopment } from "./landings/ai-chatbot-development";
import { landingPageDevelopment } from "./landings/landing-page-development";
import { marketplaceDevelopment } from "./landings/marketplace-development";
import { saasDevelopment } from "./landings/saas-development";
import { shopifyCustomApps } from "./landings/shopify-custom-apps";
import { shopifyDevelopment } from "./landings/shopify-development";
import { shopifyStoreDesign } from "./landings/shopify-store-design";
import { webApplicationDevelopment } from "./landings/web-application-development";

const content: LocaleContentModule = {
  legal,
  homeServices,
  banners,
  services,
  about,
  landings: {
    "shopify-development": shopifyDevelopment,
    "shopify-store-design": shopifyStoreDesign,
    "shopify-custom-apps": shopifyCustomApps,
    "ai-chatbot-development": aiChatbotDevelopment,
    "ai-business-automation": aiBusinessAutomation,
    "web-application-development": webApplicationDevelopment,
    "marketplace-development": marketplaceDevelopment,
    "saas-development": saasDevelopment,
    "landing-page-development": landingPageDevelopment,
  },
};

export default content;
