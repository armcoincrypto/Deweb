import type { CostGuidePage } from "../types";

export const landingPageCost: CostGuidePage = {
  slug: "landing-page-cost",
  path: "/landing-page-cost",
  seoKey: "landing-page-cost",
  kicker: "Landing page cost guide · 2026",
  h1: "Landing page design and development cost",
  breadcrumbCurrent: "Landing page cost",
  intro: [
    "Landing page budgets range from a fast campaign page to a conversion system with testing, CMS flexibility, and integration into your analytics stack. Buyers comparing quotes should align price to scope — not just page length.",
    "The estimates below reflect typical DEWEB landing page engagements. They are planning ranges, not fixed packages. Discovery clarifies copy, design depth, integrations, and timeline.",
  ],
  costRanges: [
    {
      label: "Single campaign landing page",
      range: "$2,500 – $6,000",
      note: "One focused page, responsive layout, form integration, basic analytics events.",
    },
    {
      label: "Premium conversion landing page",
      range: "$6,000 – $15,000",
      note: "Custom design, motion, stronger UX polish, A/B-ready structure, CRM hooks.",
    },
    {
      label: "Landing page system / multi-page funnel",
      range: "$15,000 – $40,000",
      note: "Design system, multiple variants, CMS or component reuse, localization.",
    },
    {
      label: "Ongoing optimization retainer",
      range: "$1,500 – $8,000 / month",
      note: "Iterative tests, new variants, CRO support — depends on velocity.",
    },
  ],
  comparisonTable: {
    headers: ["Deliverable level", "Typical range", "Includes"],
    rows: [
      ["Template-based page", "$500 – $2,500", "Limited customization, fast turnaround, basic form"],
      ["Custom design + build", "$6,000 – $15,000", "Brand-aligned UX, responsive dev, analytics setup"],
      ["Funnel / multi-page set", "$15,000 – $40,000", "Shared components, CMS, variant pages, QA"],
      ["Landing + paid traffic setup", "Add $1,000 – $5,000", "Tracking, pixels, event taxonomy — not ad spend"],
    ],
  },
  sections: [
    {
      title: "What affects landing page pricing",
      paragraphs: [
        "A landing page quote should reflect conversion goals, not just visual complexity. Copy strategy, form logic, integrations, and post-launch iteration often matter as much as design.",
      ],
      list: [
        "Copy and messaging — provided vs agency-supported",
        "Design fidelity — template, custom UI, or motion-heavy",
        "Integrations — CRM, email, payments, scheduling",
        "Localization and compliance copy",
        "Performance, SEO, and accessibility requirements",
        "Testing plan — single launch vs variant roadmap",
      ],
    },
  ],
  whenToChoose: [
    {
      title: "When a simple single page is enough",
      bullets: [
        "One offer, one audience, short campaign window",
        "Form submissions go to a single CRM or inbox",
        "You will iterate copy manually without frequent engineering changes",
      ],
    },
    {
      title: "When to budget for a landing page system",
      bullets: [
        "Marketing runs multiple campaigns with reusable components",
        "You need CMS control, locales, or rapid variant publishing",
        "Conversion testing is part of the operating model, not a one-off",
      ],
    },
  ],
  relatedServices: [
    { href: "/services/landing-page-development", label: "Landing page development" },
    { href: "/services/seo", label: "SEO services" },
    { href: "/services/web-application-development", label: "Web application development" },
    { href: "/webflow-vs-nextjs", label: "Webflow vs Next.js comparison" },
    { href: "/marketplace", label: "Post a project on DEWEB Marketplace" },
  ],
  faqs: [
    {
      question: "How much does a landing page cost in 2026?",
      answer:
        "A custom business landing page often falls in the $6,000–$15,000 range. Simpler campaign pages can cost less; multi-page funnels, CMS systems, and integrations cost more.",
    },
    {
      question: "Why do landing page quotes vary so much?",
      answer:
        "Quotes differ based on copy support, design depth, integrations, accessibility, performance requirements, and whether you need one page or a reusable system.",
    },
    {
      question: "Should I use a template or custom build?",
      answer:
        "Templates work for tight budgets and simple offers. Custom builds help when brand trust, conversion UX, or integration requirements exceed template flexibility.",
    },
    {
      question: "Can DEWEB help scope a landing page project?",
      answer:
        "Yes. DEWEB scopes landing pages through discovery — clarifying audience, conversion action, integrations, and timeline before providing an estimate.",
    },
  ],
  cta: {
    title: "Need a landing page estimate?",
    description:
      "Share your campaign goals with DEWEB. We will recommend a realistic scope and estimate after discovery — without fake performance guarantees.",
  },
};
