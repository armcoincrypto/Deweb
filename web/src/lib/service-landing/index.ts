import type { ServiceLandingPage, ServiceLandingSlug } from "./types";
import { SERVICE_LANDING_SLUGS } from "./types";
import { shopifyDevelopment } from "./pages/shopify-development";
import { shopifyStoreDesign } from "./pages/shopify-store-design";
import { shopifyCustomApps } from "./pages/shopify-custom-apps";
import { aiChatbotDevelopment } from "./pages/ai-chatbot-development";
import { aiBusinessAutomation } from "./pages/ai-business-automation";
import { webApplicationDevelopment } from "./pages/web-application-development";
import { marketplaceDevelopment } from "./pages/marketplace-development";
import { saasDevelopment } from "./pages/saas-development";
import { landingPageDevelopment } from "./pages/landing-page-development";
import { telegramBotDevelopment } from "./pages/telegram-bot-development";

const pages: Record<ServiceLandingSlug, ServiceLandingPage> = {
  "shopify-development": shopifyDevelopment,
  "shopify-store-design": shopifyStoreDesign,
  "shopify-custom-apps": shopifyCustomApps,
  "ai-chatbot-development": aiChatbotDevelopment,
  "ai-business-automation": aiBusinessAutomation,
  "web-application-development": webApplicationDevelopment,
  "marketplace-development": marketplaceDevelopment,
  "saas-development": saasDevelopment,
  "landing-page-development": landingPageDevelopment,
  "telegram-bot-development": telegramBotDevelopment,
};

export { SERVICE_LANDING_SLUGS };
export type { ServiceLandingPage, ServiceLandingSlug };

export function isServiceLandingSlug(slug: string): slug is ServiceLandingSlug {
  return (SERVICE_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getServiceLandingPage(slug: string): ServiceLandingPage | undefined {
  return pages[slug as ServiceLandingSlug];
}

export function getServiceLandingPaths(): string[] {
  return SERVICE_LANDING_SLUGS.map((slug) => pages[slug].path);
}

export { getRelatedGuideSlugs, SERVICE_RELATED_GUIDES } from "./related-guides";
export { resolveRelatedGuides } from "./resolve-related-guides";
export type { ResolvedRelatedGuide } from "./resolve-related-guides";

export function landingWordCount(page: ServiceLandingPage): number {
  const text = [
    page.subtitle,
    ...page.intro,
    ...page.sections.flatMap((s) => [s.title, ...s.paragraphs]),
    ...page.benefits.map((b) => `${b.title} ${b.description}`),
    ...page.process.map((p) => `${p.title} ${p.description}`),
    ...page.faqs.map((f) => `${f.question} ${f.answer}`),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
