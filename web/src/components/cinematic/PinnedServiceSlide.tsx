"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceBannerVisual } from "@/components/services/ServiceBannerVisual";
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
};

export const PinnedServiceSlide = forwardRef<HTMLDivElement, Props>(
  function PinnedServiceSlide({ slide, index, total, active, stacked }, ref) {
    const tHome = useTranslations("home");
    const tServices = useTranslations("services");

    const Scene =
      slide.sceneKey !== "none" ? sceneComponents[slide.sceneKey] : null;
    const isHero = slide.kind === "hero";

    return (
      <div
        ref={ref}
        id={isHero ? "hero" : slide.id}
        className={cn(
          "pinned-slide preserve-3d",
          stacked
            ? "relative min-h-screen w-full"
            : "absolute inset-0 flex items-center pt-24 pb-12",
          !stacked && !active && index > 0 && "pointer-events-none"
        )}
        style={{ perspective: PERSPECTIVE }}
        aria-hidden={!stacked && !active && index > 0 ? true : undefined}
      >
        {Scene && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className={cn(
                "absolute inset-0",
                isHero ? "opacity-75 sm:opacity-90" : "opacity-50 sm:opacity-65"
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
                  ? "linear-gradient(180deg, rgba(5,7,10,0.25) 0%, rgba(5,7,10,0.7) 55%, rgba(5,7,10,0.95) 100%)"
                  : `radial-gradient(ellipse at 70% 40%, ${slide.accent}18, transparent 55%), linear-gradient(180deg, rgba(5,7,10,0.55) 0%, rgba(5,7,10,0.92) 100%)`,
              }}
            />
          </div>
        )}

        <div className="container-narrow relative z-10 w-full px-4 sm:px-6 lg:px-8">
          {isHero ? (
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex rounded-full border border-deweb-cyan/25 bg-deweb-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan">
                {tHome("badge")}
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-gradient-cyan">{tHome("seoH1")}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                {tHome("subtitle")}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <GlowButton
                  href="#contact"
                  variant="primary"
                  className="!px-8 !py-4 !text-base"
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
                  className="!px-8 !py-4 !text-base"
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
              <div className="hero-glass-panel glow-border preserve-3d rounded-2xl p-6 sm:p-8 lg:p-10">
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
                    <span className="font-semibold text-white">What: </span>
                    {slide.category.what}
                  </p>
                  <p className="text-white/75">
                    <span className="font-semibold text-white/90">Who: </span>
                    {slide.category.who}
                  </p>
                  <p className="text-white/80">
                    <span className="font-semibold" style={{ color: slide.accent }}>
                      Result:{" "}
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
                    href="#contact"
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
              </div>

              <div className="preserve-3d relative min-h-[300px] sm:min-h-[360px] lg:min-h-[480px]">
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
          <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
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
