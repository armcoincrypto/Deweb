import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { siteIcons } from "@/lib/site-icons";
import { serviceCategories } from "@/lib/services-data";
import { BLOG_ARTICLE_SLUGS } from "@/lib/blog";
import { blogCategories } from "@/lib/blog/categories";
import { getServiceLandingPaths } from "@/lib/service-landing";
import { getCostGuidePaths } from "@/lib/cost-guides";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dewebam.com";

export const DEFAULT_OG_IMAGE_PATH = "/og/deweb-og-1200x630.png";
export const DEFAULT_OG_WIDTH = 1200;
export const DEFAULT_OG_HEIGHT = 630;
export const DEFAULT_OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;

/** All supported locales are indexable now that pages are fully translated. */
export const INDEXABLE_LOCALES: readonly Locale[] = locales;

export function isIndexableLocale(locale: string): locale is Locale {
  return (INDEXABLE_LOCALES as readonly string[]).includes(locale);
}

/** Public marketing routes (extend this list for new static pages). */
export const PUBLIC_STATIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/services",
  "/marketplace",
  "/marketplace/hire-web-developers",
  "/marketplace/hire-telegram-bot-developers",
  "/marketplace/hire-ai-automation-specialists",
  "/marketplace/hire-marketplace-developers",
  "/dedicated-development-team",
  ...getCostGuidePaths(),
  "/blog",
  "/privacy-policy",
  "/cookie-policy",
  "/terms",
] as const;

/**
 * Legacy category IDs superseded by long-form landing pages.
 * Excluded from sitemap; 301-redirected to the primary landing URL.
 */
export const SUPERSEDED_LEGACY_SERVICE_IDS = [
  "ecommerce",
  "ai",
  "saas",
  "websites",
  "bots",
] as const;

export const LEGACY_TO_LANDING_SLUG: Record<string, string> = {
  ecommerce: "shopify-development",
  ai: "ai-chatbot-development",
  saas: "saas-development",
  websites: "web-application-development",
  bots: "telegram-bot-development",
};

/** Legacy service category paths (indexable; excludes superseded duplicates). */
export function getLegacyServicePaths(): string[] {
  return serviceCategories
    .filter((s) => !(SUPERSEDED_LEGACY_SERVICE_IDS as readonly string[]).includes(s.id))
    .map((s) => `/services/${s.id}`);
}

/** Canonical path for a service slug (legacy aliases point at landing pages). */
export function getServiceCanonicalPath(slug: string): string {
  const landing = LEGACY_TO_LANDING_SLUG[slug];
  return landing ? `/services/${landing}` : `/services/${slug}`;
}

/** Service landing page paths. */
export function getLandingServicePaths(): string[] {
  return getServiceLandingPaths();
}

/** Static blog article paths. */
export function getStaticBlogPaths(): string[] {
  return BLOG_ARTICLE_SLUGS.map((slug) => `/blog/${slug}`);
}

/** Blog category paths. */
export function getBlogCategoryPaths(): string[] {
  return blogCategories.map((c) => `/blog/category/${c.slug}`);
}

/** Core public pages for the main sitemap (excludes individual blog posts). */
export function getPageSitemapPaths(): string[] {
  const staticPaths = PUBLIC_STATIC_PATHS.filter((p) => p !== "/");
  const servicePaths = [
    ...new Set([...getLegacyServicePaths(), ...getLandingServicePaths()]),
  ];
  const blogCategoriesOnly = getBlogCategoryPaths();
  return ["/", ...staticPaths, ...servicePaths, ...blogCategoriesOnly];
}

/** All blog article paths for sitemap-blog.xml. */
export function getBlogSitemapPaths(extraSlugs: string[] = []): string[] {
  const staticSlugs = new Set(BLOG_ARTICLE_SLUGS);
  const paths = BLOG_ARTICLE_SLUGS.map((slug) => `/blog/${slug}`);
  for (const slug of extraSlugs) {
    if (!staticSlugs.has(slug as (typeof BLOG_ARTICLE_SLUGS)[number])) {
      paths.push(`/blog/${slug}`);
    }
  }
  return paths;
}

/** @deprecated Use getPageSitemapPaths() or getBlogSitemapPaths(). */
export function getAllSitemapPaths(): string[] {
  return [...getPageSitemapPaths(), ...getStaticBlogPaths()];
}

export function localePath(locale: string, path: string): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: string, path: string): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/** Canonical URL for the current locale version of a page. */
export function canonicalUrl(path: string, locale = "en"): string {
  return absoluteUrl(locale, path);
}

export function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of INDEXABLE_LOCALES) {
    languages[locale] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl("en", path);
  return languages;
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale = "en",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  locale?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const indexable = !noIndex && isIndexableLocale(locale);
  const canonical = canonicalUrl(path, locale);
  const ogImage = image || DEFAULT_OG_IMAGE;
  const ogWidth = image ? 1200 : DEFAULT_OG_WIDTH;
  const ogHeight = image ? 630 : DEFAULT_OG_HEIGHT;

  return {
    title: { absolute: title },
    description,
    icons: siteIcons,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "DEWEB",
      locale,
      images: [
        {
          url: ogImage,
          width: ogWidth,
          height: ogHeight,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: indexable
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

/** Convenience: build metadata from a PAGE_SEO / SERVICE_SEO / BLOG_SEO entry. */
export function metadataFromEntry(
  entry: { title: string; description: string },
  path: string,
  locale = "en",
  opts?: { image?: string; noIndex?: boolean; canonicalPath?: string }
) {
  const canonicalPath = opts?.canonicalPath ?? path;
  const meta = buildPageMetadata({
    title: entry.title,
    description: entry.description,
    path: canonicalPath,
    locale,
    image: opts?.image,
    noIndex: opts?.noIndex,
  });
  return meta;
}

/** Paths that must never appear in public sitemaps. */
export const SITEMAP_BLOCKLIST_PREFIXES = [
  "/account",
  "/dashboard",
  "/admin",
  "/login",
  "/signup",
  "/pricing",
  "/api",
] as const;

export function isSitemapBlockedPath(path: string): boolean {
  return SITEMAP_BLOCKLIST_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
}

/** Validate sitemap path list — throws in dev tooling if private URLs leak in. */
export function assertCleanSitemapPaths(paths: string[]): void {
  const blocked = paths.filter(isSitemapBlockedPath);
  if (blocked.length > 0) {
    throw new Error(`Blocked paths in sitemap: ${blocked.join(", ")}`);
  }
}
