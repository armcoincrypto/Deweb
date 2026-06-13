"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { coreTeam } from "@/lib/team-data";
import {
  aboutStats,
  aboutServices,
  aboutProcess,
  aboutTechnologies,
  platformModules,
  heroFloatIcons,
} from "@/lib/about-data";

function WorldMapHero() {
  const dots = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    left: `${8 + (i % 12) * 7.5}%`,
    top: `${20 + Math.floor(i / 12) * 18 + (i % 3) * 4}%`,
    delay: (i % 5) * 0.15,
  }));

  return (
    <div className="relative mx-auto mt-14 h-[280px] max-w-3xl sm:h-[320px]">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-deweb-cyan/[0.06] to-transparent" />
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 280">
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00f2ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="200" cy="140" rx="160" ry="90" fill="url(#mapGlow)" />
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1={200}
            y1={140}
            x2={60 + i * 28}
            y2={40 + (i % 4) * 55}
            stroke="rgba(0,242,255,0.15)"
            strokeWidth="1"
          />
        ))}
      </svg>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-deweb-cyan shadow-[0_0_8px_rgba(0,242,255,0.8)]"
          style={{ left: d.left, top: d.top }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: d.delay }}
        />
      ))}
      {heroFloatIcons.map((item) => (
        <motion.div
          key={item.label}
          className="absolute flex flex-col items-center gap-1"
          style={{ left: item.x, top: item.y, transform: "translate(-50%, -50%)" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-deweb-cyan/35 bg-deweb-bg/90 text-lg shadow-glow-sm backdrop-blur-sm sm:h-12 sm:w-12 sm:text-xl">
            {item.icon}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-deweb-cyan/70">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function PlatformHubIllustration() {
  return (
    <div className="relative mx-auto mt-12 aspect-[16/10] max-w-2xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-deweb-cyan/[0.08] via-transparent to-purple-500/[0.06]" />
      <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-full w-full [transform:rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
          <div className="absolute inset-[15%] rounded-xl border border-deweb-cyan/40 bg-gradient-to-br from-[#0c1828] to-[#061018] shadow-glow">
            <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
              <span className="text-4xl">🛒</span>
              <span className="text-xs font-bold uppercase tracking-widest text-deweb-cyan">DEWEB Core</span>
            </div>
          </div>
          <div className="absolute -bottom-2 left-[20%] right-[20%] h-4 rounded-full bg-deweb-cyan/20 blur-md" />
        </div>
      </div>
      {platformModules.map((mod, i) => (
        <motion.div
          key={mod.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="absolute flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-md"
          style={{ left: mod.x, top: mod.y }}
        >
          <span className="text-sm">{mod.icon}</span>
          <span className="text-xs font-semibold text-white/80">{mod.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function AboutView() {
  const t = useTranslations("about");
  const featured = aboutServices.find((s) => s.featured)!;
  const gridServices = aboutServices.filter((s) => !s.featured);

  return (
    <div className="pb-24">
      {/* 1. Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-deweb-cyan/[0.06] blur-3xl" />
        <div className="container-narrow relative px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            {t("heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {t("heroSubtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <GlowButton href="/contact" variant="primary">
              {t("consultation")}
            </GlowButton>
            <GlowButton href="/account/signup" variant="ghost">
              {t("startProject")}
            </GlowButton>
          </motion.div>
          <WorldMapHero />
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="container-narrow px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">{t("whoKicker")}</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t("whoTitle")}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/55 sm:text-lg">
            {t("whoText")}
          </p>
        </div>
        <PlatformHubIllustration />
      </section>

      {/* 3. Stats */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] py-16">
        <div className="container-narrow px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">
            {t("statsTitle")}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aboutStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-panel-glow p-8 text-center"
              >
                <p className="text-3xl font-bold text-deweb-cyan sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Services */}
      <section className="container-narrow section-padding px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">{t("servicesTitle")}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/55">{t("servicesSubtitle")}</p>

        <GlassCard glow className="mt-12 overflow-hidden p-0">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <span className="text-4xl">{featured.icon}</span>
              <h3 className="mt-4 text-2xl font-bold text-white lg:text-3xl">{featured.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">{featured.desc}</p>
              <ul className="mt-6 space-y-2">
                {featured.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-deweb-cyan">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${featured.slug}`}
                className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-deweb-cyan/50 bg-deweb-cyan/10 px-6 py-3 text-sm font-bold text-deweb-cyan transition-colors hover:bg-deweb-cyan/20"
              >
                {t("learnMore")} →
              </Link>
            </div>
            <div className="relative min-h-[240px] border-t border-white/[0.06] bg-gradient-to-br from-[#0a1520] via-[#061018] to-deweb-bg lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(0,242,255,0.12),transparent_60%)]" />
              <div className="relative flex h-full items-center justify-center p-10">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-40 w-40 items-center justify-center rounded-3xl border border-deweb-cyan/30 bg-gradient-to-br from-[#0c1828] to-[#051018] text-7xl shadow-glow"
                >
                  🛒
                </motion.div>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridServices.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <GlassCard glow tilt className="flex h-full flex-col">
                <div className="flex h-full flex-col p-6">
                <span className="text-2xl">{svc.icon}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{svc.desc}</p>
                <ul className="mt-4 flex-1 space-y-1.5">
                  {svc.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-white/50">
                      <span className="text-deweb-cyan/80">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${svc.slug}`}
                  className="mt-5 inline-block text-sm font-semibold text-deweb-cyan hover:underline"
                >
                  {t("learnMore")} →
                </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Process */}
      <section className="container-narrow section-padding px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">{t("processTitle")}</h2>
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-deweb-cyan/50 to-transparent lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {aboutProcess.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-deweb-cyan/30 bg-deweb-cyan/10 text-xl shadow-glow-sm">
                  {step.icon}
                </div>
                {i < aboutProcess.length - 1 && (
                  <span className="absolute right-0 top-7 hidden translate-x-1/2 text-deweb-cyan/40 lg:inline">
                    →
                  </span>
                )}
                <h3 className="mt-4 text-sm font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/45">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Leadership */}
      <section className="border-t border-white/[0.06] bg-white/[0.01] py-20">
        <div className="container-narrow px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">
            {t("teamTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/55">{t("teamSubtitle")}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {coreTeam.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard glow className="relative h-full overflow-hidden p-0">
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-[#0a1628] via-[#0d2840] to-[#051018]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,242,255,0.15),transparent_55%)]" />
                    <div className="absolute inset-0 flex items-end justify-center pb-0">
                      <div className="flex h-[75%] w-[70%] items-center justify-center rounded-t-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-5xl font-bold text-white/20 backdrop-blur-sm">
                        {member.initials}
                      </div>
                    </div>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 transition-colors hover:border-deweb-cyan/40 hover:text-deweb-cyan"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <LinkedInIcon />
                      </a>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-deweb-cyan">{member.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{member.expertise}</p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-white/35">
                      {t("yearsExperience", { years: member.yearsExperience })}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Technologies */}
      <section className="bg-[#f8fafc] py-20 text-[#0f172a]">
        <div className="container-narrow px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">{t("techTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-500">{t("techSubtitle")}</p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {aboutTechnologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-sm font-bold" style={{ color: tech.color }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,242,255,0.12),transparent_60%)]" />
        <div className="container-narrow relative px-4 text-center sm:px-6 lg:px-8">
          <GlassCard glow className="mx-auto max-w-3xl p-10 sm:p-14">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("ctaTitle")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">{t("ctaSubtitle")}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GlowButton href="/contact" variant="primary">
                {t("requestProposal")}
              </GlowButton>
              <GlowButton href="/contact" variant="ghost">
                {t("bookCall")}
              </GlowButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
