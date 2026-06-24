import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { HireMarketplaceCta } from "./HireMarketplaceCta";

type HireMarketplaceContentProps = {
  namespace:
    | "marketplace.hireTelegramBotDevelopers"
    | "marketplace.hireAiAutomationSpecialists";
  headingId: string;
  engagementLinks: {
    engagement2: string;
    engagement3: string;
    engagement4: string;
  };
};

export async function HireMarketplaceContent({
  namespace,
  headingId,
  engagementLinks,
}: HireMarketplaceContentProps) {
  const t = await getTranslations(namespace);

  return (
    <section
      className="container-narrow border-b border-white/[0.06] px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby={headingId}
    >
      <div className="space-y-10">
        <div>
          <h2 id={headingId} className="text-2xl font-bold text-white">
            {t("whyHireTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("whyHireP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("whyHireP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("typesTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("typesIntro")}</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
            <li>{t("typeItem1")}</li>
            <li>{t("typeItem2")}</li>
            <li>{t("typeItem3")}</li>
            <li>{t("typeItem4")}</li>
            <li>{t("typeItem5")}</li>
            <li>{t("typeItem6")}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("engagementTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("engagementIntro")}</p>
          <ul className="mt-4 space-y-4 text-white/65">
            <li>
              <strong className="text-white/85">{t("engagement1Title")}</strong> — {t("engagement1Desc")}{" "}
              <Link href="/marketplace" className="text-deweb-cyan hover:underline">
                {t("engagement1Link")}
              </Link>
            </li>
            <li>
              <strong className="text-white/85">{t("engagement2Title")}</strong> — {t("engagement2Desc")}{" "}
              <Link href={engagementLinks.engagement2} className="text-deweb-cyan hover:underline">
                {t("engagement2Link")}
              </Link>
            </li>
            <li>
              <strong className="text-white/85">{t("engagement3Title")}</strong> — {t("engagement3Desc")}{" "}
              <Link href={engagementLinks.engagement3} className="text-deweb-cyan hover:underline">
                {t("engagement3Link")}
              </Link>
            </li>
            <li>
              <strong className="text-white/85">{t("engagement4Title")}</strong> — {t("engagement4Desc")}{" "}
              <Link href={engagementLinks.engagement4} className="text-deweb-cyan hover:underline">
                {t("engagement4Link")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("processTitle")}</h2>
          <ol className="mt-4 list-decimal space-y-4 pl-5 text-white/65">
            <li>
              <strong className="text-white/85">{t("processStep1Title")}</strong> — {t("processStep1Desc")}
            </li>
            <li>
              <strong className="text-white/85">{t("processStep2Title")}</strong> — {t("processStep2Desc")}
            </li>
            <li>
              <strong className="text-white/85">{t("processStep3Title")}</strong> — {t("processStep3Desc")}
            </li>
            <li>
              <strong className="text-white/85">{t("processStep4Title")}</strong> — {t("processStep4Desc")}
            </li>
            <li>
              <strong className="text-white/85">{t("processStep5Title")}</strong> — {t("processStep5Desc")}
            </li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("relatedTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">
            {t("relatedP1")}{" "}
            <Link href="/marketplace" className="text-deweb-cyan hover:underline">
              {t("relatedMarketplaceLink")}
            </Link>
            {t("relatedP2")}{" "}
            <Link href={engagementLinks.engagement2} className="text-deweb-cyan hover:underline">
              {t("relatedServiceLink")}
            </Link>
            {t("relatedP3")}{" "}
            <Link href="/contact" className="text-deweb-cyan hover:underline">
              {t("relatedContactLink")}
            </Link>
            {t("relatedP4")}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("faqTitle")}</h2>
          <dl className="mt-6 space-y-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i}>
                <dt className="font-semibold text-white">{t(`faq${i}q` as "faq1q")}</dt>
                <dd className="mt-2 leading-relaxed text-white/65">{t(`faq${i}a` as "faq1a")}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HireMarketplaceCta
          title={t("ctaTitle")}
          description={t("ctaDescription")}
          primaryLabel={t("ctaPrimary")}
          secondaryLabel={t("ctaSecondary")}
        />
      </div>
    </section>
  );
}
