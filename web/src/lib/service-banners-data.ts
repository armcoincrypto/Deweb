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
    pricing: "$25k – $50k",
    timeline: "4–8 weeks",
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
    pricing: "$15k – $40k",
    timeline: "3–6 weeks",
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
    pricing: "$30k – $100k+",
    timeline: "8–16 weeks",
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
    pricing: "$40k – $120k+",
    timeline: "10–18 weeks",
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
    pricing: "$20k – $80k",
    timeline: "8–12 weeks",
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
    pricing: "$10k – $25k",
    timeline: "4–8 weeks",
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
    pricing: "$3k – $10k/mo",
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
    pricing: "$50k+",
    timeline: "3–12 months",
    benefits: ["Future-proof infra", "Robust security", "Enterprise integration"],
    visual: "enterprise",
    glow: "rgba(0,242,255,0.35)",
  },
];
