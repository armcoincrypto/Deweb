"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ConsultationForm } from "@/components/services/ConsultationForm";
import { ServiceBanners } from "@/components/services/ServiceBanners";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { heroReveal3D, cardReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";
import { dewebApi, type ServicesPageData } from "@/lib/api";
import { servicesPageFallback } from "@/lib/services-data";
import { serviceBanners } from "@/lib/service-banners-data";

export function ServicesView() {
  const t = useTranslations("services");
  const reduceMotion = useReducedMotion();
  const [data, setData] = useState<ServicesPageData>(servicesPageFallback);

  useEffect(() => {
    dewebApi.services.page().then(setData).catch(() => {});
  }, []);

  const categories = serviceBanners.map((b) => ({ id: b.slug, title: b.title }));

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-white/[0.06] py-16 text-center">
        <HeroBackground />
        <div className="perspective-3d container-narrow relative z-10 px-4 sm:px-6 lg:px-8" style={{ perspective: PERSPECTIVE }}>
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "visible"}
            variants={heroReveal3D}
            transition={transition3D}
            style={motion3DStyle}
            className="preserve-3d"
          >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan">
            DEWEB Services
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">{data.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/55">
            Shopify development, AI automation, SaaS platforms, marketplaces, and custom web
            applications — built for measurable business growth.
          </p>
          </motion.div>
        </div>
      </section>

      <ServiceBanners pageTitle={data.hero.title} hideTitle />

      {/* Stats */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] py-16">
        <div className="container-narrow px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-white">{t("whyChoose")}</h2>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {data.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true }}
                variants={cardReveal3D}
                transition={{ ...transition3D, delay: i * 0.06 }}
                style={motion3DStyle}
                whileHover={reduceMotion ? undefined : { z: 8, rotateX: -3, scale: 1.02 }}
                className="preserve-3d glass-panel-glow p-6 text-center"
              >
                <p className="text-3xl font-bold text-deweb-cyan sm:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm text-white/50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-narrow section-padding px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">{t("processTitle")}</h2>
        <div className="relative">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-transparent via-deweb-cyan/40 to-transparent lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {data.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-deweb-cyan/30 bg-deweb-cyan/10 text-2xl shadow-glow">
                  {step.icon}
                </div>
                <p className="mt-2 text-xs font-bold text-deweb-cyan/60">0{step.step}</p>
                <h3 className="mt-1 font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + form */}
      <section id="consultation" className="container-narrow px-4 sm:px-6 lg:px-8">
        <GlassCard glow className="overflow-hidden p-0">
          <div className="grid lg:grid-cols-2">
            <div className="p-10 lg:p-12">
              <h2 className="text-3xl font-bold text-white">{t("ctaTitle")}</h2>
              <p className="mt-4 text-white/55">{t("ctaSubtitle")}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <GlowButton href="#consultation" variant="primary">
                  {t("getProposal")}
                </GlowButton>
                <GlowButton href="/account/signup" variant="ghost">
                  {t("startProject")}
                </GlowButton>
              </div>
            </div>
            <div className="border-t border-white/[0.06] bg-white/[0.02] p-6 lg:border-l lg:border-t-0 lg:p-8">
              <ConsultationForm categories={categories} />
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
