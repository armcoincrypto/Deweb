import type { CostGuidePage } from "../types";

export const shopifyVsCustomEcommerce: CostGuidePage = {
  slug: "shopify-vs-custom-ecommerce",
  path: "/shopify-vs-custom-ecommerce",
  seoKey: "shopify-vs-custom-ecommerce",
  kicker: "Ecommerce comparison guide",
  h1: "Shopify vs custom ecommerce development",
  breadcrumbCurrent: "Shopify vs custom ecommerce",
  intro: [
    "Shopify and custom ecommerce both sell online — but they optimize for different trade-offs: speed-to-launch and ecosystem depth vs full control over architecture, integrations, and long-term product logic.",
    "This guide compares typical costs, capabilities, and decision criteria for commercial buyers planning a 2026 ecommerce build. Figures are planning estimates; discovery is required for firm quotes.",
  ],
  costRanges: [
    {
      label: "Shopify store (theme + setup)",
      range: "$5,000 – $25,000",
      note: "Theme customization, catalog setup, core apps, and launch support — varies by catalog size and design depth.",
    },
    {
      label: "Shopify Plus / advanced Shopify",
      range: "$25,000 – $80,000",
      note: "Custom theme work, integrations, B2B flows, multi-store, or complex merchandising.",
    },
    {
      label: "Custom ecommerce platform",
      range: "$80,000 – $300,000+",
      note: "Headless or fully custom stack, unique checkout, marketplace-like rules, or deep ERP integrations.",
    },
    {
      label: "Ongoing maintenance",
      range: "$1,500 – $15,000 / month",
      note: "Shopify retainers tend lower; custom platforms need continuous engineering for security, features, and integrations.",
    },
  ],
  comparisonTable: {
    headers: ["Factor", "Shopify", "Custom ecommerce"],
    rows: [
      ["Typical launch timeline", "2–8 weeks for standard stores", "3–9+ months for custom platforms"],
      ["Upfront build cost", "Lower for standard DTC stores", "Higher — architecture and integrations from scratch"],
      ["Checkout & payments", "Shopify-managed, proven at scale", "Flexible — you own rules and edge cases"],
      ["Custom business logic", "Apps, Shopify Functions, some limits", "Full control — commissions, B2B, complex pricing"],
      ["Hosting & platform fees", "Monthly SaaS + transaction fees", "Cloud costs + engineering ownership"],
      ["Best fit", "Brand retail, DTC, many standard flows", "Unique models, deep integrations, non-standard UX"],
    ],
  },
  sections: [
    {
      title: "Hidden costs buyers often miss",
      paragraphs: [
        "Shopify projects can grow through apps, theme complexity, and Plus fees. Custom projects grow through discovery, integrations, and ongoing engineering. Compare total cost of ownership over 24–36 months, not just launch budget.",
      ],
      list: [
        "Shopify: apps, theme dev, migration, Plus subscription, payment fees",
        "Custom: discovery, infrastructure, security, DevOps, feature roadmap",
        "Both: content, photography, SEO, and conversion optimization",
      ],
    },
  ],
  whenToChoose: [
    {
      title: "When Shopify is usually the better choice",
      bullets: [
        "You need a proven checkout and catalog quickly with standard DTC flows",
        "Your team wants merchandising tools without maintaining core commerce infrastructure",
        "Budget and timeline favor launch speed over bespoke architecture",
      ],
    },
    {
      title: "When custom ecommerce is worth the investment",
      bullets: [
        "Your pricing, checkout, or fulfillment logic does not fit standard Shopify patterns",
        "You need deep ERP, marketplace, or B2B procurement integrations",
        "The product is the platform — ecommerce is core IP, not a storefront add-on",
      ],
    },
  ],
  relatedServices: [
    { href: "/services/shopify-development", label: "Shopify development" },
    { href: "/services/shopify-store-design", label: "Shopify store design" },
    { href: "/services/shopify-custom-apps", label: "Shopify custom apps" },
    { href: "/services/marketplace-development", label: "Marketplace development" },
    { href: "/blog/shopify-vs-woocommerce", label: "Shopify vs WooCommerce (blog)" },
  ],
  faqs: [
    {
      question: "Is Shopify cheaper than custom ecommerce?",
      answer:
        "For many standard stores, yes — upfront. Custom builds cost more initially but can be justified when business logic, integrations, or scale requirements exceed platform constraints.",
    },
    {
      question: "Can Shopify handle B2B or complex pricing?",
      answer:
        "Shopify Plus and apps support many B2B scenarios. Highly custom procurement, contract pricing, or marketplace-like rules may still push buyers toward custom or hybrid headless approaches.",
    },
    {
      question: "When should I choose headless Shopify?",
      answer:
        "When marketing needs custom front-end experiences but you still want Shopify for commerce, inventory, and checkout — common in growth brands with strong UX requirements.",
    },
    {
      question: "How does DEWEB help choose?",
      answer:
        "DEWEB delivers Shopify builds and custom ecommerce/web applications. Discovery clarifies whether platform constraints or custom control should drive the architecture.",
    },
  ],
  cta: {
    title: "Not sure which path fits your store?",
    description:
      "Contact DEWEB for a practical scoping conversation. We will recommend Shopify, hybrid, or custom only after understanding your catalog, integrations, and roadmap.",
  },
};
