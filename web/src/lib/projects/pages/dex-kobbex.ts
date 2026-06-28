import type { ProjectPage } from "../types";

export const dexKobbex: ProjectPage = {
  slug: "dex-kobbex",
  path: "/projects/dex-kobbex",
  seoKey: "projects-dex-kobbex",
  kicker: "Production case study · Web3",
  title: "DEX Kobbex — Decentralized Swap Platform",
  headline: "DEX Kobbex — Decentralized Swap Platform",
  summary:
    "A decentralized swap front-end connecting wallet providers, token swap flows, and a performance-focused Web3 UI architecture for on-chain trading experiences.",
  projectType: "Web3 · DEX",
  accent: "#6366f1",
  tags: ["Web3", "DEX", "Wallet integration", "Token swaps", "Frontend architecture"],
  sections: [
    {
      title: "Overview",
      paragraphs: [
        "DEX Kobbex is a decentralized exchange interface enabling wallet-connected token swaps with clear transaction states and a frontend architecture suited to Web3 latency and error patterns.",
        "DEWEB focused on wallet connectivity, swap UX, and maintainable front-end boundaries rather than unverifiable on-chain volume claims.",
      ],
    },
    {
      title: "Architecture",
      paragraphs: [
        "The client separates wallet state, swap quoting, and transaction submission into explicit modules so chain or router upgrades do not ripple through unrelated UI code.",
      ],
      list: [
        "React/Next.js front-end with Web3 provider abstraction",
        "Router integration layer for swap quotes and calldata construction",
        "Transaction lifecycle UI — quote, approve, swap, confirm, fail/recover",
        "Network and chain switching guards to prevent wrong-chain submissions",
      ],
    },
    {
      title: "Wallet Connectivity",
      paragraphs: [
        "Wallet integration supports common browser wallets with connection persistence, account change listeners, and readable error surfaces for rejected or failed transactions.",
      ],
      list: [
        "Multi-wallet connector pattern with unified account state",
        "Chain ID validation before swap execution",
        "Human-readable errors for user rejection and RPC failures",
        "Disconnect and reconnect flows that reset swap form state",
      ],
    },
    {
      title: "Trading Flow",
      paragraphs: [
        "The swap flow emphasizes predictable steps — select tokens, fetch quote, review slippage and fees, approve if needed, submit swap, track confirmation.",
      ],
      list: [
        "Token selection with balance awareness where available",
        "Slippage and deadline controls exposed with sensible defaults",
        "Approval transactions separated from swap transactions in UI",
        "Explorer links for submitted transactions",
      ],
    },
    {
      title: "Challenges",
      paragraphs: [
        "DEX front-ends face RPC instability, wallet inconsistencies, and mobile browser constraints — the implementation accounts for these with retries and clear operator messaging.",
      ],
      list: [
        "Quote staleness when mempool conditions shift",
        "Handling insufficient balance and allowance errors inline",
        "Mobile wallet deep-link flows and session drops",
        "Testing against multiple networks without hard-coded assumptions",
      ],
    },
    {
      title: "Lessons Learned",
      paragraphs: [
        "Treat wallet and router integrations as ongoing maintenance surfaces — ABIs, chain configs, and provider APIs change. Modular boundaries reduce upgrade cost.",
        "User trust comes from transparent transaction states and recoverable errors, not marketing metrics. DEWEB documents capabilities and engineering trade-offs instead of fabricated trading volume.",
      ],
    },
  ],
  relatedServices: [
    { href: "/services/web-application-development", label: "Web application development" },
    { href: "/services/saas-development", label: "SaaS development" },
    { href: "/dedicated-development-team", label: "Dedicated development team" },
    { href: "/contact", label: "Contact DEWEB" },
    { href: "/marketplace", label: "DEWEB Marketplace" },
  ],
  cta: {
    title: "Building a Web3 or DEX product?",
    description:
      "Talk to DEWEB about wallet integration, swap UX, and maintainable Web3 front-end architecture — discovery-led scoping without unverifiable on-chain claims.",
  },
  breadcrumbCurrent: "DEX Kobbex",
};
