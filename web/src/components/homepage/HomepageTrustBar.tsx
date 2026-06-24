"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { clientLogos } from "@/lib/social-proof-data";
import { useMotionSafe } from "@/lib/animations/hooks";

export function HomepageTrustBar() {
  const t = useTranslations("home");
  const { reduceMotion } = useMotionSafe();

  return (
    <section className="border-b border-white/[0.06] py-10 sm:py-12">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-xs">
          {t("trusted")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {clientLogos.map((logo, i) => (
            <motion.span
              key={logo.name}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="text-sm font-bold tracking-tight sm:text-base"
              style={{ color: `${logo.accent}88` }}
            >
              {logo.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
