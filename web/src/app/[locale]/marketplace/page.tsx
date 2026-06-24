import { MarketplaceView } from "@/components/marketplace/MarketplaceView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "marketplace", "/marketplace");
}

export default async function MarketplacePage({ params }: Props) {
  const { locale } = await params;
  const seo = await getLocalizedPageSeo(locale, "marketplace");

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
      />
      <MarketplaceView />
    </>
  );
}
