"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ScrollReveal, StaggerContainer, FadeIn } from "@/components/animations";
import { TiltCard } from "@/components/ui/TiltCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { caseStudies } from "@/lib/conversion-data";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

export function HomepagePortfolio() {
  const t = useTranslations("home");
  const { reduceMotion } = useMotionSafe();
  const [active, setActive] = useState(0);
  const projects = caseStudies;

  const featured = projects[active];

  return (
    <section id="portfolio" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(0,242,255,0.06),transparent)]" />
      <div className="container-narrow relative px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">
            {t("portfolioKicker")}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t("portfolioTitle")}</h2>
          <p className="mt-4 text-base text-white/55 sm:text-lg">{t("portfolioSubtitle")}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <StaggerContainer className="flex flex-col gap-2" stagger={0.05}>
            {projects.slice(0, 4).map((project, i) => (
              <FadeIn key={project.id} inherit>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group w-full rounded-xl border px-4 py-4 text-left transition-all sm:px-5",
                    active === i
                      ? "border-deweb-cyan/40 bg-deweb-cyan/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  )}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: project.accent }}>
                    {project.projectType}
                  </p>
                  <p className="mt-1 font-semibold text-white">{project.title}</p>
                </button>
              </FadeIn>
            ))}
          </StaggerContainer>

          <ScrollReveal variant="scale" className="min-h-[320px]">
            <TiltCard glow className="h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featured.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col p-6 sm:p-8"
                >
                  <div
                    className="mb-6 h-32 rounded-xl border border-white/10 sm:h-40"
                    style={{
                      background: `radial-gradient(ellipse at 30% 20%, ${featured.accent}33, transparent 60%), linear-gradient(135deg, rgba(12,18,28,0.9), rgba(6,10,16,0.95))`,
                    }}
                  />
                  <h3 className="text-2xl font-bold text-white">{featured.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">
                    {featured.solution || featured.problem}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-400">{featured.result}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featured.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/65"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={featured.href}
                      className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:border-deweb-cyan/40 hover:text-deweb-cyan"
                    >
                      {t("portfolioView")}
                    </Link>
                    <GlowButton href="#contact" variant="secondary" className="!px-5 !py-2.5 !text-sm">
                      {t("portfolioSimilar")}
                    </GlowButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
