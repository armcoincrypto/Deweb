import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export async function MarketplaceHubContent() {
  const t = await getTranslations("marketplace.hub");

  return (
    <section
      className="container-narrow border-b border-white/[0.06] px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby="marketplace-hub-heading"
    >
      <div className="space-y-10">
        <div>
          <h2 id="marketplace-hub-heading" className="text-2xl font-bold text-white">
            {t("whatYouCanHireTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("whatYouCanHireP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("whatYouCanHireP2")}</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
            <li>{t("hireItem1")}</li>
            <li>{t("hireItem2")}</li>
            <li>{t("hireItem3")}</li>
            <li>{t("hireItem4")}</li>
            <li>{t("hireItem5")}</li>
            <li>{t("hireItem6")}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("howItWorksTitle")}</h2>
          <ol className="mt-4 list-decimal space-y-4 pl-5 text-white/65">
            <li>
              <strong className="text-white/85">{t("howStep1Title")}</strong> — {t("howStep1Desc")}
            </li>
            <li>
              <strong className="text-white/85">{t("howStep2Title")}</strong> — {t("howStep2Desc")}
            </li>
            <li>
              <strong className="text-white/85">{t("howStep3Title")}</strong> — {t("howStep3Desc")}
            </li>
            <li>
              <strong className="text-white/85">{t("howStep4Title")}</strong> — {t("howStep4Desc")}
            </li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("whyDewebTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("whyDewebP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("whyDewebP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("categoriesTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("categoriesIntro")}</p>
          <ul className="mt-4 space-y-3 text-white/65">
            <li>
              <Link href="/marketplace/hire-telegram-bot-developers" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryHireTelegramLink")}
              </Link>
              {" — "}
              {t("categoryHireTelegramDesc")}
            </li>
            <li>
              <Link href="/marketplace/hire-ai-automation-specialists" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryHireAiLink")}
              </Link>
              {" — "}
              {t("categoryHireAiDesc")}
            </li>
            <li>
              <Link href="/dedicated-development-team" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryDedicatedTeamLink")}
              </Link>
              {" — "}
              {t("categoryDedicatedTeamDesc")}
            </li>
            <li>
              <Link href="/marketplace/hire-marketplace-developers" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryHireMarketplaceLink")}
              </Link>
              {" — "}
              {t("categoryHireMarketplaceDesc")}
            </li>
            <li>
              <Link href="/marketplace/hire-web-developers" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryHireWebLink")}
              </Link>
              {" — "}
              {t("categoryHireWebDesc")}
            </li>
            <li>
              <Link href="/services/shopify-development" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryShopifyLink")}
              </Link>
              {" — "}
              {t("categoryShopifyDesc")}
            </li>
            <li>
              <Link href="/services/ai-chatbot-development" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryAiLink")}
              </Link>
              {" — "}
              {t("categoryAiDesc")}
            </li>
            <li>
              <Link href="/services/ai-business-automation" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryAutomationLink")}
              </Link>
              {" — "}
              {t("categoryAutomationDesc")}
            </li>
            <li>
              <Link href="/services/telegram-bot-development" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryTelegramLink")}
              </Link>
              {" — "}
              {t("categoryTelegramDesc")}
            </li>
            <li>
              <Link href="/services/web-application-development" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryWebLink")}
              </Link>
              {" — "}
              {t("categoryWebDesc")}
            </li>
            <li>
              <Link href="/services/marketplace-development" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryMarketplaceLink")}
              </Link>
              {" — "}
              {t("categoryMarketplaceDesc")}
            </li>
            <li>
              <Link href="/services/landing-page-development" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryLandingLink")}
              </Link>
              {" — "}
              {t("categoryLandingDesc")}
            </li>
            <li>
              <Link href="/services" className="font-semibold text-deweb-cyan hover:underline">
                {t("categoryAllLink")}
              </Link>
              {" — "}
              {t("categoryAllDesc")}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("forClientsTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("forClientsP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("forClientsP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("forSpecialistsTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("forSpecialistsP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("forSpecialistsP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("resourcesTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">
            {t("resourcesP1")}{" "}
            <Link href="/blog/category/marketplace" className="text-deweb-cyan hover:underline">
              {t("resourcesBlogLink")}
            </Link>
            {" "}
            {t("resourcesP2")}{" "}
            <Link href="/contact" className="text-deweb-cyan hover:underline">
              {t("resourcesContactLink")}
            </Link>
            {" "}
            {t("resourcesP3")}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("faqTitle")}</h2>
          <dl className="mt-6 space-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i}>
                <dt className="font-semibold text-white">{t(`faq${i}q` as "faq1q")}</dt>
                <dd className="mt-2 leading-relaxed text-white/65">{t(`faq${i}a` as "faq1a")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
