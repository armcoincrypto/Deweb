import type { ServiceLandingPage } from "./types";

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}

export const DEFAULT_CTA = {
  primaryLabel: "Get a Free Consultation",
  primaryHref: "/contact",
  secondaryLabel: "View All Services",
  secondaryHref: "/services",
} as const;

export function related(
  items: { slug: string; title: string; description: string }[]
): ServiceLandingPage["relatedServices"] {
  return items;
}
