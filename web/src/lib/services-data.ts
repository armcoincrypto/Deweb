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
    price: "From $400",
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
    title: "Shopify Development",
    desc: "Shopify Plus, custom themes, and conversion-optimized storefronts.",
    tech: ["Shopify", "Stripe", "Headless"],
    timeline: "4–12 weeks",
    price: "From $500",
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
    title: "AI Chatbots & Automation",
    desc: "AI agents, chatbots, workflows, CRM sync, and intelligent operations.",
    tech: ["OpenAI", "LangChain", "n8n"],
    timeline: "2–6 weeks",
    price: "From $300",
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
    price: "From $300",
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
    price: "From $1000",
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
    price: "From $1000",
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
    price: "From $400",
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
    price: "From $400",
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
    price: "From $400",
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
    price: "From $600",
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

/** Static fallback when API is unavailable (mirrors backend services-page.json). */
export const servicesPageFallback = {
  hero: {
    title: "Build, Automate & Scale Your Business With Elite Digital Solutions",
    subtitle:
      "Shopify stores, AI chatbots, custom web apps, mobile products, and enterprise automation — delivered by verified DEWEB suppliers with transparent pricing and milestone escrow.",
    trustBadges: [
      "Shopify Experts",
      "AI Automation Specialists",
      "Custom Software Development",
      "Enterprise Solutions",
    ],
    orbitIcons: ["🛒", "🤖", "📱", "🌐", "⚡", "☁️"],
  },
  featured: [
    {
      id: "ecommerce",
      icon: "🛒",
      title: "Shopify Development",
      features: [
        "Shopify Plus & custom themes",
        "Speed optimization & CRO",
        "Payment & shipping integrations",
        "Inventory & fulfillment automation",
      ],
      timeline: "2–8 weeks",
      price: "From $500",
      highlight: "Most Requested Service",
      imageAccent: "shopify",
    },
    {
      id: "ai",
      icon: "🤖",
      title: "AI Chatbots For Websites & Businesses",
      features: [
        "24/7 customer support bots",
        "Lead qualification & booking",
        "CRM & helpdesk integrations",
        "Multilingual AI assistants",
      ],
      timeline: "2–6 weeks",
      price: "From $300",
      highlight: "Increase Conversions Up To 35%",
      imageAccent: "ai",
    },
  ],
  grid: [
    {
      id: "websites",
      icon: "🌐",
      title: "Custom Web Applications",
      desc: "Scalable web apps with modern stacks, APIs, and admin dashboards.",
      tech: ["Next.js", "React", "Node.js"],
      timeline: "4–12 weeks",
      price: "From $400",
    },
    {
      id: "mobile",
      icon: "📱",
      title: "Mobile App Development",
      desc: "iOS, Android, and cross-platform apps with polished UX.",
      tech: ["React Native", "Flutter", "iOS & Android"],
      timeline: "6–16 weeks",
      price: "From $1000",
    },
    {
      id: "saas",
      icon: "🏪",
      title: "Marketplace Development",
      desc: "Multi-vendor platforms with bidding, escrow, and supplier dashboards.",
      tech: ["Next.js", "PostgreSQL", "Stripe"],
      timeline: "8–20 weeks",
      price: "From $2500",
    },
    {
      id: "bots",
      icon: "⚡",
      title: "Telegram & Discord Bots",
      desc: "Community bots, sales automation, and support on messaging platforms.",
      tech: ["Node.js", "Python", "APIs"],
      timeline: "1–4 weeks",
      price: "From $300",
    },
    {
      id: "uiux",
      icon: "✨",
      title: "UI/UX Design",
      desc: "Product design, design systems, and high-fidelity prototypes.",
      tech: ["Figma", "Framer", "Design tokens"],
      timeline: "2–8 weeks",
      price: "From $400",
    },
    {
      id: "branding",
      icon: "🎨",
      title: "Branding & Identity",
      desc: "Logos, brand guidelines, and visual identity for digital products.",
      tech: ["Illustrator", "Figma", "Motion"],
      timeline: "2–6 weeks",
      price: "From $400",
    },
    {
      id: "seo",
      icon: "📈",
      title: "SEO & Growth",
      desc: "Technical SEO, content strategy, and conversion optimization.",
      tech: ["Analytics", "Core Web Vitals", "Content"],
      timeline: "Ongoing",
      price: "From $400",
    },
    {
      id: "marketing",
      icon: "📣",
      title: "AI Agent Automation",
      desc: "Intelligent workflows, CRM sync, and autonomous business operations.",
      tech: ["OpenAI", "LangChain", "n8n"],
      timeline: "2–6 weeks",
      price: "From $600",
    },
  ],
  stats: [
    { value: "500+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "20+", label: "Countries Served" },
    { value: "50+", label: "Expert Developers" },
    { value: "24/7", label: "Support" },
  ],
  process: [
    {
      step: 1,
      icon: "💬",
      title: "Free Consultation",
      desc: "Share your goals, budget, and timeline. We scope the project and match you with specialists.",
    },
    {
      step: 2,
      icon: "🏷️",
      title: "Supplier Bidding",
      desc: "Verified DEWEB suppliers submit competitive offers with pricing, portfolios, and delivery plans.",
    },
    {
      step: 3,
      icon: "📋",
      title: "Project Planning",
      desc: "Choose your supplier, define milestones, and lock terms with escrow-backed DEWEB payments.",
    },
    {
      step: 4,
      icon: "⚙️",
      title: "Development",
      desc: "Build in sprints with transparent progress, reviews, and direct communication.",
    },
    {
      step: 5,
      icon: "🚀",
      title: "Launch & Growth",
      desc: "Deploy, hand off documentation, and scale with ongoing support and optimization.",
    },
  ],
};
