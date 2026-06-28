import type { ServiceLandingSlug } from "@/lib/service-landing/types";
import type { CostGuideSlug } from "./types";

/** P5 cost/comparison guides linked from relevant service landings. */
export const SERVICE_COST_GUIDES: Partial<
  Record<ServiceLandingSlug, readonly CostGuideSlug[]>
> = {
  "marketplace-development": ["cost-to-build-marketplace-website"],
  "shopify-development": ["shopify-vs-custom-ecommerce"],
  "shopify-store-design": ["shopify-vs-custom-ecommerce", "landing-page-cost"],
  "web-application-development": ["webflow-vs-nextjs"],
  "landing-page-development": ["landing-page-cost", "webflow-vs-nextjs"],
  "saas-development": ["saas-development-cost"],
};

export function getServiceCostGuideSlugs(slug: ServiceLandingSlug): CostGuideSlug[] {
  return [...(SERVICE_COST_GUIDES[slug] ?? [])];
}
