import type { MetadataRoute } from "next";
import { getBlogPost } from "@/lib/blog-data";
import { getServiceLandingPaths } from "@/lib/service-landing";

const LANDING_PATHS = new Set(getServiceLandingPaths());

export function pathPriority(path: string): number {
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
  if (path.startsWith("/blog/category/")) return 0.65;
  return 0.8;
}

export function pathChangeFrequency(
  path: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path.startsWith("/blog/")) return "monthly";
  if (LANDING_PATHS.has(path)) return "weekly";
  return "weekly";
}

export function blogPathLastModified(
  path: string,
  cmsDates: Map<string, string>,
  fallback: Date
): Date {
  if (!path.startsWith("/blog/")) return fallback;
  const slug = path.replace("/blog/", "");
  const cmsDate = cmsDates.get(slug);
  if (cmsDate) return new Date(cmsDate);
  const post = getBlogPost(slug);
  if (post) return new Date(post.date);
  return fallback;
}
