"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { coreTeam } from "@/lib/team-data";
import { serviceCategories } from "@/lib/services-data";

export function AboutView() {
  const t = useTranslations("about");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="container-narrow px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-white">{t("teamTitle")}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/55">{t("teamSubtitle")}</p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {coreTeam.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full p-8 text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-2xl border-2 border-deweb-cyan/30">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-deweb-cyan">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{member.bio}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold text-white">{t("featuresTitle")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-white/55">{t("featuresSubtitle")}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={`/services/${cat.id}`} className="block h-full">
                  <GlassCard className="group h-full p-6 transition-colors hover:border-deweb-cyan/30">
                    <span className="text-3xl">{cat.icon}</span>
                    <h3 className="mt-3 text-lg font-bold text-white group-hover:text-deweb-cyan transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{cat.desc}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-deweb-cyan">
                      {t("learnMore")} →
                    </span>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <GlassCard className="p-8">
            <h2 className="text-xl font-bold text-deweb-cyan">{t("mission")}</h2>
            <p className="mt-4 leading-relaxed text-white/65">{t("missionText")}</p>
          </GlassCard>
          <GlassCard className="p-8">
            <h2 className="text-xl font-bold text-deweb-cyan">{t("vision")}</h2>
            <p className="mt-4 leading-relaxed text-white/65">{t("visionText")}</p>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
