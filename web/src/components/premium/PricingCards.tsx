"use client";

import { StaggerContainer, AnimatedCard } from "@/components/animations";
import { GlowButton } from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

export type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  href?: string;
  highlighted?: boolean;
  badge?: string;
};

type PricingCardsProps = {
  plans: PricingPlan[];
  className?: string;
};

export function PricingCards({ plans, className }: PricingCardsProps) {
  return (
    <StaggerContainer className={cn("grid gap-6 lg:grid-cols-3", className)} stagger={0.1}>
      {plans.map((plan) => (
        <AnimatedCard
          key={plan.name}
          inherit
          className={cn(
            "relative flex flex-col rounded-2xl border p-8",
            plan.highlighted
              ? "glass-panel-glow glow-border border-deweb-cyan/40 bg-deweb-cyan/[0.06] lg:scale-[1.02]"
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
            {plan.period && <span className="text-sm text-white/45">{plan.period}</span>}
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
              href={plan.href ?? "/contact"}
              variant={plan.highlighted ? "primary" : "ghost"}
              className="w-full !block text-center"
            >
              {plan.cta}
            </GlowButton>
          </div>
        </AnimatedCard>
      ))}
    </StaggerContainer>
  );
}
