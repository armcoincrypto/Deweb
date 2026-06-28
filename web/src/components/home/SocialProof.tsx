"use client";

import { useTranslations } from "next-intl";
import { CinematicSection } from "@/components/cinematic/CinematicSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clientLogos, exampleScenarioIds } from "@/lib/social-proof-data";
import { cardReveal3D, transitionFast } from "@/lib/motion-3d";
import { motion, useReducedMotion } from "framer-motion";

export function SocialProof() {
  const t = useTranslations("home");
  const reduceMotion = useReducedMotion();

  return (
    <CinematicSection id="trust" fullScreen={false} className="section-padding border-y border-white/[0.06] bg-white/[0.02]">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-wider text-white/50">
          {t("trusted")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {clientLogos.map((logo, i) => (
            <motion.span
              key={logo.name}
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="text-base font-bold tracking-tight text-white/40 sm:text-lg"
              style={{ color: `${logo.accent}99` }}
            >
              {logo.name}
            </motion.span>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading
            kicker={t("testimonialsKicker")}
            title={t("testimonialsTitle")}
            subtitle={t("testimonialsSubtitle")}
            id="testimonials-heading"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {exampleScenarioIds.map((id, i) => (
              <motion.div
                key={id}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true, margin: "-40px" }}
                variants={cardReveal3D}
                transition={{ ...transitionFast, delay: i * 0.04 }}
                className="content-panel flex flex-col rounded-2xl p-6 sm:p-7"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-deweb-cyan/80">
                  {t("testimonialsKicker")}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/80">
                  {t(`exampleScenario${id}Quote` as "exampleScenario1Quote")}
                </p>
                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="font-semibold text-white">
                    {t(`exampleScenario${id}Label` as "exampleScenario1Label")}
                  </p>
                  <p className="text-xs text-white/55">{t("exampleScenarioType")}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
