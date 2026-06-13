"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GlowButton } from "@/components/ui/GlowButton";
import { panelReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";

export function FinalCTA() {
  const t = useTranslations("home");
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-padding pb-32">
      <div className="container-narrow px-4 sm:px-6 lg:px-8" style={{ perspective: PERSPECTIVE }}>
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          variants={panelReveal3D}
          transition={transition3D}
          style={motion3DStyle}
          whileHover={reduceMotion ? undefined : { z: 16, rotateX: -2, scale: 1.01 }}
          className="preserve-3d relative overflow-hidden rounded-3xl border border-deweb-cyan/25 bg-gradient-to-br from-deweb-cyan/10 via-transparent to-purple-600/10 p-12 text-center shadow-glow sm:p-16 lg:p-20"
        >
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-deweb-cyan/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative" style={{ transform: "translateZ(24px)" }}>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {t("ctaFinalTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              {t("ctaFinalSubtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GlowButton href="/contact" variant="primary">
                {t("ctaFinalPrimary")}
              </GlowButton>
              <GlowButton href="/services" variant="secondary">
                {t("ctaFinalSecondary")}
              </GlowButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
