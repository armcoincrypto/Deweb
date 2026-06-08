import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { ServiceLandingView } from "@/components/seo/ServiceLandingView";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getServiceById, serviceCategories } from "@/lib/services-data";
import {
  getServiceLandingPage,
  isServiceLandingSlug,
  SERVICE_LANDING_SLUGS,
} from "@/lib/service-landing";
import { metadataFromEntry, absoluteUrl } from "@/lib/seo";
import { getLandingSeo, getServiceSeo } from "@/lib/seo-metadata";
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
  const legacy = serviceCategories.map((s) => ({ slug: s.id }));
  const landings = SERVICE_LANDING_SLUGS.map((slug) => ({ slug }));
  return [...legacy, ...landings];
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;

  if (isServiceLandingSlug(slug)) {
    const page = getServiceLandingPage(slug)!;
    return metadataFromEntry(getLandingSeo(slug), page.path, locale);
  }

  const service = getServiceById(slug);
  if (!service) return {};
  const seo = getServiceSeo(slug, service.title, service.overview || service.desc);
  return metadataFromEntry(seo, `/services/${slug}`, locale);
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;

  if (isServiceLandingSlug(slug)) {
    const page = getServiceLandingPage(slug);
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

  const service = getServiceById(slug);
  if (!service) notFound();

  const seo = getServiceSeo(slug, service.title, service.overview || service.desc);
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
