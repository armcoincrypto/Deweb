"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const featured = [
  { name: "Example supplier", skill: "AI & Automation", focus: "Workflow automation", verified: true },
  { name: "Example supplier", skill: "Web Development", focus: "Next.js delivery", verified: true },
  { name: "Example supplier", skill: "UI/UX Design", focus: "Product design", verified: true },
  { name: "Example supplier", skill: "SaaS & Bots", focus: "Telegram & SaaS builds", verified: false },
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
        <p className="-mt-6 mb-8 text-center text-sm text-white/45">
          Illustrative supplier profile layout — not live marketplace data.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s, i) => (
            <GlassCard key={`${s.skill}-${i}`} delay={i * 0.08} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-deweb-cyan/30 to-purple-500/30 text-lg font-bold">
                  {s.skill[0]}
                </div>
                {s.verified && (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-400">
                    {tm("verified")}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-bold text-white">{s.name}</h3>
              <p className="text-sm text-deweb-cyan">{s.skill}</p>
              <p className="mt-2 text-xs text-white/45">{s.focus}</p>
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
