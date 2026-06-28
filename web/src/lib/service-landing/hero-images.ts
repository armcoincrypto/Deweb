import type { ServiceLandingSlug } from "./types";

export type ServiceHeroImage = {
  src: string;
  alt: string;
  /** Full-width mockup — crop to right visual panel in split hero */
  layout?: "split-reference" | "photo";
};

/** Hero photography per service landing — local assets preferred, Unsplash fallback. */
export const SERVICE_HERO_IMAGES: Record<ServiceLandingSlug, ServiceHeroImage> = {
  "shopify-development": {
    src: "/images/services/shopify-hero-reference.png",
    alt: "Shopify development — storefront analytics, conversion dashboards, and ecommerce engineering",
    layout: "split-reference",
  },
  "shopify-store-design": {
    src: "/images/services/shopify-hero-reference.png",
    alt: "Shopify store design — branded storefronts and conversion-focused ecommerce experiences",
    layout: "split-reference",
  },
  "shopify-custom-apps": {
    src: "/images/services/shopify-hero-reference.png",
    alt: "Custom Shopify app development — integrations, automation, and storefront extensions",
    layout: "split-reference",
  },
  "ai-chatbot-development": {
    src: "/images/blog/ai-automation-cover.jpg",
    alt: "AI chatbot development for business",
  },
  "ai-business-automation": {
    src: "/images/blog/ai-automation-cover.jpg",
    alt: "AI business automation workflows",
  },
  "web-application-development": {
    src: "/images/blog/web-development-cover.jpg",
    alt: "Custom web application development",
  },
  "marketplace-development": {
    src: "/images/blog/marketplace-cover.jpg",
    alt: "Marketplace platform development",
  },
  "saas-development": {
    src: "/images/blog/saas-cover.jpg",
    alt: "SaaS platform development",
  },
  "landing-page-development": {
    src: "/images/blog/web-development-cover.jpg",
    alt: "High-converting landing page development",
  },
  "telegram-bot-development": {
    src: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1600&q=80",
    alt: "Telegram bot development and messaging automation",
  },
  seo: {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    alt: "SEO and growth marketing analytics",
  },
  mobile: {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    alt: "Mobile app development for iOS and Android",
  },
};

export function getServiceHeroImage(slug: string): ServiceHeroImage {
  return (
    SERVICE_HERO_IMAGES[slug as ServiceLandingSlug] ?? {
      src: "/images/blog/default-blog-cover.jpg",
      alt: "DEWEB digital services",
    }
  );
}

export function isRemoteHeroImage(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
