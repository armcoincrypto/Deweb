"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GlowButton } from "@/components/ui/GlowButton";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { Floating3DPanels } from "@/components/ui/Floating3DPanels";
import { heroReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";

export function Hero() {
  const t = useTranslations("home");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="perspective-3d relative min-h-[92vh] overflow-hidden pt-28 pb-24 sm:pt-32 lg:pt-36"
      style={{ perspective: PERSPECTIVE }}
    >
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
          <span className="inline-flex items-center gap-2 rounded-full border border-deweb-cyan/25 bg-deweb-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-deweb-cyan backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-deweb-cyan" />
            {t("badge")}
          </span>

          <h1 className="mt-8 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.75rem]">
            {t("seoH1")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {t("subtitle")}
          </p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20, rotateX: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
            style={motion3DStyle}
            className="preserve-3d mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <GlowButton href="#contact" variant="primary">
              {t("ctaPrimary")}
            </GlowButton>
            <GlowButton href="/services" variant="secondary">
              {t("ctaSecondary")}
            </GlowButton>
          </motion.div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 text-sm text-white/45">
            <span>Shopify · AI · SaaS · Web · Automation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
