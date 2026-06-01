"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceBannerVisual } from "@/components/services/ServiceBannerVisual";
import { serviceBanners, type ServiceBanner } from "@/lib/service-banners-data";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
        <span className="text-deweb-cyan/80">◆</span>
        {label}
      </p>
      <p className="mt-1.5 text-sm font-medium leading-snug text-white/90">{value}</p>
    </div>
  );
}

function ServiceRow({ banner, index }: { banner: ServiceBanner; index: number }) {
  const t = useTranslations("services");
  const isShopify = banner.id === "shopify";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative w-full border-b border-white/[0.06]"
      style={{
        background: isShopify
          ? "linear-gradient(90deg, #071008 0%, #0d1a10 50%, #071008 100%)"
          : "linear-gradient(90deg, #070d14 0%, #0a121c 50%, #070d14 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 15% 50%, ${banner.accent ? `${banner.accent}14` : "rgba(0,242,255,0.05)"}, transparent 50%)`,
        }}
      />

      <div
        className={`relative mx-auto grid w-full max-w-[1600px] grid-cols-1 lg:grid-cols-[1fr_minmax(280px,38%)] ${
          isShopify ? "min-h-[min(42vh,420px)]" : "min-h-[min(36vh,360px)]"
        }`}
      >
        {/* Text — left */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          <h2
            className={`font-bold leading-tight text-white ${
              isShopify ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl lg:text-4xl"
            }`}
          >
            {banner.title}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <MetaItem label={t("deliverables")} value={banner.deliverables.join(" · ")} />
            <MetaItem label={t("priceRange")} value={banner.pricing} />
            <MetaItem label={t("timeline")} value={banner.timeline} />
            <MetaItem label={t("benefits")} value={banner.benefits.join(" · ")} />
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <GlowButton href="#consultation" variant="primary" className="!px-8 !py-3.5">
              {t("consultation")}
            </GlowButton>
            <GlowButton href="/marketplace" variant="ghost" className="!px-8 !py-3.5">
              {t("requestBids")}
            </GlowButton>
            <Link
              href={`/services/${banner.slug}`}
              className="text-sm font-semibold text-deweb-cyan hover:underline sm:ml-2"
            >
              {t("learnMore")} →
            </Link>
          </div>
        </div>

        {/* Visual — right */}
        <div className="relative min-h-[220px] border-t border-white/[0.06] lg:min-h-0 lg:border-l lg:border-t-0">
          <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
            <ServiceBannerVisual type={banner.visual} accent={banner.accent} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ServiceBanners() {
  const t = useTranslations("services");

  return (
    <section className="relative left-1/2 mt-4 w-screen max-w-[100vw] -translate-x-1/2">
      <div className="border-y border-white/[0.08] bg-deweb-bg/50">
        <h2 className="px-6 py-10 text-center text-2xl font-bold text-white sm:text-3xl lg:py-12">
          {t("categoriesTitle")}
        </h2>

        {/* One full-width row per category — stacked vertically */}
        <div className="flex w-full flex-col">
          {serviceBanners.map((banner, i) => (
            <ServiceRow key={banner.id} banner={banner} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
