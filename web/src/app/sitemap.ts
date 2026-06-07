import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import {
  SITE_URL,
  getAllSitemapPaths,
  absoluteUrl,
  buildLanguageAlternates,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = getAllSitemapPaths();
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Root URL (middleware redirects to default locale)
  entries.push({
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: buildLanguageAlternates("/") },
  });

  for (const locale of locales) {
    for (const path of paths) {
      if (path === "/") continue;

      const priority =
        path === "/about" ||
        path === "/contact" ||
        path === "/services" ||
        path === "/marketplace"
          ? 0.9
          : path.startsWith("/services/")
            ? 0.8
            : path.startsWith("/blog/")
              ? 0.7
              : 0.8;

      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: now,
        changeFrequency: path.startsWith("/blog/") ? "monthly" : "weekly",
        priority,
        alternates: { languages: buildLanguageAlternates(path) },
      });
    }

    // Locale home pages
    entries.push({
      url: absoluteUrl(locale, "/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: buildLanguageAlternates("/") },
    });
  }

  return entries;
}
