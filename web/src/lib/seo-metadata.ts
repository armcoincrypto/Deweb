/**
 * Unique SEO titles & descriptions per route.
 * Add new static pages to PAGE_SEO; services/blog are keyed by slug.
 */

export type SeoEntry = { title: string; description: string };

export const PAGE_SEO: Record<string, SeoEntry> = {
  home: {
    title: "DeWeb | Building The Future Of Digital Business",
    description:
      "We create Shopify stores, AI systems, automation platforms, websites and scalable digital solutions. Premium technology company for growing businesses.",
  },
  about: {
    title: "About DEWEB | Premium IT Development Agency",
    description:
      "Meet DEWEB — a premium agency for Shopify development, AI automation, SaaS products, marketplaces, and custom web applications.",
  },
  contact: {
    title: "Contact DEWEB | Start Your Shopify, AI or SaaS Project",
    description:
      "Get a free consultation for Shopify development, AI automation, SaaS MVPs, or marketplace builds. DEWEB responds within 24 hours.",
  },
  services: {
    title: "Digital Services | Shopify, AI Automation, SaaS & Web Apps | DEWEB",
    description:
      "Explore DEWEB services: Shopify development, AI chatbots, business automation, SaaS platforms, marketplace builds, and custom web applications.",
  },
  marketplace: {
    title: "Software Development Marketplace | Hire Developers & Technical Experts | DEWEB",
    description:
      "Post your software project, compare technical specialists, and connect with developers, designers, AI automation experts, and digital teams through DEWEB Marketplace.",
  },
  "hire-web-developers": {
    title: "Hire Web Developers | Post Projects & Compare Proposals | DEWEB Marketplace",
    description:
      "Hire web developers through DEWEB Marketplace — post your project, compare proposals, and staff front-end, back-end, and full-stack builds with transparent budgets and timelines.",
  },
  "hire-telegram-bot-developers": {
    title: "Hire Telegram Bot Developers | Post Bot Projects & Compare Proposals | DEWEB",
    description:
      "Hire Telegram bot developers on DEWEB Marketplace — post support bots, Mini Apps, payment flows, and CRM integrations; compare specialist proposals with clear budgets and timelines.",
  },
  "hire-ai-automation-specialists": {
    title: "Hire AI Automation Specialists | Post Projects & Compare Proposals | DEWEB",
    description:
      "Hire AI automation specialists through DEWEB Marketplace — post workflow, integration, and intelligent operations projects; compare proposals from vetted automation engineers.",
  },
  "hire-marketplace-developers": {
    title: "Hire Marketplace Developers | Post Projects & Compare Proposals | DEWEB",
    description:
      "Hire marketplace developers through DEWEB — post multi-vendor platform projects, compare proposals, and staff engineers for payments, commissions, admin panels, and scalable marketplace architecture.",
  },
  "dedicated-development-team": {
    title: "Dedicated Development Team | Hire Dedicated Software Engineers | DEWEB",
    description:
      "Build a dedicated software development team with DEWEB — long-term engineering capacity for startups, SaaS, marketplaces, mobile apps, and ecommerce with transparent scoped discovery.",
  },
  "mvp-development-cost": {
    title: "MVP Development Cost (2026) | Typical Budget Ranges | DEWEB",
    description:
      "Planning estimates for MVP development in 2026 — prototype, launch-ready MVP, and post-launch iteration ranges. Scoped discovery required before any firm quote.",
  },
  "custom-web-app-development-cost": {
    title: "Custom Web App Development Cost (2026) | Budget Guide | DEWEB",
    description:
      "Typical custom web application development cost ranges — internal tools, customer portals, and platform builds with scope-based disclaimers from DEWEB.",
  },
  "marketplace-development-cost": {
    title: "Marketplace Development Cost (2026) | Multi-Vendor Budget Guide | DEWEB",
    description:
      "Marketplace development cost planning guide — MVP, growth-stage, and enterprise ranges for multi-vendor platforms. Estimate only; discovery required.",
  },
  "ai-chatbot-development-cost": {
    title: "AI Chatbot Development Cost (2026) | Typical Ranges | DEWEB",
    description:
      "AI chatbot development cost guide — FAQ bots, lead capture assistants, and integrated support automation with transparent scope disclaimers.",
  },
  "hire-nextjs-developers": {
    title: "Hire Next.js Developers | Compare Proposals & Scope Projects | DEWEB",
    description:
      "Hire Next.js developers through DEWEB — post projects, compare specialist proposals, and staff React/Next.js builds with clear budgets and timelines.",
  },
  "hire-shopify-developers": {
    title: "Hire Shopify Developers | Store Builds & Custom Apps | DEWEB",
    description:
      "Hire Shopify developers for storefront builds, theme work, and custom apps — compare proposals on DEWEB Marketplace or request agency delivery.",
  },
  "hire-react-developers": {
    title: "Hire React Developers | Typical Rates & Team Budgets | DEWEB",
    description:
      "Hire React developers through DEWEB — compare specialist proposals, typical rate ranges, and squad budgets for product and marketing builds.",
  },
  "hire-full-stack-developers": {
    title: "Hire Full-Stack Developers | Scope Projects & Compare Teams | DEWEB",
    description:
      "Full-stack developer hiring guide — typical hourly rates, squad budgets, and fixed-scope estimates for web products with clear discovery disclaimers.",
  },
  "ecommerce-development-cost": {
    title: "Ecommerce Development Cost (2026) | Typical Budget Ranges | DEWEB",
    description:
      "Ecommerce development cost planning guide — Shopify, custom storefronts, and marketplace-adjacent builds with scope-based estimate disclaimers.",
  },
  "mobile-app-development-cost": {
    title: "Mobile App Development Cost (2026) | iOS & Android Ranges | DEWEB",
    description:
      "Mobile app development cost guide — MVP, cross-platform, and native builds with typical ranges and discovery-required disclaimers from DEWEB.",
  },
  "dedicated-development-team-cost": {
    title: "Dedicated Development Team Cost (2026) | Monthly Squad Budgets | DEWEB",
    description:
      "Dedicated development team cost guide — typical monthly squad ranges, role mix, and engagement models with transparent scope disclaimers.",
  },
  "ai-automation-development-cost": {
    title: "AI Automation Development Cost (2026) | Workflow & Integration Ranges | DEWEB",
    description:
      "AI automation development cost guide — workflow bots, integrations, and ops automation with typical ranges and discovery-required estimates.",
  },
  portfolio: {
    title: "DEWEB Projects | Production Case Studies & Engineering Portfolio",
    description:
      "Real DEWEB production projects — fintech payments, crypto exchange, AI Telegram automation, and Web3 DEX engineering case studies with architecture detail.",
  },
  "projects-kobbopay": {
    title: "Kobbopay Case Study | Multi-Rail Crypto Payment Platform | DEWEB",
    description:
      "Production case study: Kobbopay multi-rail USDT payment platform — NestJS, PostgreSQL, Redis, merchant portal, admin ops, webhooks, and treasury management.",
  },
  "projects-exswaping": {
    title: "Exswaping Case Study | Cryptocurrency Exchange Platform | DEWEB",
    description:
      "Production case study: Exswaping crypto exchange — trading workflows, admin operations, AML/KYC processes, liquidity ops, monitoring, and SEO engineering.",
  },
  "projects-changetext": {
    title: "Changetext Case Study | AI Telegram Content Automation | DEWEB",
    description:
      "Production case study: Changetext — Telegram bot automation with OpenAI, Google Sheets integrations, and reliable content workflow pipelines.",
  },
  "projects-dex-kobbex": {
    title: "DEX Kobbex Case Study | Decentralized Swap Platform | DEWEB",
    description:
      "Production case study: DEX Kobbex Web3 swap platform — wallet integration, token swap flows, and frontend architecture for on-chain trading UX.",
  },
  blog: {
    title: "DEWEB Blog | Shopify, AI Automation & SaaS Growth Guides",
    description:
      "Expert guides on Shopify development, AI automation, SaaS growth, marketplace strategy, and web application development.",
  },
  "privacy-policy": {
    title: "Privacy Policy | DEWEB",
    description:
      "How DEWEB collects, uses, stores, and protects your personal data on dewebam.com.",
  },
  "cookie-policy": {
    title: "Cookie Policy | DEWEB",
    description:
      "Learn how DEWEB uses cookies and local storage for login, security, and site preferences.",
  },
  terms: {
    title: "Terms of Use | DEWEB",
    description:
      "Terms and conditions for using the DEWEB IT marketplace, accounts, and project services.",
  },
  login: {
    title: "Sign In | DEWEB Account",
    description: "Sign in to your DEWEB account to manage projects, listings and messages.",
  },
  signup: {
    title: "Create Account | Join DEWEB Marketplace",
    description:
      "Create a DEWEB account as a customer or supplier. Post projects, submit offers and connect with verified developers.",
  },
  "forgot-password": {
    title: "Reset Password | DEWEB",
    description: "Reset your DEWEB account password securely via email.",
  },
  "reset-password": {
    title: "Set New Password | DEWEB",
    description: "Choose a new password for your DEWEB account.",
  },
  "verify-email": {
    title: "Verify Email | DEWEB",
    description: "Verify your email address to unlock all DEWEB platform features.",
  },
  account: {
    title: "My Account | DEWEB Dashboard",
    description: "Manage your DEWEB profile, listings, messages and project activity.",
  },
  profile: {
    title: "My Profile | DEWEB Account Settings",
    description: "Update your DEWEB profile, contact details and account preferences.",
  },
  listings: {
    title: "My Listings | DEWEB Marketplace",
    description: "Create and manage your project listings and service offers on DEWEB.",
  },
  messages: {
    title: "Messages | DEWEB Project Chat",
    description: "View and reply to project conversations and deal chats on DEWEB.",
  },
  proposals: {
    title: "My Proposals | DEWEB Supplier Dashboard",
    description: "Browse open projects and submit competitive proposals to DEWEB customers.",
  },
  projects: {
    title: "My Projects | DEWEB Customer Dashboard",
    description: "Post projects, review supplier proposals and track delivery on DEWEB.",
  },
  "submit-offer": {
    title: "Submit Your Offer | DEWEB",
    description:
      "Submit your service offer or project request. DEWEB team will contact you to negotiate terms.",
  },
  admin: {
    title: "Admin Dashboard | DEWEB",
    description: "DEWEB administration panel for leads, users and platform management.",
  },
  dashboard: {
    title: "Dashboard | DEWEB",
    description: "DEWEB customer and supplier dashboard overview.",
  },
  pricing: {
    title: "Pricing & Project Quotes | DEWEB Marketplace",
    description:
      "Get competitive quotes from verified developers. Post your project on DEWEB and compare proposals by price and timeline.",
  },
  "dashboard-customer": {
    title: "Customer Dashboard | DEWEB",
    description: "Manage your DEWEB customer account, projects, offers and messages.",
  },
  "dashboard-supplier": {
    title: "Supplier Dashboard | DEWEB",
    description: "Manage your DEWEB supplier account, products, proposals and orders.",
  },
  "dashboard-customer-projects": {
    title: "Customer Projects | DEWEB Dashboard",
    description: "View and manage your posted projects on the DEWEB customer dashboard.",
  },
  "dashboard-customer-offers": {
    title: "Customer Offers | DEWEB Dashboard",
    description: "Review supplier offers and proposals on your DEWEB customer dashboard.",
  },
  "dashboard-customer-messages": {
    title: "Customer Messages | DEWEB Dashboard",
    description: "Project conversations and deal messages on your DEWEB customer dashboard.",
  },
  "dashboard-supplier-products": {
    title: "Supplier Products | DEWEB Dashboard",
    description: "Manage your product listings and service catalog on DEWEB.",
  },
  "dashboard-supplier-proposals": {
    title: "Supplier Proposals | DEWEB Dashboard",
    description: "Submit and track competitive proposals on the DEWEB supplier dashboard.",
  },
  "dashboard-supplier-orders": {
    title: "Supplier Orders | DEWEB Dashboard",
    description: "Track order status and delivery milestones on your DEWEB supplier dashboard.",
  },
  "dashboard-supplier-analytics": {
    title: "Supplier Analytics | DEWEB Dashboard",
    description: "Performance metrics, conversion data and analytics for DEWEB suppliers.",
  },
};

