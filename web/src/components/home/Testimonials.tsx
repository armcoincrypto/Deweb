"use client";

import { testimonials } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          kicker="Testimonials"
          title="Trusted by builders worldwide"
          subtitle="Clients and suppliers scale faster when competition drives quality and fair pricing."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <GlassCard key={t.author} delay={i * 0.1} className="flex flex-col p-8">
              <div className="mb-4 flex gap-1 text-amber-400">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-white/75">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-deweb-cyan/40 to-purple-500/40 text-sm font-bold">
                  {t.author[0]}
                </div>
                <div>
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-white/45">{t.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
