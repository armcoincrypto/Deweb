"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceBannerVisual } from "@/components/services/ServiceBannerVisual";
import { serviceBanners, type ServiceBanner } from "@/lib/service-banners-data";
import { bannerReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";

function MetaBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-deweb-cyan/70">
        <span className="inline-block h-px w-4 bg-deweb-cyan/50" />
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ServiceRow({ banner, index }: { banner: ServiceBanner; index: number }) {
  const t = useTranslations("services");
  const reduceMotion = useReducedMotion();
  const visualRight = index % 2 === 0;
  const sectionNum = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={bannerReveal3D(!visualRight)}
      transition={{ ...transition3D, delay: index * 0.05 }}
      style={{
        ...motion3DStyle,
        perspective: PERSPECTIVE,
        background: banner.featured
          ? "linear-gradient(105deg, #061008 0%, #0a1610 40%, #070d14 100%)"
          : "linear-gradient(105deg, #060a10 0%, #0a121c 50%, #060a10 100%)",
      }}
      className="preserve-3d relative w-full overflow-hidden border-b border-white/[0.07]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at ${visualRight ? "85%" : "15%"} 50%, ${banner.glow || "rgba(0,242,255,0.08)"}, transparent 55%)`,
        }}
      />

      <div
        className={`relative mx-auto grid w-full max-w-[1680px] grid-cols-1 lg:min-h-[min(40vh,440px)] ${
          visualRight
            ? "lg:grid-cols-[1fr_46%]"
            : "lg:grid-cols-[46%_1fr]"
        }`}
      >
        {/* Visual panel */}
        <div
          className={`relative min-h-[280px] lg:min-h-full ${
            visualRight ? "lg:order-2" : "lg:order-1"
          } ${visualRight ? "lg:border-l" : "lg:border-r"} border-white/[0.06]`}
        >
          <div className="absolute inset-0 p-5 sm:p-8 lg:p-10">
            <ServiceBannerVisual type={banner.visual} accent={banner.accent} glow={banner.glow} />
          </div>
        </div>

        {/* Content panel */}
        <div
          className={`flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-14 ${
            visualRight ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xs font-bold tracking-[0.3em] text-deweb-cyan/50">{sectionNum}</span>
            <span className="h-px flex-1 max-w-[60px] bg-deweb-cyan/30" />
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl shadow-glow-sm"
              style={{
                borderColor: banner.accent ? `${banner.accent}55` : "rgba(0,242,255,0.35)",
                background: banner.accent ? `${banner.accent}18` : "rgba(0,242,255,0.1)",
              }}
            >
              {banner.icon}
            </div>
          </div>

          <h2
            className={`font-bold leading-[1.1] tracking-tight text-white ${
              banner.featured ? "text-3xl sm:text-4xl lg:text-[2.75rem]" : "text-2xl sm:text-3xl lg:text-4xl"
            }`}
          >
            {banner.title}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <MetaBlock label={t("deliverables")}>
              <ul className="space-y-1.5">
                {banner.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-white/85">
                    <span className="text-deweb-cyan">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </MetaBlock>
            <MetaBlock label={t("priceRange")}>
              <p className="text-lg font-bold text-deweb-cyan sm:text-xl">{banner.pricing}</p>
            </MetaBlock>
            <MetaBlock label={t("timeline")}>
              <p className="text-base font-semibold text-white">{banner.timeline}</p>
            </MetaBlock>
            <MetaBlock label={t("benefits")}>
              <ul className="space-y-1.5">
                {banner.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-white/75">
                    <span className="mt-0.5 text-deweb-cyan/80">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </MetaBlock>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <GlowButton href="#consultation" variant="primary" className="!px-8 !py-3.5 !text-sm">
              {t("consultation")}
            </GlowButton>
            <GlowButton href="/marketplace" variant="ghost" className="!px-8 !py-3.5 !text-sm">
              {t("requestBids")}
            </GlowButton>
            <Link
              href={`/services/${banner.slug}`}
              className="text-sm font-semibold text-white/50 transition-colors hover:text-deweb-cyan sm:ml-1"
            >
              {t("learnMore")} →
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ServiceBanners({
  pageTitle,
  hideTitle = false,
  banners = serviceBanners,
}: {
  pageTitle?: string;
  hideTitle?: boolean;
  banners?: ServiceBanner[];
}) {
  const t = useTranslations("services");

  return (
    <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 sm:pt-4">
      <div className="border-y border-white/[0.08]">
        {!hideTitle && (
          <div className="border-b border-white/[0.06] bg-white/[0.02] px-6 py-10 text-center lg:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-deweb-cyan/60">
              DEWEB Services
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {pageTitle ?? t("categoriesTitle")}
            </h1>
          </div>
        )}

        <div className="flex w-full flex-col">
          {banners.map((banner, i) => (
            <ServiceRow key={banner.id} banner={banner} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
