import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { AboutView } from "@/components/about/AboutView";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return buildPageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/about",
    locale,
  });
}

export default function AboutPage() {
  return <AboutView />;
}
