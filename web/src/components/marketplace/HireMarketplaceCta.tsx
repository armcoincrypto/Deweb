"use client";

import { GlowButton } from "@/components/ui/GlowButton";

type HireMarketplaceCtaProps = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
};

export function HireMarketplaceCta({
  title,
  description,
  primaryLabel,
  secondaryLabel,
}: HireMarketplaceCtaProps) {
  return (
    <section className="mt-12 overflow-hidden rounded-2xl border border-deweb-cyan/25 bg-gradient-to-br from-deweb-cyan/15 via-[#0a1628] to-purple-900/20 p-8 text-center sm:p-12">
      <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">{description}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <GlowButton href="/account/listings" variant="primary">
          {primaryLabel}
        </GlowButton>
        <GlowButton href="/contact" variant="ghost">
          {secondaryLabel}
        </GlowButton>
      </div>
    </section>
  );
}
