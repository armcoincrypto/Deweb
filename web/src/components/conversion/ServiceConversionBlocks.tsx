"use client";

import type { ServiceOffer } from "@/lib/conversion-data";
import { PRICING_NOTE } from "@/lib/conversion-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

type Props = {
  offer: ServiceOffer;
};

export function ServiceConversionBlocks({ offer }: Props) {
  return (
    <div className="mt-16 space-y-16">
      <section aria-labelledby="what-we-build-heading">
        <h2 id="what-we-build-heading" className="text-2xl font-bold text-white sm:text-3xl">
          What we build
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/65">{offer.whatItIs}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {offer.delivers.map((item) => (
            <div
              key={item}
              className="content-panel flex items-start gap-3 rounded-xl px-4 py-3 text-sm text-white/80"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-deweb-cyan" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2" aria-label="Service overview">
        <GlassCard className="p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white">Who this is for</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{offer.whoFor}</p>
        </GlassCard>
        <GlassCard className="p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white">What problem it solves</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{offer.problem}</p>
        </GlassCard>
      </section>

      <section aria-labelledby="pricing-heading">
        <h2 id="pricing-heading" className="text-2xl font-bold text-white sm:text-3xl">
          Pricing
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <GlassCard className="p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/70">
              Starting from
            </p>
            <p className="mt-3 text-3xl font-bold text-white">{offer.startingPrice}</p>
            <p className="mt-2 text-sm text-white/55">Estimated timeline: {offer.timeline}</p>
          </GlassCard>
          <div className="content-panel rounded-2xl p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-white/65">{PRICING_NOTE}</p>
            <ul className="mt-4 space-y-2">
              {offer.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-white/75">
                  <span className="font-bold text-deweb-cyan">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-deweb-cyan/20 bg-deweb-cyan/5 p-6 text-center sm:p-10">
        <h2 className="text-2xl font-bold text-white">Ready to start this project?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65 sm:text-base">
          Tell us what you need and we&apos;ll reply with a clear plan, timeline, and starting estimate.
        </p>
        <div className="mt-6">
          <GlowButton href="/contact" variant="primary">
            Send Project Request
          </GlowButton>
        </div>
      </section>
    </div>
  );
}
