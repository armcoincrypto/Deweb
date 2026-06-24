"use client";

import { GlowButton } from "@/components/ui/GlowButton";
import { ScrollReveal, TextReveal } from "@/components/animations";
import { BorderBeam } from "@/components/premium/BorderBeam";
import { cn } from "@/lib/utils";

type AnimatedCTAProps = {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

export function AnimatedCTA({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: AnimatedCTAProps) {
  return (
    <ScrollReveal variant="scale" className={cn("relative overflow-hidden", className)}>
      <div className="glass-panel-glow relative rounded-2xl p-8 sm:p-12 lg:p-14">
        <BorderBeam size={200} duration={14} />
        <div className="relative z-10 text-center">
          <TextReveal as="h2" text={title} gradient={false} className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl" />
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/55 sm:text-lg">{subtitle}</p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <GlowButton href={primaryHref} variant="primary" className="w-full sm:w-auto">
              {primaryLabel}
            </GlowButton>
            {secondaryLabel && secondaryHref && (
              <GlowButton href={secondaryHref} variant="secondary" className="w-full sm:w-auto">
                {secondaryLabel}
              </GlowButton>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
