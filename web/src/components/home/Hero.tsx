"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GlowButton } from "@/components/ui/GlowButton";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { Floating3DPanels } from "@/components/ui/Floating3DPanels";
import { heroReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";
import { LiveDashboard } from "./LiveDashboard";

export function Hero() {
  const t = useTranslations("home");
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="perspective-3d relative min-h-[92vh] overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36" style={{ perspective: PERSPECTIVE }}>
      <HeroBackground />
      <Floating3DPanels />

      <div className="container-narrow relative z-10 px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          variants={heroReveal3D}
          transition={transition3D}
          style={motion3DStyle}
          className="preserve-3d mx-auto max-w-5xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-deweb-cyan/25 bg-deweb-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-deweb-cyan">
            <span className="h-2 w-2 animate-pulse rounded-full bg-deweb-cyan" />
            {t("badge")}
          </span>

          <h1 className="mt-8 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.4rem]">
            {t("seoH1")}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {t("subtitle")}
          </p>

          <p
            className="mt-4 flex flex-col items-center text-xl font-semibold leading-snug text-white/85 sm:text-2xl"
            aria-label={t("taglineAria")}
          >
            <span className="bg-gradient-to-r from-white via-deweb-cyan to-white bg-clip-text text-transparent">
              {t("titleAccent")}
            </span>
          </p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16, rotateX: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={motion3DStyle}
            className="preserve-3d mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <GlowButton href="/contact" variant="primary">
              {t("ctaPrimary")}
            </GlowButton>
            <GlowButton href="/services" variant="secondary">
              {t("ctaSecondary")}
            </GlowButton>
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/45">
            <span>
              <span className="font-bold text-white">150+</span> projects delivered
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>
              <span className="font-bold text-emerald-400">98%</span> client satisfaction
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{t("statTag")}</span>
          </div>
        </motion.div>

        <LiveDashboard />
      </div>
    </section>
  );
}
