import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { getLocalizedBlogArticle } from "@/lib/i18n/content";
import { HIRE_MARKETPLACE_DEVELOPER_GUIDES } from "@/lib/marketplace-hire-guides";
import { HireMarketplaceDevelopersCta } from "./HireMarketplaceDevelopersCta";

const RELATED_SERVICES = [
  { href: "/services/marketplace-development", labelKey: "relatedServiceMarketplace" },
  { href: "/services/web-application-development", labelKey: "relatedServiceWeb" },
  { href: "/services/mobile", labelKey: "relatedServiceMobile" },
  { href: "/services/saas-development", labelKey: "relatedServiceSaas" },
  { href: "/services/seo", labelKey: "relatedServiceSeo" },
  { href: "/services/landing-page-development", labelKey: "relatedServiceLanding" },
  { href: "/marketplace", labelKey: "relatedServiceMarketplaceHub" },
  { href: "/marketplace/hire-web-developers", labelKey: "relatedServiceHireWeb" },
  { href: "/dedicated-development-team", labelKey: "relatedServiceDedicatedTeam" },
] as const;

type HireMarketplaceDevelopersContentProps = {
  locale: string;
};

export async function HireMarketplaceDevelopersContent({
  locale,
}: HireMarketplaceDevelopersContentProps) {
  const t = await getTranslations("marketplace.hireMarketplaceDevelopers");
  const loc = locale as Locale;

  const guides = (
    await Promise.all(
      HIRE_MARKETPLACE_DEVELOPER_GUIDES.map(async (slug) => {
        const article = await getLocalizedBlogArticle(slug, loc);
        return article ? { slug, title: article.title } : null;
      })
    )
  ).filter(Boolean) as { slug: string; title: string }[];

  return (
    <section
      className="container-narrow border-b border-white/[0.06] px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby="hire-marketplace-dev-heading"
    >
      <div className="space-y-10">
        <div>
          <h2 id="hire-marketplace-dev-heading" className="text-2xl font-bold text-white">
            {t("whyHireTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("whyHireP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("whyHireP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("buildTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("buildIntro")}</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <li key={i}>{t(`buildItem${i}` as "buildItem1")}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("featuresTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("featuresIntro")}</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <li key={i}>{t(`featuresItem${i}` as "featuresItem1")}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("hiringTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("hiringP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("hiringP2")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("hiringP3")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("processTitle")}</h2>
          <ol className="mt-4 list-decimal space-y-4 pl-5 text-white/65">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <li key={i}>
                <strong className="text-white/85">{t(`processStep${i}Title` as "processStep1Title")}</strong>
                {" — "}
                {t(`processStep${i}Desc` as "processStep1Desc")}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("businessTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("businessIntro")}</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <li key={i}>{t(`businessItem${i}` as "businessItem1")}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("ecosystemTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("ecosystemP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("ecosystemP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("relatedServicesTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("relatedServicesIntro")}</p>
          <ul className="mt-4 space-y-3 text-white/65">
            {RELATED_SERVICES.map(({ href, labelKey }) => (
              <li key={href}>
                <Link href={href} className="font-semibold text-deweb-cyan hover:underline">
                  {t(labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {guides.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white">{t("guidesTitle")}</h2>
            <p className="mt-4 leading-relaxed text-white/65">{t("guidesIntro")}</p>
            <ul className="mt-4 space-y-3 text-white/65">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/blog/${guide.slug}`}
                    className="font-semibold text-deweb-cyan hover:underline"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-white">{t("faqTitle")}</h2>
          <dl className="mt-6 space-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i}>
                <dt className="font-semibold text-white">{t(`faq${i}q` as "faq1q")}</dt>
                <dd className="mt-2 leading-relaxed text-white/65">{t(`faq${i}a` as "faq1a")}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HireMarketplaceDevelopersCta
          title={t("ctaTitle")}
          description={t("ctaDescription")}
          primaryLabel={t("ctaPrimary")}
          secondaryLabel={t("ctaSecondary")}
        />
      </div>
    </section>
  );
}
