"use client";

import { ScrollReveal, StaggerContainer, SlideLeft, SlideRight } from "@/components/animations";
import { SpotlightCard } from "@/components/premium/SpotlightCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

export type ServiceShowcaseItem = {
  title: string;
  description: string;
  href: string;
  icon?: string;
  accent?: string;
  deliverables?: string[];
};

type ServiceShowcaseProps = {
  items: ServiceShowcaseItem[];
  className?: string;
  title?: string;
  subtitle?: string;
};

export function ServiceShowcase({ items, className, title, subtitle }: ServiceShowcaseProps) {
  return (
    <section className={cn(className)}>
      {(title || subtitle) && (
        <ScrollReveal className="mb-12 text-center">
          {title && <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>}
          {subtitle && <p className="mx-auto mt-4 max-w-2xl text-white/55">{subtitle}</p>}
        </ScrollReveal>
      )}
      <div className="space-y-10">
        {items.map((item, i) => {
          const reversed = i % 2 === 1;
          const TextWrap = reversed ? SlideRight : SlideLeft;
          const VisualWrap = reversed ? SlideLeft : SlideRight;

          return (
            <div
              key={item.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <TextWrap className={cn(reversed && "lg:order-2")}>
                <SpotlightCard className="hero-glass-panel p-6 sm:p-8">
                  {item.icon && <span className="text-3xl">{item.icon}</span>}
                  <h3 className="mt-3 text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                    {item.description}
                  </p>
                  {item.deliverables && (
                    <StaggerContainer className="mt-5 flex flex-wrap gap-2" stagger={0.04}>
                      {item.deliverables.map((d) => (
                        <span
                          key={d}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
                        >
                          {d}
                        </span>
                      ))}
                    </StaggerContainer>
                  )}
                  <GlowButton href={item.href} variant="primary" className="mt-6">
                    Learn more
                  </GlowButton>
                </SpotlightCard>
              </TextWrap>
              <VisualWrap className={cn("min-h-[200px]", reversed && "lg:order-1")}>
                <div
                  className="flex h-full min-h-[200px] items-center justify-center rounded-2xl border border-white/10 p-8"
                  style={{
                    background: `radial-gradient(ellipse at center, ${item.accent ?? "#00f2ff"}18, transparent 70%)`,
                  }}
                >
                  <span className="text-6xl opacity-80">{item.icon ?? "◆"}</span>
                </div>
              </VisualWrap>
            </div>
          );
        })}
      </div>
    </section>
  );
}
