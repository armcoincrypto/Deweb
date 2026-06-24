"use client";

import { SparkleField } from "@/components/ui/SparkleField";

/** Site-wide luminous sparkle background — all pages */
export function ParticlesBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#0b1424]" />
      <div className="absolute inset-0 bg-hero-mesh opacity-70 sm:opacity-80 md:opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_140%_90%_at_50%_-10%,rgba(0,242,255,0.14),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_20%,rgba(124,58,237,0.1),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_70%,rgba(56,189,248,0.08),transparent_50%)]" />
      <SparkleField density="high" className="hidden md:block opacity-90" />
      <SparkleField density="medium" className="hidden sm:block md:hidden opacity-85" />
      <SparkleField density="low" className="sm:hidden opacity-80" />
    </div>
  );
}
