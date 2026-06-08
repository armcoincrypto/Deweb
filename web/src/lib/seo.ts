import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { serviceCategories } from "@/lib/services-data";
import { BLOG_ARTICLE_SLUGS } from "@/lib/blog";
import { blogCategories } from "@/lib/blog/categories";
import { getServiceLandingPaths } from "@/lib/service-landing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dewebam.com";

/** Public marketing routes (extend this list for new static pages). */
export const PUBLIC_STATIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/services",
  "/marketplace",
  "/blog",
] as const;

/** Dynamic public routes — auto-derived from data sources. */
export function getDynamicPublicPaths(): string[] {
  const servicePaths = serviceCategories.map((s) => `/services/${s.id}`);
  const blogPaths = BLOG_ARTICLE_SLUGS.map((slug) => `/blog/${slug}`);
  const blogCategoryPaths = blogCategories.map((c) => `/blog/category/${c.slug}`);
  return [...servicePaths, ...blogPaths, ...blogCategoryPaths];
}

/** All indexable paths for sitemap generation. */
export function getAllSitemapPaths(): string[] {
  const staticPaths = PUBLIC_STATIC_PATHS.filter((p) => p !== "/");
  const servicePaths = getDynamicPublicPaths();
  const landingPaths = getServiceLandingPaths();
  const allServicePaths = [...new Set([...servicePaths, ...landingPaths])];
  return ["/", ...staticPaths, ...allServicePaths];
}

export function localePath(locale: string, path: string): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: string, path: string): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

export function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
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
  const url = absoluteUrl(locale, path);
  const ogImage = image || `${SITE_URL}/android-chrome-512x512.png`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "DEWEB",
      locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
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
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
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
  opts?: { image?: string; noIndex?: boolean }
) {
  return buildPageMetadata({
    title: entry.title,
    description: entry.description,
    path,
    locale,
    image: opts?.image,
    noIndex: opts?.noIndex,
  });
}