export const SERVICE_SEO: Record<string, SeoEntry> = {
  websites: {
    title: "Custom Website Development Services | DEWEB",
    description:
      "Professional websites, landing pages and web applications built with Next.js, React and modern stacks.",
  },
  ecommerce: {
    title: "Shopify Development Services | DEWEB",
    description:
      "Custom Shopify stores, themes, integrations and ecommerce solutions for growing businesses.",
  },
  ai: {
    title: "AI Automation & Chatbot Development | DEWEB",
    description:
      "AI chatbots, automation systems and intelligent business solutions built by DEWEB.",
  },
  bots: {
    title: "Telegram & Discord Bot Development | DEWEB",
    description:
      "Custom Telegram, Discord and support bots with API integrations and admin panels.",
  },
  saas: {
    title: "SaaS Platform Development | DEWEB",
    description:
      "Multi-tenant SaaS products with auth, subscription billing, dashboards and scalable architecture.",
  },
  mobile: {
    title: "Mobile App Development Services | DEWEB",
    description:
      "iOS, Android and cross-platform mobile apps with polished UX and backend integration.",
  },
  uiux: {
    title: "UI/UX Design Services | DEWEB",
    description:
      "User-centered product design, wireframes, prototypes and design systems for digital products.",
  },
  branding: {
    title: "Branding & Identity Design | DEWEB",
    description:
      "Logo design, brand identity, visual guidelines and marketing assets for digital businesses.",
  },
  seo: {
    title: "SEO & Growth Marketing Services | DEWEB",
    description:
      "Technical SEO audits, keyword strategy, on-page optimization and organic growth campaigns.",
  },
  marketing: {
    title: "Digital Marketing Services | DEWEB",
    description:
      "Paid ads, conversion funnels, email marketing and performance campaigns that drive ROI.",
  },
};

