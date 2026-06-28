import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { ServiceLandingView } from "@/components/seo/ServiceLandingView";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageSchemas } from "@/components/seo/PageSchemas";
import {
  getLocalizedLandingPage,
  getServiceByIdLocalized,
} from "@/lib/i18n/content";
import {
  isServiceLandingSlug,
  type ServiceLandingSlug,
} from "@/lib/service-landing";
import { resolveRelatedGuides } from "@/lib/service-landing/resolve-related-guides";
import { resolveCostGuides } from "@/lib/cost-guides/resolve-cost-guides";
import { buildLocaleSlugParams } from "@/lib/i18n/locale-static-params";
import { getServiceRouteSlugs } from "@/lib/services/static-slugs";
import { absoluteUrl } from "@/lib/seo";
import {
  localizedLandingMetadata,
  localizedServiceMetadata,
} from "@/lib/i18n/page-metadata";
import { getLocalizedServiceSeo } from "@/lib/i18n/locale-seo";
import type { Locale } from "@/i18n/routing";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  return buildLocaleSlugParams(getServiceRouteSlugs());
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  if (isServiceLandingSlug(slug)) {
    const page = await getLocalizedLandingPage(slug, loc);
    if (!page) notFound();
    return localizedLandingMetadata(loc, slug, page.path);
  }

  const service = await getServiceByIdLocalized(slug, loc);
  if (!service) notFound();
  return localizedServiceMetadata(
    loc,
    slug,
    `/services/${slug}`,
    service.title,
    service.overview || service.desc
  );
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as Locale;

  if (isServiceLandingSlug(slug)) {
    const page = await getLocalizedLandingPage(slug, loc);
    if (!page) notFound();

    const url = absoluteUrl(locale, page.path);
    const breadcrumbs = [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: page.h1, path: page.path },
    ];
    const relatedGuides = [
      ...(await resolveRelatedGuides(slug as ServiceLandingSlug, loc)),
      ...resolveCostGuides(slug as ServiceLandingSlug),
    ];
    const tGuides = await getTranslations("serviceLanding.relatedGuides");

    return (
      <>
        <JsonLd
          data={[
            webPageSchema({ name: page.h1, description: page.subtitle, url }),
            breadcrumbSchema(breadcrumbs, locale),
            serviceSchema({
              name: page.h1,
              description: page.subtitle,
              url,
              priceRange: page.priceRange,
            }),
            faqPageSchema(page.faqs),
          ]}
        />
        <ServiceLandingView
          page={page}
          breadcrumbs={breadcrumbs}
          relatedGuides={relatedGuides}
          relatedGuidesCopy={{
            title: tGuides("title"),
            intro: tGuides("intro"),
            readGuide: tGuides("readGuide"),
          }}
        />
      </>
    );
  }

  const service = await getServiceByIdLocalized(slug, loc);
  if (!service) notFound();

  const seo = await getLocalizedServiceSeo(
    locale as Locale,
    slug,
    service.title,
    service.overview || service.desc
  );
  const path = `/services/${slug}`;

  return (
    <>
      <PageSchemas
        locale={locale}
        path={path}
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path },
        ]}
        type="service"
        priceRange={service.price}
      />
      <ServiceDetailView service={service} />
    </>
  );
}
