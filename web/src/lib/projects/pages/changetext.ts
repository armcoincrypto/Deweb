import type { ProjectPage } from "../types";

export const changetext: ProjectPage = {
  slug: "changetext",
  path: "/projects/changetext",
  seoKey: "projects-changetext",
  kicker: "Production case study · AI automation",
  title: "Changetext — AI Telegram Content Automation System",
  headline: "Changetext — AI Telegram Content Automation System",
  summary:
    "A Telegram-based content automation system integrating OpenAI, Google Sheets, and structured workflows for repeatable publishing with operational reliability.",
  projectType: "AI · Telegram automation",
  accent: "#10b981",
  tags: ["Telegram Bot", "OpenAI", "Google Sheets", "Automation", "Content workflows"],
  sections: [
    {
      title: "Overview",
      paragraphs: [
        "Changetext automates content processing and publishing through Telegram, connecting editorial inputs in Google Sheets to OpenAI-assisted transformations and scheduled bot delivery.",
        "DEWEB built the bot orchestration layer, integration boundaries, and failure-handling patterns needed for daily automation rather than one-off scripts.",
      ],
    },
    {
      title: "Workflow Design",
      paragraphs: [
        "The system treats each content run as a pipeline with explicit stages — ingest, transform, review gates where configured, and publish — so operators can trace failures to a single step.",
      ],
      list: [
        "Sheet-driven content intake with row-level job identity",
        "Prompt templates parameterized per content type",
        "Telegram delivery channels segmented by audience or topic",
        "Operator notifications on failures or ambiguous outputs",
      ],
    },
    {
      title: "Integrations",
      paragraphs: ["Integrations were isolated behind service adapters to simplify rotation, testing, and credential management."],
      list: [
        "Telegram Bot API for message delivery and command hooks",
        "OpenAI API for structured text generation and rewriting",
        "Google Sheets API for source content and status columns",
        "Optional webhook endpoints for external triggers",
      ],
    },
    {
      title: "Automation Logic",
      paragraphs: [
        "Automation rules encode when to process rows, how to batch requests, and how to mark completion back to the sheet — preventing duplicate publishes.",
      ],
      list: [
        "Idempotent job keys tied to sheet row identifiers",
        "Rate-aware scheduling for API limits",
        "Content validation before send — length, format, and blocked patterns",
        "Retry policies for transient integration failures",
      ],
    },
    {
      title: "Reliability",
      paragraphs: [
        "Production bots fail on edge cases — empty rows, API timeouts, and partial sheet updates. The system logs each stage and preserves row state for manual retry.",
      ],
      list: [
        "Structured logging with correlation IDs per content job",
        "Dead-letter style queue for rows that fail validation",
        "Health checks for integration credentials and bot connectivity",
        "Graceful degradation when optional AI steps are skipped by config",
      ],
    },
    {
      title: "Outcome",
      paragraphs: [
        "Changetext delivers repeatable Telegram content automation with sheet-operable workflows suitable for teams that need AI-assisted publishing without manual copy-paste loops.",
        "Capabilities are described in engineering terms — throughput depends on sheet volume, API limits, and operator configuration.",
      ],
    },
  ],
  relatedServices: [
    { href: "/services/ai-business-automation", label: "AI business automation" },
    { href: "/services/telegram-bot-development", label: "Telegram bot development" },
    { href: "/services/saas-development", label: "SaaS development" },
    { href: "/contact", label: "Contact DEWEB" },
    { href: "/marketplace", label: "DEWEB Marketplace" },
  ],
  cta: {
    title: "Need Telegram or AI content automation?",
    description:
      "Contact DEWEB to design bot workflows, integrations, and reliable automation pipelines — scoped discovery, no fake performance statistics.",
  },
  breadcrumbCurrent: "Changetext",
  githubDocPath: "docs/projects/changetext-case-study.md",
};
