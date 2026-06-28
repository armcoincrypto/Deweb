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
  tags: ["Exchange engine", "Admin ops", "AML/KYC", "Liquidity", "SEO", "Monitoring"],
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
      title: "Solution",
      paragraphs: [
        "DEWEB implemented modular exchange services, admin dashboards, and an SEO remediation track aligned with crawlable architecture and clean indexation signals.",
      ],
      list: [
        "Exchange workflow services with explicit order and balance states",
        "Admin panels for operations, review queues, and configuration",
        "Monitoring hooks for failed jobs, stuck transactions, and integration errors",
        "SEO engineering pass — URL structure, metadata, internal linking, and technical fixes",
      ],
    },
    {
      title: "Platform Components",
      paragraphs: ["Core platform surfaces delivered for trading and operations:"],
      list: [
        "User transaction workflows — deposits, trading actions, history, notifications",
        "Exchange engine integration layer with guarded state transitions",
        "Admin operations console for support and compliance review",
        "Liquidity operations views and manual override pathways where required",
        "Monitoring dashboards and alerting-friendly event logs",
      ],
    },
    {
      title: "SEO Engineering",
      paragraphs: [
        "SEO recovery focused on technical foundations — not inflated traffic claims. Work included crawl path cleanup, canonical consistency, and indexable landing structure for key exchange pages.",
      ],
      list: [
        "Audit of indexation blockers and duplicate URL patterns",
        "Metadata and heading structure aligned to search intent pages",
        "Internal linking between educational, product, and support content",
        "Performance and render considerations for critical landing templates",
      ],
    },
    {
      title: "Operations",
      paragraphs: [
        "Exchange uptime depends on ops tooling as much as trading code. Admin flows were designed for repeatable support actions with audit-friendly logs.",
      ],
      list: [
        "Role-separated admin capabilities for support vs configuration",
        "Reconciliation views for transaction exceptions",
        "Runbooks supported by in-app status and retry controls",
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
    { href: "/contact", label: "Contact DEWEB" },
    { href: "/marketplace", label: "DEWEB Marketplace" },
  ],
  cta: {
    title: "Planning an exchange or trading platform?",
    description:
      "Contact DEWEB to scope trading workflows, admin operations, and SEO-ready architecture — discovery required, no fabricated growth claims.",
  },
  breadcrumbCurrent: "Exswaping",
};
