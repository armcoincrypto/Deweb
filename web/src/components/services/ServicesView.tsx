"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ConsultationForm } from "@/components/services/ConsultationForm";
import { dewebApi, type ServicesPageData } from "@/lib/api";
import { servicesPageFallback } from "@/lib/services-data";

function OrbitHero({ icons }: { icons: string[] }) {
  return (
    <div className="relative mx-auto mt-12 h-56 w-56 sm:h-72 sm:w-72">
      <div className="absolute inset-0 rounded-full bg-deweb-cyan/10 blur-3xl" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-deweb-cyan/30 shadow-[0_0_60px_rgba(0,242,255,0.15)]"
      />
      {icons.map((icon, i) => {
        const angle = (i / icons.length) * Math.PI * 2;
        const r = 42;
        const x = 50 + Math.cos(angle) * r;
        const y = 50 + Math.sin(angle) * r;
        return (
          <motion.span
            key={icon + i}
            className="absolute flex h-11 w-11 items-center justify-center rounded-xl border border-deweb-cyan/25 bg-deweb-bg/80 text-xl shadow-glow backdrop-blur-sm sm:h-12 sm:w-12 sm:text-2xl"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.span>
        );
      })}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="rounded-full border border-deweb-cyan/40 bg-deweb-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-deweb-cyan">
          DEWEB
        </span>
      </div>
    </div>
  );
}

function FeaturedMockup({ accent }: { accent: string }) {
  const isShopify = accent === "shopify";
  return (
    <div className="relative hidden h-full min-h-[220px] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-deweb-bg via-[#0a1520] to-[#061018] lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,242,255,0.12),transparent_55%)]" />
      <div className="relative p-5">
        <div className="mb-3 flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded bg-white/10" />
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-16 rounded-lg border border-white/5 bg-white/[0.03]" />
            ))}
          </div>
          <div className="h-20 rounded-lg border border-deweb-cyan/20 bg-deweb-cyan/5" />
        </div>
      </div>
      <div className="absolute bottom-4 right-4 rounded-full border border-deweb-cyan/40 bg-deweb-bg/90 px-3 py-1.5 text-[10px] font-bold text-deweb-cyan">
        {isShopify ? "Live Store" : "AI Assistant"}
      </div>
    </div>
  );
}

export function ServicesView() {
  const t = useTranslations("services");
  const [data, setData] = useState<ServicesPageData>(servicesPageFallback);

  useEffect(() => {
    dewebApi.services.page().then(setData).catch(() => {});
  }, []);

  const categories = [
    ...data.featured.map((f) => ({ id: f.id, title: f.title })),
    ...data.grid.map((g) => ({ id: g.id, title: g.title })),
  ];

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,242,255,0.08),transparent_60%)]" />
        <div className="container-narrow relative px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            {data.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {data.hero.subtitle}
          </motion.p>

          <OrbitHero icons={data.hero.orbitIcons} />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <GlowButton href="#consultation" variant="primary">
              {t("consultation")}
            </GlowButton>
            <GlowButton href="/marketplace" variant="secondary">
              {t("requestBids")}
            </GlowButton>
          </motion.div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {data.hero.trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/70"
              >
                <span className="text-deweb-cyan">✓</span>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured cards */}
      <section className="container-narrow px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {data.featured.map((item, i) => (
            <GlassCard key={item.id} glow delay={i * 0.08} className="overflow-hidden p-0">
              <div className="grid lg:grid-cols-2">
                <div className="p-8">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="mt-4 text-2xl font-bold text-white">{item.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                        <span className="mt-0.5 text-deweb-cyan">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/40">{t("timeline")}</p>
                      <p className="font-semibold text-white">{item.timeline}</p>
                    </div>
                    <div>
                      <p className="text-white/40">{t("priceRange")}</p>
                      <p className="font-semibold text-deweb-cyan">{item.price}</p>
                    </div>
                  </div>
                  <Link
                    href={`/services/${item.id}`}
                    className="mt-6 inline-block text-sm font-semibold text-deweb-cyan hover:underline"
                  >
                    {t("learnMore")} →
                  </Link>
                </div>
                <div className="relative p-4 lg:p-6">
                  <FeaturedMockup accent={item.imageAccent} />
                  <div className="absolute right-6 top-6 rounded-full border border-deweb-cyan/40 bg-deweb-bg/95 px-4 py-2 text-center text-[11px] font-bold leading-tight text-deweb-cyan shadow-glow lg:right-10 lg:top-10">
                    {item.highlight}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Service grid */}
      <section className="container-narrow section-padding px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-bold text-white">{t("categoriesTitle")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.grid.map((cat, i) => (
            <Link key={cat.id} href={`/services/${cat.id}`} className="block h-full">
              <GlassCard glow delay={i * 0.04} className="flex h-full flex-col p-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{cat.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{cat.desc}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-white/35">
                  {t("techStack")}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cat.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4 text-xs">
                  <div>
                    <p className="text-white/35">{t("timeline")}</p>
                    <p className="font-semibold text-white">{cat.timeline}</p>
                  </div>
                  <div>
                    <p className="text-white/35">{t("priceRange")}</p>
                    <p className="font-semibold text-deweb-cyan">{cat.price}</p>
                  </div>
                </div>
                <span className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-deweb-cyan/40 bg-deweb-cyan/10 py-2.5 text-xs font-bold text-deweb-cyan transition-colors group-hover:bg-deweb-cyan/20">
                  {t("learnMore")}
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] py-16">
        <div className="container-narrow px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-white">{t("whyChoose")}</h2>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {data.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-panel-glow p-6 text-center"
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
