export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  tech: string[];
  accent: string;
  href: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "shopify-plus",
    title: "Shopify Plus Ecommerce Store",
    category: "Shopify Development",
    description: "Custom Shopify Plus storefront with CRO-focused UX, speed optimization, and subscription flows.",
    metrics: "+34% conversion rate",
    tech: ["Shopify Plus", "Liquid", "CRO", "Klaviyo"],
    accent: "#95BF47",
    href: "/services/shopify-development",
  },
  {
    id: "ai-support",
    title: "AI Customer Support Platform",
    category: "AI Chatbots",
    description: "24/7 AI chatbot integrated with CRM, lead qualification, and human handoff workflows.",
    metrics: "68% support cost reduction",
    tech: ["OpenAI", "CRM", "Webhooks", "Analytics"],
    accent: "#00f2ff",
    href: "/services/ai-chatbot-development",
  },
  {
    id: "saas-mvp",
    title: "SaaS Analytics Dashboard",
    category: "SaaS Development",
    description: "MVP SaaS platform with admin panel, subscription billing, and real-time product metrics.",
    metrics: "MVP in 8 weeks",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Auth"],
    accent: "#7c3aed",
    href: "/services/saas-development",
  },
  {
    id: "marketplace",
    title: "Multi-Vendor Marketplace",
    category: "Web Development",
    description: "Two-sided marketplace with vendor dashboards, escrow payments, and trust systems.",
    metrics: "500+ vendors onboarded",
    tech: ["Marketplace", "Payments", "Reviews", "Admin"],
    accent: "#c026d3",
    href: "/services/marketplace-development",
  },
  {
    id: "automation",
    title: "Business Automation Suite",
    category: "Automation Systems",
    description: "End-to-end workflow automation connecting sales, support, and operations tools.",
    metrics: "12h/week saved per team",
    tech: ["Zapier", "API", "AI", "CRM"],
    accent: "#38bdf8",
    href: "/services/ai-business-automation",
  },
  {
    id: "landing",
    title: "High-Converting Landing Page",
    category: "Landing Pages",
    description: "Premium campaign landing page with A/B-tested hero, forms, and performance optimization.",
    metrics: "2.4x lead capture",
    tech: ["Next.js", "SEO", "Analytics", "CRO"],
    accent: "#34d399",
    href: "/contact",
  },
];

export const whyChooseItems = [
  {
    icon: "⚡",
    title: "Fast Delivery",
    description: "Agile sprints and clear milestones — launch Shopify stores, MVPs, and automations on schedule.",
    accent: "#00f2ff",
  },
  {
    icon: "🔍",
    title: "SEO Optimized",
    description: "Technical SEO, structured data, and content architecture built into every project from day one.",
    accent: "#7c3aed",
  },
  {
    icon: "📱",
    title: "Mobile Responsive",
    description: "Flawless experiences on every device — mobile-first design and performance testing included.",
    accent: "#34d399",
  },
  {
    icon: "✨",
    title: "Modern UI/UX",
    description: "Premium Antigravity-inspired interfaces with 3D depth, glassmorphism, and conversion-focused layouts.",
    accent: "#c026d3",
  },
  {
    icon: "📈",
    title: "Scalable Solutions",
    description: "Architecture that grows with your business — from MVP to enterprise without costly rewrites.",
    accent: "#95BF47",
  },
  {
    icon: "🛟",
    title: "Ongoing Support",
    description: "Post-launch maintenance, optimization, and feature iterations from the same expert team.",
    accent: "#38bdf8",
  },
];
