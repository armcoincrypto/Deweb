import { getTranslations } from "next-intl/server";
import { HireMarketplaceContent } from "@/components/marketplace/HireMarketplaceContent";
import { HireMarketplaceHero } from "@/components/marketplace/HireMarketplaceHero";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { buildHireFaqs } from "@/lib/marketplace-hire";

const PATH = "/marketplace/hire-telegram-bot-developers";
const NAMESPACE = "marketplace.hireTelegramBotDevelopers";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "hire-telegram-bot-developers", PATH);
}

export default async function HireTelegramBotDevelopersPage({ params }: Props) {
  const { locale } = await params;
  const seo = await getLocalizedPageSeo(locale, "hire-telegram-bot-developers");
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
          { name: "Hire Telegram Bot Developers", path: PATH },
        ]}
        faqs={faqs}
      />
      <HireMarketplaceHero namespace={NAMESPACE} />
      <HireMarketplaceContent
        namespace={NAMESPACE}
        headingId="hire-telegram-bot-heading"
        engagementLinks={{
          engagement2: "/services/telegram-bot-development",
          engagement3: "/services/ai-business-automation",
          engagement4: "/services/ai-chatbot-development",
        }}
      />
    </>
  );
}
