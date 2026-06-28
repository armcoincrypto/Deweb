import type { BlogArticleSlug } from "@/lib/blog/article-slugs";
import type { ServiceLandingSlug } from "./types";

/** Existing blog slugs linked from each service landing Related Guides block. */
export const SERVICE_RELATED_GUIDES: Partial<
  Record<ServiceLandingSlug, readonly BlogArticleSlug[]>
> = {
  "telegram-bot-development": ["telegram-bot-development-guide"],
  "ai-business-automation": [
    "ai-automation-for-ecommerce",
    "future-of-ai-in-business",
    "ai-chatbots-for-business",
  ],
  "ai-chatbot-development": [
    "ai-chatbots-for-business",
    "future-of-ai-in-business",
    "telegram-bot-development-guide",
  ],
  "marketplace-development": [
    "how-to-build-a-marketplace-website",
    "marketplace-monetization-strategies",
    "competitive-bidding-it-projects",
  ],
  "web-application-development": [
    "custom-web-application-development",
    "nextjs-vs-wordpress",
    "how-to-hire-software-developers",
    "outsourcing-software-development-2026",
  ],
  "shopify-development": [
    "shopify-development-cost-2026",
    "shopify-vs-woocommerce",
    "best-shopify-apps",
    "shopify-plus-vs-standard",
  ],
  "shopify-store-design": [
    "shopify-development-cost-2026",
    "headless-commerce-guide",
    "technical-seo-for-ecommerce",
  ],
  "shopify-custom-apps": [
    "best-shopify-apps",
    "shopify-development-cost-2026",
    "headless-commerce-guide",
  ],
  "saas-development": ["saas-development-guide", "mvp-development-cost-guide"],
  "landing-page-development": [
    "headless-commerce-guide",
    "technical-seo-for-ecommerce",
    "mvp-development-cost-guide",
    "nextjs-vs-wordpress",
  ],
  seo: [
    "technical-seo-for-ecommerce",
    "nextjs-vs-wordpress",
    "headless-commerce-guide",
    "shopify-development-cost-2026",
    "mvp-development-cost-guide",
  ],
  mobile: [
    "custom-web-application-development",
    "mvp-development-cost-guide",
    "saas-development-guide",
    "how-to-hire-software-developers",
    "outsourcing-software-development-2026",
  ],
};

export function getRelatedGuideSlugs(slug: ServiceLandingSlug): BlogArticleSlug[] {
  return [...(SERVICE_RELATED_GUIDES[slug] ?? [])];
}
