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
  return localizedPageMetadata(locale as Locale, "cookie-policy", "/cookie-policy");
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const seo = await getLocalizedPageSeo(loc, "cookie-policy");
  const t = await getTranslations({ locale: loc, namespace: "legal" });
  const tFooter = await getTranslations({ locale: loc, namespace: "footer" });
  const legal = await getLegalContent(loc);

  return (
    <>
      <PageSchemas
        locale={loc}
        path="/cookie-policy"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: t("cookieTitle"), path: "/cookie-policy" },
        ]}
      />
      <LegalPageView
        title={t("cookieTitle")}
        subtitle={t("cookieSubtitle")}
        sections={legal.cookiePolicySections}
        relatedLinks={[
          { href: "/privacy-policy", label: tFooter("privacyPolicy") },
          { href: "/terms", label: tFooter("termsOfUse") },
        ]}
      />
    </>
  );
}
