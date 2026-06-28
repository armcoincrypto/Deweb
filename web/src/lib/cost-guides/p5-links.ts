import type { CostGuideSlug } from "./types";

export const P5_COST_GUIDE_LINKS: readonly {
  slug: CostGuideSlug;
  label: string;
}[] = [
  { slug: "cost-to-build-marketplace-website", label: "Cost to build a marketplace website (2026)" },
  { slug: "shopify-vs-custom-ecommerce", label: "Shopify vs custom ecommerce development" },
  { slug: "webflow-vs-nextjs", label: "Webflow vs Next.js for business websites" },
  { slug: "landing-page-cost", label: "Landing page design and development cost" },
  { slug: "saas-development-cost", label: "SaaS development cost guide" },
];

export const P6_COMMERCIAL_LINKS: readonly { slug: CostGuideSlug; label: string; }[] = [
  { slug: "mvp-development-cost", label: "MVP development cost guide" },
  { slug: "custom-web-app-development-cost", label: "Custom web app development cost" },
  { slug: "marketplace-development-cost", label: "Marketplace development cost" },
  { slug: "ai-chatbot-development-cost", label: "AI chatbot development cost" },
  { slug: "hire-nextjs-developers", label: "Hire Next.js developers" },
  { slug: "hire-shopify-developers", label: "Hire Shopify developers" },
];

export const COMMERCIAL_AUTHORITY_LINKS = [...P5_COST_GUIDE_LINKS, ...P6_COMMERCIAL_LINKS] as const;
