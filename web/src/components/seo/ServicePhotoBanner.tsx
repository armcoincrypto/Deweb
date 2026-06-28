"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { isRemoteHeroImage, type ServiceHeroImage } from "@/lib/service-landing/hero-images";

type ServicePhotoBannerProps = {
  image: ServiceHeroImage;
  accent: string;
  glow?: string;
  variant?: "hero" | "section" | "wide";
  priority?: boolean;
  className?: string;
  label?: string;
};

const HEIGHT = {
  hero: "min-h-[280px] sm:min-h-[360px] lg:min-h-[520px]",
  section: "min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]",
  wide: "min-h-[160px] sm:min-h-[200px]",
} as const;

export function ServicePhotoBanner({
  image,
  accent,
  glow = "rgba(0,242,255,0.25)",
  variant = "section",
  priority = false,
  className,
  label,
}: ServicePhotoBannerProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
        HEIGHT[variant],
        className
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={
          variant === "hero"
            ? "(max-width: 1024px) 100vw, 50vw"
            : "(max-width: 1024px) 100vw, 80vw"
        }
        unoptimized={isRemoteHeroImage(image.src)}
        className={cn("object-cover", image.position ?? "object-center")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/45 to-[#05070a]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070a]/70 via-transparent to-[#05070a]/30" />
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-90"
        style={{
          background: `linear-gradient(135deg, ${accent}18 0%, transparent 50%, ${glow} 100%)`,
        }}
      />
      {label && (
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#05070a]/55 px-5 py-3 backdrop-blur-sm sm:px-6 sm:py-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55 sm:text-sm">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

/** Full-bleed background photo layer for hero sections */
export function ServiceHeroPhotoBackdrop({
  image,
  accent,
  glow,
}: {
  image: ServiceHeroImage;
  accent: string;
  glow: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image
        src={image.src}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        unoptimized={isRemoteHeroImage(image.src)}
        className={cn("object-cover scale-105", image.position ?? "object-center")}
      />
      <div className="absolute inset-0 bg-[#05070a]/45 sm:bg-[#05070a]/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/88 to-[#05070a]/55 lg:via-[#05070a]/75 lg:to-[#05070a]/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/50 via-transparent to-[#05070a]" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 75% 25%, ${glow}, transparent 55%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 15% 50%, ${accent}22, transparent 45%)`,
        }}
      />
    </div>
  );
}
