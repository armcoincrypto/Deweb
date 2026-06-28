import type { CostGuidePage } from "../types";

export const aiChatbotDevelopmentCost: CostGuidePage = {
  slug: "ai-chatbot-development-cost",
  path: "/ai-chatbot-development-cost",
  seoKey: "ai-chatbot-development-cost",
  kicker: "AI chatbot cost guide · 2026",
  h1: "AI chatbot development cost guide",
  breadcrumbCurrent: "AI chatbot development cost",
  intro: [
    "AI chatbot projects range from guided FAQ assistants to workflow-connected agents with CRM, ticketing, or internal knowledge bases. Cost depends on data quality, guardrails, channels, and human handoff requirements.",
    "Ranges below are typical planning estimates for custom AI chatbot builds in 2026. They are starting points for budgeting — discovery is required before any fixed quote.",
  ],
  costRanges: [
    {
      label: "Guided FAQ / widget assistant",
      range: "$8,000 – $25,000",
      note: "Curated prompts, limited sources, web embed, basic analytics.",
    },
    {
      label: "Knowledge-base connected bot",
      range: "$25,000 – $60,000",
      note: "Document ingestion, retrieval tuning, admin review, channel integrations.",
    },
    {
      label: "Workflow agent with integrations",
      range: "$60,000 – $150,000+",
      note: "CRM/helpdesk actions, role-aware access, monitoring, escalation paths.",
    },
    {
      label: "Ongoing improvement retainer",
      range: "$3,000 – $15,000 / month",
      note: "Prompt ops, evals, content updates, and safety reviews as usage grows.",
    },
  ],
  sections: [
    {
      title: "AI chatbot pricing factors",
      paragraphs: [
        "Chatbot estimates track data, risk, and operational needs — not model hype alone:",
      ],
      list: [
        "Source documents, freshness, and permission boundaries",
        "Languages, tone, and brand-safe response policies",
        "Channels (web, Slack, WhatsApp, etc.) and SSO requirements",
        "Human handoff, ticketing, and logging expectations",
        "Evaluation harnesses and regression testing for prompts",
        "Compliance considerations for PII and retention",
      ],
    },
    {
      title: "Typical chatbot delivery timeline",
      paragraphs: [
        "FAQ-style assistants may reach pilot in roughly 4–8 weeks; retrieval-heavy bots with integrations often need 8–16 weeks including content preparation and review cycles.",
        "Timelines depend on how quickly stakeholders approve knowledge sources and escalation rules — discovery surfaces those dependencies early.",
      ],
    },
    {
      title: "Common chatbot architecture choices",
      paragraphs: [
        "DEWEB favors maintainable patterns with observable behavior:",
      ],
      list: [
        "Retrieval-augmented generation over approved content stores",
        "Orchestration layers for tools, APIs, and structured workflows",
        "Vector or hybrid search depending on corpus size and update frequency",
        "Admin consoles for transcript review and content updates",
        "Rate limits, caching, and fallbacks when models or APIs fail",
      ],
    },
    {
      title: "DEWEB process for AI assistants",
      paragraphs: [
        "We begin with use-case interviews, data inventory, and safety requirements — then prototype against real questions from your team or customers.",
        "For broader automation, see our AI business automation services; chatbots are often one component of a larger workflow estimate.",
      ],
    },
  ],
  whenToChoose: [
    {
      title: "When a lighter chatbot budget fits",
      bullets: [
        "Answers come from a small, well-maintained knowledge base",
        "Human agents remain the primary resolution path for complex cases",
        "One channel (e.g., marketing site widget) is enough for phase one",
      ],
    },
    {
      title: "When to plan for higher chatbot investment",
      bullets: [
        "The bot must perform authenticated actions in CRM or billing systems",
        "Regulated industries require detailed logging, review, and access control",
        "Multiple languages or high-stakes advice domains need rigorous evals",
      ],
    },
  ],
  relatedServices: [
    { href: "/services/ai-chatbot-development", label: "AI chatbot development services" },
    { href: "/ai-automation-development-cost", label: "AI automation development cost" },
    { href: "/services/ai-business-automation", label: "AI business automation services" },
    { href: "/services/web-application-development", label: "Web application development" },
    { href: "/custom-web-app-development-cost", label: "Custom web app development cost" },
    { href: "/services/marketing", label: "Marketing services" },
    { href: "/contact", label: "Contact DEWEB" },
  ],
  faqs: [
    {
      question: "How much does it cost to build an AI chatbot?",
      answer:
        "Many knowledge-base chatbots fall in a typical range of $25,000–$60,000, with simpler FAQ widgets starting lower and integration-heavy agents costing more. Discovery defines data sources and guardrails that drive the estimate.",
    },
    {
      question: "Do chatbot costs include LLM usage fees?",
      answer:
        "Build estimates usually cover engineering, integration, and launch readiness. Ongoing model and hosting usage is often billed separately based on traffic — DEWEB can outline expected ranges after architecture review.",
    },
    {
      question: "Can we start with a pilot before full rollout?",
      answer:
        "Yes. Phased pilots with limited sources and channels are a common way to validate usefulness before expanding scope.",
    },
    {
      question: "How does DEWEB estimate AI chatbot work?",
      answer:
        "We scope use cases, content readiness, integrations, and review workflows. Estimates are transparent assumptions — not promises about automation percentages or revenue lift.",
    },
  ],
  cta: {
    title: "Planning an AI assistant?",
    description:
      "Describe your users, knowledge sources, and handoff rules to DEWEB. We will propose a phased pilot and share an estimate after discovery.",
  },
};
