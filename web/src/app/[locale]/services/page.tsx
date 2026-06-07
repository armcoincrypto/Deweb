import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesView } from "@/components/services/ServicesView";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return buildPageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/services",
    locale,
  });
}

export default function ServicesPage() {
  return <ServicesView />;
}
