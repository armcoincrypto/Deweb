import { resolveBlogImageUrl } from "./image-url";

export const DEFAULT_BLOG_COVER = "/images/blog/default-blog-cover.jpg";

/** Local cover assets shipped in /public/images/blog */
export const BLOG_COVER_ASSETS = new Set([
  DEFAULT_BLOG_COVER,
  "/images/blog/shopify-cover.jpg",
  "/images/blog/ai-automation-cover.jpg",
  "/images/blog/saas-cover.jpg",
  "/images/blog/marketplace-cover.jpg",
  "/images/blog/web-development-cover.jpg",
]);

const CATEGORY_COVER_BY_SLUG: Record<string, string> = {
  shopify: "/images/blog/shopify-cover.jpg",
  ai: "/images/blog/ai-automation-cover.jpg",
  saas: "/images/blog/saas-cover.jpg",
  marketplace: "/images/blog/marketplace-cover.jpg",
  "web-development": "/images/blog/web-development-cover.jpg",
};

export function getCategoryCover(categorySlug?: string): string {
  if (categorySlug && CATEGORY_COVER_BY_SLUG[categorySlug]) {
    return CATEGORY_COVER_BY_SLUG[categorySlug];
  }
  return DEFAULT_BLOG_COVER;
}

function isMissingLocalAsset(path: string): boolean {
  if (!path.startsWith("/images/")) return false;
  return !BLOG_COVER_ASSETS.has(path);
}

/**
 * Resolve a blog cover src to a displayable URL.
 * Missing, legacy, or unknown local paths fall back to category/default covers.
 */
export function resolveBlogCover(options: {
  src?: string | null;
  categorySlug?: string;
}): string {
  const fallback = getCategoryCover(options.categorySlug);
  const raw = options.src?.trim();
  if (!raw) return fallback;

  if (raw === "/images/blog-hero.jpg") return fallback;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("/api/")) return resolveBlogImageUrl(raw) || fallback;
  if (isMissingLocalAsset(raw)) return fallback;

  return raw;
}

export function normalizeArticleImage(article: {
  image?: string;
  categorySlug?: string;
}): string {
  return resolveBlogCover({ src: article.image, categorySlug: article.categorySlug });
}

export function usesDefaultBlogCover(options: {
  src?: string | null;
  categorySlug?: string;
}): boolean {
  const raw = options.src?.trim();
  if (!raw) return true;
  if (raw === "/images/blog-hero.jpg") return true;
  if (raw.startsWith("/images/") && isMissingLocalAsset(raw)) return true;
  return false;
}

export function needsUnoptimizedImage(src: string): boolean {
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/api/") ||
    src.includes("/api/uploads/")
  );
}
