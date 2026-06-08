import { MarketplaceView } from "@/components/marketplace/MarketplaceView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("marketplace"), "/marketplace", locale);
}

export default async function MarketplacePage({ params }: Props) {
  const { locale } = await params;
  const seo = getPageSeo("marketplace");

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
