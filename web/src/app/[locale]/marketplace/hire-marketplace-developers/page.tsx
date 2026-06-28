import { getTranslations } from "next-intl/server";
import { HireMarketplaceDevelopersContent } from "@/components/marketplace/HireMarketplaceDevelopersContent";
import { HireMarketplaceDevelopersHero } from "@/components/marketplace/HireMarketplaceDevelopersHero";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { buildHireFaqs } from "@/lib/marketplace-hire";

const PATH = "/marketplace/hire-marketplace-developers";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "hire-marketplace-developers", PATH);
}

export default async function HireMarketplaceDevelopersPage({ params }: Props) {
  const { locale } = await params;
  const seo = await getLocalizedPageSeo(locale, "hire-marketplace-developers");
  const t = await getTranslations("marketplace.hireMarketplaceDevelopers");
  const faqs = buildHireFaqs((key) => t(key), 9);

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
          { name: "Hire Marketplace Developers", path: PATH },
        ]}
        faqs={faqs}
      />
      <HireMarketplaceDevelopersHero />
      <HireMarketplaceDevelopersContent locale={locale} />
    </>
  );
}