export const LANDING_SEO: Record<string, SeoEntry> = {
  "shopify-development": {
    title: "Shopify Development Services | Custom Stores & Integrations | DEWEB",
    description:
      "Expert Shopify development — custom themes, Shopify Plus, app integrations and ecommerce optimization by verified DEWEB developers.",
  },
  "shopify-store-design": {
    title: "Shopify Store Design Services | Ecommerce UX & Branding | DEWEB",
    description:
      "High-converting Shopify store design — mobile-first UX, brand identity and Figma-to-theme handoff by DEWEB designers.",
  },
  "shopify-custom-apps": {
    title: "Shopify Custom App Development | Private & Public Apps | DEWEB",
    description:
      "Custom Shopify apps — checkout extensions, admin tools, ERP connectors and Shopify App Store publishing by DEWEB engineers.",
  },
  "ai-chatbot-development": {
    title: "AI Chatbot Development Services | GPT Assistants & Automation | DEWEB",
    description:
      "Custom AI chatbots, RAG knowledge bases, CRM integrations and workflow automation built by DEWEB AI engineers.",
  },
  "ai-business-automation": {
    title: "AI Business Automation Services | Workflows & Intelligent Ops | DEWEB",
    description:
      "AI-powered business automation — workflow orchestration, document processing, CRM sync and intelligent operations by DEWEB.",
  },
  "web-application-development": {
    title: "Web Application Development Services | SaaS & Custom Apps | DEWEB",
    description:
      "Custom web applications and SaaS platforms with Next.js, React, APIs and cloud deployment by DEWEB developers.",
  },
  "marketplace-development": {
    title: "Marketplace Development Services | Two-Sided Platforms | DEWEB",
    description:
      "Build a custom marketplace with vendor onboarding, competitive bidding, messaging and payments — engineered by DEWEB.",
  },
  "saas-development": {
    title: "SaaS Development Services | Multi-Tenant Platforms | DEWEB",
    description:
      "Full SaaS product development — auth, subscription billing, admin dashboards and scalable cloud architecture by DEWEB.",
  },
  "landing-page-development": {
    title: "Landing Page Development | High-Conversion Campaign Pages | DEWEB",
    description:
      "Conversion-focused landing pages for ads, launches, and lead generation — mobile-first, fast, and built by DEWEB.",
  },
  "telegram-bot-development": {
    title: "Telegram Bot Development Services | Mini Apps, Payments & Automation | DEWEB",
    description:
      "Build Telegram bots, Mini Apps, payment flows, CRM integrations, AI assistants, and automation tools with DEWEB's Telegram bot development services.",
  },
  seo: {
    title: "SEO Services | Technical SEO, Content Strategy & International SEO | DEWEB",
    description:
      "Technical SEO audits, on-page optimization, multilingual SEO, ecommerce SEO, and organic growth strategy for SaaS, Shopify, marketplaces, and lead-generation sites.",
  },
  mobile: {
    title: "Mobile App Development Services | iOS, Android & Cross-Platform | DEWEB",
    description:
      "Custom mobile app development for iOS, Android, React Native, and Flutter — MVP launches, SaaS companion apps, ecommerce, and marketplace mobile products by DEWEB.",
  },
};

