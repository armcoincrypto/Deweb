import type { CostGuidePage } from "../types";

export const costToBuildMarketplaceWebsite: CostGuidePage = {
  slug: "cost-to-build-marketplace-website",
  path: "/cost-to-build-marketplace-website",
  seoKey: "cost-to-build-marketplace-website",
  kicker: "Marketplace cost guide · 2026",
  h1: "Cost to build a marketplace website in 2026",
  breadcrumbCurrent: "Marketplace website cost",
  intro: [
    "Buyers evaluating a marketplace build usually need a realistic budget range before discovery — not a single fixed quote. Marketplace products combine buyer flows, seller onboarding, payments, admin tooling, and search in one system, so costs vary widely by vertical, compliance needs, and launch scope.",
    "The ranges below are typical planning estimates based on common DEWEB marketplace projects. They are not guarantees. A scoped discovery phase is required before any firm quote.",
  ],
  costRanges: [
    {
      label: "Marketplace MVP",
      range: "$35,000 – $75,000",
      note: "Focused validation: core listings, basic checkout, one-sided or limited multi-vendor flow, admin essentials.",
    },
    {
      label: "Growth-stage marketplace",
      range: "$75,000 – $180,000",
      note: "Multi-vendor onboarding, commissions, payouts, search, moderation, role-based dashboards.",
    },
    {
      label: "Enterprise / regulated marketplace",
      range: "$180,000 – $400,000+",
      note: "Complex payments, KYC, audit trails, integrations, mobile apps, and higher availability requirements.",
    },
    {
      label: "Monthly post-launch engineering",
      range: "$8,000 – $40,000 / month",
      note: "Depends on team size, roadmap velocity, and operational support — often via a dedicated team model.",
    },
  ],
  comparisonTable: {
    headers: ["Approach", "Typical budget", "Best when"],
    rows: [
      [
        "No-code / template marketplace",
        "$500 – $5,000 setup + platform fees",
        "Testing an idea with strict template constraints and low custom logic",
      ],
      [
        "Marketplace MVP (custom build)",
        "$35,000 – $75,000",
        "Validating liquidity and transaction loops before full scale",
      ],
      [
        "Full multi-vendor platform",
        "$75,000 – $180,000+",
        "You need commissions, seller tools, search, and operational depth",
      ],
      [
        "Dedicated marketplace team",
        "$8,000 – $40,000 / month",
        "Continuous roadmap delivery after initial launch",
      ],
    ],
  },
  sections: [
    {
      title: "What drives marketplace development cost",
      paragraphs: [
        "Marketplace pricing is rarely about page count. The cost drivers are transaction logic, role complexity, payment architecture, and how much operational tooling you need on day one.",
      ],
      list: [
        "Vendor onboarding, KYC, and approval workflows",
        "Commission rules, escrow timing, and payout integrations",
        "Search, filters, geo, and ranking logic",
        "Disputes, refunds, and admin moderation",
        "Mobile apps or API-only seller tools",
        "Compliance, localization, and audit requirements",
      ],
    },
    {
      title: "How DEWEB helps buyers estimate scope",
      paragraphs: [
        "DEWEB supports marketplace buyers through structured discovery: brief your requirements on DEWEB Marketplace or contact the agency team for a scoped estimate. Compare proposals, review delivery models, and align budget to a phased roadmap rather than a vague build quote.",
      ],
    },
  ],
  whenToChoose: [
    {
      title: "When an MVP marketplace budget makes sense",
      bullets: [
        "You need to validate supply/demand before investing in full multi-vendor depth",
        "Payment rules can start simple and expand after traction",
        "Admin tooling can be manual at first with a clear phase-two plan",
      ],
    },
    {
      title: "When to budget for a full platform build",
      bullets: [
        "Revenue depends on commissions, subscriptions, or complex payout splits from launch",
        "Multiple user roles need distinct dashboards and permissions on day one",
        "Search quality, trust, and moderation directly affect conversion",
      ],
    },
  ],
  relatedServices: [
    { href: "/services/marketplace-development", label: "Marketplace development services" },
    { href: "/marketplace/hire-marketplace-developers", label: "Hire marketplace developers" },
    { href: "/dedicated-development-team", label: "Dedicated development team" },
    { href: "/marketplace", label: "DEWEB Marketplace" },
    { href: "/blog/how-to-build-a-marketplace-website", label: "How to build a marketplace website (blog)" },
  ],
  faqs: [
    {
      question: "How much does a basic marketplace website cost in 2026?",
      answer:
        "A focused marketplace MVP typically falls in the $35,000–$75,000 range for custom development, depending on scope. Template or no-code options cost less upfront but limit transaction logic and scalability.",
    },
    {
      question: "Why do marketplace quotes vary so much?",
      answer:
        "Marketplaces combine product, payments, and operations. Commissions, escrow, seller onboarding, search, and admin tooling each add engineering and discovery time — which is why estimates require a scoped brief.",
    },
    {
      question: "Can I launch a marketplace for under $20,000?",
      answer:
        "Sometimes for very narrow MVPs or heavily constrained scope, but multi-vendor payments, moderation, and seller tools often push realistic custom builds higher. Discovery helps identify what can be deferred.",
    },
    {
      question: "Should I hire freelancers or an agency for a marketplace?",
      answer:
        "Freelancers can work for narrow tasks; marketplaces usually need coordinated product, backend, payments, and QA. Agencies or dedicated teams reduce integration risk when scope spans multiple workstreams.",
    },
    {
      question: "How does DEWEB price marketplace projects?",
      answer:
        "DEWEB uses scoped discovery, phased delivery options, and transparent proposals via DEWEB Marketplace or agency engagement. Final pricing depends on your brief — not a generic package rate.",
    },
  ],
  cta: {
    title: "Need a scoped marketplace estimate?",
    description:
      "Share your marketplace brief with DEWEB. We will help you map MVP vs full-platform scope and provide a realistic estimate after discovery — no inflated promises.",
  },
};
