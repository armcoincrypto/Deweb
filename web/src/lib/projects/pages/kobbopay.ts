import type { ProjectPage } from "../types";

export const kobbopay: ProjectPage = {
  slug: "kobbopay",
  path: "/projects/kobbopay",
  seoKey: "projects-kobbopay",
  kicker: "Production case study · Fintech",
  title: "Kobbopay — Multi-Rail Crypto Payment Platform",
  headline: "Kobbopay — Multi-Rail Crypto Payment Platform",
  summary:
    "A production payment platform supporting TRON, BSC, and Ethereum USDT with merchant and admin portals, treasury tooling, webhooks, and monitored settlement flows.",
  projectType: "Fintech · Crypto payments",
  accent: "#00f2ff",
  schemaAbout: "Multi-rail cryptocurrency payment platform and merchant treasury operations",
  tags: [
    "NestJS",
    "PostgreSQL",
    "Redis",
    "TRON USDT",
    "BSC USDT",
    "ETH USDT",
    "Webhooks",
    "Treasury",
  ],
  trust: {
    projectType: "Production payment platform",
    industry: "Fintech · Crypto payments",
    technology: "NestJS · PostgreSQL · Redis · Multi-chain USDT",
    deploymentModel: "Cloud-hosted API · Merchant & admin portals",
  },
  architectureFlow: {
    title: "End-to-end payment path from merchant integration to settlement",
    steps: [
      { label: "Merchant", description: "Checkout, API keys, and webhook endpoints" },
      { label: "API", description: "NestJS services, auth, and transaction state" },
      { label: "Wallet Infrastructure", description: "Unique deposit addresses per payment intent" },
      { label: "Blockchain", description: "TRON, BSC, and Ethereum USDT monitoring" },
      { label: "Treasury", description: "Inbound flow tracking and balance segregation" },
      { label: "Settlement", description: "Merchant-available balances and withdrawals" },
    ],
  },
  networks: ["TRON (TRC20)", "BNB Smart Chain (BEP20)", "Ethereum (ERC20)"],
  capabilities: [
    "Unique deposit addresses",
    "Automatic payment detection",
    "Confirmation tracking",
    "Merchant balances",
    "Treasury management",
    "Withdrawals",
    "Webhooks",
    "Admin controls",
  ],
  securityHighlights: {
    title: "Security & Reliability",
    items: [
      "Multi-network validation before crediting merchant balances",
      "Confirmation thresholds configured per rail and risk profile",
      "Operational monitoring for stuck deposits and webhook failures",
      "Withdrawal controls with approval steps for high-risk actions",
      "Treasury separation between inbound flows and payout queues",
    ],
  },
  techStackGrid: [
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Redis",
    "Nginx",
    "TRON",
    "BSC",
    "Ethereum",
  ],
  challengesSolved: [
    "Unified USDT acceptance across three chains without three separate merchant integrations",
    "Reliable webhook delivery with idempotency and operator-visible retry logs",
    "Ledger-style transaction states that support reconciliation and support investigations",
    "Admin tooling for treasury review without direct database intervention",
    "Decoupling chain listeners from core API latency under webhook fan-out load",
  ],
  engineeringLessons: [
    "Payment platforms benefit from explicit state machines — implicit balance updates create support debt",
    "Chain adapters should isolate RPC and confirmation logic so new rails do not rewrite core domains",
    "Merchant and admin portals should share API contracts but never share permission models",
    "Treasury operations need first-class UI — spreadsheets do not scale with webhook volume",
  ],
  sections: [
    {
      title: "Project Overview",
      paragraphs: [
        "Kobbopay is a multi-rail crypto payment platform designed for merchants who need USDT acceptance across TRON, BSC, and Ethereum without operating separate integrations for each chain.",
        "DEWEB engineered merchant-facing checkout flows, an operations admin portal, and backend services that coordinate deposits, confirmations, treasury movements, and merchant withdrawals with auditable state transitions.",
      ],
    },
    {
      title: "Business Problem",
      paragraphs: [
        "Merchants needed a unified way to accept USDT across chains while keeping treasury control, reconciliation, and payout rules in one system — not three disconnected wallets and spreadsheets.",
      ],
      list: [
        "Fragmented chain integrations increased engineering and ops overhead",
        "Manual reconciliation slowed merchant payouts and support response",
        "Webhook reliability and idempotency were required for production integrations",
        "Admin visibility into transactions, settlements, and exceptions was essential",
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "Kobbopay ships as a unified merchant payment stack across three USDT rails with operational tooling for treasury, settlements, and support — built for production monitoring rather than demo-only flows.",
        "The architecture supports adding rails and merchant integrations without rewriting the core ledger and webhook domains.",
      ],
    },
  ],
  relatedServices: [
    { href: "/services/web-application-development", label: "Web application development" },
    { href: "/services/marketplace-development", label: "Marketplace development" },
    { href: "/dedicated-development-team", label: "Dedicated development team" },
    { href: "/ecommerce-development-cost", label: "Ecommerce development cost guide" },
    { href: "/contact", label: "Contact DEWEB" },
    { href: "/marketplace", label: "DEWEB Marketplace" },
  ],
  cta: {
    title: "Need a custom payment platform?",
    description:
      "Talk to DEWEB about multi-rail architecture, treasury operations, and production-grade settlement workflows — scoped discovery, no fabricated metrics.",
    primaryLabel: "Contact DEWEB",
    primaryHref: "/contact",
    secondaryLabel: "Explore DEWEB Marketplace",
    secondaryHref: "/marketplace",
  },
  breadcrumbCurrent: "Kobbopay",
};
