import type { Locale } from "@/i18n/routing";
import {
  getBlogCategorySeo,
  getBlogSeo,
  getLandingSeo,
  getPageSeo,
  getServiceSeo,
  type SeoEntry,
} from "@/lib/seo-metadata";
import { getMessages, getNested } from "@/lib/i18n/locale-messages";

function localizedOrFallback(
  messages: Record<string, unknown>,
  key: string,
  fallback: SeoEntry
): SeoEntry {
  const title = getNested(messages, key + ".title");
  const description = getNested(messages, key + ".description");
  if (title && description) return { title, description };
  return fallback;
}

export async function getLocalizedPageSeo(locale: string, key: string): Promise<SeoEntry> {
  const messages = await getMessages(locale as Locale);
  return localizedOrFallback(messages, `seo.${key}`, getPageSeo(key));
}

export async function getLocalizedServiceSeo(
  locale: string,
  id: string,
  fallbackTitle?: string,
  fallbackDesc?: string
): Promise<SeoEntry> {
  const messages = await getMessages(locale as Locale);
  return localizedOrFallback(
    messages,
    `seo.services.${id}`,
    getServiceSeo(id, fallbackTitle, fallbackDesc)
  );
}

export async function getLocalizedLandingSeo(locale: string, slug: string): Promise<SeoEntry> {
  const messages = await getMessages(locale as Locale);
  return localizedOrFallback(messages, `seo.landings.${slug}`, getLandingSeo(slug));
}

export async function getLocalizedBlogCategorySeo(
  locale: string,
  slug: string
): Promise<SeoEntry> {
  const messages = await getMessages(locale as Locale);
  return localizedOrFallback(messages, `seo.blogCategories.${slug}`, getBlogCategorySeo(slug));
}

export async function getLocalizedBlogSeo(
  locale: string,
  slug: string,
  fallbackTitle?: string,
  fallbackDesc?: string
): Promise<SeoEntry> {
  const messages = await getMessages(locale as Locale);
  const title = getNested(messages, `seo.blogArticles.${slug}.title`);
  const description = getNested(messages, `seo.blogArticles.${slug}.description`);
  if (title && description) return { title, description };
  return getBlogSeo(slug, fallbackTitle, fallbackDesc);
}
