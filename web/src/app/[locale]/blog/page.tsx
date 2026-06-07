import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { BlogView } from "@/components/blog/BlogView";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return buildPageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/blog",
    locale,
  });
}

export default function BlogPage() {
  return <BlogView />;
}
