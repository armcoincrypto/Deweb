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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.45 }}
      className="relative mt-10 w-full overflow-hidden border-y border-[#95BF47]/30 bg-gradient-to-r from-[#071008] via-[#0d1a10] to-[#071008]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(149,191,71,0.16),transparent_45%),radial-gradient(ellipse_at_85%_50%,rgba(0,242,255,0.07),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#95BF47]/70 to-transparent" />

      <div className="relative w-full px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_1fr_1.2fr_1.1fr] lg:gap-0 lg:divide-x lg:divide-[#95BF47]/15">
          {/* Brand */}
          <div className="flex flex-col justify-center lg:pr-10">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#95BF47]/35 bg-[#95BF47]/10 p-3 shadow-[0_0_40px_rgba(149,191,71,0.22)]">
                <Image src="/shopify-logo.svg" alt="Shopify" width={44} height={50} className="h-auto w-full" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#95BF47]">
                  {t("partner")}
                </p>
                <h2 className="mt-1 text-2xl font-bold leading-tight text-white sm:text-3xl">{t("title")}</h2>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex flex-col justify-center lg:px-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">{t("pricingLabel")}</p>
            <div className="mt-3 space-y-2">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.name}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{pkg.name}</p>
                    <p className="text-[11px] text-white/45">{pkg.note}</p>
                  </div>
                  <p className="shrink-0 text-base font-bold text-[#95BF47]">{pkg.price}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/40">{t("timeline")}: 2–8 weeks</p>
          </div>

          {/* What we offer */}
          <div className="flex flex-col justify-center lg:px-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">{t("offerLabel")}</p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {OFFERS.map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-[#95BF47]">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Opportunity */}
          <div className="flex flex-col justify-center lg:pl-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-deweb-cyan/80">
              {t("opportunityLabel")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{t("opportunityText")}</p>
            <ul className="mt-3 space-y-1.5 text-xs text-white/50">
              <li>• {t("stat1")}</li>
              <li>• {t("stat2")}</li>
              <li>• {t("stat3")}</li>
            </ul>
          </div>
        </div>

        {/* Full-width CTA bar */}
        <div className="mt-8 flex w-full flex-col items-stretch justify-between gap-4 border-t border-[#95BF47]/20 pt-8 sm:flex-row sm:items-center">
          <p className="text-center text-sm text-white/50 sm:text-left lg:max-w-xl">
            {t("ctaHint")}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
            <GlowButton href="#consultation" variant="primary" className="w-full !px-8 !py-3.5 sm:w-auto">
              {t("getConsultation")}
            </GlowButton>
            <Link
              href="/services/ecommerce"
              className="text-sm font-semibold text-[#95BF47] hover:underline"
            >
              {t("cta")} →
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
