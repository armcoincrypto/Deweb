export type ServiceLandingPage = {
  slug: string;
  path: string;
  h1: string;
  subtitle: string;
  heroBadge: string;
  priceRange?: string;
  intro: string[];
  sections: { title: string; paragraphs: string[] }[];
  benefits: { icon: string; title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: { slug: string; title: string; description: string }[];
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
};

export const SERVICE_LANDING_SLUGS = [
  "shopify-development",
  "shopify-store-design",
  "shopify-custom-apps",
  "ai-chatbot-development",
  "ai-business-automation",
  "web-application-development",
  "marketplace-development",
  "saas-development",
  "landing-page-development",
  "telegram-bot-development",
] as const;

export type ServiceLandingSlug = (typeof SERVICE_LANDING_SLUGS)[number];
