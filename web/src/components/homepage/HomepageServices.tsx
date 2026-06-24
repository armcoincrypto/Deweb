"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ScrollReveal, StaggerContainer, FadeIn } from "@/components/animations";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceBannerVisual } from "@/components/services/ServiceBannerVisual";
import type { PinnedHomeSlide } from "@/lib/home-pinned-services-data";

type Props = {
  slides: PinnedHomeSlide[];
};

export function HomepageServices({ slides }: Props) {
  const t = useTranslations("home");
  const tServices = useTranslations("services");
  const serviceSlides = slides.filter((s) => s.kind === "service");

  return (
    <section id="services" className="relative border-y border-white/[0.06] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(124,58,237,0.06),transparent)]" />
      <div className="container-narrow relative px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">
            {t("servicesKicker")}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t("servicesTitle")}
          </h2>
          <p className="mt-4 text-base text-white/55 sm:text-lg">{t("servicesSubtitle")}</p>
        </ScrollReveal>

        <StaggerContainer className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8" stagger={0.08}>
          {serviceSlides.map((slide) => {
            if (slide.kind !== "service") return null;
            return (
              <FadeIn key={slide.id} inherit>
                <div className="glass-panel-glow h-full overflow-hidden rounded-2xl transition-shadow duration-200 hover:shadow-glow-sm">
                  <div className="grid h-full gap-0 lg:grid-cols-[1fr_0.9fr]">
                    <div className="flex flex-col p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
                          style={{
                            borderColor: `${slide.accent}44`,
                            color: slide.accent,
                            background: `${slide.accent}12`,
                          }}
                        >
                          {slide.category.title}
                        </span>
                        <span className="text-2xl">{slide.category.icon}</span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">
                        {slide.category.what}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">
                        {slide.category.result}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {slide.banner.deliverables.slice(0, 3).map((d) => (
                          <span
                            key={d}
                            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                            {tServices("priceRange")}
                          </p>
                          <p className="text-sm font-bold text-white">
                            {slide.category.startingPrice || slide.banner.pricing}
                          </p>
                        </div>
                        <GlowButton href={slide.category.href} variant="primary" className="!px-5 !py-2.5 !text-xs">
                          {tServices("learnMore")}
                        </GlowButton>
                      </div>
                    </div>
                    <div className="relative hidden min-h-[200px] border-t border-white/10 bg-[rgba(6,10,18,0.5)] p-4 lg:block lg:border-l lg:border-t-0">
                      <ServiceBannerVisual
                        type={slide.visual}
                        accent={slide.accent}
                        glow={slide.banner.glow}
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </StaggerContainer>

        <ScrollReveal className="mt-12 text-center" delay={0.1}>
          <Link
            href="/services"
            className="text-sm font-semibold text-deweb-cyan transition-colors hover:text-white"
          >
            {t("viewAllServices")} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
