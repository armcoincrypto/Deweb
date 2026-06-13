"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceOfferCard } from "@/components/ui/ServiceOfferCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { homeServices } from "@/lib/home-services-data";

export function ServicesShowcase() {
  return (
    <section className="section-padding border-y border-white/[0.06] bg-white/[0.02]" aria-labelledby="services-heading">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Services"
          title="Premium development for growth-focused businesses"
          subtitle="Every engagement starts with your business goal — then we design, build, and optimize the technology to get you there."
          id="services-heading"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, i) => (
            <ServiceOfferCard key={service.title} {...service} delay={i * 0.06} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <GlowButton href="/services" variant="primary">
            View all services
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
