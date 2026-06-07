import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { ContactView } from "@/components/contact/ContactView";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildPageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/contact",
    locale,
  });
}

export default function ContactPage() {
  return <ContactView />;
}
