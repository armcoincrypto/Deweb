"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ServiceLandingTheme } from "@/lib/service-landing/visual-theme";
import { getServiceHeroImage, isRemoteHeroImage } from "@/lib/service-landing/hero-images";

type Props = {
  slug: string;
  theme: ServiceLandingTheme;
};

/** Right hero panel — full service photo, no UI mockup overlay */
export function ServiceLandingHeroMedia({ slug, theme }: Props) {
  const reduceMotion = useReducedMotion();
  const heroImage = getServiceHeroImage(slug);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[500px]"
    >
      <div
        className="absolute -inset-3 rounded-3xl blur-2xl"
        style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 70%)` }}
      />

      <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 46vw"
          unoptimized={isRemoteHeroImage(heroImage.src)}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/50 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(135deg, transparent 40%, ${theme.glow} 100%)`,
          }}
        />
      </div>
    </motion.div>
  );
}
