export type ServiceCategory = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tech: string[];
  timeline: string;
  price: string;
  overview: string;
  offering: string;
  meaning: string;
  includes: string[];
  deliverables: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "websites",
    icon: "🌐",
    title: "Websites",
    desc: "Corporate sites, landing pages, and web apps with modern stacks.",
    tech: ["Next.js", "React", "WordPress"],
    timeline: "2–8 weeks",
    price: "$2k – $25k",
    overview:
      "We build fast, responsive websites that convert visitors into customers — from simple landing pages to full corporate portals.",
    offering:
      "Custom design, development, CMS setup, hosting guidance, and launch support with milestone-based delivery.",
    meaning:
      "A professional website is your digital storefront — it builds trust, explains your value, and drives leads 24/7.",
    includes: [
      "Responsive UI for all devices",
      "SEO-ready structure and meta tags",
      "Contact forms and analytics setup",
      "CMS or admin panel (if needed)",
      "Performance optimization",
      "30-day post-launch support",
    ],
    deliverables: ["Figma designs", "Production website", "Documentation", "Training session"],
  },
  {
    id: "ecommerce",
    icon: "🛒",
    title: "E-commerce",
    desc: "Shopify, WooCommerce, and custom storefronts with payments.",
    tech: ["Shopify", "Stripe", "Headless"],
    timeline: "4–12 weeks",
    price: "$5k – $50k",
    overview:
      "Full online stores with product catalogs, secure checkout, inventory management, and conversion optimization.",
    offering:
      "Platform selection, store design, payment integration, shipping setup, and marketing-ready product pages.",
    meaning:
      "E-commerce lets you sell products globally with automated payments, order tracking, and scalable inventory.",
    includes: [
      "Product catalog and categories",
      "Stripe / PayPal / crypto payments",
      "Cart and checkout flow",
      "Order management dashboard",
      "Email notifications",
      "Mobile-optimized shopping experience",
    ],
    deliverables: ["Store design", "Live storefront", "Admin training", "Payment setup guide"],
  },
  {
    id: "ai",
    icon: "🤖",
    title: "AI Automation",
    desc: "Agents, workflows, CRM sync, and intelligent operations.",
    tech: ["OpenAI", "LangChain", "n8n"],
    timeline: "2–6 weeks",
    price: "$3k – $40k",
    overview:
      "Intelligent automation that saves hours — AI agents, smart workflows, and CRM integrations tailored to your business.",
    offering:
      "Discovery of repetitive tasks, custom AI agent design, workflow automation, and ongoing optimization.",
    meaning:
      "AI automation replaces manual work with intelligent systems that learn, adapt, and scale with your operations.",
    includes: [
      "Task analysis and automation map",
      "Custom AI agent or chatbot",
      "CRM / tool integrations",
      "Workflow triggers and alerts",
      "Monitoring dashboard",
      "Documentation and handoff",
    ],
    deliverables: ["Automation blueprint", "Live AI system", "Integration setup", "Support guide"],
  },
  {
    id: "bots",
    icon: "⚡",
    title: "Bots",
    desc: "Telegram, Discord, and support bots with integrations.",
    tech: ["Node.js", "Python", "APIs"],
    timeline: "1–4 weeks",
    price: "$1k – $15k",
    overview:
      "Custom bots for Telegram, Discord, and web chat that handle support, notifications, and user engagement.",
    offering:
      "Bot design, API integrations, admin panels, and deployment on your preferred messaging platform.",
    meaning:
      "Bots provide instant 24/7 responses, automate customer support, and keep your community engaged.",
    includes: [
      "Custom bot logic and commands",
      "API and database integrations",
      "Admin control panel",
      "Multi-language support",
      "Analytics and logging",
      "Hosting and deployment",
    ],
    deliverables: ["Working bot", "Admin panel", "Source code", "Setup documentation"],
  },
  {
    id: "saas",
    icon: "☁️",
    title: "SaaS",
    desc: "Multi-tenant platforms, dashboards, and subscription billing.",
    tech: ["Next.js", "PostgreSQL", "Auth"],
    timeline: "8–20 weeks",
    price: "$15k – $120k",
    overview:
      "Full SaaS products with user auth, subscription billing, admin dashboards, and scalable architecture.",
    offering:
      "MVP to production SaaS — from architecture design to subscription payments and user management.",
    meaning:
      "SaaS turns your software idea into a recurring-revenue business with automated billing and user management.",
    includes: [
      "User authentication and roles",
      "Subscription billing (Stripe)",
      "Admin and user dashboards",
      "Multi-tenant architecture",
      "API design and documentation",
      "Deployment and scaling setup",
    ],
    deliverables: ["MVP product", "Admin dashboard", "API docs", "Deployment pipeline"],
  },
  {
    id: "mobile",
    icon: "📱",
    title: "Mobile Apps",
    desc: "iOS, Android, and cross-platform product builds.",
    tech: ["React Native", "Flutter", "Swift"],
    timeline: "6–16 weeks",
    price: "$10k – $80k",
    overview:
      "Native and cross-platform mobile apps for iOS and Android with polished UX and backend integration.",
    offering:
      "UI/UX design, development, App Store / Play Store submission, and backend API integration.",
    meaning:
      "Mobile apps put your product in users' pockets — enabling push notifications, offline access, and on-the-go engagement.",
    includes: [
      "iOS and Android builds",
      "Push notifications",
      "Backend API integration",
      "App Store submission",
      "Analytics and crash reporting",
      "Post-launch updates (30 days)",
    ],
    deliverables: ["App designs", "Published app", "Source code", "Store listing assets"],
  },
  {
    id: "uiux",
    icon: "✨",
    title: "UI/UX",
    desc: "Product design, design systems, and high-fidelity prototypes.",
    tech: ["Figma", "Framer", "Design tokens"],
    timeline: "2–8 weeks",
    price: "$2k – $30k",
    overview:
      "User-centered design that makes products intuitive, beautiful, and conversion-focused.",
    offering:
      "User research, wireframes, high-fidelity prototypes, design systems, and developer handoff.",
    meaning:
      "Great UI/UX reduces friction, increases conversions, and makes users love your product from the first click.",
    includes: [
      "User research and personas",
      "Wireframes and user flows",
      "High-fidelity Figma designs",
      "Interactive prototypes",
      "Design system and components",
      "Developer handoff specs",
    ],
    deliverables: ["Figma file", "Prototype link", "Design system", "Handoff documentation"],
  },
  {
    id: "branding",
    icon: "🎨",
    title: "Branding",
    desc: "Identity, logos, and brand guidelines for digital products.",
    tech: ["Illustrator", "Figma", "Motion"],
    timeline: "2–6 weeks",
    price: "$1.5k – $20k",
    overview:
      "Complete brand identity — logo, colors, typography, and guidelines that make your business memorable.",
    offering:
      "Brand strategy, logo design, visual identity, brand book, and social media templates.",
    meaning:
      "Strong branding creates recognition and trust — it tells your story before you say a word.",
    includes: [
      "Logo design (multiple concepts)",
      "Color palette and typography",
      "Brand guidelines document",
      "Social media templates",
      "Business card and letterhead",
      "Brand asset library",
    ],
    deliverables: ["Logo files", "Brand book PDF", "Template pack", "Asset library"],
  },
  {
    id: "seo",
    icon: "📈",
    title: "SEO",
    desc: "Technical SEO, content strategy, and growth optimization.",
    tech: ["Analytics", "Core Web Vitals", "Content"],
    timeline: "Ongoing",
    price: "$500 – $8k/mo",
    overview:
      "Data-driven SEO that improves rankings, drives organic traffic, and grows your online visibility.",
    offering:
      "Technical audit, keyword strategy, on-page optimization, content plan, and monthly reporting.",
    meaning:
      "SEO ensures your target customers find you on Google — turning search traffic into leads and sales.",
    includes: [
      "Technical SEO audit",
      "Keyword research and strategy",
      "On-page optimization",
      "Content calendar",
      "Backlink strategy",
      "Monthly performance reports",
    ],
    deliverables: ["SEO audit report", "Keyword map", "Optimized pages", "Monthly analytics"],
  },
  {
    id: "marketing",
    icon: "📣",
    title: "Marketing",
    desc: "Paid ads, funnels, email, and conversion-focused campaigns.",
    tech: ["Meta Ads", "Google", "Email"],
    timeline: "Ongoing",
    price: "$1k – $15k/mo",
    overview:
      "Performance marketing campaigns that drive leads, sales, and measurable ROI across channels.",
    offering:
      "Ad strategy, creative production, funnel setup, A/B testing, and conversion optimization.",
    meaning:
      "Marketing turns attention into revenue — reaching the right audience with the right message at the right time.",
    includes: [
      "Campaign strategy and setup",
      "Ad creative production",
      "Landing page optimization",
      "Email marketing sequences",
      "A/B testing and analytics",
      "Weekly performance reports",
    ],
    deliverables: ["Campaign plan", "Ad creatives", "Funnel setup", "Performance dashboard"],
  },
];

export function getServiceById(id: string) {
  return serviceCategories.find((s) => s.id === id);
}
