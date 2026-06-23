import type { Locale } from "@/i18n/routing";
import { metadataFromEntry } from "@/lib/seo";
import {
  getLocalizedBlogCategorySeo,
  getLocalizedLandingSeo,
  getLocalizedPageSeo,
  getLocalizedServiceSeo,
} from "@/lib/i18n/locale-seo";

export async function localizedPageMetadata(
  locale: string,
  key: string,
  path: string,
  opts?: { image?: string; noIndex?: boolean }
) {
  const seo = await getLocalizedPageSeo(locale as Locale, key);
  return metadataFromEntry(seo, path, locale, opts);
}

export async function localizedServiceMetadata(
  locale: string,
  id: string,
  path: string,
  fallbackTitle?: string,
  fallbackDesc?: string
) {
  const seo = await getLocalizedServiceSeo(locale as Locale, id, fallbackTitle, fallbackDesc);
  return metadataFromEntry(seo, path, locale);
}

export async function localizedLandingMetadata(locale: string, slug: string, path: string) {
  const seo = await getLocalizedLandingSeo(locale as Locale, slug);
  return metadataFromEntry(seo, path, locale);
}

export async function localizedBlogCategoryMetadata(
  locale: string,
  slug: string,
  path: string
) {
  const seo = await getLocalizedBlogCategorySeo(locale as Locale, slug);
  return metadataFromEntry(seo, path, locale);
}
