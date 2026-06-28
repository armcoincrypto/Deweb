"use client";

import { ServicePhotoBanner } from "@/components/seo/ServicePhotoBanner";
import type { ServiceLandingTheme } from "@/lib/service-landing/visual-theme";
import { getServiceHeroImage } from "@/lib/service-landing/hero-images";

type Props = {
  slug: string;
  theme: ServiceLandingTheme;
};

/** Large hero photo panel — full image, no UI mockup overlay */
export function ServiceLandingHeroMedia({ slug, theme }: Props) {
  const heroImage = getServiceHeroImage(slug);

  return (
    <div className="relative">
      <div
        className="absolute -inset-4 rounded-3xl blur-3xl opacity-80"
        style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 70%)` }}
      />
      <ServicePhotoBanner
        image={heroImage}
        accent={theme.accent}
        glow={theme.glow}
        variant="hero"
        priority
      />
    </div>
  );
}
