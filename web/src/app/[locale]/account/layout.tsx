import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("account"), "/account", locale, { noIndex: true });
}

export default function AccountLayout({ children }: Props) {
  return children;
}
