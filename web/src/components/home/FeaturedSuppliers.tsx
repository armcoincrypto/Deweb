"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const featured = [
  { name: "Nexus Labs", skill: "AI & Automation", rating: 4.9, projects: 124, price: "$85/hr", verified: true },
  { name: "CloudForge", skill: "Web Development", rating: 4.8, projects: 89, price: "$72/hr", verified: true },
  { name: "PixelStack", skill: "UI/UX Design", rating: 5.0, projects: 156, price: "$65/hr", verified: true },
  { name: "DevMint", skill: "SaaS & Bots", rating: 4.7, projects: 67, price: "$90/hr", verified: false },
];

export function FeaturedSuppliers() {
  const t = useTranslations("home");
  const tm = useTranslations("marketplace");

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          kicker={t("featuredKicker")}
          title={t("featuredTitle")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s, i) => (
            <GlassCard key={s.name} delay={i * 0.08} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-deweb-cyan/30 to-purple-500/30 text-lg font-bold">
                  {s.name[0]}
                </div>
                {s.verified && (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-400">
                    {tm("verified")}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-bold text-white">{s.name}</h3>
              <p className="text-sm text-deweb-cyan">{s.skill}</p>
              <p className="mt-2 text-xs text-white/45">
                ★ {s.rating} · {s.projects} projects
              </p>
              <p className="mt-3 text-lg font-bold text-white">
                {tm("from")} <span className="text-deweb-cyan">{s.price}</span>
              </p>
              <Link
                href="/marketplace"
                className="mt-4 inline-block text-xs font-bold text-deweb-cyan hover:underline"
              >
                {tm("viewProfile")} →
              </Link>
            </GlassCard>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/marketplace"
            className="text-sm font-bold text-deweb-cyan hover:underline"
          >
            View all suppliers →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
