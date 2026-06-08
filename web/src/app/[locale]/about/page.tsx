import { AboutView } from "@/components/about/AboutView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("about"), "/about", locale);
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const seo = getPageSeo("about");

  return (
    <>
      <PageSchemas
        locale={locale}
        path="/about"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutView />
    </>
  );
}
