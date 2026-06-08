import { LegalPageView } from "@/components/legal/LegalPageView";
import { privacyPolicySections } from "@/lib/legal-content";
import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("privacy-policy"), "/privacy-policy", locale);
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageView
      title="Privacy Policy"
      subtitle="How DEWEB collects, uses, and protects your personal data."
      sections={privacyPolicySections}
      relatedLinks={[
        { href: "/cookie-policy", label: "Cookie Policy" },
        { href: "/terms", label: "Terms of Use" },
      ]}
    />
  );
}
