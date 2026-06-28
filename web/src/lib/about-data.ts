export type AboutService = {
  id: string;
  slug: string;
  icon: string;
  title: string;
  desc: string;
  bullets: string[];
  featured?: boolean;
};

export const aboutStats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "20+", label: "Countries Served" },
  { value: "50+", label: "Technology Experts" },
  { value: "24/7", label: "Support" },
  { value: "100%", label: "Transparent Supplier Bidding" },
];

export const aboutServices: AboutService[] = [
  {
    id: "shopify",
    slug: "shopify-development",
    icon: "🛒",
    featured: true,
    title: "Shopify Development",
    desc: "High-converting Shopify stores, Plus migrations, and custom commerce experiences built for scale.",
    bullets: [
      "Shopify Plus & custom themes",
      "Speed optimization & CRO",
      "Payment & shipping integrations",
      "Inventory & fulfillment automation",
    ],
  },
  {
    id: "ai-chatbots",
    slug: "ai-chatbot-development",
    icon: "🤖",
    title: "AI Chatbots",
    desc: "Intelligent assistants that qualify leads, support customers, and integrate with your stack 24/7.",
    bullets: ["Lead qualification", "CRM sync", "Multilingual support", "Custom training"],
  },
  {
    id: "web-apps",
    slug: "web-application-development",
    icon: "🌐",
    title: "Custom Web Applications",
    desc: "Modern web apps with APIs, dashboards, and performance built for growth.",
    bullets: ["Next.js & React", "Admin panels", "API design", "Cloud deployment"],
  },
  {
    id: "mobile",
    slug: "mobile",
    icon: "📱",
    title: "Mobile App Development",
    desc: "Native and cross-platform apps with polished UX and reliable backends.",
    bullets: ["iOS & Android", "React Native", "Push notifications", "App Store launch"],
  },
  {
    id: "ai-automation",
    slug: "ai-business-automation",
    icon: "⚙️",
    title: "AI Automation",
    desc: "Workflow automation, intelligent agents, and operations that run while you sleep.",
    bullets: ["n8n workflows", "OpenAI agents", "CRM automation", "Process mapping"],
  },
  {
    id: "marketplace",
    slug: "marketplace-development",
    icon: "🏪",
    title: "Marketplace Development",
    desc: "Multi-vendor platforms with bidding, escrow, and supplier dashboards.",
    bullets: ["Vendor onboarding", "Escrow payments", "Bidding engine", "Admin analytics"],
  },
  {
    id: "telegram",
    slug: "telegram-bot-development",
    icon: "⚡",
    title: "Telegram Bots",
    desc: "Sales, support, and community bots on Telegram and Discord.",
    bullets: ["Sales automation", "Community tools", "API integrations", "Admin panels"],
  },
  {
    id: "saas",
    slug: "saas-development",
    icon: "☁️",
    title: "SaaS Platforms",
    desc: "Subscription products with auth, billing, and multi-tenant architecture.",
    bullets: ["Stripe billing", "User roles", "Multi-tenant", "Scalable infra"],
  },
  {
    id: "uiux",
    slug: "uiux",
    icon: "✨",
    title: "UI/UX Design",
    desc: "Product design, design systems, and prototypes that convert.",
    bullets: ["Figma design", "Design systems", "User research", "Developer handoff"],
  },
  {
    id: "seo",
    slug: "seo",
    icon: "📈",
    title: "SEO & Growth",
    desc: "Technical SEO, content strategy, and conversion-focused growth.",
    bullets: ["Technical audits", "Core Web Vitals", "Content strategy", "Analytics"],
  },
];

export const aboutProcess = [
  { step: 1, icon: "💬", title: "Consultation", desc: "Scope goals, budget, and timeline with our team." },
  { step: 2, icon: "🏷️", title: "Supplier Competition", desc: "Verified suppliers submit competitive offers." },
  { step: 3, icon: "📋", title: "Planning", desc: "Define milestones and lock terms with escrow." },
  { step: 4, icon: "⚙️", title: "Development", desc: "Build in sprints with transparent progress." },
  { step: 5, icon: "🚀", title: "Launch", desc: "Deploy, test, and hand off with documentation." },
  { step: 6, icon: "📈", title: "Support & Growth", desc: "Scale with ongoing optimization and support." },
];

export const aboutTechnologies = [
  { name: "Shopify", color: "#96bf48" },
  { name: "Next.js", color: "#ffffff" },
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Node.js", color: "#68a063" },
  { name: "Python", color: "#3776ab" },
  { name: "OpenAI", color: "#10a37f" },
  { name: "LangChain", color: "#1c3c3c" },
  { name: "n8n", color: "#ea4b71" },
  { name: "AWS", color: "#ff9900" },
  { name: "Docker", color: "#2496ed" },
  { name: "PostgreSQL", color: "#336791" },
];

export const platformModules = [
  { label: "Marketplace", icon: "🏪", x: "8%", y: "18%" },
  { label: "Shopify", icon: "🛒", x: "78%", y: "12%" },
  { label: "Web Apps", icon: "🌐", x: "85%", y: "55%" },
  { label: "Mobile Apps", icon: "📱", x: "12%", y: "62%" },
  { label: "AI", icon: "🤖", x: "72%", y: "78%" },
  { label: "Automation", icon: "⚡", x: "18%", y: "82%" },
  { label: "Cloud Solutions", icon: "☁️", x: "48%", y: "8%" },
];

export const heroFloatIcons = [
  { icon: "🛒", label: "Shopify", x: "18%", y: "28%", delay: 0 },
  { icon: "🤖", label: "AI", x: "78%", y: "22%", delay: 0.5 },
  { icon: "🌐", label: "Web", x: "12%", y: "68%", delay: 1 },
  { icon: "📱", label: "Mobile", x: "82%", y: "72%", delay: 1.5 },
  { icon: "⚡", label: "Automation", x: "50%", y: "15%", delay: 0.8 },
];
