import { ServicesView } from "@/components/services/ServicesView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { getServiceBanners } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "services", "/services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const [seo, banners] = await Promise.all([
    getLocalizedPageSeo(loc, "services"),
    getServiceBanners(loc),
  ]);

  return (
    <>
      <PageSchemas
        locale={loc}
        path="/services"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <ServicesView banners={banners} />
    </>
  );
}
