import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { defaultSocialLinks } from "@/lib/social-links";
import { LEGAL_CONTACT_EMAIL } from "@/lib/legal-content";

export type BreadcrumbItem = { name: string; path: string };

export const DEWEB_ORG_ID = `${SITE_URL}/#organization`;
export const DEWEB_WEBSITE_ID = `${SITE_URL}/#website`;
export const DEWEB_GITHUB_URL = "https://github.com/armcoincrypto/Deweb";

export const DEWEB_PORTFOLIO_URLS = [
  `${SITE_URL}/en/projects/kobbopay`,
  `${SITE_URL}/en/projects/exswaping`,
  `${SITE_URL}/en/projects/changetext`,
  `${SITE_URL}/en/projects/dex-kobbex`,
] as const;

export const DEWEB_KNOWS_ABOUT = [
  "Crypto payment gateways",
  "Web application development",
  "Marketplace development",
  "Next.js development",
  "Automation systems",
  "Multi-rail settlement systems",
] as const;

export const organizationRef = { "@id": DEWEB_ORG_ID };
export const websiteRef = { "@id": DEWEB_WEBSITE_ID };

function buildEntitySameAs(): string[] {
  const links = [
    DEWEB_GITHUB_URL,
    ...DEWEB_PORTFOLIO_URLS,
    ...Object.values(defaultSocialLinks).map((s) => s.href),
  ];
  return [...new Set(links)];
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": DEWEB_ORG_ID,
    name: "DEWEB",
    alternateName: ["DEWEB Marketplace", "DeWeb", "dewebam.com"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    image: DEFAULT_OG_IMAGE,
    description:
      "DEWEB is an IT marketplace and engineering agency for Shopify development, AI automation, SaaS, marketplaces, crypto payment systems, and custom web applications.",
    email: LEGAL_CONTACT_EMAIL,
    sameAs: buildEntitySameAs(),
    knowsAbout: [...DEWEB_KNOWS_ABOUT],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: LEGAL_CONTACT_EMAIL,
        url: `${SITE_URL}/en/contact`,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Spanish", "Russian", "Armenian"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": DEWEB_WEBSITE_ID,
    name: "DEWEB",
    alternateName: ["DEWEB Marketplace", "DeWeb", "dewebam.com"],
    url: SITE_URL,
    description:
      "Multilingual IT marketplace and engineering site for Shopify, AI automation, web applications, portfolio case studies, and supplier bidding.",
    publisher: organizationRef,
    copyrightHolder: organizationRef,
    inLanguage: ["en", "es", "ru", "am"],
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[], locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function serviceSchema({
  name,
  description,
  url,
  priceRange,
  areaServed = "Worldwide",
  serviceType = "ProfessionalService",
}: {
  name: string;
  description: string;
  url: string;
  priceRange?: string;
  areaServed?: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    serviceType,
    provider: organizationRef,
    areaServed,
    ...(priceRange
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            description: priceRange,
            availability: "https://schema.org/InStock",
            url,
          },
        }
      : {}),
  };
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[]
): Record<string, unknown> | null {
  const mainEntity = faqs
    .filter((faq) => faq.question?.trim() && faq.answer?.trim())
    .map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

  if (!mainEntity.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export function webPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: websiteRef,
    publisher: organizationRef,
  };
}

export function authorPersonSchema({
  id,
  name,
  role,
  url,
}: {
  id: string;
  name: string;
  role: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#author-${id}`,
    name,
    jobTitle: role,
    url,
    worksFor: organizationRef,
  };
}

export type PortfolioListItem = {
  name: string;
  url: string;
  description: string;
};

export function portfolioItemListSchema({
  name,
  url,
  items,
}: {
  name: string;
  url: string;
  items: PortfolioListItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
    name,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        url: item.url,
        description: item.description,
        creator: organizationRef,
      },
    })),
  };
}

export function creativeWorkSchema({
  name,
  description,
  url,
  keywords,
  about,
}: {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
  about?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#creativework`,
    name,
    description,
    url,
    creator: organizationRef,
    author: organizationRef,
    publisher: organizationRef,
    provider: organizationRef,
    isPartOf: websiteRef,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(about ? { about } : {}),
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
  };
}

export function articleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorId,
  authorName,
}: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorId?: string;
  authorName?: string;
}) {
  const author = authorId
    ? { "@id": `${SITE_URL}/#author-${authorId}` }
    : authorName
      ? { "@type": "Person" as const, name: authorName }
      : organizationRef;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    image: image || `${SITE_URL}/android-chrome-512x512.png`,
    datePublished,
    dateModified: dateModified || datePublished,
    author,
    publisher: organizationRef,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
