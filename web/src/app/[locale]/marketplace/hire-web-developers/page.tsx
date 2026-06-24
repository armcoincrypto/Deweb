import { getTranslations } from "next-intl/server";
import { HireWebDevelopersContent } from "@/components/marketplace/HireWebDevelopersContent";
import { HireWebDevelopersHero } from "@/components/marketplace/HireWebDevelopersHero";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { buildHireWebDevelopersFaqs } from "@/lib/marketplace-hire";

const PATH = "/marketplace/hire-web-developers";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "hire-web-developers", PATH);
}

export default async function HireWebDevelopersPage({ params }: Props) {
  const { locale } = await params;
  const seo = await getLocalizedPageSeo(locale, "hire-web-developers");
  const t = await getTranslations("marketplace.hireWebDevelopers");
  const faqs = buildHireWebDevelopersFaqs((key) => t(key));

  return (
    <>
      <PageSchemas
        locale={locale}
        path={PATH}
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Marketplace", path: "/marketplace" },
          { name: "Hire Web Developers", path: PATH },
        ]}
        faqs={faqs}
      />
      <HireWebDevelopersHero />
      <HireWebDevelopersContent />
    </>
  );
}
