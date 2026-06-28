import type { ServiceLandingSlug } from "@/lib/service-landing/types";
import type { CostGuideSlug } from "./types";

export const SERVICE_COST_GUIDES: Partial<Record<ServiceLandingSlug, readonly CostGuideSlug[]>> = {
  "marketplace-development": ["cost-to-build-marketplace-website", "marketplace-development-cost"],
  "shopify-development": ["shopify-vs-custom-ecommerce", "hire-shopify-developers"],
  "shopify-store-design": ["shopify-vs-custom-ecommerce", "landing-page-cost", "hire-shopify-developers"],
  "shopify-custom-apps": ["shopify-vs-custom-ecommerce", "hire-shopify-developers"],
  "web-application-development": ["webflow-vs-nextjs", "custom-web-app-development-cost", "hire-nextjs-developers"],
  "landing-page-development": ["landing-page-cost", "webflow-vs-nextjs"],
  "saas-development": ["saas-development-cost", "mvp-development-cost"],
  "ai-chatbot-development": ["ai-chatbot-development-cost"],
  "ai-business-automation": ["ai-chatbot-development-cost"],
  mobile: ["mvp-development-cost", "custom-web-app-development-cost"],
};

export function getServiceCostGuideSlugs(slug: ServiceLandingSlug): CostGuideSlug[] {
  return [...(SERVICE_COST_GUIDES[slug] ?? [])];
}
