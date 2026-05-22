"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { pricingPlans } from "@/lib/data";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Pricing() {
  const t = useTranslations("home");
  const tp = useTranslations("pricing");

  return (
    <section id="pricing" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          kicker={t("pricingKicker")}
          title={t("pricingTitle")}
          subtitle={tp("subtitle")}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 transition-all",
                plan.highlighted
                  ? "glass-panel-glow glow-border border-deweb-cyan/40 bg-deweb-cyan/[0.06] scale-[1.02] lg:scale-105"
                  : "glass-panel border-white/10"
              )}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-deweb-cyan px-4 py-1 text-xs font-bold text-deweb-bg">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-white/45">{plan.period}</span>
                )}
              </div>
              <p className="mt-3 text-sm text-white/55">{plan.description}</p>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="mt-0.5 text-deweb-cyan">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <GlowButton
                  href="/signup"
                  variant={plan.highlighted ? "primary" : "ghost"}
                  className="w-full !block text-center"
                >
                  {plan.cta}
                </GlowButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
