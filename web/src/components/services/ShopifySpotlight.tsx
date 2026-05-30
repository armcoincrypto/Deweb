"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";

const OFFERS = [
  "Shopify Plus migrations",
  "Custom themes & Liquid",
  "Speed & Core Web Vitals",
  "Payments & shipping setup",
  "CRO & checkout optimization",
  "Inventory & ERP integrations",
] as const;

const PACKAGES = [
  { name: "Starter Store", price: "$2,000", note: "Landing + catalog up to 25 products" },
  { name: "Growth Store", price: "$7,500", note: "Custom theme, apps, marketing stack" },
  { name: "Shopify Plus", price: "$25,000+", note: "Enterprise, multi-store, automation" },
] as const;

export function ShopifySpotlight() {
  const t = useTranslations("services.shopifySpotlight");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="relative left-1/2 mt-10 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-y border-[#95BF47]/25 bg-gradient-to-r from-[#0a1208] via-[#0d1a10] to-[#0a1208]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(149,191,71,0.14),transparent_50%),radial-gradient(ellipse_at_80%_50%,rgba(0,242,255,0.08),transparent_45%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#95BF47]/60 to-transparent" />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:items-stretch lg:gap-0 lg:px-8 lg:py-0">
        {/* Brand + title */}
        <div className="flex shrink-0 flex-col justify-center gap-4 border-[#95BF47]/15 py-4 lg:w-[22%] lg:border-r lg:py-10 lg:pr-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#95BF47]/30 bg-[#95BF47]/10 p-2.5 shadow-[0_0_30px_rgba(149,191,71,0.2)]">
              <Image src="/shopify-logo.svg" alt="Shopify" width={40} height={46} className="h-auto w-full" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#95BF47]">
                {t("partner")}
              </p>
              <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.65rem]">
                {t("title")}
              </h2>
            </div>
          </div>
        </div>

        {/* Pricing — real packages */}
        <div className="flex shrink-0 flex-col justify-center gap-3 border-[#95BF47]/15 py-4 lg:w-[24%] lg:border-r lg:py-10 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{t("pricingLabel")}</p>
          <div className="space-y-2">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className="flex items-baseline justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white/90">{pkg.name}</p>
                  <p className="truncate text-[10px] text-white/45">{pkg.note}</p>
                </div>
                <p className="shrink-0 text-sm font-bold text-[#95BF47]">{pkg.price}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-white/40">{t("timeline")}: 2–8 weeks</p>
        </div>

        {/* What we offer */}
        <div className="flex flex-1 flex-col justify-center gap-3 border-[#95BF47]/15 py-4 lg:border-r lg:py-10 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{t("offerLabel")}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {OFFERS.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-white/75 sm:text-sm">
                <span className="text-[#95BF47]">✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Opportunity + CTA */}
        <div className="flex shrink-0 flex-col justify-center gap-4 py-4 lg:w-[26%] lg:py-10 lg:pl-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">
            {t("opportunityLabel")}
          </p>
          <p className="text-sm leading-relaxed text-white/65">{t("opportunityText")}</p>
          <ul className="space-y-1 text-xs text-white/50">
            <li>• {t("stat1")}</li>
            <li>• {t("stat2")}</li>
            <li>• {t("stat3")}</li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-1">
            <GlowButton href="/services/ecommerce" variant="primary" className="!px-5 !py-2.5 !text-xs">
              {t("cta")}
            </GlowButton>
            <Link
              href="#consultation"
              className="inline-flex items-center text-xs font-semibold text-[#95BF47] hover:underline"
            >
              {t("consult")} →
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
