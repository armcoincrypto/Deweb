"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceBannerVisual } from "@/components/services/ServiceBannerVisual";
import {
  serviceBanners,
  bannerGridLayout,
  type ServiceBanner,
} from "@/lib/service-banners-data";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/35">
        <span className="text-deweb-cyan/70">◆</span>
        {label}
      </p>
      <p className="mt-1 text-sm font-medium leading-snug text-white/85">{value}</p>
    </div>
  );
}

function ServiceBannerCard({ banner, index }: { banner: ServiceBanner; index: number }) {
  const t = useTranslations("services");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0a121c]/95 via-[#070d14] to-[#05070a] shadow-card transition-all duration-300 hover:border-deweb-cyan/25 hover:shadow-glow-sm ${
        banner.featured ? "min-h-[320px] lg:min-h-[280px]" : "min-h-[280px] lg:min-h-[240px]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 0% 50%, ${banner.accent ? `${banner.accent}18` : "rgba(0,242,255,0.06)"}, transparent 55%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-deweb-cyan/[0.03] to-transparent" />

      <div className="relative grid h-full lg:grid-cols-[1fr_42%]">
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <h2
              className={`font-bold leading-tight text-white ${
                banner.featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl lg:text-3xl"
              }`}
            >
              {banner.title}
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              <MetaItem label={t("deliverables")} value={banner.deliverables.join(" · ")} />
              <MetaItem label={t("priceRange")} value={banner.pricing} />
              <MetaItem label={t("timeline")} value={banner.timeline} />
              <MetaItem label={t("benefits")} value={banner.benefits.join(" · ")} />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <GlowButton href="#consultation" variant="primary" className="!px-6 !py-3">
              {t("consultation")}
            </GlowButton>
            <GlowButton href="/marketplace" variant="ghost" className="!px-6 !py-3">
              {t("requestBids")}
            </GlowButton>
            <Link
              href={`/services/${banner.slug}`}
              className="text-center text-sm font-semibold text-deweb-cyan/80 hover:text-deweb-cyan sm:ml-2"
            >
              {t("learnMore")} →
            </Link>
          </div>
        </div>

        <div className="relative border-t border-white/[0.06] p-4 lg:border-l lg:border-t-0 lg:p-5">
          <ServiceBannerVisual type={banner.visual} accent={banner.accent} />
        </div>
      </div>
    </motion.article>
  );
}

export function ServiceBanners() {
  const t = useTranslations("services");
  const bannerMap = Object.fromEntries(serviceBanners.map((b) => [b.id, b]));

  return (
    <section className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl lg:mb-10">
        {t("categoriesTitle")}
      </h2>
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-4 lg:gap-5">
        {bannerGridLayout.map((slot, i) => {
          const banner = bannerMap[slot.id];
          if (!banner) return null;
          return (
            <div key={banner.id} className={slot.className}>
              <ServiceBannerCard banner={banner} index={i} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
