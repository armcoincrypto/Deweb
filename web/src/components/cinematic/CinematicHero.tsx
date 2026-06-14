"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GlowButton } from "@/components/ui/GlowButton";
import { heroReveal3D, transitionFast } from "@/lib/motion-3d";
import { sellingPoints } from "@/lib/home-services-data";

const EcosystemScene = dynamic(
  () => import("./scenes/EcosystemScene").then((m) => ({ default: m.EcosystemScene })),
  { ssr: false }
);

export function CinematicHero() {
  const t = useTranslations("home");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-28 pb-16"
      aria-label={t("taglineAria")}
    >
      <div className="absolute inset-0 hidden opacity-60 lg:block">
        <EcosystemScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-deweb-bg/40 via-deweb-bg/80 to-deweb-bg lg:from-deweb-bg/60" />

      <div className="container-narrow relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          variants={heroReveal3D}
          transition={transitionFast}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-deweb-cyan">
            {t("badge")}
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {t("seoH1")}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <GlowButton
              href="#contact"
              variant="primary"
              className="!px-8 !py-4 !text-base"
              trackCta={{
                eventType: "contact_click",
                placement: "hero",
                label: t("ctaPrimary"),
              }}
            >
              {t("ctaPrimary")}
            </GlowButton>
            <GlowButton
              href="/services"
              variant="secondary"
              className="!px-8 !py-4 !text-base"
              trackCta={{
                eventType: "cta_click",
                placement: "hero",
                label: t("ctaSecondary"),
              }}
            >
              {t("ctaSecondary")}
            </GlowButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {sellingPoints.map((point) => (
              <span
                key={point}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/70"
              >
                {point}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
