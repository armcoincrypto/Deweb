import type { LocaleContentModule } from "@/lib/i18n/content/types";
import { landingPageDevelopment } from "./landing-page-development";
import { shopifyDevelopment } from "./shopify-development";
import { shopifyStoreDesign } from "./shopify-store-design";
import { shopifyCustomApps } from "./shopify-custom-apps";
import { aiChatbotDevelopment } from "./ai-chatbot-development";
import { aiBusinessAutomation } from "./ai-business-automation";
import { webApplicationDevelopment } from "./web-application-development";
import { marketplaceDevelopment } from "./marketplace-development";
import { saasDevelopment } from "./saas-development";
import { telegramBotDevelopment } from "./telegram-bot-development";
import { seoServices } from "./seo";
import { mobileDevelopment } from "./mobile";

export const landings: LocaleContentModule["landings"] = {
  "landing-page-development": landingPageDevelopment,
  "shopify-development": shopifyDevelopment,
  "shopify-store-design": shopifyStoreDesign,
  "shopify-custom-apps": shopifyCustomApps,
  "ai-chatbot-development": aiChatbotDevelopment,
  "ai-business-automation": aiBusinessAutomation,
  "web-application-development": webApplicationDevelopment,
  "marketplace-development": marketplaceDevelopment,
  "saas-development": saasDevelopment,
  "telegram-bot-development": telegramBotDevelopment,
  "seo": seoServices,
  "mobile": mobileDevelopment,
};