export const BLOG_CATEGORY_SEO: Record<string, SeoEntry> = {
  shopify: {
    title: "Shopify & E-commerce Articles | DEWEB Blog",
    description:
      "Shopify development costs, platform comparisons, apps and ecommerce strategy guides from DEWEB.",
  },
  ai: {
    title: "AI & Automation Articles | DEWEB Blog",
    description:
      "AI chatbots, business automation and intelligent ecommerce guides from DEWEB experts.",
  },
  "web-development": {
    title: "Web Development Articles | DEWEB Blog",
    description:
      "Custom web apps, tech stack guides and software development insights from DEWEB.",
  },
  marketplace: {
    title: "Marketplace Articles | DEWEB Blog",
    description:
      "Marketplace building, monetization and competitive bidding guides from DEWEB.",
  },
  saas: {
    title: "SaaS Development Articles | DEWEB Blog",
    description:
      "SaaS product development, MVP costing and subscription business guides from DEWEB.",
  },
};

/** Per-article SEO overrides — fallbacks use article title + excerpt from blog data. */
export const BLOG_SEO: Record<string, SeoEntry> = {};

export function getPageSeo(key: string): SeoEntry {
  return (
    PAGE_SEO[key] ?? {
      title: "DEWEB | IT Marketplace & Digital Services",
      description: PAGE_SEO.home.description,
    }
  );
}

