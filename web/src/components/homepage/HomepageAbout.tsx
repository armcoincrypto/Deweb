"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ScrollReveal, StaggerContainer, FadeIn, AnimatedCounter } from "@/components/animations";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { aboutStats } from "@/lib/about-data";

const HIGHLIGHTS = ["aboutHighlight1", "aboutHighlight2", "aboutHighlight3"] as const;

export function HomepageAbout() {
  const t = useTranslations("home");
  const tAbout = useTranslations("about");

  return (
    <section id="about" className="border-y border-white/[0.06] bg-white/[0.02] py-20 sm:py-28">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">
              {t("aboutKicker")}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t("aboutTitle")}</h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{t("aboutSubtitle")}</p>

            <ul className="mt-8 space-y-3">
              {HIGHLIGHTS.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm text-white/75 sm:text-base">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-deweb-cyan/15 text-xs text-deweb-cyan">
                    ✓
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GlowButton href="/about" variant="primary">
                {t("aboutCta")}
              </GlowButton>
              <Link
                href="/contact"
                className="text-center text-sm font-semibold text-deweb-cyan transition-colors hover:text-white sm:text-left"
              >
                {tAbout("consultation")} →
              </Link>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
            <FadeIn inherit className="sm:col-span-2">
              <GlassCard glow className="relative overflow-hidden p-0">
                <div className="relative aspect-[16/9] min-h-[200px]">
                  <Image
                    src="/brand-logo-full.png"
                    alt="DEWEB"
                    fill
                    className="object-contain p-8 sm:p-10"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,242,255,0.18),transparent_55%)]" />
                </div>
              </GlassCard>
            </FadeIn>

            {aboutStats.slice(0, 4).map((stat) => (
              <FadeIn key={stat.label} inherit>
                <GlassCard className="p-5 text-center sm:p-6">
                  <p className="text-2xl font-bold text-deweb-cyan sm:text-3xl">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="mt-1 text-xs font-medium text-white/50 sm:text-sm">{stat.label}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
