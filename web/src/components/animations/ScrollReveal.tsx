"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeIn, fadeUp, scaleIn, transitionPremium } from "@/lib/design-system/motion";
import { VIEWPORT_REVEAL } from "@/lib/animations/config";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

const VARIANTS = {
  fade: fadeIn,
  slideUp: fadeUp,
  scale: scaleIn,
} as const satisfies Record<string, Variants>;

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: keyof typeof VARIANTS;
  delay?: number;
  as?: "div" | "section" | "article";
};

export function ScrollReveal({
  children,
  className,
  id,
  variant = "slideUp",
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const { reduceMotion } = useMotionSafe();
  const Comp = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_REVEAL}
      variants={VARIANTS[variant]}
      transition={{ ...transitionPremium, delay }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
