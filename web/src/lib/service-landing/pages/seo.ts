import type { ServiceLandingPage } from "../types";
import { DEFAULT_CTA, related, servicePath } from "../shared";

export const seoServices: ServiceLandingPage = {
  slug: "seo",
  path: servicePath("seo"),
  h1: "SEO Services",
  subtitle:
    "Technical SEO, content strategy, international SEO, and conversion-focused optimization for SaaS, ecommerce, marketplaces, and lead-generation websites.",
  heroBadge: "Organic Growth",
  priceRange: "From $400",
  intro: [
    "Search engine optimization is how businesses earn qualified visibility in Google and other search engines without paying for every click. When SEO is done well, service pages, product pages, landing pages, and blog content work together to attract buyers who are already looking for what you offer. DEWEB provides SEO services for companies that need a stronger technical foundation, clearer content architecture, and a practical roadmap for sustainable organic growth.",
    "Many websites underperform in search because of fixable technical issues — poor crawlability, weak indexation, inconsistent metadata, slow performance, broken internal links, or multilingual setup that confuses search engines. Others have solid technology but lack content aligned with search intent, commercial page structure, or internal linking that distributes authority to the pages that drive revenue. We combine technical SEO, on-page optimization, content planning, structured data, and reporting so SEO supports real business outcomes: leads, demos, purchases, and marketplace activity.",
    "DEWEB delivers SEO as a managed service and connects it to the broader delivery ecosystem: web application development, Shopify and ecommerce builds, landing page development, SaaS platforms, marketplace products, UI/UX improvements, and the DEWEB Marketplace where you can hire web developers and specialists through transparent project briefs. Whether you need a technical SEO audit, ongoing optimization, or SEO support alongside a development project, we align search strategy with how your site actually works and how your customers decide to buy.",
  ],
  sections: [
    {
      title: "What DEWEB SEO Services Include",
      paragraphs: [
        "Our SEO services cover the full scope required for modern commercial websites: technical SEO audits, crawl and indexation analysis, on-page optimization, metadata and heading structure, internal linking strategy, structured data implementation, Core Web Vitals and performance improvements, content architecture planning, keyword and search-intent research, international and multilingual SEO, ecommerce and Shopify SEO support, marketplace SEO considerations, analytics and Search Console monitoring, and clear reporting tied to business priorities.",
        "We do not treat SEO as a checklist of tags. We prioritize the changes that improve discoverability, relevance, and conversion paths for the pages that matter most — service pages, landing pages, category hubs, blog clusters, and marketplace entry points. Deliverables typically include an audit summary, prioritized recommendations, implementation support where development is required, content guidance, and iteration based on performance data.",
      ],
    },
    {
      title: "Why SEO Matters for Digital Businesses",
      paragraphs: [
        "Organic search remains one of the most efficient channels for reaching buyers with high intent. When someone searches for a service, product comparison, cost guide, or solution category, they are often closer to a decision than audiences reached through broad awareness campaigns. SEO helps your business appear in those moments with credible, useful pages rather than relying entirely on paid ads.",
        "Strong SEO also builds trust. Clear site structure, fast pages, helpful content, and consistent technical signals tell both users and search engines that your business is professional and relevant. For SaaS companies, ecommerce brands, agencies, marketplaces, and B2B service providers, SEO reduces long-term dependency on paid acquisition, supports lead generation, and creates durable assets that continue working after campaigns end — provided the technical and content foundation is maintained.",
      ],
    },
    {
      title: "Technical SEO",
      paragraphs: [
        "Technical SEO is the foundation of every successful organic strategy. We review crawlability and indexation patterns, sitemap and robots.txt configuration, canonical tags, redirect chains, duplicate content risks, hreflang implementation for multilingual sites, mobile usability, page speed, Core Web Vitals, JavaScript rendering considerations, and structured data accuracy. For Next.js and modern web stacks, we pay special attention to metadata delivery, static and dynamic rendering behavior, and how internal links are generated across locales.",
        "Technical work often unlocks ranking opportunities that content alone cannot fix. If important service pages are orphaned, if category URLs compete with each other, or if search engines index the wrong locale version, content investment will underperform. We document issues with clear priority levels and work with your development team — or DEWEB engineers — to implement fixes safely without breaking production, localization, or analytics tracking.",
      ],
    },
    {
      title: "Content and Commercial SEO",
      paragraphs: [
        "Content SEO connects search intent to pages that convert. We analyze how buyers search for your services and map those intents to the right page types: core service pages, landing pages for campaigns, marketplace and hire pages, blog educational content, comparison pages, and cost or planning guides. Each page type has a different job — some capture broad research queries, others capture high-intent commercial searches ready for contact or purchase.",
        "We help teams improve page structure, headings, FAQ sections, proof blocks, and internal links so content reads naturally for humans while signaling relevance to search engines. For DEWEB clients, this often means strengthening clusters around Shopify, SaaS, web development, AI automation, marketplaces, and lead-generation offers — with blog articles supporting pillar pages instead of competing with them. The goal is a coherent content architecture where authority flows toward revenue-generating URLs.",
      ],
    },
    {
      title: "SEO for Different Business Types",
      paragraphs: [
        "SaaS SEO requires product-led page strategy, feature and use-case landing pages, documentation discoverability, and comparison content that supports trial or demo conversion. Ecommerce and Shopify SEO focus on category structure, product and collection pages, faceted navigation risks, technical performance, and content that supports merchandising and seasonal campaigns. Marketplace SEO adds vendor pages, category taxonomy, trust content, and two-sided search behavior where both supply and demand must be visible.",
        "Agencies and B2B service providers benefit from service page depth, case-style proof without fabricated claims, localized service coverage, and blog guides that answer buyer questions before sales calls. Local businesses need location relevance, service area clarity, and strong contact paths. International companies need hreflang discipline, native-language commercial copy, and consistent URL patterns across EN, RU, ES, AM, and other target markets — an area where DEWEB’s multilingual product experience is especially relevant.",
      ],
    },
    {
      title: "International and Multilingual SEO",
      paragraphs: [
        "International SEO is more than translation. Each locale should have indexable URLs, localized metadata, native commercial phrasing, consistent internal links, and hreflang signals that help search engines serve the correct language version. DEWEB builds and optimizes multilingual sites across English, Russian, Spanish, and Armenian, so our SEO practice reflects real implementation constraints — not theoretical hreflang diagrams.",
        "Multilingual SEO also supports expansion into new regions without duplicate-content penalties or orphaned locale pages. We audit how authority flows between languages, whether category and service pages are equivalently linked, and whether blog clusters strengthen the right commercial pages in each locale. This is essential for businesses using DEWEB as both a development partner and an SEO partner across multiple markets.",
      ],
    },
    {
      title: "Marketplace, Hiring, and Cross-Service SEO",
      paragraphs: [
        "SEO does not exist in isolation from product and marketplace strategy. DEWEB clients often need search visibility for service pages, hire pages, marketplace categories, and blog resources at the same time. We connect SEO recommendations to practical next steps: improving a landing page, fixing technical issues in a SaaS app, optimizing Shopify collection pages, or staffing implementation through DEWEB Marketplace.",
        "You can order SEO as a managed service with DEWEB directly, or post implementation tasks on the marketplace and hire web developers and specialists with scoped proposals. SEO work frequently intersects with UI/UX clarity, development fixes, content production, and automation — so having one ecosystem for strategy, build, and hiring reduces friction and protects consistency across technical and content layers.",
      ],
    },
    {
      title: "Reporting, Search Console, and Iteration",
      paragraphs: [
        "SEO requires ongoing visibility into what changes and what still blocks growth. We use Google Search Console, analytics data, crawl diagnostics, and ranking opportunity reviews to track index coverage, query trends, page performance, and internal link health. Reports focus on actionable insights — which templates improved, which pages need content depth, which technical issues remain — rather than vanity metrics alone.",
        "Search engines evolve, competitors publish new content, and your product roadmap adds pages that must be integrated into the site architecture. Iteration is part of the service: refresh metadata, expand FAQs, strengthen internal links, update structured data, and align new landing pages with existing clusters. SEO improves the technical and content foundation for organic growth, but rankings depend on competition, market demand, content quality, and search engine behavior — we set expectations accordingly and prioritize measurable progress.",
      ],
    },
  ],
  benefits: [
    {
      icon: "🔍",
      title: "Technical SEO Audits",
      description:
        "Identify crawl, indexation, canonical, hreflang, and performance issues that limit organic visibility.",
    },
    {
      icon: "📄",
      title: "Commercial Content Architecture",
      description:
        "Align service pages, landing pages, blogs, and marketplace URLs with buyer search intent.",
    },
    {
      icon: "🔗",
      title: "Internal Linking Strategy",
      description:
        "Strengthen authority flow toward high-intent pages that generate leads and revenue.",
    },
    {
      icon: "🌍",
      title: "Multilingual SEO",
      description:
        "Support EN, RU, ES, AM and international expansion with consistent locale SEO patterns.",
    },
    {
      icon: "⚡",
      title: "Performance & Core Web Vitals",
      description:
        "Improve speed and UX signals that affect both conversions and search performance.",
    },
    {
      icon: "📊",
      title: "Search Console & Analytics",
      description:
        "Monitor indexation, queries, and page trends with reporting tied to business priorities.",
    },
  ],
  process: [
    {
      step: 1,
      title: "SEO Audit",
      description:
        "Review crawlability, indexation, metadata, site structure, performance, and locale setup to establish baseline priorities.",
    },
    {
      step: 2,
      title: "Keyword & Intent Research",
      description:
        "Map search demand to service pages, landing pages, blog topics, and commercial URLs that match buyer intent.",
    },
    {
      step: 3,
      title: "Technical Cleanup",
      description:
        "Fix canonical, redirect, sitemap, robots, hreflang, and rendering issues that block or dilute rankings.",
    },
    {
      step: 4,
      title: "Content Architecture",
      description:
        "Plan pillar pages, supporting guides, FAQs, and hub relationships that strengthen topical authority.",
    },
    {
      step: 5,
      title: "Metadata & Schema",
      description:
        "Implement titles, descriptions, heading hierarchy, and valid JSON-LD structured data without misleading claims.",
    },
    {
      step: 6,
      title: "Internal Linking",
      description:
        "Add contextual links between services, marketplace pages, hire pages, and blog resources.",
    },
    {
      step: 7,
      title: "Localization",
      description:
        "Adapt SEO patterns across languages with native copy, locale URLs, and hreflang consistency.",
    },
    {
      step: 8,
      title: "Search Console Monitoring",
      description:
        "Track coverage, queries, and page performance to validate fixes and spot new opportunities.",
    },
    {
      step: 9,
      title: "Iteration",
      description:
        "Refine pages, expand content depth, and adjust priorities as markets, products, and competition evolve.",
    },
  ],
  faqs: [
    {
      question: "What is included in DEWEB SEO services?",
      answer:
        "DEWEB SEO services typically include a technical audit, keyword and search-intent research, on-page optimization, metadata and heading improvements, internal linking recommendations, structured data guidance, performance and Core Web Vitals review, content architecture planning, multilingual SEO support where relevant, Search Console monitoring, and reporting focused on actionable next steps.",
    },
    {
      question: "Can DEWEB perform a technical SEO audit?",
      answer:
        "Yes. We audit crawlability, indexation, sitemaps, robots.txt, canonical tags, hreflang, page speed, mobile usability, structured data, and internal link patterns. The audit identifies priority fixes and separates technical blockers from content and architecture opportunities.",
    },
    {
      question: "Do you offer international or multilingual SEO?",
      answer:
        "Yes. DEWEB supports international SEO for businesses operating across multiple languages and regions, including English, Russian, Spanish, and Armenian locales. We focus on indexable locale URLs, native commercial copy, hreflang correctness, and consistent internal linking across languages.",
    },
    {
      question: "Can SEO help generate leads?",
      answer:
        "SEO can improve visibility for service pages, landing pages, and educational content that attracts qualified visitors searching for solutions you provide. When those pages have clear CTAs, strong UX, and credible content, organic traffic can support lead generation alongside paid channels.",
    },
    {
      question: "Do you work with Shopify or ecommerce SEO?",
      answer:
        "Yes. We support Shopify and broader ecommerce SEO, including category structure, collection and product page optimization, technical performance, content gaps, and internal links between storefront pages and supporting guides.",
    },
    {
      question: "Can SEO be combined with landing page development?",
      answer:
        "Yes. Landing pages and SEO work best together when page structure, metadata, internal links, and performance are planned for both conversion and search intent. DEWEB offers landing page development and SEO services that can be delivered as connected engagements.",
    },
    {
      question: "Do you guarantee Google rankings?",
      answer:
        "No. SEO improves the technical and content foundation for organic growth, but search rankings depend on competition, market demand, content quality, and search engine behavior. DEWEB focuses on measurable improvements to site health, relevance, and commercial page visibility — not ranking guarantees.",
    },
    {
      question: "Can I hire SEO or web specialists through the DEWEB marketplace?",
      answer:
        "Yes. You can work with DEWEB on SEO strategy directly, or post implementation tasks on DEWEB Marketplace and hire web developers and specialists through scoped proposals. This is useful when SEO recommendations require development, content updates, or ongoing execution capacity.",
    },
  ],
  relatedServices: related([
    {
      slug: "landing-page-development",
      title: "Landing Page Development",
      description:
        "Build conversion-focused pages that support campaigns and organic search with fast performance and clear CTAs.",
    },
    {
      slug: "web-application-development",
      title: "Web Application Development",
      description:
        "Fix rendering, architecture, and scalability issues that affect both product delivery and technical SEO.",
    },
    {
      slug: "shopify-development",
      title: "Shopify Development",
      description:
        "Improve ecommerce storefront structure, performance, and merchandising pages for search and conversion.",
    },
    {
      slug: "marketplace-development",
      title: "Marketplace Development",
      description:
        "Optimize two-sided platforms with stronger category architecture, trust content, and indexable supply/demand pages.",
    },
    {
      slug: "saas-development",
      title: "SaaS Development",
      description:
        "Support product-led SEO with better page templates, docs discoverability, and scalable site architecture.",
    },
    {
      slug: "uiux",
      title: "UI/UX Design",
      description:
        "Improve readability, hierarchy, and mobile usability on pages that must rank and convert.",
    },
  ]),
  marketplaceHire: {
    href: "/marketplace/hire-web-developers",
    label: "Hire Web Developers",
    description:
      "Implement SEO fixes, page templates, and content updates by hiring vetted developers through DEWEB Marketplace with transparent scope and competitive proposals.",
  },
  cta: {
    title: "Need SEO That Supports Real Business Growth?",
    description:
      "Tell us about your website, target markets, and organic goals. We will outline audit scope, priority fixes, and a practical SEO roadmap.",
    ...DEFAULT_CTA,
    primaryLabel: "Request SEO Consultation",
    secondaryLabel: "Explore DEWEB Marketplace",
    secondaryHref: "/marketplace",
  },
};
