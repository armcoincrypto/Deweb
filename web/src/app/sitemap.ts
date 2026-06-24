import type { MetadataRoute } from "next";
import {
  INDEXABLE_LOCALES,
  absoluteUrl,
  assertCleanSitemapPaths,
  buildLanguageAlternates,
  getPageSitemapPaths,
} from "@/lib/seo";
import { pathChangeFrequency, pathLastModified, pathPriority } from "@/lib/sitemap-utils";

/** Main sitemap — public marketing pages for all indexable locales (blog posts in sitemap-blog.xml). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = getPageSitemapPaths();
  assertCleanSitemapPaths(paths);
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of INDEXABLE_LOCALES) {
    for (const path of paths) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: pathLastModified(path),
        changeFrequency: pathChangeFrequency(path),
        priority: pathPriority(path),
        alternates: { languages: buildLanguageAlternates(path) },
      });
    }
  }

  return entries;
}
