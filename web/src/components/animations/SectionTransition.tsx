"use client";

import { type ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

type SectionTransitionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "fade" | "slideUp" | "scale";
  delay?: number;
};

/** Full-width section with scroll-triggered entrance */
export function SectionTransition({
  children,
  className,
  id,
  variant = "slideUp",
  delay = 0,
}: SectionTransitionProps) {
  return (
    <ScrollReveal as="section" id={id} variant={variant} delay={delay} className={cn(className)}>
      {children}
    </ScrollReveal>
  );
}
