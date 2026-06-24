"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal, StaggerContainer, SlideUp } from "@/components/animations";
import { cn } from "@/lib/utils";

const STEPS = ["discovery", "strategy", "design", "development", "launch", "growth"] as const;

export function HomepageProcess() {
  const t = useTranslations("home");

  return (
    <section id="process" className="border-y border-white/[0.06] bg-white/[0.02] py-20 sm:py-28">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">
            {t("processKicker")}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t("processTitle")}</h2>
          <p className="mt-4 text-base text-white/55">{t("processSubtitle")}</p>
        </ScrollReveal>

        <div className="relative mt-14">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-deweb-cyan/50 via-white/10 to-transparent sm:left-1/2 sm:block sm:-translate-x-px lg:hidden" />
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-deweb-cyan/40 to-transparent lg:block" />

          <StaggerContainer
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4"
            stagger={0.07}
          >
            {STEPS.map((step, i) => (
              <SlideUp key={step} inherit>
                <div
                  className={cn(
                    "relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-deweb-cyan/25 sm:p-6",
                    "lg:text-center"
                  )}
                >
                  <div className="mb-4 flex items-center gap-3 lg:flex-col lg:gap-2">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-deweb-cyan/40 bg-deweb-cyan/10 text-sm font-bold text-deweb-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-bold text-white sm:text-base">
                      {t(`process_${step}_title`)}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-white/55 sm:text-sm">
                    {t(`process_${step}_desc`)}
                  </p>
                </div>
              </SlideUp>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
