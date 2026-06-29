/** Business/conversion content — does not affect cinematic visual system */

export const PRICING_NOTE =
  "Final price depends on project complexity, features, design requirements, and timeline.";

export type ServiceOffer = {
  slug: string;
  title: string;
  startingPrice: string;
  timeline: string;
  whatItIs: string;
  whoFor: string;
  problem: string;
  delivers: string[];
  benefits: string[];
};

export const SERVICE_OFFERS: ServiceOffer[] = [
  {
    slug: "shopify-development",
    title: "Shopify Development",
    startingPrice: "From $500",
    timeline: "2–4 weeks",
    whatItIs: "A professional Shopify store built to sell your products online with a fast, mobile-friendly shopping experience.",
    whoFor: "Brands, ecommerce businesses, and companies launching or upgrading an online store.",
    problem: "Slow stores, confusing checkout, and weak product pages lose sales every day.",
    delivers: [
      "Custom Shopify storefront",
      "Mobile-first product pages",
      "Optimized checkout flow",
      "App integrations",
      "SEO-ready structure",
      "Admin training & launch support",
    ],
    benefits: ["Higher conversion rates", "Faster mobile experience", "Easier product management", "Scalable ecommerce foundation"],
  },
  {
    slug: "ai-chatbot-development",
    title: "AI Chatbots",
    startingPrice: "From $300",
    timeline: "1–3 weeks",
    whatItIs: "A smart AI assistant that answers customer questions, collects leads, and supports your team 24/7.",
    whoFor: "Businesses that receive repeated questions and want more leads without hiring more support staff.",
    problem: "Slow replies, missed inquiries, and repetitive support work reduce sales and waste team time.",
    delivers: [
      "Custom AI chatbot",
      "Website or WhatsApp integration",
      "Lead capture flows",
      "FAQ & knowledge base setup",
      "CRM-ready handoff",
      "Analytics & conversation review",
    ],
    benefits: ["24/7 customer responses", "More qualified leads", "Less manual support work", "Faster buyer decisions"],
  },
  {
    slug: "telegram-bot-development",
    title: "Telegram Bots",
    startingPrice: "From $300",
    timeline: "1–4 weeks",
    whatItIs: "A custom Telegram bot for support, sales, payments, or Mini App experiences inside Telegram.",
    whoFor: "Businesses that want to automate conversations, capture leads, or sell through Telegram.",
    problem: "Manual messaging, slow replies, and disconnected chat workflows lose customers in Telegram channels.",
    delivers: [
      "Custom Telegram bot logic",
      "Webhook and API integrations",
      "Payment or lead capture flows",
      "Admin panel (when scoped)",
      "CRM or website sync",
      "Deployment and documentation",
    ],
    benefits: ["24/7 Telegram support", "Faster lead response", "Automated order flows", "Scalable messaging ops"],
  },
  {
    slug: "ai-business-automation",
    title: "Automation Systems",
    startingPrice: "From $600",
    timeline: "2–5 weeks",
    whatItIs: "Connected workflows that automate emails, forms, data sync, notifications, and repeated business tasks.",
    whoFor: "Teams tired of manual follow-ups, spreadsheet work, and disconnected tools.",
    problem: "Manual processes create delays, mistakes, and lost opportunities across sales and operations.",
    delivers: [
      "Workflow automation design",
      "CRM / email / form integrations",
      "API connections between tools",
      "Admin dashboard or monitoring",
      "Error handling & alerts",
      "Documentation & handoff",
    ],
    benefits: ["Hours saved every week", "Fewer manual errors", "Faster operations", "Better team focus"],
  },
  {
    slug: "web-application-development",
    title: "Business Websites",
    startingPrice: "From $400",
    timeline: "1–3 weeks",
    whatItIs: "A professional business website that explains your services clearly and turns visitors into inquiries.",
    whoFor: "Local businesses, agencies, service companies, and B2B brands that need trust and more leads.",
    problem: "Outdated or unclear websites make potential clients leave before they contact you.",
    delivers: [
      "Custom responsive website",
      "Service & about pages",
      "Contact & inquiry forms",
      "SEO-ready structure",
      "Fast loading setup",
      "CMS or admin support options",
    ],
    benefits: ["More trust and credibility", "More inquiries", "Better Google visibility", "Mobile-friendly experience"],
  },
  {
    slug: "saas-development",
    title: "SaaS / Web Apps",
    startingPrice: "From $1000",
    timeline: "4–10 weeks",
    whatItIs: "A scalable web application, dashboard, or SaaS product with users, admin tools, and growth-ready architecture.",
    whoFor: "Startups and companies turning an idea into a real digital product.",
    problem: "Without the right product structure, MVPs become expensive to rebuild and hard to scale.",
    delivers: [
      "Product architecture planning",
      "User dashboard & admin panel",
      "Authentication & roles",
      "Payments or billing setup",
      "API & database structure",
      "Launch-ready deployment",
    ],
    benefits: ["Launch faster with confidence", "Scalable product foundation", "Cleaner investor/demo readiness", "Long-term maintainability"],
  },
  {
    slug: "landing-page-development",
    title: "Landing Pages",
    startingPrice: "From $200",
    timeline: "3–10 days",
    whatItIs: "A focused high-conversion landing page built for ads, launches, lead generation, or product promos.",
    whoFor: "Businesses running ads, launching offers, or needing one page that converts visitors fast.",
    problem: "Sending paid traffic to a generic homepage wastes budget and lowers conversion rates.",
    delivers: [
      "Conversion-focused landing page",
      "Strong headline & CTA structure",
      "Lead form integration",
      "Mobile-first layout",
      "Fast loading page",
      "Analytics-ready setup",
    ],
    benefits: ["Better ad performance", "More signups and leads", "Clear campaign message", "Quick launch turnaround"],
  },
  {
    slug: "marketplace-development",
    title: "Marketplace Development",
    startingPrice: "From $2500",
    timeline: "6–12 weeks",
    whatItIs: "A multi-vendor marketplace with vendor onboarding, payments, dashboards, and secure transactions.",
    whoFor: "Businesses building a platform to connect buyers and sellers or service providers.",
    problem: "Without the right marketplace structure, platforms become hard to scale and trust breaks down early.",
    delivers: [
      "Vendor onboarding flows",
      "Payments & escrow setup",
      "User roles & dashboards",
      "Reviews & messaging",
      "Admin panel",
      "Launch-ready architecture",
    ],
    benefits: ["Monetize transactions", "Scalable platform foundation", "Better vendor management", "Secure buyer experience"],
  },
];

