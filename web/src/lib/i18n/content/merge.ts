import type { BlogArticle } from "@/lib/blog/types";
import type { ServiceLandingPage } from "@/lib/service-landing/types";
import type { BlogTexts, LandingTexts } from "./types";

export function mergeLandingPage(
  base: ServiceLandingPage,
  translated?: LandingTexts
): ServiceLandingPage {
  if (!translated) return base;

  return {
    ...base,
    h1: translated.h1 ?? base.h1,
    subtitle: translated.subtitle ?? base.subtitle,
    heroBadge: translated.heroBadge ?? base.heroBadge,
    priceRange: translated.priceRange ?? base.priceRange,
    intro: translated.intro ?? base.intro,
    sections: translated.sections ?? base.sections,
    benefits: translated.benefits ?? base.benefits,
    process: translated.process ?? base.process,
    faqs: translated.faqs ?? base.faqs,
    relatedServices: translated.relatedServices ?? base.relatedServices,
    marketplaceHire: translated.marketplaceHire ?? base.marketplaceHire,
    cta: translated.cta ?? base.cta,
  };
}

export function mergeBlogArticle(base: BlogArticle, translated?: BlogTexts): BlogArticle {
  if (!translated) return base;
  return { ...base, ...translated };
}

export function applyRecordOverrides<T extends { id?: string; href?: string }>(
  items: T[],
  overrides: Record<string, Partial<T>>,
  key: (item: T) => string
): T[] {
  return items.map((item) => {
    const patch = overrides[key(item)];
    return patch ? { ...item, ...patch } : item;
  });
}
