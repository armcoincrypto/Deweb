import type { CostGuidePage } from "../types";

export const marketplaceDevelopmentCost: CostGuidePage = {
  slug: "marketplace-development-cost",
  path: "/marketplace-development-cost",
  seoKey: "marketplace-development-cost",
  kicker: "Marketplace cost guide · 2026",
  h1: "Marketplace development cost guide",
  breadcrumbCurrent: "Marketplace development cost",
  intro: [
    "Marketplaces combine buyer and seller experiences, trust, payments, and operations — usually more moving parts than a single-vendor store. Cost depends on transaction model, onboarding, search, and admin tooling.",
    "The ranges below are typical planning estimates for custom marketplace builds in 2026. They are not guaranteed prices; discovery is required to map MVP vs full platform scope.",
  ],
  costRanges: [
    {
      label: "Narrow marketplace MVP",
      range: "$35,000 – $75,000",
      note: "Single category, basic listings, manual or simplified payments, light admin.",
    },
    {
      label: "Growth marketplace",
      range: "$75,000 – $160,000",
      note: "Commissions, seller onboarding, messaging, reviews, improved search.",
    },
    {
      label: "Multi-sided platform",
      range: "$160,000 – $350,000+",
      note: "Escrow, disputes, complex fees, analytics, compliance-oriented features.",
    },
    {
      label: "Dedicated marketplace team",
      range: "$15,000 – $50,000 / month",
      note: "Ongoing seller ops features, integrations, and reliability work.",
    },
  ],
  sections: [
    {
      title: "Marketplace pricing factors",
      paragraphs: [
        "Marketplace estimates should reflect transaction and operations complexity:",
      ],
      list: [
        "Payment flows, commissions, and payout timing",
        "Seller verification, KYC, and moderation tooling",
        "Search, filters, and catalog structure",
        "Messaging, bookings, or custom order flows",
        "Admin dashboards and dispute handling",
        "Mobile experience and notification strategy",
      ],
    },
    {
      title: "Typical marketplace timeline",
      paragraphs: [
        "Focused marketplace MVPs often require roughly 12–20 weeks after discovery; platforms with payouts and compliance touchpoints commonly run longer.",
        "Phased launches — listings first, payments next — can accelerate learning if discovery documents deferrals clearly.",
      ],
    },
    {
      title: "Marketplace tech stack patterns",
      paragraphs: [
        "Stacks vary by payment geography and search needs. DEWEB frequently combines:",
      ],
      list: [
        "Modern web frontends with role-based seller and buyer portals",
        "Relational databases for listings, orders, and ledger-like records",
        "Payment provider integrations with webhook-driven state updates",
        "Search indexes when faceted browse is a core requirement",
        "Background workers for emails, payouts, and data imports",
      ],
    },
    {
      title: "How DEWEB delivers marketplaces",
      paragraphs: [
        "DEWEB maps supply-side and demand-side journeys, payment edge cases, and admin operations before estimating build phases.",
        "Compare detailed scope notes in our cost-to-build-marketplace-website guide, then contact us for a discovery-led proposal.",
      ],
    },
  ],
  whenToChoose: [
    {
      title: "When a marketplace MVP budget fits",
      bullets: [
        "You can validate demand with a constrained category or region",
        "Some operations can remain manual while software proves value",
        "Payment complexity can be simplified in phase one with clear deferrals",
      ],
    },
    {
      title: "When to budget above typical marketplace ranges",
      bullets: [
        "Escrow, multi-currency, or regulated payments are required at launch",
        "Heavy seller verification or fraud prevention is core to trust",
        "Real-time booking, logistics, or B2B contract flows are in scope",
      ],
    },
  ],
  relatedServices: [
    { href: "/cost-to-build-marketplace-website", label: "Cost to build a marketplace website" },
    { href: "/services/marketplace-development", label: "Marketplace development services" },
    { href: "/shopify-vs-custom-ecommerce", label: "Shopify vs custom ecommerce" },
    { href: "/mvp-development-cost", label: "MVP development cost guide" },
    { href: "/marketplace/hire-web-developers", label: "Hire web developers" },
    { href: "/contact", label: "Contact DEWEB" },
  ],
  faqs: [
    {
      question: "What is a typical marketplace development cost?",
      answer:
        "Many custom marketplace MVPs fall in a typical range of $35,000–$75,000, with commission, payout, and admin depth pushing estimates higher. Discovery clarifies what belongs in phase one.",
    },
    {
      question: "How is marketplace cost different from a standard ecommerce site?",
      answer:
        "Marketplaces add seller onboarding, multi-party payments, trust systems, and operations tooling — scope that single-vendor stores often defer or simplify.",
    },
    {
      question: "Can I start with listings before payments?",
      answer:
        "Sometimes, if business rules allow manual payment handling early. DEWEB documents tradeoffs so estimates reflect real launch risk, not optimistic deferrals.",
    },
    {
      question: "How does DEWEB estimate marketplace projects?",
      answer:
        "We use workflow mapping, payment diagrams, and phased roadmaps. Final pricing depends on your brief — not a one-size package rate.",
    },
  ],
  cta: {
    title: "Need a marketplace estimate?",
    description:
      "Share your marketplace model with DEWEB. We will help separate MVP from full-platform scope and provide a realistic estimate after discovery.",
  },
};
