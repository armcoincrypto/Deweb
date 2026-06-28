"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { GlowButton } from "@/components/ui/GlowButton";

const TRUST_PILLARS = [
  { value: "Multi-industry", label: "Custom development" },
  { value: "Full-stack", label: "Web, mobile & AI" },
  { value: "Multilingual", label: "EN · ES · RU · AM" },
  { value: "Ongoing", label: "Post-launch support" },
] as const;

const SERVICE_PILLS = [
  "pillShopify",
  "pillAutomation",
  "pillChatbots",
  "pillSaas",
  "pillWeb",
] as const;

export function HomepageHero() {
  const t = useTranslations("home");

  return (
    <section
      id="hero"
      className="homepage-hero relative flex min-h-[100dvh] items-center overflow-hidden pb-16 pt-[var(--navbar-offset)] sm:pb-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,242,255,0.14),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deweb-bg to-transparent"
        aria-hidden
      />

      <div className="container-narrow relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="text-[10px] sm:text-xs">{t("badge")}</Badge>

          <h1 className="mt-5 text-gradient-cyan text-[1.85rem] font-bold leading-[1.08] tracking-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block">{t("heroHeadlineLine1")}</span>
            <span className="block">{t("heroHeadlineLine2")}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg">
            {t("heroValueProp")}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2 sm:mt-6">
            {SERVICE_PILLS.map((key) => (
              <span
                key={key}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
              >
                {t(key)}
              </span>
            ))}
          </div>

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <GlowButton
              href="#contact"
              variant="primary"
              className="w-full !px-7 !py-3.5 sm:w-auto"
              trackCta={{ eventType: "contact_click", placement: "hero", label: t("consultCta") }}
            >
              {t("consultCta")}
            </GlowButton>
            <GlowButton
              href="#services"
              variant="secondary"
              className="w-full !px-7 !py-3.5 sm:w-auto"
              trackCta={{ eventType: "cta_click", placement: "hero", label: t("viewServicesCta") }}
            >
              {t("viewServicesCta")}
            </GlowButton>
          </div>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4">
            {TRUST_PILLARS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 sm:px-4 sm:py-4"
              >
                <p className="text-xl font-bold text-deweb-cyan sm:text-2xl">{stat.value}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/45 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          {t("scrollHint")}
        </p>
        <div className="mx-auto mt-2 h-8 w-5 rounded-full border border-white/15 p-1">
          <div className="mx-auto h-1.5 w-1 animate-bounce rounded-full bg-deweb-cyan" />
        </div>
      </div>
    </section>
  );
}
