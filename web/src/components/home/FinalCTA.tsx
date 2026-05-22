"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GlowButton } from "@/components/ui/GlowButton";

export function FinalCTA() {
  const t = useTranslations("home");

  return (
    <section className="section-padding pb-32">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-deweb-cyan/25 bg-gradient-to-br from-deweb-cyan/10 via-transparent to-purple-600/10 p-12 text-center sm:p-16 lg:p-20"
        >
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-deweb-cyan/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {t("ctaFinalTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              {t("ctaFinalSubtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GlowButton href="/signup" variant="primary">
                {t("ctaFinalPrimary")}
              </GlowButton>
              <GlowButton href="/marketplace" variant="secondary">
                {t("ctaFinalSecondary")}
              </GlowButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
