"use client";

import { testimonials } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          kicker="Example scenario"
          title="Example outcomes from common DEWEB projects"
          subtitle="Illustrative scenarios showing the types of problems DEWEB can help solve. These are not client testimonials."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <GlassCard key={item.label} delay={i * 0.1} className="flex flex-col p-8">
              <p className="flex-1 text-sm leading-relaxed text-white/75">{item.quote}</p>
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="font-semibold text-white">{item.label}</p>
                <p className="text-xs text-white/45">{item.type}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
