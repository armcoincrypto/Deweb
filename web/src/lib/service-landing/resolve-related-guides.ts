import { getArticle } from "@/lib/blog";
import { getMessages, getNested } from "@/lib/i18n/locale-messages";
import type { Locale } from "@/i18n/routing";
import type { ServiceLandingSlug } from "./types";
import { getRelatedGuideSlugs } from "./related-guides";

export type ResolvedRelatedGuide = {
  href: string;
  label: string;
};

export async function resolveRelatedGuides(
  slug: ServiceLandingSlug,
  locale: string
): Promise<ResolvedRelatedGuide[]> {
  const slugs = getRelatedGuideSlugs(slug);
  if (!slugs.length) return [];

  const messages = await getMessages(locale as Locale);
  const guides: ResolvedRelatedGuide[] = [];

  for (const blogSlug of slugs) {
    const article = getArticle(blogSlug);
    if (!article) continue;

    const localizedLabel = getNested(
      messages,
      `serviceLanding.relatedGuides.labels.${blogSlug}`
    );
    guides.push({
      href: `/blog/${blogSlug}`,
      label: localizedLabel || article.title,
    });
  }

  return guides;
}
