import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { defaultSocialLinks } from "@/lib/social-links";
import { LEGAL_CONTACT_EMAIL } from "@/lib/legal-content";

export type BreadcrumbItem = { name: string; path: string };

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "DEWEB",
    alternateName: ["DEWEB Marketplace", "DeWeb"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    image: DEFAULT_OG_IMAGE,
    description:
      "DEWEB is an IT marketplace connecting businesses with verified developers for Shopify, AI, web and digital services.",
    email: LEGAL_CONTACT_EMAIL,
    sameAs: Object.values(defaultSocialLinks).map((s) => s.href),
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
    "@id": `${SITE_URL}/#website`,
    name: "DEWEB",
    url: SITE_URL,
    description:
      "IT marketplace for Shopify development, AI automation, web applications and verified digital services.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    copyrightHolder: { "@id": `${SITE_URL}/#organization` },
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
    provider: { "@id": `${SITE_URL}/#organization` },
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
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
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
    worksFor: { "@id": `${SITE_URL}/#organization` },
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
      : { "@id": `${SITE_URL}/#organization` };

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
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
