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
      title: "Architecture",
      paragraphs: [
        "The platform uses a NestJS service layer with PostgreSQL as the system of record and Redis for queues, caching, and rate-sensitive workflows.",
      ],
      list: [
        "NestJS modular domains — merchants, wallets, transactions, webhooks, admin",
        "PostgreSQL schemas for ledger-like transaction states and audit trails",
        "Redis for job queues, session/cache layers, and webhook retry scheduling",
        "Chain adapters for TRON, BSC, and Ethereum USDT deposit detection",
        "Separate merchant portal and admin portal frontends on shared API contracts",
      ],
    },
    {
      title: "Core Features",
      paragraphs: ["Production capabilities delivered across merchant and admin surfaces:"],
      list: [
        "Multi-rail USDT deposit addresses and confirmation tracking",
        "Merchant portal for balances, transaction history, and withdrawal requests",
        "Admin portal for merchant onboarding, limits, and operational review",
        "Webhook delivery with signing, retries, and delivery logs",
        "Treasury management views for inbound flows and outbound settlements",
        "Withdrawal workflows with approval steps and status monitoring",
        "Transaction monitoring dashboards for stuck or anomalous states",
        "Settlement flows connecting confirmed deposits to merchant-available balances",
      ],
    },
    {
      title: "Security Considerations",
      paragraphs: [
        "Payment platforms require conservative defaults — the implementation prioritized least-privilege access, auditable admin actions, and explicit state machines over implicit balance updates.",
      ],
      list: [
        "Role-based access separation between merchant and admin capabilities",
        "Webhook signature verification and replay-safe idempotency keys",
        "Environment-isolated keys and configuration for chain RPC providers",
        "Structured logging for financial state transitions without exposing secrets",
        "Manual approval gates for high-risk treasury and withdrawal operations",
      ],
    },
    {
      title: "Scaling Challenges",
      paragraphs: [
        "Multi-chain monitoring and webhook fan-out create operational load that must be isolated from core API latency.",
      ],
      list: [
        "Chain listener workers decoupled from HTTP request threads",
        "Queue-backed webhook retries with backoff and dead-letter visibility",
        "Database indexing strategy for high-volume transaction lookups",
        "Admin tooling to reprocess failed jobs without direct database edits",
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
    { href: "/contact", label: "Contact DEWEB" },
    { href: "/marketplace", label: "DEWEB Marketplace" },
  ],
  cta: {
    title: "Building a fintech or payments product?",
    description:
      "Talk to DEWEB about multi-rail architecture, admin operations, and production-grade settlement workflows — scoped discovery, no fabricated metrics.",
  },
  breadcrumbCurrent: "Kobbopay",
};
