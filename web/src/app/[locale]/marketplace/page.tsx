import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { MarketplaceView } from "@/components/marketplace/MarketplaceView";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "marketplace" });
  return buildPageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/marketplace",
    locale,
  });
}

export default function MarketplacePage() {
  return <MarketplaceView />;
}
