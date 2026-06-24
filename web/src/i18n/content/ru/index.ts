import type { LocaleContentModule } from "@/lib/i18n/content/types";
import { legal } from "./legal";
import { homeServices } from "./home-services";
import { banners } from "./banners";
import { about } from "./about";
import { services } from "./services";
import { shopifyDevelopment } from "./landings/shopify-development";
import { shopifyStoreDesign } from "./landings/shopify-store-design";
import { shopifyCustomApps } from "./landings/shopify-custom-apps";
import { aiChatbotDevelopment } from "./landings/ai-chatbot-development";
import { aiBusinessAutomation } from "./landings/ai-business-automation";
import { webApplicationDevelopment } from "./landings/web-application-development";
import { marketplaceDevelopment } from "./landings/marketplace-development";
import { saasDevelopment } from "./landings/saas-development";
import { landingPageDevelopment } from "./landings/landing-page-development";

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
