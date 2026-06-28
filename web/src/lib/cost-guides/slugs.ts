import type { CostGuideSlug } from "./types";

export const COST_GUIDE_SLUGS: readonly CostGuideSlug[] = [
  "cost-to-build-marketplace-website",
  "shopify-vs-custom-ecommerce",
  "webflow-vs-nextjs",
  "landing-page-cost",
  "saas-development-cost",
] as const;

export function getCostGuidePaths(): string[] {
  return COST_GUIDE_SLUGS.map((slug) => `/${slug}`);
}
