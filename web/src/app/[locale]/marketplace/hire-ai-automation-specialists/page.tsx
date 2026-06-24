import { getTranslations } from "next-intl/server";
import { HireMarketplaceContent } from "@/components/marketplace/HireMarketplaceContent";
import { HireMarketplaceHero } from "@/components/marketplace/HireMarketplaceHero";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { buildHireFaqs } from "@/lib/marketplace-hire";

const PATH = "/marketplace/hire-ai-automation-specialists";
const NAMESPACE = "marketplace.hireAiAutomationSpecialists";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "hire-ai-automation-specialists", PATH);
}

export default async function HireAiAutomationSpecialistsPage({ params }: Props) {
  const { locale } = await params;
  const seo = await getLocalizedPageSeo(locale, "hire-ai-automation-specialists");
  const t = await getTranslations(NAMESPACE);
  const faqs = buildHireFaqs((key) => t(key));

  return (
    <>
      <PageSchemas
        locale={locale}
        path={PATH}
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Marketplace", path: "/marketplace" },
          { name: "Hire AI Automation Specialists", path: PATH },
        ]}
        faqs={faqs}
      />
      <HireMarketplaceHero namespace={NAMESPACE} />
      <HireMarketplaceContent
        namespace={NAMESPACE}
        headingId="hire-ai-automation-heading"
        engagementLinks={{
          engagement2: "/services/ai-business-automation",
          engagement3: "/services/ai-chatbot-development",
          engagement4: "/services/telegram-bot-development",
        }}
      />
    </>
  );
}
