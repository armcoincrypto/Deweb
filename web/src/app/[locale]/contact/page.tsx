import { ContactView } from "@/components/contact/ContactView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("contact"), "/contact", locale);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const seo = getPageSeo("contact");

  return (
    <>
      <PageSchemas
        locale={locale}
        path="/contact"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactView />
    </>
  );
}
