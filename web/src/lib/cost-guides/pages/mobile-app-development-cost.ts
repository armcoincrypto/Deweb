import type { CostGuidePage } from "../types";

export const mobileAppDevelopmentCost: CostGuidePage = {
  slug: "mobile-app-development-cost",
  path: "/mobile-app-development-cost",
  seoKey: "mobile-app-development-cost",
  kicker: "Mobile app cost guide · 2026",
  h1: "Mobile app development cost guide",
  breadcrumbCurrent: "Mobile app development cost",
  intro: [
    "Mobile apps vary from focused MVPs to cross-platform products with offline sync, payments, and admin tooling. Cost depends on platforms (iOS, Android, or both), design fidelity, backend depth, and release compliance requirements.",
    "The ranges below are typical planning estimates for custom mobile builds in 2026. They are not fixed prices. DEWEB recommends scoped discovery before any commitment.",
  ],
  costRanges: [
    { label: "Focused mobile MVP", range: "$25,000 – $65,000", note: "Single-platform or cross-platform core loop, limited integrations." },
    { label: "Production iOS + Android", range: "$55,000 – $140,000", note: "Dual release, auth, analytics, improved QA and store compliance." },
    { label: "Complex mobile product", range: "$120,000 – $300,000+", note: "Offline sync, payments, chat, admin, deep backend integration." },
    { label: "Post-launch mobile retainer", range: "$8,000 – $25,000 / month", note: "Feature sprints, store updates, and maintenance — scope varies." },
  ],
  sections: [
    { title: "What affects mobile app pricing", paragraphs: ["Mobile budgets track platform and product complexity:"], list: [
      "iOS only, Android only, or both — and cross-platform vs native",
      "Auth, payments, push notifications, and real-time features",
      "Offline mode, background jobs, and device permissions",
      "Backend API scope shared with web or standalone",
      "Design system maturity and accessibility expectations",
      "App Store and Play Store compliance, analytics, and crash monitoring",
    ]},
    { title: "Typical timeline", paragraphs: ["Common delivery windows after discovery:"], list: [
      "Focused MVP: 10–16 weeks",
      "iOS + Android production launch: 16–28 weeks",
      "Complex product with admin and integrations: 6–12 months",
      "Post-launch sprints: ongoing 2–4 week cycles",
    ]},
    { title: "Recommended tech stack", paragraphs: ["Stack selection should balance speed, maintainability, and hiring pool:"], list: [
      "React Native or Flutter for shared iOS/Android codebases",
      "Native Swift/Kotlin when platform-specific depth is required",
      "Backend: Node.js, Python, or serverless APIs with clear contracts",
      "Auth: OAuth, phone login, or enterprise IdP as required",
      "CI/CD, TestFlight/Play internal testing, and monitoring from day one",
    ]},
    { title: "DEWEB mobile delivery process", paragraphs: ["DEWEB delivers mobile products with phased validation:"], list: [
      "Discovery — users, platforms, constraints, and success metrics",
      "Scope & estimate — MVP vs growth phases with explicit boundaries",
      "Design & build — iterative releases with device QA checkpoints",
      "Launch — store submission support, handoff, optional retainer",
    ]},
  ],
  whenToChoose: [
    { title: "When a lean mobile MVP budget fits", bullets: [
      "You need to validate one workflow on one platform first",
      "Backend can start simple with manual ops workarounds",
      "Design can begin functional before full brand polish",
    ]},
    { title: "When to plan for higher mobile investment", bullets: [
      "iOS and Android are both launch requirements",
      "Payments, offline, or compliance block revenue without day-one support",
      "Mobile shares complex backend logic with web or marketplace products",
    ]},
  ],
  relatedServices: [
    { href: "/mvp-development-cost", label: "MVP development cost guide" },
    { href: "/custom-web-app-development-cost", label: "Custom web app development cost" },
    { href: "/services/mobile", label: "Mobile development services" },
    { href: "/services/uiux", label: "UI/UX design services" },
    { href: "/hire-full-stack-developers", label: "Hire full-stack developers" },
    { href: "/contact", label: "Contact DEWEB for a scoped estimate" },
  ],
  faqs: [
    { question: "How much does mobile app development cost in 2026?", answer: "Many focused mobile MVPs fall in the $25,000–$65,000 range. Dual-platform production apps typically cost more. Discovery is required for firm estimates." },
    { question: "Cross-platform vs native — which is cheaper?", answer: "Cross-platform often reduces cost for shared UI logic. Native can be better for platform-specific depth or performance-critical features. Choice depends on roadmap — not hype." },
    { question: "Is backend included in mobile quotes?", answer: "Mobile quotes may include API work or assume an existing backend. DEWEB separates backend scope explicitly during discovery." },
    { question: "How does DEWEB estimate mobile projects?", answer: "DEWEB maps platforms, integrations, and launch requirements in discovery, then proposes phased delivery with clear in/out of scope." },
  ],
  cta: { title: "Planning a mobile app?", description: "Contact DEWEB to scope MVP vs production launch and receive a realistic estimate after discovery." },
};
