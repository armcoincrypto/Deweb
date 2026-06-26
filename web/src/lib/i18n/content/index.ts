import type { Locale } from "@/i18n/routing";
import {
  privacyPolicySections,
  cookiePolicySections,
  termsOfUseSections,
} from "@/lib/legal-content";
import { serviceCategories as homeServiceCategories } from "@/lib/home-services-data";
import { serviceBanners as baseServiceBanners } from "@/lib/service-banners-data";
import {
  serviceCategories as detailServiceCategories,
  getServiceById,
  type ServiceCategory as DetailServiceCategory,
} from "@/lib/services-data";
import {
  aboutStats,
  aboutServices,
  aboutProcess,
  platformModules,
  heroFloatIcons,
} from "@/lib/about-data";
import {
  getServiceLandingPage,
  type ServiceLandingPage,
  type ServiceLandingSlug,
} from "@/lib/service-landing";
import { getArticle, type BlogArticle } from "@/lib/blog";
import type { BlogArticleSlug } from "@/lib/blog/article-slugs";
import { buildPinnedHomeSlides, type PinnedHomeSlide } from "@/lib/home-pinned-services-data";
import type { ServiceCategory as HomeServiceCategory } from "@/lib/home-services-data";
import type { ServiceBanner } from "@/lib/service-banners-data";
import type { AboutService } from "@/lib/about-data";
import type { LegalSection } from "@/lib/legal-content";
import type { LegalContentPack, LocaleContentModule } from "./types";
import { mergeBlogArticle, mergeLandingPage } from "./merge";

function mergeLegalSections(
  translated: LegalSection[],
  english: LegalSection[]
): LegalSection[] {
  return english.map((section, index) => {
    const patch = translated[index];
    if (!patch?.title) return section;
    return {
      ...section,
      ...patch,
      id: section.id ?? patch.id,
    };
  });
}

function mergeLegalContent(
  translated: LegalContentPack,
  english: LegalContentPack
): LegalContentPack {
  return {
    privacyPolicySections: mergeLegalSections(
      translated.privacyPolicySections,
      english.privacyPolicySections
    ),
    cookiePolicySections: mergeLegalSections(
      translated.cookiePolicySections,
      english.cookiePolicySections
    ),
    termsOfUseSections: mergeLegalSections(
      translated.termsOfUseSections,
      english.termsOfUseSections
    ),
  };
}

const EN_LEGAL: LegalContentPack = {
  privacyPolicySections,
  cookiePolicySections,
  termsOfUseSections,
};

async function loadLocaleContent(locale: Locale): Promise<LocaleContentModule | null> {
  if (locale === "en") return null;
  switch (locale) {
    case "es":
      return (await import("@/i18n/content/es")).default;
    case "ru":
      return (await import("@/i18n/content/ru")).default;
    case "am":
      return (await import("@/i18n/content/am")).default;
    default:
      return null;
  }
}

export async function getLegalContent(locale: Locale): Promise<LegalContentPack> {
  const pack = await loadLocaleContent(locale);
  if (!pack) return EN_LEGAL;
  return mergeLegalContent(pack.legal, EN_LEGAL);
}

export async function getHomeServiceCategories(locale: Locale): Promise<HomeServiceCategory[]> {
  const pack = await loadLocaleContent(locale);
  if (!pack) return homeServiceCategories;

  return homeServiceCategories.map((item) => {
    const patch = pack.homeServices[item.href];
    return patch ? { ...item, ...patch } : item;
  });
}

export async function getServiceBanners(locale: Locale): Promise<ServiceBanner[]> {
  const pack = await loadLocaleContent(locale);
  if (!pack) return baseServiceBanners;

  return baseServiceBanners.map((item) => {
    const patch = pack.banners[item.id];
    return patch ? { ...item, ...patch } : item;
  });
}

export async function getDetailServiceCategories(locale: Locale): Promise<DetailServiceCategory[]> {
  const pack = await loadLocaleContent(locale);
  if (!pack) return detailServiceCategories;

  return detailServiceCategories.map((item) => {
    const patch = pack.services[item.id];
    return patch ? { ...item, ...patch } : item;
  });
}

export async function getServiceByIdLocalized(
  id: string,
  locale: Locale
): Promise<DetailServiceCategory | undefined> {
  const base = getServiceById(id);
  if (!base) return undefined;
  const pack = await loadLocaleContent(locale);
  if (!pack) return base;
  const patch = pack.services[id];
  return patch ? { ...base, ...patch } : base;
}

export async function getAboutContent(locale: Locale) {
  const pack = await loadLocaleContent(locale);
  if (!pack) {
    return {
      stats: aboutStats,
      services: aboutServices,
      process: aboutProcess,
      platformModules,
      heroFloatIcons,
    };
  }

  const { about } = pack;
  return {
    stats: aboutStats.map((stat, i) => ({
      ...stat,
      label: about.stats[i]?.label ?? stat.label,
    })),
    services: aboutServices.map((service) => {
      const patch = about.services.find((s) => s.id === service.id);
      return patch
        ? {
            ...service,
            title: patch.title,
            desc: patch.desc,
            bullets: patch.bullets,
          }
        : service;
    }),
    process: aboutProcess.map((step, i) => ({
      ...step,
      title: about.process[i]?.title ?? step.title,
      desc: about.process[i]?.desc ?? step.desc,
    })),
    platformModules: platformModules.map((mod, i) => ({
      ...mod,
      label: about.platformModules[i]?.label ?? mod.label,
    })),
    heroFloatIcons: heroFloatIcons.map((icon, i) => ({
      ...icon,
      label: about.heroFloatIcons[i]?.label ?? icon.label,
    })),
  };
}

export async function getLocalizedLandingPage(
  slug: ServiceLandingSlug,
  locale: Locale
): Promise<ServiceLandingPage | undefined> {
  const base = getServiceLandingPage(slug);
  if (!base) return undefined;
  const pack = await loadLocaleContent(locale);
  if (!pack) return base;
  return mergeLandingPage(base, pack.landings[slug]);
}

export async function getLocalizedBlogArticle(
  slug: BlogArticleSlug,
  locale: Locale
): Promise<BlogArticle | undefined> {
  const base = getArticle(slug);
  if (!base) return undefined;
  if (locale === "en") return base;
  const pack = await loadLocaleContent(locale);
  const translated = pack?.blog?.[slug];
  if (!translated) return base;
  return mergeBlogArticle(base, translated);
}

export function isBlogArticleFullyLocalized(
  slug: BlogArticleSlug,
  pack: LocaleContentModule | null
): boolean {
  const translated = pack?.blog?.[slug];
  if (!translated?.title || !translated.intro?.length || !translated.sections?.length) {
    return false;
  }
  return translated.sections.every((s) => s.title && s.paragraphs?.length);
}

export async function getPinnedHomeSlides(locale: Locale): Promise<PinnedHomeSlide[]> {
  const [categories, banners] = await Promise.all([
    getHomeServiceCategories(locale),
    getServiceBanners(locale),
  ]);
  return buildPinnedHomeSlides(categories, banners);
}

export type { AboutService };
