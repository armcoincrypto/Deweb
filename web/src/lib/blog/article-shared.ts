import type { BlogArticle } from "./types";

export const DEFAULT_BLOG_CTA = {
  primaryLabel: "Get a Free Consultation",
  primaryHref: "/contact",
  secondaryLabel: "Explore DEWEB Services",
  secondaryHref: "/services",
} as const;

export function blogInternalLinks(
  links: { href: string; label: string }[]
): BlogArticle["internalLinks"] {
  return links;
}
