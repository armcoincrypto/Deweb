import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { getBlogPost } from "@/lib/blog-data";
import { fetchCmsSitemapPosts } from "@/lib/blog/cms";
import { getServiceLandingPaths } from "@/lib/service-landing";
import {
  SITE_URL,
  getAllSitemapPaths,
  absoluteUrl,
  buildLanguageAlternates,
} from "@/lib/seo";

const LANDING_PATHS = new Set(getServiceLandingPaths());

function pathPriority(path: string): number {
  if (path === "/") return 1;
  if (
    path === "/about" ||
    path === "/contact" ||
    path === "/services" ||
    path === "/marketplace"
  ) {
    return 0.9;
  }
  if (LANDING_PATHS.has(path)) return 0.85;
  if (path.startsWith("/services/")) return 0.8;
  if (path === "/blog") return 0.75;
  if (path.startsWith("/blog/")) return 0.7;
  return 0.8;
}

const cmsSitemapDates = new Map<string, string>();

function pathLastModified(path: string, fallback: Date): Date {
  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    const cmsDate = cmsSitemapDates.get(slug);
    if (cmsDate) return new Date(cmsDate);
    const post = getBlogPost(slug);
    if (post) return new Date(post.date);
  }
  return fallback;
}

function pathChangeFrequency(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path.startsWith("/blog/")) return "monthly";
  if (LANDING_PATHS.has(path)) return "weekly";
  return "weekly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsPosts = await fetchCmsSitemapPosts();
  for (const p of cmsPosts) cmsSitemapDates.set(p.slug, p.date);

  const paths = getAllSitemapPaths();
  for (const p of cmsPosts) {
    const blogPath = `/blog/${p.slug}`;
    if (!paths.includes(blogPath)) paths.push(blogPath);
  }

  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  entries.push({
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: buildLanguageAlternates("/") },
  });

  for (const locale of locales) {
    entries.push({
      url: absoluteUrl(locale, "/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: buildLanguageAlternates("/") },
    });

    for (const path of paths) {
      if (path === "/") continue;

      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: pathLastModified(path, now),
        changeFrequency: pathChangeFrequency(path),
        priority: pathPriority(path),
        alternates: { languages: buildLanguageAlternates(path) },
      });
    }
  }

  return entries;
}
