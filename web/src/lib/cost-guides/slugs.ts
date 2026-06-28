import type { CostGuideSlug } from "./types";

export const COST_GUIDE_SLUGS: readonly CostGuideSlug[] = [
  "cost-to-build-marketplace-website",
  "shopify-vs-custom-ecommerce",
  "webflow-vs-nextjs",
  "landing-page-cost",
  "saas-development-cost",
  "mvp-development-cost",
  "custom-web-app-development-cost",
  "marketplace-development-cost",
  "ai-chatbot-development-cost",
  "hire-nextjs-developers",
  "hire-shopify-developers",
  "hire-react-developers",
  "hire-full-stack-developers",
  "ecommerce-development-cost",
  "mobile-app-development-cost",
  "dedicated-development-team-cost",
  "ai-automation-development-cost",
] as const;

export function getCostGuidePaths(): string[] {
  return COST_GUIDE_SLUGS.map((slug) => `/${slug}`);
}
