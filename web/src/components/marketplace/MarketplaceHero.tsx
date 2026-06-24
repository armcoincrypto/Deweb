import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { MarketplaceHubContent } from "./MarketplaceHubContent";

export async function MarketplaceHero() {
  const t = await getTranslations("marketplace");

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />
      <MarketplaceHubContent />
    </>
  );
}
