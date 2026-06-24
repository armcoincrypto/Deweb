"use client";

import { type ReactNode } from "react";
import { StaggerContainer } from "./StaggerContainer";
import { SlideUp } from "./SlideUp";
import { FadeIn } from "./FadeIn";
import { cn } from "@/lib/utils";

type AnimatedHeroProps = {
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  className?: string;
  align?: "center" | "left";
};

/** Premium hero block — staggered mount animation, SEO text in DOM */
export function AnimatedHero({
  kicker,
  title,
  subtitle,
  actions,
  visual,
  className,
  align = "center",
}: AnimatedHeroProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <StaggerContainer onMount className={cn("flex flex-col", alignClass, className)}>
      {kicker && (
        <FadeIn inherit as="span" className="inline-flex">
          {kicker}
        </FadeIn>
      )}
      <SlideUp inherit as="h1" className="max-w-4xl">
        {title}
      </SlideUp>
      {subtitle && (
        <SlideUp
          inherit
          as="p"
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          {subtitle}
        </SlideUp>
      )}
      {actions && (
        <SlideUp inherit className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          {actions}
        </SlideUp>
      )}
      {visual && (
        <FadeIn inherit className="mt-10 w-full">
          {visual}
        </FadeIn>
      )}
    </StaggerContainer>
  );
}
