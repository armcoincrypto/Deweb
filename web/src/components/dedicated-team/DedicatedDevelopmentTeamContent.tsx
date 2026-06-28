import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { getLocalizedBlogArticle } from "@/lib/i18n/content";
import { DEDICATED_TEAM_GUIDES } from "@/lib/dedicated-team-guides";
import { P5_COST_GUIDE_LINKS } from "@/lib/cost-guides/p5-links";
import { DedicatedDevelopmentTeamCta } from "./DedicatedDevelopmentTeamCta";

const RELATED_SERVICES = [
  { href: "/services/marketplace-development", labelKey: "relatedServiceMarketplace" },
  { href: "/services/web-application-development", labelKey: "relatedServiceWeb" },
  { href: "/services/saas-development", labelKey: "relatedServiceSaas" },
  { href: "/services/mobile", labelKey: "relatedServiceMobile" },
  { href: "/services/seo", labelKey: "relatedServiceSeo" },
  { href: "/services/landing-page-development", labelKey: "relatedServiceLanding" },
  { href: "/marketplace", labelKey: "relatedServiceMarketplaceHub" },
  { href: "/marketplace/hire-web-developers", labelKey: "relatedServiceHireWeb" },
  { href: "/marketplace/hire-marketplace-developers", labelKey: "relatedServiceHireMarketplace" },
] as const;

type DedicatedDevelopmentTeamContentProps = {
  locale: string;
};

export async function DedicatedDevelopmentTeamContent({
  locale,
}: DedicatedDevelopmentTeamContentProps) {
  const t = await getTranslations("dedicatedTeam");
  const loc = locale as Locale;

  const guides = (
    await Promise.all(
      DEDICATED_TEAM_GUIDES.map(async (slug) => {
        const article = await getLocalizedBlogArticle(slug, loc);
        return article ? { slug, title: article.title } : null;
      })
    )
  ).filter(Boolean) as { slug: string; title: string }[];

  return (
    <section
      className="container-narrow border-b border-white/[0.06] px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby="dedicated-team-heading"
    >
      <div className="space-y-10">
        <div>
          <h2 id="dedicated-team-heading" className="text-2xl font-bold text-white">
            {t("whyTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("whyP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("whyP2")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("whyP3")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("includesTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("includesIntro")}</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <li key={i}>{t(`includesItem${i}` as "includesItem1")}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("modelsTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("modelsIntro")}</p>
          <ul className="mt-4 space-y-4 text-white/65">
            {[1, 2, 3, 4].map((i) => (
              <li key={i}>
                <strong className="text-white/85">{t(`model${i}Title` as "model1Title")}</strong>
                {" — "}
                {t(`model${i}Desc` as "model1Desc")}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("startupsTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("startupsP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("startupsP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("saasTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("saasP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("saasP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("marketplacesTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("marketplacesP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("marketplacesP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("mobileTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("mobileP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("mobileP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("ecommerceTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("ecommerceP1")}</p>
          <p className="mt-4 leading-relaxed text-white/65">{t("ecommerceP2")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">{t("processTitle")}</h2>
          <ol className="mt-4 list-decimal space-y-4 pl-5 text-white/65">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <li key={i}>
                <strong className="text-white/85">{t(`processStep${i}Title` as "processStep1Title")}</strong>
                {" — "}
                {t(`processStep${i}Desc` as "processStep1Desc")}
              </li>
            ))}
          </ol>
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
          <h2 className="text-2xl font-bold text-white">{t("costGuidesTitle")}</h2>
          <p className="mt-4 leading-relaxed text-white/65">{t("costGuidesIntro")}</p>
          <ul className="mt-4 space-y-3 text-white/65">
            {P5_COST_GUIDE_LINKS.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/${guide.slug}`}
                  className="font-semibold text-deweb-cyan hover:underline"
                >
                  {guide.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

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

        <DedicatedDevelopmentTeamCta
          title={t("ctaTitle")}
          description={t("ctaDescription")}
          primaryLabel={t("ctaPrimary")}
          secondaryLabel={t("ctaSecondary")}
        />
      </div>
    </section>
  );
}
