"use client";

import type { ServiceOffer } from "@/lib/conversion-data";
import { PRICING_NOTE } from "@/lib/conversion-data";
import { ScrollReveal } from "@/components/animations";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { SpotlightCard } from "@/components/premium/SpotlightCard";

type Props = {
  offer: ServiceOffer;
  accent?: string;
};

export function ServiceConversionBlocks({ offer, accent = "#00f2ff" }: Props) {
  return (
    <div className="mt-16 space-y-16">
      <ScrollReveal as="section" aria-labelledby="what-we-build-heading">
        <h2 id="what-we-build-heading" className="text-2xl font-bold text-white sm:text-3xl">
          What we build
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/65">{offer.whatItIs}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {offer.delivers.map((item) => (
            <SpotlightCard key={item} className="flex items-start gap-3 px-4 py-3.5 text-sm text-white/80">
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                style={{ background: accent }}
              />
              {item}
            </SpotlightCard>
          ))}
        </div>
      </ScrollReveal>

      <section className="grid gap-6 lg:grid-cols-2" aria-label="Service overview">
        <ScrollReveal delay={0.05}>
          <GlassCard glow className="h-full p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white">Who this is for</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{offer.whoFor}</p>
          </GlassCard>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <GlassCard glow className="h-full p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white">What problem it solves</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{offer.problem}</p>
          </GlassCard>
        </ScrollReveal>
      </section>

      <ScrollReveal as="section" aria-labelledby="pricing-heading">
        <h2 id="pricing-heading" className="text-2xl font-bold text-white sm:text-3xl">
          Pricing
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <GlassCard glow className="p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: `${accent}aa` }}>
              Starting from
            </p>
            <p className="mt-3 text-3xl font-bold text-white">{offer.startingPrice}</p>
            <p className="mt-2 text-sm text-white/55">Estimated timeline: {offer.timeline}</p>
          </GlassCard>
          <SpotlightCard className="p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-white/65">{PRICING_NOTE}</p>
            <ul className="mt-4 space-y-2">
              {offer.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-white/75">
                  <span className="font-bold" style={{ color: accent }}>
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <section
          className="rounded-2xl border p-6 text-center sm:p-10"
          style={{
            borderColor: `${accent}33`,
            background: `linear-gradient(135deg, ${accent}10 0%, rgba(10,22,40,0.6) 100%)`,
          }}
        >
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
      </ScrollReveal>
    </div>
  );
}
