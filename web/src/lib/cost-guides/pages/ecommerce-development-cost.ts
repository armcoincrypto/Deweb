import type { CostGuidePage } from "../types";

export const ecommerceDevelopmentCost: CostGuidePage = {
  slug: "ecommerce-development-cost",
  path: "/ecommerce-development-cost",
  seoKey: "ecommerce-development-cost",
  kicker: "Ecommerce cost guide · 2026",
  h1: "Ecommerce development cost guide",
  breadcrumbCurrent: "Ecommerce development cost",
  intro: [
    "Ecommerce projects range from Shopify theme launches to custom storefronts and multi-vendor marketplaces. Budget depends on catalog complexity, checkout rules, integrations, and whether you use a platform or custom architecture.",
    "The ranges below are typical planning estimates for ecommerce builds in 2026. They are not fixed prices. DEWEB recommends scoped discovery before any commitment.",
  ],
  costRanges: [
    { label: "Platform launch (Shopify standard)", range: "$5,000 – $25,000", note: "Theme setup, essential apps, basic customization — catalog dependent." },
    { label: "Custom storefront / headless", range: "$35,000 – $120,000", note: "Branded UX, performance tuning, CMS or headless front." },
    { label: "Custom ecommerce platform", range: "$80,000 – $250,000+", note: "Complex pricing, B2B portals, deep ERP integrations." },
    { label: "Ongoing ecommerce retainer", range: "$2,000 – $12,000 / month", note: "CRO, apps, seasonal campaigns, and maintenance — scope varies." },
  ],
  sections: [
    { title: "What affects ecommerce pricing", paragraphs: ["Ecommerce estimates track catalog and operations complexity:"], list: [
      "SKU count, variants, bundles, subscriptions, and B2B pricing",
      "Checkout customization, taxes, and regional compliance",
      "Integrations — ERP, 3PL, CRM, email, analytics",
      "Migration from another platform and redirect strategy",
      "Design, content production, and CRO scope",
      "Marketplace or multi-vendor logic vs single-vendor store",
    ]},
    { title: "Typical timeline", paragraphs: ["Common delivery windows after discovery:"], list: [
      "Shopify theme launch: 3–8 weeks",
      "Custom storefront: 8–16 weeks",
      "Deep integrations or B2B portal: 4–9 months",
      "Retainer improvements: ongoing 2–4 week sprints",
    ]},
    { title: "Recommended tech stack", paragraphs: ["Stack choice depends on catalog and customization needs:"], list: [
      "Shopify Online Store 2.0 or headless with Hydrogen/Next.js",
      "Custom: Next.js/React front with commerce API or Medusa-style backend",
      "Payments: Stripe, Shopify Payments, or region-specific providers",
      "Search and merchandising tools as catalog scale requires",
      "Analytics, email, and fulfillment integrations selected per ops model",
    ]},
    { title: "DEWEB ecommerce delivery process", paragraphs: ["DEWEB scopes ecommerce with ops-aware phasing:"], list: [
      "Discovery — catalog, checkout rules, integrations, launch markets",
      "Architecture — platform vs custom, migration plan, phased roadmap",
      "Build — theme or custom front with QA on checkout paths",
      "Launch — staging validation, redirects, optional growth retainer",
    ]},
  ],
  whenToChoose: [
    { title: "When a platform ecommerce budget fits", bullets: [
      "Standard catalog and checkout fit Shopify or similar platforms",
      "Speed to launch matters more than fully custom commerce logic",
      "Apps can cover most extensions without custom backend work",
    ]},
    { title: "When to plan for custom ecommerce investment", bullets: [
      "Pricing, checkout, or B2B rules exceed platform limits",
      "Marketplace or multi-vendor models are core to the business",
      "Deep product logic lives in the same platform as commerce",
    ]},
  ],
  relatedServices: [
    { href: "/shopify-vs-custom-ecommerce", label: "Shopify vs custom e-commerce" },
    { href: "/hire-shopify-developers", label: "Hire Shopify developers" },
    { href: "/marketplace-development-cost", label: "Marketplace development cost" },
    { href: "/services/shopify-development", label: "Shopify development services" },
    { href: "/services/branding", label: "Branding services" },
    { href: "/contact", label: "Contact DEWEB for a scoped estimate" },
  ],
  faqs: [
    { question: "How much does ecommerce development cost in 2026?", answer: "Shopify launches often fall in the $5,000–$25,000 range. Custom storefronts and platforms cost more. Final pricing depends on catalog, integrations, and checkout complexity — discovery required." },
    { question: "Shopify vs custom ecommerce — how do I decide?", answer: "Shopify suits many single-vendor stores. Custom builds help when checkout, pricing, or marketplace logic exceeds platform customization. DEWEB compares options during discovery." },
    { question: "Are migration costs included?", answer: "Migration scope — SKUs, customers, redirects, integrations — is scoped separately. It often adds weeks and budget depending on data quality." },
    { question: "How does DEWEB estimate ecommerce projects?", answer: "DEWEB maps catalog, checkout, integrations, and launch requirements in discovery, then proposes phased delivery with explicit assumptions." },
  ],
  cta: { title: "Planning an ecommerce build?", description: "Contact DEWEB to compare platform vs custom paths and receive a realistic estimate after discovery." },
};
