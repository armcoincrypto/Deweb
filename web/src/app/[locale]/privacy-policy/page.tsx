import { getTranslations } from "next-intl/server";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLegalContent } from "@/lib/i18n/content";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale as Locale, "privacy-policy", "/privacy-policy");
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const seo = await getLocalizedPageSeo(loc, "privacy-policy");
  const t = await getTranslations({ locale: loc, namespace: "legal" });
  const tFooter = await getTranslations({ locale: loc, namespace: "footer" });
  const legal = await getLegalContent(loc);

  return (
    <>
      <PageSchemas
        locale={loc}
        path="/privacy-policy"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: t("privacyTitle"), path: "/privacy-policy" },
        ]}
      />
      <LegalPageView
        title={t("privacyTitle")}
        subtitle={t("privacySubtitle")}
        sections={legal.privacyPolicySections}
        relatedLinks={[
          { href: "/cookie-policy", label: tFooter("cookiePolicy") },
          { href: "/terms", label: tFooter("termsOfUse") },
        ]}
      />
    </>
  );
}
