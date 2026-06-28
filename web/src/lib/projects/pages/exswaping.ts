import type { ProjectPage } from "../types";

export const exswaping: ProjectPage = {
  slug: "exswaping",
  path: "/projects/exswaping",
  seoKey: "projects-exswaping",
  kicker: "Production case study · Exchange",
  title: "Exswaping — Cryptocurrency Exchange Platform",
  headline: "Exswaping — Cryptocurrency Exchange Platform",
  summary:
    "A cryptocurrency exchange platform with trading workflows, admin operations, compliance-oriented processes, liquidity tooling, and SEO engineering for recoverable organic visibility.",
  projectType: "Crypto exchange",
  accent: "#c026d3",
  schemaAbout: "Cryptocurrency exchange platform with SEO engineering and operational tooling",
  tags: ["Laravel", "Exchange engine", "Admin ops", "AML/KYC", "SEO", "Monitoring"],
  trust: {
    projectType: "Cryptocurrency exchange platform",
    industry: "Fintech · Digital assets",
    technology: "Laravel · MySQL · Redis · SEO infrastructure",
    deploymentModel: "Production web platform · Admin operations portal",
  },
  exchangeWorkflow: {
    title: "Typical exchange request path from user action to settlement",
    steps: [
      { label: "User", description: "Account, deposit, or exchange request initiation" },
      { label: "Exchange Request", description: "Order validation and state assignment" },
      { label: "Verification", description: "AML/KYC and limit checks where required" },
      { label: "Processing", description: "Engine execution and balance updates" },
      { label: "Settlement", description: "Final status, notifications, and audit log" },
    ],
  },
  platformComponentCards: [
    {
      title: "Frontend",
      description: "User-facing trading and account flows with clear transaction status communication.",
    },
    {
      title: "Admin Portal",
      description: "Operations console for review queues, limits, configuration, and support actions.",
    },
    {
      title: "Exchange Engine",
      description: "Integration layer coordinating order states, balances, and guarded transitions.",
    },
    {
      title: "Monitoring",
      description: "Alerting-friendly logs and dashboards for stuck jobs and integration failures.",
    },
    {
      title: "SEO Infrastructure",
      description: "Crawlable architecture, metadata, schema, sitemap, and performance-oriented templates.",
    },
  ],
  seoEngineeringDetail: {
    title: "SEO engineering",
    items: [
      "Technical SEO — crawl paths, canonicals, indexation blockers, and redirect hygiene",
      "Multilingual SEO — locale-aware metadata and hreflang-aligned structure",
      "Schema markup — structured data for key landing and content templates",
      "Sitemap management — clean inclusion rules for indexable exchange pages",
      "Performance optimization — render and asset considerations for critical landing URLs",
    ],
  },
  operationsDetail: {
    title: "Operations",
    paragraphs: [
      "Exchange uptime depends on ops tooling as much as trading code. Admin flows were designed for repeatable support actions with audit-friendly logs.",
    ],
    items: [
      "Monitoring for failed jobs, stuck transactions, and integration errors",
      "Auditing of admin actions and configuration changes",
      "Operational workflows for exceptions, reconciliation, and manual review",
      "Platform maintenance cadence for dependencies, SEO assets, and release checks",
    ],
  },
  techStackGrid: ["Laravel", "PHP", "MySQL", "Nginx", "Redis", "SEO Infrastructure"],
  challengesSolved: [
    "Exchange transaction workflows with explicit states instead of ambiguous balance updates",
    "Admin operations for compliance review without blocking all trading paths",
    "SEO technical debt remediation without claiming guaranteed ranking outcomes",
    "Monitoring and retry pathways for integration failures in production",
    "Separation of support, configuration, and trading-critical admin capabilities",
  ],
  engineeringLessons: [
    "Exchange products need ops-first admin design — trading code alone does not reduce support load",
    "SEO recovery is an engineering discipline: URLs, schema, and performance affect indexation readiness",
    "Liquidity and compliance touchpoints should be integration boundaries, not scattered conditionals",
    "Monitoring hooks belong in the initial architecture, not as a post-launch patch",
  ],
  sections: [
    {
      title: "Overview",
      paragraphs: [
        "Exswaping is a cryptocurrency exchange platform combining user-facing trading workflows with back-office operations for compliance, liquidity, and platform health.",
        "DEWEB delivered exchange components, administrative tooling, and SEO recovery engineering so the platform could operate reliably while rebuilding search visibility.",
      ],
    },
    {
      title: "Challenge",
      paragraphs: [
        "Exchange products must balance trading UX, operational controls, and compliance workflows — while technical SEO debt can suppress discoverability for branded and category queries.",
      ],
      list: [
        "Transaction workflows spanning deposits, orders, and status communication",
        "Admin operations for user review, limits, and exception handling",
        "AML/KYC process integration points without blocking all trading paths",
        "Liquidity operations requiring monitoring and manual intervention tools",
        "Organic search recovery after structural and content SEO issues",
      ],
    },
    {
      title: "Results",
      paragraphs: [
        "Exswaping operates as a structured exchange platform with admin and monitoring tooling suitable for production operations.",
        "SEO engineering improved technical indexation readiness — outcomes depend on ongoing content and market conditions rather than guaranteed ranking metrics.",
      ],
    },
  ],
  relatedServices: [
    { href: "/services/web-application-development", label: "Web application development" },
    { href: "/services/seo", label: "SEO services" },
    { href: "/services/marketplace-development", label: "Marketplace development" },
    { href: "/ai-automation-development-cost", label: "AI automation development cost guide" },
    { href: "/contact", label: "Contact DEWEB" },
    { href: "/marketplace", label: "DEWEB Marketplace" },
  ],
  cta: {
    title: "Need an exchange or fintech platform?",
    description:
      "Talk to DEWEB about trading workflows, admin operations, and SEO-ready architecture — discovery required, no fabricated growth claims.",
    primaryLabel: "Talk to DEWEB",
    primaryHref: "/contact",
    secondaryLabel: "Post on DEWEB Marketplace",
    secondaryHref: "/marketplace",
  },
  breadcrumbCurrent: "Exswaping",
};
