"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import type { ServiceCategory } from "@/lib/services-data";
import { getExpertForService } from "@/lib/team-data";

type ServiceDetailViewProps = {
  service: ServiceCategory;
};

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const t = useTranslations("serviceDetail");
  const expert = getExpertForService(service.id);

  return (
    <>
      <PageHeader
        kicker={`${service.icon} ${service.title}`}
        title={t("pageTitle", { service: service.title })}
        subtitle={service.overview}
      />

      <div className="container-narrow px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-deweb-cyan">{t("whatWeOffer")}</h2>
              <p className="mt-4 leading-relaxed text-white/65">{service.offering}</p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-deweb-cyan">{t("whatItMeans")}</h2>
              <p className="mt-4 leading-relaxed text-white/65">{service.meaning}</p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-deweb-cyan">{t("whatsIncluded")}</h2>
              <ul className="mt-4 space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/65">
                    <span className="mt-1 text-deweb-cyan">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-deweb-cyan">{t("deliverables")}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.deliverables.map((d) => (
                  <span
                    key={d}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-8 text-center">
              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-2xl border-2 border-deweb-cyan/30">
                <Image src={expert.avatar} alt={expert.name} fill className="object-cover" unoptimized />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-deweb-cyan">
                {t("yourExpert")}
              </p>
              <h3 className="mt-1 text-xl font-bold text-white">{expert.name}</h3>
              <p className="text-sm text-white/55">{expert.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{expert.bio}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {expert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-deweb-cyan/20 bg-deweb-cyan/10 px-2.5 py-1 text-xs text-deweb-cyan"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-white/40">{t("timeline")}</p>
                  <p className="font-semibold text-white">{service.timeline}</p>
                </div>
                <div>
                  <p className="text-white/40">{t("priceRange")}</p>
                  <p className="font-semibold text-deweb-cyan">{service.price}</p>
                </div>
                <div>
                  <p className="text-white/40">{t("technologies")}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {service.tech.map((tech) => (
                      <span key={tech} className="text-xs text-white/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <GlowButton href="/signup" variant="primary" className="mt-6 w-full">
                {t("getQuote")}
              </GlowButton>
            </GlassCard>

            <Link
              href="/services"
              className="block text-center text-sm font-semibold text-deweb-cyan hover:underline"
            >
              ← {t("backToServices")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
