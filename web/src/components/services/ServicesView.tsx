"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlowButton } from "@/components/ui/GlowButton";
import { serviceCategories } from "@/lib/services-data";

export function ServicesView() {
  const t = useTranslations("services");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="container-narrow px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold text-white">{t("categoriesTitle")}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {serviceCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="glass-panel-glow group p-8"
            >
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="mt-4 text-xl font-bold text-white group-hover:text-deweb-cyan transition-colors">
                {cat.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{cat.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/40">Timeline</p>
                  <p className="font-semibold text-white">{cat.timeline}</p>
                </div>
                <div>
                  <p className="text-white/40">Price range</p>
                  <p className="font-semibold text-deweb-cyan">{cat.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 glass-panel p-10 text-center">
          <h2 className="text-2xl font-bold text-white">{t("processTitle")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[t("process1"), t("process2"), t("process3"), t("process4")].map((step, i) => (
              <div key={step}>
                <span className="text-3xl font-bold text-deweb-cyan/50">0{i + 1}</span>
                <p className="mt-2 font-semibold text-white">{step}</p>
              </div>
            ))}
          </div>
          <GlowButton href="/signup" variant="primary" className="mt-10">
            {t("cta")}
          </GlowButton>
        </div>
      </div>
    </>
  );
}
