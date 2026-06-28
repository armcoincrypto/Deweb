import type { ServiceLandingPage } from "../types";
import { DEFAULT_CTA, related, servicePath } from "../shared";

export const mobileDevelopment: ServiceLandingPage = {
  slug: "mobile",
  path: servicePath("mobile"),
  h1: "Mobile App Development Services",
  subtitle:
    "Custom iOS, Android, and cross-platform mobile applications for startups, SaaS, ecommerce, marketplaces, and enterprise teams — built with scalable architecture and integrated backends.",
  heroBadge: "Mobile Products",
  priceRange: "From $1000",
  intro: [
    "Mobile applications are often the primary touchpoint between your product and customers. Whether you are launching a startup MVP, extending a SaaS platform to mobile, building an ecommerce companion app, or modernizing an internal business tool, mobile development requires product thinking, reliable engineering, and integration with the systems that power your business. DEWEB delivers custom mobile app development services for teams that need professional execution without inflated claims or unrealistic promises.",
    "Successful mobile products combine clear user experience, stable performance, secure authentication, and backend connectivity. Many projects fail not because the idea is weak, but because scope is unclear, architecture does not scale, APIs are fragile, or store submission and maintenance are treated as afterthoughts. We help founders and product teams plan mobile delivery with realistic scope, modern cross-platform options where appropriate, and integration paths to web applications, SaaS dashboards, marketplaces, and automation workflows.",
    "DEWEB connects mobile development to a broader delivery ecosystem: web application development, SaaS platforms, marketplace products, AI business automation, landing pages, SEO, and the DEWEB Marketplace where you can hire web and mobile developers through transparent project briefs. You can start with a focused MVP, expand into a full product roadmap, or staff specialized delivery through competitive marketplace proposals — all within one consistent technical and commercial framework.",
  ],
  sections: [
    {
      title: "Mobile Applications for Modern Businesses",
      paragraphs: [
        "Mobile apps support customer engagement where users already spend time — on phones and tablets. They enable push notifications, personalized experiences, offline access where designed, and faster repeat interactions than browser-only workflows. For consumer products, mobile often becomes the core product surface. For B2B and service businesses, mobile can support field teams, client portals, booking flows, and operational dashboards that improve efficiency.",
        "Mobile commerce, digital service platforms, and marketplace participation also depend on dependable mobile experiences. Buyers and sellers expect responsive interfaces, secure payments, messaging, and account management on mobile. When mobile is treated as a strategic channel rather than a cosmetic add-on, it supports retention, operational speed, and product differentiation — especially for startups validating demand and for established companies modernizing legacy workflows.",
      ],
    },
    {
      title: "What DEWEB Builds",
      paragraphs: [
        "We build custom mobile applications across several commercial categories: native and cross-platform consumer apps, SaaS companion apps connected to web dashboards, ecommerce and retail mobile experiences, marketplace buyer and seller apps, business automation and internal operations tools, customer self-service portals, and product extensions that complement existing web platforms. Each project is scoped around business outcomes — activation, retention, transaction completion, support efficiency — not feature checklists alone.",
        "Mobile deliverables typically include product architecture guidance, UX-aligned implementation, API integration with your backend or DEWEB-built systems, authentication and user profile flows, notification setup where required, payment integration when applicable, analytics hooks, and store submission support for iOS and Android distribution. We align mobile scope with your stage: MVP validation, v1 launch, or post-launch iteration and maintenance.",
      ],
    },
    {
      title: "Mobile Development Technologies",
      paragraphs: [
        "Technology choices depend on product requirements, timeline, team skills, and long-term maintenance — not hype. DEWEB works with modern mobile stacks including React Native and Flutter for cross-platform delivery, alongside native iOS and Android approaches when platform-specific capabilities or performance constraints require it. We favor API-driven architecture so mobile clients remain maintainable as backends, admin panels, and third-party integrations evolve.",
        "Cross-platform development can reduce duplicate effort when iOS and Android share most product logic and UI patterns. Native or hybrid approaches may be preferable when deep platform integrations, specialized hardware access, or strict performance requirements dominate. We explain trade-offs in plain business terms: time to market, maintenance cost, feature parity, and integration complexity — so stakeholders can choose an approach that fits the product roadmap rather than a generic default.",
      ],
    },
    {
      title: "Mobile App Features and Integrations",
      paragraphs: [
        "Mobile products commonly require authentication and role-based access, user profiles, in-app messaging or support entry points, push notifications, payment flows, search and filtering, media uploads, admin-facing configuration via web consoles, and integrations with CRM, ERP, analytics, or automation systems. We design feature sets around validated user journeys instead of bundling unnecessary complexity into an MVP.",
        "Security, performance, and reliability are treated as core requirements: secure token handling, sensible offline behavior where needed, crash monitoring hooks, and performance-conscious UI patterns on real devices and networks. For marketplace and SaaS clients, mobile features often mirror web capabilities — listings, bids, orders, subscriptions, notifications — while respecting mobile UX conventions that reduce friction on smaller screens.",
      ],
    },
    {
      title: "Mobile Solutions by Business Type",
      paragraphs: [
        "Startups use mobile apps to validate ideas quickly, onboard early users, and support investor or launch narratives with a tangible product experience. SaaS companies extend web platforms with mobile companion apps for notifications, lightweight workflows, and field usage. Ecommerce brands use mobile to improve repeat purchase behavior, loyalty, and campaign-driven engagement. Marketplace operators need buyer and seller mobile flows that support trust, transactions, and account management.",
        "Service businesses benefit from booking, scheduling, client communication, and staff coordination apps. Enterprise teams often require secure internal apps integrated with existing systems, phased rollouts, and maintainable architecture for long-term operations. DEWEB adapts mobile scope, UX depth, and integration strategy to each model while maintaining disciplined delivery practices and clear communication about dependencies on backend readiness and content preparation.",
      ],
    },
    {
      title: "Mobile Development Process",
      paragraphs: [
        "Our process typically moves through discovery, product planning, technical architecture, UX alignment, development sprints, QA and device testing, store launch preparation, post-launch support, and ongoing optimization. Discovery clarifies users, business goals, platform targets, integrations, and success metrics. Planning translates those inputs into a phased scope that separates MVP essentials from roadmap items.",
        "Architecture and UX work reduce rework before development accelerates. Implementation follows modular patterns with API contracts, staging environments, and testable milestones. Launch includes store listing preparation, submission support, and release verification — timelines depend on project scope, platform requirements, integration complexity, and review cycles. After launch, we support maintenance, monitoring, feature iteration, and performance improvements based on real usage patterns rather than assumptions.",
      ],
    },
    {
      title: "Mobile and the DEWEB Marketplace Ecosystem",
      paragraphs: [
        "Mobile development rarely stands alone. Products often connect to web applications, SaaS admin panels, marketplace infrastructure, landing pages for acquisition, SEO content for discovery, and AI automation for support or operations. DEWEB helps teams plan these connections early so mobile is not isolated from the rest of the digital stack.",
        "If you prefer to compare specialists or staff developers for a mobile sprint, you can post your project on DEWEB Marketplace or use our hire web developers page for full-stack and mobile-capable delivery proposals. Managed mobile projects with DEWEB and marketplace hiring can coexist in one roadmap — strategy and architecture with DEWEB, specialized implementation capacity through marketplace proposals when that model fits your team.",
      ],
    },
    {
      title: "Maintenance, Modernization, and Long-Term Product Growth",
      paragraphs: [
        "Mobile products require ongoing attention after launch: OS updates, store policy changes, dependency upgrades, bug fixes, analytics review, and feature iteration. We support maintenance engagements and modernization projects for existing apps that need performance improvements, UX refinement, API updates, or cross-platform migration planning.",
        "App store visibility and product success depend on many factors outside any single launch event — product-market fit, category competition, store guidelines, ratings from real users, and continuous improvement cycles. DEWEB does not promise App Store rankings, download volumes, or revenue outcomes. We focus on building maintainable mobile products with clear scope, professional engineering, and integration paths that support your business as it grows.",
      ],
    },
  ],
  benefits: [
    {
      icon: "📱",
      title: "iOS & Android Delivery",
      description:
        "Build for one or both major platforms with scope aligned to your users, budget, and go-to-market plan.",
    },
    {
      icon: "⚙️",
      title: "API-Driven Architecture",
      description:
        "Connect mobile clients to web apps, SaaS backends, marketplaces, and third-party systems with maintainable integration patterns.",
    },
    {
      icon: "🚀",
      title: "MVP to Scale Roadmap",
      description:
        "Launch focused MVPs first, then expand features, roles, and integrations as product validation and demand grow.",
    },
    {
      icon: "🔐",
      title: "Security & Authentication",
      description:
        "Implement secure login, role-based access, and sensible data handling for consumer and business mobile products.",
    },
    {
      icon: "📊",
      title: "Analytics-Ready Builds",
      description:
        "Prepare event tracking and monitoring hooks so teams can measure activation, retention, and critical user flows.",
    },
    {
      icon: "🌍",
      title: "Multilingual Product Support",
      description:
        "Plan localized mobile experiences for EN, RU, ES, AM, and other markets with DEWEB’s localization experience.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Discovery",
      description:
        "Define users, business goals, platform targets, integrations, constraints, and success metrics before build decisions.",
    },
    {
      step: 2,
      title: "Product Planning",
      description:
        "Prioritize MVP scope, user journeys, release phases, and dependencies on backend or content readiness.",
    },
    {
      step: 3,
      title: "Architecture",
      description:
        "Design API contracts, data flows, auth model, and technical approach for iOS, Android, or cross-platform delivery.",
    },
    {
      step: 4,
      title: "UX Alignment",
      description:
        "Align mobile screens, navigation, and interaction patterns with product goals and platform conventions.",
    },
    {
      step: 5,
      title: "Development",
      description:
        "Implement features in staged milestones with integration testing against backend and third-party services.",
    },
    {
      step: 6,
      title: "QA & Device Testing",
      description:
        "Validate flows on real devices, networks, and OS versions relevant to your target audience.",
    },
    {
      step: 7,
      title: "Store Launch",
      description:
        "Prepare store listings, submission assets, and release verification — timing depends on scope and review cycles.",
    },
    {
      step: 8,
      title: "Support & Maintenance",
      description:
        "Address post-launch issues, OS updates, dependency maintenance, and planned feature iterations.",
    },
    {
      step: 9,
      title: "Optimization",
      description:
        "Improve performance, UX friction points, and conversion paths based on analytics and user feedback.",
    },
  ],
  faqs: [
    {
      question: "How long does mobile app development take?",
      answer:
        "Timeline depends on project scope, platform targets, design complexity, integration requirements, and review cycles for app store submission. A focused MVP may move quickly when requirements and backend dependencies are ready, while larger products with multiple roles, payments, and integrations typically require longer phased delivery.",
    },
    {
      question: "Do you build for iOS and Android?",
      answer:
        "Yes. DEWEB can deliver iOS apps, Android apps, or both, depending on your audience and product strategy. Platform choice is planned during discovery so scope and architecture match your go-to-market goals.",
    },
    {
      question: "Do you create cross-platform apps?",
      answer:
        "Yes. We use modern cross-platform approaches such as React Native and Flutter when they fit the product requirements, integration needs, and maintenance plan. We also use native development when platform-specific capabilities or performance constraints make that the better option.",
    },
    {
      question: "Can existing systems be integrated with a mobile app?",
      answer:
        "Yes. Mobile apps can integrate with existing web platforms, SaaS backends, CRMs, payment providers, messaging systems, and internal APIs. Integration scope is clarified during discovery so data flows, authentication, and security requirements are understood before development.",
    },
    {
      question: "Can mobile apps connect to marketplace platforms?",
      answer:
        "Yes. Mobile experiences can support marketplace workflows such as listings, bids, orders, messaging, and account management when the backend and product architecture are designed for those flows. DEWEB can connect mobile development with marketplace platform engineering.",
    },
    {
      question: "Can mobile apps connect to SaaS platforms?",
      answer:
        "Yes. SaaS companion apps, admin-light mobile workflows, and notification-driven experiences are common use cases. We align mobile features with your SaaS architecture, roles, and subscription or access model.",
    },
    {
      question: "Do you provide maintenance after launch?",
      answer:
        "Yes. We offer post-launch support, bug fixes, dependency updates, OS compatibility maintenance, and feature iteration depending on your engagement model and product roadmap.",
    },
    {
      question: "Can I hire developers through the DEWEB marketplace?",
      answer:
        "Yes. You can work with DEWEB on mobile strategy and delivery directly, or post implementation tasks on DEWEB Marketplace and hire developers through scoped proposals. This is useful when you need additional capacity for specific modules or accelerated sprints.",
    },
  ],
  relatedServices: related([
    {
      slug: "web-application-development",
      title: "Web Application Development",
      description:
        "Build the web backends, admin panels, and APIs that power your mobile product experience.",
    },
    {
      slug: "marketplace-development",
      title: "Marketplace Development",
      description:
        "Develop two-sided platforms with mobile-ready workflows for buyers, sellers, and operators.",
    },
    {
      slug: "saas-development",
      title: "SaaS Development",
      description:
        "Create scalable SaaS foundations with web dashboards and mobile companion experiences.",
    },
    {
      slug: "ai-business-automation",
      title: "AI Business Automation",
      description:
        "Automate support, operations, and intelligent workflows connected to mobile and web products.",
    },
    {
      slug: "landing-page-development",
      title: "Landing Page Development",
      description:
        "Launch acquisition pages that drive app installs, demo requests, and qualified leads.",
    },
    {
      slug: "seo",
      title: "SEO Services",
      description:
        "Support organic discovery for product pages, landing pages, and content that promotes your app.",
    },
  ]),
  marketplaceHire: {
    href: "/marketplace/hire-web-developers",
    label: "Hire Web Developers",
    description:
      "Staff mobile and full-stack delivery through DEWEB Marketplace with scoped proposals from developers experienced in app and API integration work.",
  },
  cta: {
    title: "Planning a Mobile App for Your Business?",
    description:
      "Share your product idea, target users, and integration needs. We will outline a realistic mobile scope, architecture approach, and next steps.",
    ...DEFAULT_CTA,
    primaryLabel: "Request Mobile Consultation",
    secondaryLabel: "Explore DEWEB Marketplace",
    secondaryHref: "/marketplace",
  },
};
