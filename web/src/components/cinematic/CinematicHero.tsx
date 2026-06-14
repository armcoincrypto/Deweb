"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { heroReveal3D, transitionFast } from "@/lib/motion-3d";

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
      className="cinematic-hero relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
      aria-label={t("taglineAria")}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-55 sm:opacity-75 lg:opacity-95">
          <EcosystemScene variant="hero" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-deweb-bg/50 via-deweb-bg/75 to-deweb-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent,rgba(5,7,10,0.85))]" />

      <div className="container-narrow relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          variants={heroReveal3D}
          transition={transitionFast}
          className="hero-glass-panel mx-auto max-w-3xl rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-12"
        >
          <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            {t("seoH1")}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
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
        </motion.div>
      </div>
    </section>
  );
}
