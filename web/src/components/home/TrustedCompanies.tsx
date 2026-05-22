"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { trustedCompanies } from "@/lib/data";

export function TrustedCompanies() {
  const t = useTranslations("home");

  return (
    <section className="section-padding border-y border-white/[0.06] bg-black/20">
      <div className="container-narrow">
        <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.25em] text-white/35">
          {t("trusted")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {trustedCompanies.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ opacity: 1, color: "rgba(255,255,255,0.9)" }}
              className="text-lg font-bold tracking-tight text-white/25 transition-colors sm:text-xl"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
