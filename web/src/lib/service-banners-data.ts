export type ServiceBannerVisual =
  | "shopify"
  | "ai"
  | "software"
  | "marketplace"
  | "mobile"
  | "uiux"
  | "seo"
  | "enterprise";

export type ServiceBanner = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  deliverables: string[];
  pricing: string;
  timeline: string;
  benefits: string[];
  visual: ServiceBannerVisual;
  featured?: boolean;
  accent?: string;
  glow?: string;
};

export const serviceBanners: ServiceBanner[] = [
  {
    id: "shopify",
    slug: "ecommerce",
    title: "Shopify Development",
    icon: "🛒",
    deliverables: ["Shopify Plus", "Speed", "CRO", "Custom Themes"],
    pricing: "From $500",
    timeline: "2–4 weeks",
    benefits: ["Scalable growth", "High-converting stores", "Seamless integrations"],
    visual: "shopify",
    featured: true,
    accent: "#95BF47",
    glow: "rgba(149,191,71,0.35)",
  },
  {
    id: "ai-chatbots",
    slug: "ai",
    title: "AI Chatbots & Automation",
    icon: "🤖",
    deliverables: ["24/7 Support", "Lead Gen", "CRM Integration", "Custom NLP"],
    pricing: "From $300",
    timeline: "1–3 weeks",
    benefits: ["Reduced support costs", "Increased engagement", "Instant responses"],
    visual: "ai",
    glow: "rgba(0,242,255,0.4)",
  },
  {
    id: "custom-software",
    slug: "websites",
    title: "Custom Software Development",
    icon: "💻",
    deliverables: ["Web Apps", "APIs", "Databases", "Cloud Solutions"],
    pricing: "From $400",
    timeline: "1–3 weeks",
    benefits: ["Tailored solutions", "High security", "Complete ownership"],
    visual: "software",
    glow: "rgba(124,58,237,0.35)",
  },
  {
    id: "marketplace",
    slug: "saas",
    title: "Marketplace Development",
    icon: "🏪",
    deliverables: ["Bidding", "Escrow", "User Roles", "Secure Payments"],
    pricing: "From $2500",
    timeline: "6–12 weeks",
    benefits: ["Monetize transactions", "Verified talent", "Secure environment"],
    visual: "marketplace",
    glow: "rgba(0,242,255,0.3)",
  },
  {
    id: "mobile",
    slug: "mobile",
    title: "Mobile App Development",
    icon: "📱",
    deliverables: ["iOS", "Android", "Flutter", "React Native"],
    pricing: "From $1000",
    timeline: "4–10 weeks",
    benefits: ["Cross-platform reach", "Engaging UX", "App store optimization"],
    visual: "mobile",
    glow: "rgba(0,242,255,0.35)",
  },
  {
    id: "uiux",
    slug: "uiux",
    title: "UI/UX Design",
    icon: "✨",
    deliverables: ["Research", "Prototyping", "Branding", "Design Systems"],
    pricing: "From $400",
    timeline: "2–4 weeks",
    benefits: ["Intuitive interfaces", "Brand consistency", "Higher satisfaction"],
    visual: "uiux",
    glow: "rgba(192,38,211,0.25)",
  },
  {
    id: "seo",
    slug: "seo",
    title: "SEO & Growth Marketing",
    icon: "📈",
    deliverables: ["On-page SEO", "Off-page SEO", "Content Strategy", "Analytics"],
    pricing: "From $400",
    timeline: "Ongoing",
    benefits: ["Organic traffic", "Higher rankings", "Data-driven growth"],
    visual: "seo",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    id: "enterprise",
    slug: "websites",
    title: "Enterprise Solutions",
    icon: "🏢",
    deliverables: ["Scalability", "Security", "Integration", "Custom Architecture"],
    pricing: "From $2500",
    timeline: "6–12 weeks",
    benefits: ["Future-proof infra", "Robust security", "Enterprise integration"],
    visual: "enterprise",
    glow: "rgba(0,242,255,0.35)",
  },
];