export function getServiceOffer(slug: string): ServiceOffer | undefined {
  return SERVICE_OFFERS.find((s) => s.slug === slug);
}

export type CaseStudy = {
  id: string;
  title: string;
  projectType: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  accent: string;
  href: string;
  demo?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "shopify-store",
    title: "Shopify Store Development",
    projectType: "Shopify Development",
    problem: "The business needed a faster mobile store and a clearer checkout flow to improve sales.",
    solution: "We rebuilt the storefront with optimized product pages, cleaner navigation, and a streamlined checkout experience.",
    result: "Example outcome: improved mobile experience and faster checkout flow",
    tech: ["Shopify", "CRO", "Klaviyo"],
    accent: "#95BF47",
    href: "/services/shopify-development",
    demo: true,
  },
  {
    id: "ai-lead-bot",
    title: "AI Chatbot for Lead Collection",
    projectType: "AI Chatbot",
    problem: "The team was missing inquiries after hours and answering the same questions manually every day.",
    solution: "We built an AI chatbot that answers FAQs, captures leads, and routes serious buyers to the sales team.",
    result: "Example outcome: 24/7 lead capture with less support workload",
    tech: ["OpenAI", "Next.js", "Webhooks"],
    accent: "#00f2ff",
    href: "/services/ai-chatbot-development",
    demo: true,
  },
  {
    id: "website-redesign",
    title: "Business Website Redesign",
    projectType: "Business Website",
    problem: "The old website looked outdated and did not explain services clearly enough to generate inquiries.",
    solution: "We redesigned the site with clearer service messaging, stronger CTAs, and a mobile-first layout.",
    result: "Example outcome: clearer service presentation and stronger trust",
    tech: ["Next.js", "SEO", "Responsive UI"],
    accent: "#38bdf8",
    href: "/services/web-application-development",
    demo: true,
  },
  {
    id: "automation-dashboard",
    title: "Automation Dashboard",
    projectType: "Automation System",
    problem: "Repeated manual tasks across forms, email follow-ups, and internal updates slowed the team down.",
    solution: "We connected the company's tools and automated key workflows with monitoring and alerts.",
    result: "Example outcome: automated repeated manual tasks and saved team hours",
    tech: ["Node.js", "API Integrations", "CRM"],
    accent: "#34d399",
    href: "/services/ai-business-automation",
    demo: true,
  },
  {
    id: "saas-admin",
    title: "SaaS Admin Panel",
    projectType: "SaaS / Web App",
    problem: "The startup needed a real product structure with users, admin controls, and scalable dashboards.",
    solution: "We built a SaaS-ready admin panel with authentication, billing hooks, and a maintainable codebase.",
    result: "Example outcome: scalable dashboard structure ready to grow",
    tech: ["Next.js", "Stripe", "SQLite"],
    accent: "#7c3aed",
    href: "/services/saas-development",
    demo: true,
  },
  {
    id: "ads-landing",
    title: "Landing Page for Ads",
    projectType: "Landing Page",
    problem: "Paid campaigns were sending traffic to a homepage that was too broad to convert visitors.",
    solution: "We created a focused landing page with one clear offer, social proof, and a strong conversion form.",
    result: "Example outcome: better campaign focus and stronger lead generation",
    tech: ["Landing Page", "Analytics", "CRO"],
    accent: "#f472b6",
    href: "/services/landing-page-development",
    demo: true,
  },
];

