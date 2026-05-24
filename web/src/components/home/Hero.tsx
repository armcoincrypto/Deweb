"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GlowButton } from "@/components/ui/GlowButton";
import { LiveDashboard } from "./LiveDashboard";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 sm:pt-32 lg:pt-36">
      <div className="container-narrow px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-deweb-cyan/25 bg-deweb-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-deweb-cyan">
            <span className="h-2 w-2 animate-pulse rounded-full bg-deweb-cyan" />
            {t("badge")}
          </span>

          <h1 className="mt-8 flex flex-col items-center text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span>{t("title")}</span>
            <span className="mt-1 bg-gradient-to-r from-white via-deweb-cyan to-white bg-clip-text text-transparent">
              {t("titleAccent")}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {t("subtitle")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <GlowButton href="/signup" variant="primary">
              {t("ctaPrimary")}
            </GlowButton>
            <GlowButton href="/marketplace" variant="ghost">
              {t("ctaSecondary")}
            </GlowButton>
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/40">
            <span>
              <span className="font-bold text-white">4.5</span> {t("statBids")}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>
              <span className="font-bold text-emerald-400">98%</span> {t("statSuccess")}
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
