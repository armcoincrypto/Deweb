"use client";

import { CinematicSection } from "@/components/cinematic/CinematicSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { whyChooseItems } from "@/lib/portfolio-data";

export function WhyChoose() {
  return (
    <CinematicSection id="why" fullScreen={false} className="section-padding">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Why DEWEB"
          title="Why businesses choose DEWEB"
          subtitle="Premium agency quality, startup speed, and enterprise-grade delivery — without the enterprise price tag."
          id="why-heading"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseItems.map((item, i) => (
            <GlassCard key={item.title} glow tilt delay={i * 0.06}>
              <div className="reflection-surface p-6 sm:p-8">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                  style={{
                    background: `linear-gradient(135deg, ${item.accent}22, transparent)`,
                    border: `1px solid ${item.accent}44`,
                    boxShadow: `0 0 24px ${item.accent}18`,
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
