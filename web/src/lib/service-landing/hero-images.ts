import type { ServiceLandingSlug } from "./types";

export type ServiceHeroImage = {
  src: string;
  alt: string;
  /** Tailwind object-position utility for crop variety */
  position?: string;
};

const SHOPIFY_PHOTOS: ServiceHeroImage[] = [
  {
    src: "/images/blog/shopify-cover.jpg",
    alt: "Shopify ecommerce storefront",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=85",
    alt: "Online store checkout and payments",
    position: "object-[center_35%]",
  },
  {
    src: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1920&q=85",
    alt: "Retail ecommerce shopping experience",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1920&q=85",
    alt: "Shopify brand storefront design",
    position: "object-[center_40%]",
  },
];

const AI_PHOTOS: ServiceHeroImage[] = [
  {
    src: "/images/blog/ai-automation-cover.jpg",
    alt: "AI automation for business",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=85",
    alt: "AI neural network visualization",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85",
    alt: "Modern AI technology workspace",
    position: "object-[center_30%]",
  },
  {
    src: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=1920&q=85",
    alt: "Automation and intelligent systems",
    position: "object-center",
  },
];

const WEB_PHOTOS: ServiceHeroImage[] = [
  {
    src: "/images/blog/web-development-cover.jpg",
    alt: "Custom web application development",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=85",
    alt: "Developer coding a web application",
    position: "object-[center_25%]",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920&q=85",
    alt: "Web development on laptop",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=85",
    alt: "Software engineering workspace",
    position: "object-center",
  },
];

const MARKETPLACE_PHOTOS: ServiceHeroImage[] = [
  {
    src: "/images/blog/marketplace-cover.jpg",
    alt: "Marketplace platform development",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=85",
    alt: "Team building a marketplace product",
    position: "object-[center_35%]",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=85",
    alt: "Collaborative marketplace development",
    position: "object-center",
  },
];

const SAAS_PHOTOS: ServiceHeroImage[] = [
  {
    src: "/images/blog/saas-cover.jpg",
    alt: "SaaS platform dashboard",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=85",
    alt: "SaaS analytics dashboard",
    position: "object-[center_30%]",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1920&q=85",
    alt: "Cloud software product team",
    position: "object-center",
  },
];

const TELEGRAM_PHOTOS: ServiceHeroImage[] = [
  {
    src: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1920&q=85",
    alt: "Telegram messaging on mobile",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=85",
    alt: "Mobile chat bot interface",
    position: "object-[center_40%]",
  },
  {
    src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1920&q=85",
    alt: "Messaging automation on smartphone",
    position: "object-center",
  },
];

const SEO_PHOTOS: ServiceHeroImage[] = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=85",
    alt: "SEO analytics and growth charts",
    position: "object-[center_30%]",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=85",
    alt: "Marketing performance dashboard",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=85",
    alt: "Digital marketing strategy session",
    position: "object-center",
  },
];

const MOBILE_PHOTOS: ServiceHeroImage[] = [
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=85",
    alt: "Mobile app on iPhone",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1555774698-0d77dd129dd0?auto=format&fit=crop&w=1920&q=85",
    alt: "Mobile app development design",
    position: "object-[center_35%]",
  },
  {
    src: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1920&q=85",
    alt: "Cross-platform mobile development",
    position: "object-center",
  },
];

const PHOTO_POOLS: Record<ServiceLandingSlug, ServiceHeroImage[]> = {
  "shopify-development": SHOPIFY_PHOTOS,
  "shopify-store-design": SHOPIFY_PHOTOS,
  "shopify-custom-apps": SHOPIFY_PHOTOS,
  "ai-chatbot-development": AI_PHOTOS,
  "ai-business-automation": AI_PHOTOS,
  "web-application-development": WEB_PHOTOS,
  "landing-page-development": WEB_PHOTOS,
  "marketplace-development": MARKETPLACE_PHOTOS,
  "saas-development": SAAS_PHOTOS,
  "telegram-bot-development": TELEGRAM_PHOTOS,
  seo: SEO_PHOTOS,
  mobile: MOBILE_PHOTOS,
};

/** Primary hero photo per service landing page. */
export const SERVICE_HERO_IMAGES: Record<ServiceLandingSlug, ServiceHeroImage> = Object.fromEntries(
  Object.entries(PHOTO_POOLS).map(([slug, pool]) => [slug, pool[0]])
) as Record<ServiceLandingSlug, ServiceHeroImage>;

export function getServiceHeroImage(slug: string): ServiceHeroImage {
  return (
    SERVICE_HERO_IMAGES[slug as ServiceLandingSlug] ?? {
      src: "/images/blog/default-blog-cover.jpg",
      alt: "DEWEB digital services",
      position: "object-center",
    }
  );
}

/** Rotates through themed photos for section banners on the same service page. */
export function getServiceSectionImage(slug: string, sectionIndex: number): ServiceHeroImage {
  const pool = PHOTO_POOLS[slug as ServiceLandingSlug];
  if (!pool?.length) return getServiceHeroImage(slug);
  return pool[sectionIndex % pool.length];
}

export function isRemoteHeroImage(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
