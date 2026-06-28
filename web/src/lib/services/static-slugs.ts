import { serviceCategories } from "@/lib/services-data";
import { isServiceLandingSlug, SERVICE_LANDING_SLUGS } from "@/lib/service-landing";
import { SUPERSEDED_LEGACY_SERVICE_IDS } from "@/lib/seo";

/** All slugs served by `/services/[slug]`. */
export function getServiceRouteSlugs(): string[] {
  const legacy = serviceCategories
    .filter((s) => !(SUPERSEDED_LEGACY_SERVICE_IDS as readonly string[]).includes(s.id))
    .filter((s) => !isServiceLandingSlug(s.id))
    .map((s) => s.id);
  return [...legacy, ...SERVICE_LANDING_SLUGS];
}
