import { LegalPageView } from "@/components/legal/LegalPageView";
import { cookiePolicySections } from "@/lib/legal-content";
import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("cookie-policy"), "/cookie-policy", locale);
}

export default function CookiePolicyPage() {
  return (
    <LegalPageView
      title="Cookie Policy"
      subtitle="How DEWEB uses cookies and local storage on dewebam.com."
      sections={cookiePolicySections}
      relatedLinks={[
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Use" },
      ]}
    />
  );
}
