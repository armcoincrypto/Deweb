import { ServicesView } from "@/components/services/ServicesView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("services"), "/services", locale);
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const seo = getPageSeo("services");

  return (
    <>
      <PageSchemas
        locale={locale}
        path="/services"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <ServicesView />
    </>
  );
}
