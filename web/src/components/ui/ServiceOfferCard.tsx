"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

export type ServiceOfferCardProps = {
  icon: string;
  title: string;
  problem: string;
  solution: string;
  value: string;
  href: string;
  ctaLabel?: string;
  accent?: string;
  delay?: number;
};

export function ServiceOfferCard({
  icon,
  title,
  problem,
  solution,
  value,
  href,
  ctaLabel = "Learn more",
  accent = "#00f2ff",
  delay = 0,
}: ServiceOfferCardProps) {
  return (
    <GlassCard glow delay={delay} className="group flex h-full flex-col p-6 sm:p-8">
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${accent}22, transparent)`,
          border: `1px solid ${accent}44`,
          boxShadow: `0 0 30px ${accent}18`,
        }}
      >
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white">{title}</h3>

      <div className="mt-5 flex flex-1 flex-col gap-4 text-sm leading-relaxed">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-red-400/80">Problem</p>
          <p className="mt-1 text-white/55">{problem}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-deweb-cyan/80">Solution</p>
          <p className="mt-1 text-white/70">{solution}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400/80">
            Business value
          </p>
          <p className="mt-1 text-white/60">{value}</p>
        </div>
      </div>

      <div className="mt-6 pt-2">
        <GlowButton href={href} variant="secondary" className="w-full sm:w-auto">
          {ctaLabel}
        </GlowButton>
      </div>
    </GlassCard>
  );
}