export function getServiceSeo(id: string, fallbackTitle?: string, fallbackDesc?: string): SeoEntry {
  if (SERVICE_SEO[id]) return SERVICE_SEO[id];
  const name = fallbackTitle || id;
  return {
    title: `${name} Services | DEWEB`,
    description:
      fallbackDesc ||
      `Professional ${name.toLowerCase()} services from verified DEWEB developers. Request a quote today.`,
  };
}

export function getLandingSeo(slug: string): SeoEntry {
  return (
    LANDING_SEO[slug] ?? {
      title: "DEWEB Digital Services",
      description: PAGE_SEO.home.description,
    }
  );
}

export function getBlogCategorySeo(slug: string): SeoEntry {
  return (
    BLOG_CATEGORY_SEO[slug] ?? {
      title: "DEWEB Blog",
      description: PAGE_SEO.blog.description,
    }
  );
}

export function getBlogSeo(slug: string, fallbackTitle?: string, fallbackDesc?: string): SeoEntry {
  if (BLOG_SEO[slug]) return BLOG_SEO[slug];
  const title = fallbackTitle || "Article";
  return {
    title: `${title} | DEWEB Blog`,
    description:
      fallbackDesc ||
      `Expert guide: ${title}. Practical development, Shopify, AI and marketplace insights from DEWEB.`,
  };
}
