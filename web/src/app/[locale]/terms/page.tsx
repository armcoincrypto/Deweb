import { LegalPageView } from "@/components/legal/LegalPageView";
import { termsOfUseSections } from "@/lib/legal-content";
import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("terms"), "/terms", locale);
}

export default function TermsPage() {
  return (
    <LegalPageView
      title="Terms of Use"
      subtitle="Rules and conditions for using the DEWEB marketplace and services."
      sections={termsOfUseSections}
      relatedLinks={[
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/cookie-policy", label: "Cookie Policy" },
      ]}
    />
  );
}
