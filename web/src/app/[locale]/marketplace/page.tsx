import { getTranslations } from "next-intl/server";
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { MarketplaceView } from "@/components/marketplace/MarketplaceView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { buildMarketplaceFaqs } from "@/lib/marketplace-hub";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "marketplace", "/marketplace");
}

export default async function MarketplacePage({ params }: Props) {
  const { locale } = await params;
  const seo = await getLocalizedPageSeo(locale, "marketplace");
  const t = await getTranslations("marketplace");
  const faqs = buildMarketplaceFaqs((key) => t(key));

  return (
    <>
      <PageSchemas
        locale={locale}
        path="/marketplace"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Marketplace", path: "/marketplace" },
        ]}
        faqs={faqs}
      />
      <MarketplaceHero />
      <MarketplaceView />
    </>
  );
}
