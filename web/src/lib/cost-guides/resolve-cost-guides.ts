import { getCostGuide } from "@/lib/cost-guides";
import { getServiceCostGuideSlugs } from "@/lib/cost-guides/service-links";
import type { ServiceLandingSlug } from "@/lib/service-landing/types";
import type { ResolvedRelatedGuide } from "@/lib/service-landing/resolve-related-guides";

export function resolveCostGuides(slug: ServiceLandingSlug): ResolvedRelatedGuide[] {
  return getServiceCostGuideSlugs(slug).map((guideSlug) => {
    const guide = getCostGuide(guideSlug);
    return {
      href: guide.path,
      label: guide.h1,
    };
  });
}
