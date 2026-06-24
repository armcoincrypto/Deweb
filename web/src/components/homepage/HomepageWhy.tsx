"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { ScrollReveal, StaggerContainer, AnimatedCard, AnimatedCounter } from "@/components/animations";
import { whyChooseItems } from "@/lib/portfolio-data";
import { aboutStats } from "@/lib/about-data";

const Scene3DLazy = dynamic(
  () => import("@/components/3d/Scene3DLazy").then((m) => ({ default: m.Scene3DLazy })),
  { ssr: false }
);

export function HomepageWhy() {
  const t = useTranslations("home");

  return (
    <section id="why" className="relative overflow-hidden py-20 sm:py-28">
      <Scene3DLazy className="opacity-30" intensity="low" />
      <div className="container-narrow relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">
            {t("whyKicker")}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t("whyTitle")}</h2>
          <p className="mt-4 text-base text-white/55 sm:text-lg">{t("whySubtitle")}</p>
        </ScrollReveal>

        <StaggerContainer className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" stagger={0.06}>
          {aboutStats.slice(0, 4).map((stat) => (
            <AnimatedCard key={stat.label} inherit className="glass-panel-glow p-5 text-center sm:p-6" hover={false}>
              <p className="text-2xl font-bold text-deweb-cyan sm:text-3xl">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/45 sm:text-xs">
                {stat.label}
              </p>
            </AnimatedCard>
          ))}
        </StaggerContainer>

        <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {whyChooseItems.map((item) => (
            <AnimatedCard key={item.title} inherit className="content-panel rounded-2xl p-6 sm:p-7">
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                style={{
                  background: `${item.accent}18`,
                  border: `1px solid ${item.accent}33`,
                }}
              >
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
            </AnimatedCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
