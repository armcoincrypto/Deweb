"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceBannerVisual } from "@/components/services/ServiceBannerVisual";
import { ServiceStoryCard } from "@/components/cinematic/ServiceStoryCard";
import { ScrollUniverseLayer } from "@/components/cinematic/ScrollUniverseLayer";
import { CssGlobe, SparkleField } from "@/components/ui/SparkleField";
import type { PinnedHomeSlide } from "@/lib/home-pinned-services-data";
import { PERSPECTIVE } from "@/lib/motion-3d";
import { cn } from "@/lib/utils";

const EcosystemScene = dynamic(
  () => import("./scenes/EcosystemScene").then((m) => ({ default: m.EcosystemScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh" /> }
);
const ShopifyScene = dynamic(
  () => import("./scenes/ShopifyScene").then((m) => ({ default: m.ShopifyScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh opacity-40" /> }
);
const AINeuralScene = dynamic(
  () => import("./scenes/AINeuralScene").then((m) => ({ default: m.AINeuralScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh opacity-40" /> }
);
const AutomationScene = dynamic(
  () => import("./scenes/AutomationScene").then((m) => ({ default: m.AutomationScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh opacity-40" /> }
);
const WebSaasScene = dynamic(
  () => import("./scenes/WebSaasScene").then((m) => ({ default: m.WebSaasScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh opacity-40" /> }
);

const sceneComponents = {
  ecosystem: EcosystemScene,
  shopify: ShopifyScene,
  ai: AINeuralScene,
  automation: AutomationScene,
  web: WebSaasScene,
  none: null,
} as const;

type Props = {
  slide: PinnedHomeSlide;
  index: number;
  total: number;
  active?: boolean;
  stacked?: boolean;
  /** Single shared WebGL universe behind pinned stage (desktop) */
  useSharedUniverse?: boolean;
  /** CSS-only universe for mobile / reduced GPU */
  universeMode?: "full" | "lite" | "css";
  /** @deprecated use universeMode */
  liteUniverse?: boolean;
};

export const PinnedServiceSlide = forwardRef<HTMLDivElement, Props>(
  function PinnedServiceSlide(
    { slide, index, total, active, stacked, useSharedUniverse, universeMode, liteUniverse },
    ref
  ) {
    const tHome = useTranslations("home");
    const tServices = useTranslations("services");
    const tPinned = useTranslations("pinned");

    const Scene =
      !useSharedUniverse && slide.sceneKey !== "none" ? sceneComponents[slide.sceneKey] : null;
    const isHero = slide.kind === "hero";
    const resolvedMode = universeMode ?? (liteUniverse ? "css" : undefined);
    const showInlineUniverse = stacked && isHero && resolvedMode;

    return (
      <div
        ref={ref}
        id={isHero ? "hero" : slide.id}
        className={cn(
          "pinned-slide preserve-3d",
          stacked
            ? cn(
                "relative flex w-full flex-col justify-center pb-14 pt-[var(--navbar-offset)] sm:pb-16",
                isHero ? "pinned-slide--hero" : "pinned-slide--stacked-service py-16 sm:py-20"
              )
            : "absolute inset-0 flex items-center pt-24 pb-12",
          !stacked && !active && index > 0 && "pointer-events-none"
        )}
        style={{ perspective: PERSPECTIVE }}
        aria-hidden={!stacked && !active && index > 0 ? true : undefined}
      >
        {showInlineUniverse && <ScrollUniverseLayer mode={resolvedMode} className="opacity-85" />}

        {stacked && !isHero && slide.kind === "service" && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 sm:opacity-50">
            <CssGlobe
              className="!left-[68%] !top-[42%] scale-[0.55] sm:scale-[0.65]"
              accent={slide.accent}
            />
            <SparkleField density="low" focal className="opacity-60" />
          </div>
        )}

        {Scene && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" data-parallax-scene>
            <div
              className={cn(
                "absolute inset-0",
                isHero
                  ? "opacity-45 sm:opacity-60 md:opacity-75 lg:opacity-90"
                  : "opacity-35 sm:opacity-50 md:opacity-65"
              )}
            >
              {slide.sceneKey === "ecosystem" ? (
                <EcosystemScene variant="full" />
              ) : (
                <Scene />
              )}
            </div>
            <div
              className="absolute inset-0"
              style={{
                background: isHero
                  ? "linear-gradient(180deg, rgba(5,7,10,0.45) 0%, rgba(5,7,10,0.78) 55%, rgba(5,7,10,0.96) 100%)"
                  : `radial-gradient(ellipse at 70% 40%, ${slide.accent}18, transparent 55%), linear-gradient(180deg, rgba(5,7,10,0.65) 0%, rgba(5,7,10,0.94) 100%)`,
              }}
            />
          </div>
        )}

        <div
          data-mobile-reveal
          className="mobile-reveal-target container-narrow relative z-10 w-full px-4 sm:px-6 lg:px-8"
        >
          {isHero ? (
            <div data-hero-content className="mx-auto max-w-4xl text-center">
              <span className="inline-flex rounded-full border border-deweb-cyan/25 bg-deweb-cyan/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-deweb-cyan sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.2em]">
                {tHome("badge")}
              </span>
              <h1 className="mt-5 text-[1.85rem] font-bold leading-[1.1] tracking-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-7xl">
                <span className="text-gradient-cyan">{tHome("seoH1")}</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base md:text-lg lg:text-xl">
                {tHome("subtitle")}
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
                <GlowButton
                  href="/contact"
                  variant="primary"
                  className="w-full !px-6 !py-3.5 !text-sm sm:w-auto sm:!px-8 sm:!py-4 sm:!text-base"
                  trackCta={{
                    eventType: "contact_click",
                    placement: "hero",
                    label: tHome("ctaPrimary"),
                  }}
                >
                  {tHome("ctaPrimary")}
                </GlowButton>
                <GlowButton
                  href="#services"
                  variant="secondary"
                  className="w-full !px-6 !py-3.5 !text-sm sm:w-auto sm:!px-8 sm:!py-4 sm:!text-base"
                  trackCta={{
                    eventType: "cta_click",
                    placement: "hero",
                    label: tHome("ctaSecondary"),
                  }}
                >
                  {tHome("ctaSecondary")}
                </GlowButton>
              </div>
            </div>
          ) : (
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
              <ServiceStoryCard active={stacked || active} accent={slide.accent}>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span
                    className="inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
                    style={{
                      borderColor: `${slide.accent}44`,
                      color: slide.accent,
                      background: `${slide.accent}12`,
                    }}
                  >
                    {String(index).padStart(2, "0")} / {String(total - 1).padStart(2, "0")}
                  </span>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                    style={{
                      background: `${slide.accent}18`,
                      border: `1px solid ${slide.accent}33`,
                    }}
                  >
                    {slide.category.icon}
                  </div>
                </div>

                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                  {slide.category.title}
                </h2>

                <div className="mt-5 space-y-3 text-sm leading-relaxed sm:text-base">
                  <p className="text-white/85">
                    <span className="font-semibold text-white">{tPinned("whatLabel")}</span>
                    {slide.category.what}
                  </p>
                  <p className="text-white/75">
                    <span className="font-semibold text-white/90">{tPinned("whoLabel")}</span>
                    {slide.category.who}
                  </p>
                  <p className="text-white/80">
                    <span className="font-semibold" style={{ color: slide.accent }}>
                      {tPinned("resultLabel")}
                    </span>
                    {slide.category.result}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-deweb-cyan/70">
                      {tServices("deliverables")}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {slide.banner.deliverables.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-deweb-cyan/70">
                      {tServices("benefits")}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {slide.banner.benefits.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-white/75 sm:text-sm">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-deweb-cyan" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-6 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      {tServices("priceRange")}
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      {slide.category.startingPrice || slide.banner.pricing}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      {tServices("timeline")}
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">{slide.banner.timeline}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <GlowButton href={slide.category.href} variant="primary">
                    {tServices("learnMore")}
                  </GlowButton>
                  <GlowButton
                    href="/contact"
                    variant="secondary"
                    trackCta={{
                      eventType: "contact_click",
                      placement: "pinned-service",
                      label: slide.category.title,
                    }}
                  >
                    {tHome("ctaPrimary")}
                  </GlowButton>
                </div>
              </ServiceStoryCard>

              <div
                data-service-visual
                className="preserve-3d relative min-h-[220px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[480px]"
              >
                <div
                  className="absolute -inset-4 rounded-3xl opacity-60 blur-2xl"
                  style={{ background: slide.banner.glow || `${slide.accent}33` }}
                />
                <div className="relative h-full rounded-2xl border border-white/10 bg-[rgba(8,14,24,0.6)] p-3 shadow-glow-sm backdrop-blur-md sm:p-4">
                  <ServiceBannerVisual
                    type={slide.visual}
                    accent={slide.accent}
                    glow={slide.banner.glow}
                  />
                </div>
                {slide.banner.featured && (
                  <div className="absolute -right-2 -top-2 rounded-full border border-[#95BF47]/40 bg-[#95BF47]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#95BF47]">
                    Featured
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {isHero && (
          <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-center sm:bottom-8 sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              Scroll to explore solutions
            </p>
            <div className="mx-auto mt-2 h-8 w-5 rounded-full border border-white/20 p-1">
              <div className="mx-auto h-1.5 w-1 animate-bounce rounded-full bg-deweb-cyan" />
            </div>
          </div>
        )}
      </div>
    );
  }
);
