export const whyChooseItems = [
  {
    icon: "📈",
    title: "Built for real business growth",
    description: "Every project is designed to bring more clients, better sales, and measurable results.",
    accent: "#00f2ff",
  },
  {
    icon: "⚡",
    title: "Fast delivery",
    description: "Clear timelines, quick launches, and no unnecessary delays. From idea to live product.",
    accent: "#95BF47",
  },
  {
    icon: "📱",
    title: "Mobile-friendly & SEO-ready",
    description: "Fast, mobile-friendly websites that rank on Google and work on every device.",
    accent: "#34d399",
  },
  {
    icon: "✨",
    title: "Clear design, clean code",
    description: "Easy-to-read layouts, professional UI, and reliable code you can trust long-term.",
    accent: "#7c3aed",
  },
  {
    icon: "🎯",
    title: "Sales-focused approach",
    description: "We focus on what converts — clear messaging, strong CTAs, and pages that sell.",
    accent: "#f472b6",
  },
  {
    icon: "🛟",
    title: "Ongoing support",
    description: "We stay with you after launch for updates, fixes, and improvements.",
    accent: "#38bdf8",
  },
];

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
    title: "Shopify Plus Store",
    category: "Shopify",
    description: "Custom Shopify store with faster checkout and higher conversion rates.",
    metrics: "+34% more sales",
    tech: ["Shopify Plus", "CRO", "Klaviyo"],
    accent: "#95BF47",
    href: "/services/shopify-development",
  },
  {
    id: "ai-support",
    title: "AI Support Chatbot",
    category: "AI Chatbots",
    description: "24/7 chatbot that answers questions and collects leads automatically.",
    metrics: "68% less support work",
    tech: ["AI", "CRM", "Webhooks"],
    accent: "#00f2ff",
    href: "/services/ai-chatbot-development",
  },
  {
    id: "saas-mvp",
    title: "SaaS Dashboard",
    category: "SaaS",
    description: "Full SaaS platform with billing, admin panel, and user dashboard.",
    metrics: "Live in 8 weeks",
    tech: ["Next.js", "Stripe", "Auth"],
    accent: "#7c3aed",
    href: "/services/saas-development",
  },
  {
    id: "marketplace",
    title: "Online Marketplace",
    category: "Web App",
    description: "Multi-vendor marketplace with payments, reviews, and vendor dashboards.",
    metrics: "500+ vendors",
    tech: ["Marketplace", "Payments"],
    accent: "#c026d3",
    href: "/services/marketplace-development",
  },
  {
    id: "automation",
    title: "Business Automation",
    category: "Automation",
    description: "Automated workflows connecting sales, support, and operations tools.",
    metrics: "12 hours saved/week",
    tech: ["API", "CRM", "AI"],
    accent: "#38bdf8",
    href: "/services/ai-business-automation",
  },
  {
    id: "landing",
    title: "Lead Generation Page",
    category: "Landing Page",
    description: "High-converting landing page for ads and product launches.",
    metrics: "2.4x more leads",
    tech: ["SEO", "Analytics", "CRO"],
    accent: "#34d399",
    href: "/contact",
  },
];