export const trustSignals = [
  "SEO-ready development",
  "Mobile-first design",
  "Fast loading websites",
  "Clean, maintainable code",
  "Admin panel support",
  "Blog / CMS support",
  "Multilingual website support",
  "Post-launch support",
];

export const techStack = [
  "Next.js",
  "React",
  "Node.js",
  "Shopify",
  "Stripe",
  "OpenAI",
  "SQLite / PostgreSQL",
  "Vercel / VPS hosting",
];

export const dewebProcess = [
  { step: 1, title: "Discovery", description: "We understand your goals, audience, scope, and success criteria." },
  { step: 2, title: "Design direction", description: "We define structure, messaging, UX direction, and delivery plan." },
  { step: 3, title: "Development", description: "We build your website, store, chatbot, automation, or product." },
  { step: 4, title: "Testing", description: "We test mobile, forms, speed, flows, and key business scenarios." },
  { step: 5, title: "Launch", description: "We deploy live, configure essentials, and prepare your handoff." },
  { step: 6, title: "Support", description: "We stay available for fixes, improvements, and next-step growth." },
];

export const siteFaqs = [
  {
    question: "How much does a website cost?",
    answer: "Business websites start from $400, landing pages from $200, Shopify stores from $500, AI chatbots from $300, automation systems from $600, SaaS/web apps from $1000, and marketplaces from $2500. Final pricing depends on features, design, integrations, and timeline.",
  },
  {
    question: "How long does a Shopify store take?",
    answer: "Most Shopify projects take around 2–4 weeks depending on catalog size, custom features, integrations, and content readiness.",
  },
  {
    question: "Can you build AI chatbots?",
    answer: "Yes. We build AI chatbots for websites and lead capture workflows, including FAQ automation, lead forms, and handoff to your team.",
  },
  {
    question: "Do you support after launch?",
    answer: "Yes. We provide post-launch support for fixes, improvements, content updates, and future feature development.",
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Yes. We can redesign your current website to improve clarity, mobile experience, SEO structure, and conversion performance.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes. We work with clients internationally and can communicate in English, Spanish, Russian, and Armenian.",
  },
  {
    question: "Can you create multilingual websites?",
    answer: "Yes. DeWeb supports multilingual websites and can structure content for multiple languages and markets.",
  },
  {
    question: "Can you connect payment systems?",
    answer: "Yes. We integrate Stripe, Shopify payments, and other payment flows depending on your business model.",
  },
  {
    question: "Can you automate business workflows?",
    answer: "Yes. We build automation systems that connect forms, CRM, email, APIs, dashboards, and repeated operational tasks.",
  },
];

export const contactServiceOptions = [
  { value: "shopify", label: "Shopify Store" },
  { value: "website", label: "Business Website" },
  { value: "chatbot", label: "AI Chatbot" },
  { value: "automation", label: "Automation System" },
  { value: "saas", label: "SaaS / Web App" },
  { value: "landing", label: "Landing Page" },
  { value: "marketplace", label: "Marketplace" },
  { value: "other", label: "Other" },
];

export const budgetOptions = [
  { value: "under-300", label: "Under $300" },
  { value: "300-500", label: "$300–$500" },
  { value: "500-1000", label: "$500–$1000" },
  { value: "1000-3000", label: "$1000–$3000" },
  { value: "3000-plus", label: "$3000+" },
];

export const deadlineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-weeks", label: "1–2 weeks" },
  { value: "2-4-weeks", label: "2–4 weeks" },
  { value: "1-2-months", label: "1–2 months" },
  { value: "flexible", label: "Flexible" },
];
