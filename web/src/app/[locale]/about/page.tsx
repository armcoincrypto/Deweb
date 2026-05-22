"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="container-narrow grid gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:px-8">
        <GlassCard className="p-8">
          <h2 className="text-xl font-bold text-deweb-cyan">{t("mission")}</h2>
          <p className="mt-4 text-white/65 leading-relaxed">{t("missionText")}</p>
        </GlassCard>
        <GlassCard className="p-8">
          <h2 className="text-xl font-bold text-deweb-cyan">{t("vision")}</h2>
          <p className="mt-4 text-white/65 leading-relaxed">{t("visionText")}</p>
        </GlassCard>
      </div>
    </>
  );
}
