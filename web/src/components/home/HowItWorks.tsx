"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<string, ReactNode> = {
  "1": (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  "2": (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
    </svg>
  ),
  "3": (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12" />
    </svg>
  ),
};

export function HowItWorks() {
  const t = useTranslations("home");
  const steps = [
    { step: "01", title: t("step1Title"), desc: t("step1Desc"), icon: "1" },
    { step: "02", title: t("step2Title"), desc: t("step2Desc"), icon: "2" },
    { step: "03", title: t("step3Title"), desc: t("step3Desc"), icon: "3" },
  ];

  return (
    <section id="how-it-works" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          kicker={t("howKicker")}
          title={t("howTitle")}
          subtitle={t("howSubtitle")}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item, i) => (
            <GlassCard key={item.step} glow={i === 1} delay={i * 0.1} className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-deweb-cyan/30 bg-deweb-cyan/10 text-deweb-cyan">
                {icons[item.icon]}
              </div>
              <span className="text-xs font-bold text-deweb-cyan">{item.step}</span>
              <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
