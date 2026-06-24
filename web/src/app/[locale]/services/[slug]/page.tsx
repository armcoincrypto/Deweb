import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { ServiceLandingView } from "@/components/seo/ServiceLandingView";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { serviceCategories } from "@/lib/services-data";
import {
  getLocalizedLandingPage,
  getServiceByIdLocalized,
} from "@/lib/i18n/content";
import {
  isServiceLandingSlug,
  SERVICE_LANDING_SLUGS,
} from "@/lib/service-landing";
import { SUPERSEDED_LEGACY_SERVICE_IDS } from "@/lib/seo";
import { metadataFromEntry, absoluteUrl } from "@/lib/seo";
import {
  localizedLandingMetadata,
  localizedServiceMetadata,
} from "@/lib/i18n/page-metadata";
import { getLocalizedLandingSeo, getLocalizedServiceSeo } from "@/lib/i18n/locale-seo";
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

export function generateStaticParams() {
  const legacy = serviceCategories
    .filter((s) => !(SUPERSEDED_LEGACY_SERVICE_IDS as readonly string[]).includes(s.id))
    .map((s) => ({ slug: s.id }));
  const landings = SERVICE_LANDING_SLUGS.map((slug) => ({ slug }));
  return [...legacy, ...landings];
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  if (isServiceLandingSlug(slug)) {
    const page = await getLocalizedLandingPage(slug, loc);
    if (!page) return {};
    return localizedLandingMetadata(loc, slug, page.path);
  }

  const service = await getServiceByIdLocalized(slug, loc);
  if (!service) return {};
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
        <ServiceLandingView page={page} breadcrumbs={breadcrumbs} />
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
