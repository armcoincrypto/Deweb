"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GlassCard } from "@/components/ui/GlassCard";

const EXAMPLE_PROJECTS = [
  {
    key: "example1",
    href: "/services/telegram-bot-development",
  },
  {
    key: "example2",
    href: "/services/ai-business-automation",
  },
  {
    key: "example3",
    href: "/services/shopify-development",
  },
  {
    key: "example4",
    href: "/services/saas-development",
  },
  {
    key: "example5",
    href: "/services/marketplace-development",
  },
  {
    key: "example6",
    href: "/services/web-application-development",
  },
] as const;

const POPULAR_CATEGORIES = [
  { key: "categoryTelegram", href: "/services/telegram-bot-development" },
  { key: "categoryAi", href: "/services/ai-business-automation" },
  { key: "categoryWeb", href: "/services/web-application-development" },
  { key: "categoryMarketplace", href: "/services/marketplace-development" },
  { key: "categoryShopify", href: "/services/shopify-development" },
  { key: "categorySaas", href: "/services/saas-development" },
] as const;

const HIRING_STEPS = ["step1", "step2", "step3", "step4"] as const;
const BENEFITS = ["benefit1", "benefit2", "benefit3", "benefit4", "benefit5"] as const;
const BRIEF_POINTS = ["brief1", "brief2", "brief3", "brief4", "brief5"] as const;

export function MarketplaceAuthorityEmptyState() {
  const t = useTranslations("marketplace.authority");

  return (
    <div className="space-y-16 border-t border-white/[0.06] pt-12">
      {/* Phase 1 — Example project scopes */}
      <section aria-labelledby="example-projects-heading">
        <div className="text-center">
          <h2 id="example-projects-heading" className="text-2xl font-bold text-white sm:text-3xl">
            {t("exampleProjectsTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-white/60">{t("exampleProjectsSubtitle")}</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/45">{t("exampleDisclaimer")}</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLE_PROJECTS.map(({ key, href }) => (
            <GlassCard key={key} className="flex h-full flex-col p-6">
              <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white/55">
                {t("exampleBadge")}
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{t(`${key}Title`)}</h3>
              <p className="mt-2 text-sm font-semibold text-deweb-cyan">
                {t("budgetLabel")}: {t(`${key}Budget`)}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{t(`${key}Desc`)}</p>
              <Link
                href={href}
                className="mt-5 inline-flex text-sm font-semibold text-deweb-cyan hover:underline"
              >
                {t("relatedServiceLink")} →
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Phase 2 — Popular categories */}
      <section aria-labelledby="popular-categories-heading">
        <h2 id="popular-categories-heading" className="text-2xl font-bold text-white">
          {t("popularCategoriesTitle")}
        </h2>
        <p className="mt-3 max-w-3xl text-white/60">{t("popularCategoriesIntro")}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_CATEGORIES.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-deweb-cyan/35 hover:bg-deweb-cyan/5"
              >
                <span className="font-semibold text-white group-hover:text-deweb-cyan">
                  {t(key)}
                </span>
                <span className="text-deweb-cyan opacity-70 group-hover:opacity-100">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Phase 3 — Hiring process */}
      <section aria-labelledby="hiring-process-heading">
        <h2 id="hiring-process-heading" className="text-2xl font-bold text-white">
          {t("hiringProcessTitle")}
        </h2>
        <p className="mt-3 max-w-3xl text-white/60">{t("hiringProcessIntro")}</p>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HIRING_STEPS.map((step, index) => (
            <li key={step} className="text-center sm:text-left">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-deweb-cyan/40 bg-deweb-cyan/10 text-lg font-bold text-deweb-cyan sm:mx-0">
                {index + 1}
              </div>
              <h3 className="mt-4 font-bold text-white">{t(`${step}Title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{t(`${step}Desc`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Phase 4 — Marketplace benefits */}
      <section aria-labelledby="marketplace-benefits-heading">
        <h2 id="marketplace-benefits-heading" className="text-2xl font-bold text-white">
          {t("benefitsTitle")}
        </h2>
        <ul className="mt-6 list-inside list-disc space-y-3 text-white/65">
          {BENEFITS.map((benefit) => (
            <li key={benefit}>{t(benefit)}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/account/listings"
            className="inline-flex items-center justify-center rounded-full bg-deweb-cyan px-7 py-3 text-sm font-bold text-deweb-bg"
          >
            {t("benefitsCtaPrimary")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-bold text-white hover:border-deweb-cyan/40"
          >
            {t("benefitsCtaSecondary")}
          </Link>
        </div>
      </section>

      {/* Phase 5 — Trust / project brief guidance */}
      <section
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10"
        aria-labelledby="project-brief-heading"
      >
        <h2 id="project-brief-heading" className="text-2xl font-bold text-white">
          {t("trustTitle")}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-white/60">{t("trustIntro")}</p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          {BRIEF_POINTS.map((point) => (
            <div key={point}>
              <dt className="font-semibold text-white">{t(`${point}Title`)}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/55">{t(`${point}Desc`)}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
