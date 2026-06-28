import type { MetadataRoute } from "next";
import { getBlogPost } from "@/lib/blog-data";
import { getServiceLandingPaths } from "@/lib/service-landing";
import { getProjectPaths } from "@/lib/projects";
import { LEGAL_LAST_UPDATED } from "@/lib/legal-content";

const LANDING_PATHS = new Set(getServiceLandingPaths());
const PROJECT_PATHS = new Set(getProjectPaths());
const LEGAL_LAST_MOD = new Date(LEGAL_LAST_UPDATED);

/** Stable lastmod dates for static marketing pages (avoid sitemap-wide `now`). */
const MARKETING_LAST_MOD = new Date("2026-06-23");
const SERVICE_LAST_MOD = new Date("2026-06-15");
const BLOG_CATEGORY_LAST_MOD = new Date("2026-06-20");

export function pathPriority(path: string): number {
  if (path === "/") return 1;
  if (
    path === "/about" ||
    path === "/contact" ||
    path === "/services" ||
    path === "/marketplace" ||
    path === "/marketplace/hire-web-developers" ||
    path === "/marketplace/hire-telegram-bot-developers" ||
    path === "/marketplace/hire-ai-automation-specialists" ||
    path === "/marketplace/hire-marketplace-developers" ||
    path === "/dedicated-development-team" ||
    path === "/projects"
  ) {
    return 0.9;
  }
  if (LANDING_PATHS.has(path) || PROJECT_PATHS.has(path)) return 0.85;
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

export function pathLastModified(path: string, fallback = MARKETING_LAST_MOD): Date {
  if (path === "/privacy-policy" || path === "/cookie-policy" || path === "/terms") {
    return LEGAL_LAST_MOD;
  }
  if (path.startsWith("/blog/category/")) return BLOG_CATEGORY_LAST_MOD;
  if (path.startsWith("/services/")) return SERVICE_LAST_MOD;
  if (
    path === "/" ||
    path === "/about" ||
    path === "/contact" ||
    path === "/services" ||
    path === "/marketplace" ||
    path === "/marketplace/hire-web-developers" ||
    path === "/marketplace/hire-telegram-bot-developers" ||
    path === "/marketplace/hire-ai-automation-specialists" ||
    path === "/marketplace/hire-marketplace-developers" ||
    path === "/dedicated-development-team" ||
    path === "/projects" ||
    path === "/blog"
  ) {
    return MARKETING_LAST_MOD;
  }
  if (PROJECT_PATHS.has(path)) return MARKETING_LAST_MOD;
  return fallback;
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
