import type { CostGuidePage, CostGuideSlug } from "./types";
import { aiAutomationDevelopmentCost } from "./pages/ai-automation-development-cost";
import { aiChatbotDevelopmentCost } from "./pages/ai-chatbot-development-cost";
import { costToBuildMarketplaceWebsite } from "./pages/cost-to-build-marketplace-website";
import { customWebAppDevelopmentCost } from "./pages/custom-web-app-development-cost";
import { dedicatedDevelopmentTeamCost } from "./pages/dedicated-development-team-cost";
import { ecommerceDevelopmentCost } from "./pages/ecommerce-development-cost";
import { hireFullStackDevelopers } from "./pages/hire-full-stack-developers";
import { hireNextjsDevelopers } from "./pages/hire-nextjs-developers";
import { hireReactDevelopers } from "./pages/hire-react-developers";
import { hireShopifyDevelopers } from "./pages/hire-shopify-developers";
import { landingPageCost } from "./pages/landing-page-cost";
import { marketplaceDevelopmentCost } from "./pages/marketplace-development-cost";
import { mobileAppDevelopmentCost } from "./pages/mobile-app-development-cost";
import { mvpDevelopmentCost } from "./pages/mvp-development-cost";
import { saasDevelopmentCost } from "./pages/saas-development-cost";
import { shopifyVsCustomEcommerce } from "./pages/shopify-vs-custom-ecommerce";
import { webflowVsNextjs } from "./pages/webflow-vs-nextjs";
import { COST_GUIDE_SLUGS, getCostGuidePaths } from "./slugs";

const COST_GUIDE_REGISTRY: Record<CostGuideSlug, CostGuidePage> = {
  "cost-to-build-marketplace-website": costToBuildMarketplaceWebsite,
  "shopify-vs-custom-ecommerce": shopifyVsCustomEcommerce,
  "webflow-vs-nextjs": webflowVsNextjs,
  "landing-page-cost": landingPageCost,
  "saas-development-cost": saasDevelopmentCost,
  "mvp-development-cost": mvpDevelopmentCost,
  "custom-web-app-development-cost": customWebAppDevelopmentCost,
  "marketplace-development-cost": marketplaceDevelopmentCost,
  "ai-chatbot-development-cost": aiChatbotDevelopmentCost,
  "hire-nextjs-developers": hireNextjsDevelopers,
  "hire-shopify-developers": hireShopifyDevelopers,
  "hire-react-developers": hireReactDevelopers,
  "hire-full-stack-developers": hireFullStackDevelopers,
  "ecommerce-development-cost": ecommerceDevelopmentCost,
  "mobile-app-development-cost": mobileAppDevelopmentCost,
  "dedicated-development-team-cost": dedicatedDevelopmentTeamCost,
  "ai-automation-development-cost": aiAutomationDevelopmentCost,
};

export function getCostGuide(slug: CostGuideSlug): CostGuidePage {
  return COST_GUIDE_REGISTRY[slug];
}

export function getAllCostGuides(): CostGuidePage[] {
  return COST_GUIDE_SLUGS.map((slug) => COST_GUIDE_REGISTRY[slug]);
}

export function isCostGuideSlug(slug: string): slug is CostGuideSlug {
  return (COST_GUIDE_SLUGS as readonly string[]).includes(slug);
}

export type { CostGuidePage, CostGuideSlug } from "./types";
export { COST_GUIDE_SLUGS, getCostGuidePaths };
