/** All 20 SEO blog article slugs */
export const BLOG_ARTICLE_SLUGS = [
  "shopify-development-cost-2026",
  "shopify-vs-woocommerce",
  "best-shopify-apps",
  "ai-chatbots-for-business",
  "ai-automation-for-ecommerce",
  "how-to-build-a-marketplace-website",
  "custom-web-application-development",
  "saas-development-guide",
  "best-ecommerce-platforms",
  "future-of-ai-in-business",
  "nextjs-vs-wordpress",
  "shopify-plus-vs-standard",
  "how-to-hire-software-developers",
  "mvp-development-cost-guide",
  "headless-commerce-guide",
  "technical-seo-for-ecommerce",
  "telegram-bot-development-guide",
  "marketplace-monetization-strategies",
  "outsourcing-software-development-2026",
  "competitive-bidding-it-projects",
] as const;

export type BlogArticleSlug = (typeof BLOG_ARTICLE_SLUGS)[number];
