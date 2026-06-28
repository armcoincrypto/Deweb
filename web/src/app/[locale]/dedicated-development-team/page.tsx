import { getTranslations } from "next-intl/server";
import { DedicatedDevelopmentTeamContent } from "@/components/dedicated-team/DedicatedDevelopmentTeamContent";
import { DedicatedDevelopmentTeamHero } from "@/components/dedicated-team/DedicatedDevelopmentTeamHero";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { buildHireFaqs } from "@/lib/marketplace-hire";

const PATH = "/dedicated-development-team";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "dedicated-development-team", PATH);
}

export default async function DedicatedDevelopmentTeamPage({ params }: Props) {
  const { locale } = await params;
  const seo = await getLocalizedPageSeo(locale, "dedicated-development-team");
  const t = await getTranslations("dedicatedTeam");
  const faqs = buildHireFaqs((key) => t(key), 9);

  return (
    <>
      <PageSchemas
        locale={locale}
        path={PATH}
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Dedicated Development Team", path: PATH },
        ]}
        faqs={faqs}
      />
      <DedicatedDevelopmentTeamHero />
      <DedicatedDevelopmentTeamContent locale={locale} />
    </>
  );
}
