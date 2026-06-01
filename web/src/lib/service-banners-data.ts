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
  deliverables: string[];
  pricing: string;
  timeline: string;
  benefits: string[];
  visual: ServiceBannerVisual;
  /** Full-width hero row in the grid */
  featured?: boolean;
  accent?: string;
};

export const serviceBanners: ServiceBanner[] = [
  {
    id: "shopify",
    slug: "ecommerce",
    title: "Shopify Development",
    deliverables: ["Shopify Plus", "Speed & CRO", "Custom Themes", "App Integrations"],
    pricing: "$2k – $50k",
    timeline: "2–8 weeks",
    benefits: ["Scalable growth", "High-converting stores", "Seamless integrations"],
    visual: "shopify",
    featured: true,
    accent: "#95BF47",
  },
  {
    id: "ai-chatbots",
    slug: "ai",
    title: "AI Chatbots & Automation",
    deliverables: ["Custom GPT agents", "CRM integrations", "24/7 support bots", "Workflow automation"],
    pricing: "$3k – $40k",
    timeline: "2–6 weeks",
    benefits: ["Lower support costs", "Faster lead response", "Smarter operations"],
    visual: "ai",
  },
  {
    id: "custom-software",
    slug: "websites",
    title: "Custom Software Development",
    deliverables: ["Web applications", "Admin dashboards", "API development", "Cloud deployment"],
    pricing: "$5k – $80k",
    timeline: "4–16 weeks",
    benefits: ["Tailored to your workflow", "Scalable architecture", "Full ownership"],
    visual: "software",
  },
  {
    id: "marketplace",
    slug: "saas",
    title: "Marketplace Development",
    deliverables: ["Multi-vendor platform", "Escrow payments", "Supplier bidding", "Admin analytics"],
    pricing: "$15k – $120k",
    timeline: "8–20 weeks",
    benefits: ["Network effects", "Revenue from fees", "Verified suppliers"],
    visual: "marketplace",
  },
  {
    id: "mobile",
    slug: "mobile",
    title: "Mobile App Development",
    deliverables: ["iOS & Android", "React Native", "Push notifications", "App Store launch"],
    pricing: "$10k – $80k",
    timeline: "6–16 weeks",
    benefits: ["On-the-go engagement", "Brand in users' pockets", "Offline-ready UX"],
    visual: "mobile",
  },
  {
    id: "uiux",
    slug: "uiux",
    title: "UI/UX Design",
    deliverables: ["Figma prototypes", "Design systems", "User research", "Developer handoff"],
    pricing: "$2k – $30k",
    timeline: "2–8 weeks",
    benefits: ["Higher conversions", "Consistent brand UX", "Faster development"],
    visual: "uiux",
  },
  {
    id: "seo",
    slug: "seo",
    title: "SEO & Growth Marketing",
    deliverables: ["Technical SEO", "Content strategy", "Core Web Vitals", "Paid + organic funnels"],
    pricing: "$500 – $8k/mo",
    timeline: "Ongoing",
    benefits: ["Organic traffic growth", "Lower CAC over time", "Measurable ROI"],
    visual: "seo",
  },
  {
    id: "enterprise",
    slug: "websites",
    title: "Enterprise Solutions",
    deliverables: ["Custom platforms", "Security & compliance", "Dedicated support", "SLA guarantees"],
    pricing: "$50k – $250k+",
    timeline: "12–24 weeks",
    benefits: ["Mission-critical reliability", "Team augmentation", "Long-term partnership"],
    visual: "enterprise",
  },
];
