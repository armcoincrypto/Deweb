"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { slideInRight, transitionPremium } from "@/lib/design-system/motion";
import { VIEWPORT_REVEAL } from "@/lib/animations/config";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

type SlideRightProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  onMount?: boolean;
  inherit?: boolean;
  as?: "div" | "section" | "article" | "span" | "p" | "h2" | "h3";
};

export function SlideRight({
  children,
  className,
  delay = 0,
  onMount = false,
  inherit = false,
  as = "div",
}: SlideRightProps) {
  const { reduceMotion } = useMotionSafe();
  const Comp = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (inherit) {
    return <Comp variants={slideInRight} className={cn(className)}>{children}</Comp>;
  }

  return (
    <Comp
      initial="hidden"
      {...(onMount ? { animate: "visible" } : { whileInView: "visible" })}
      viewport={onMount ? undefined : VIEWPORT_REVEAL}
      variants={slideInRight}
      transition={{ ...transitionPremium, delay }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
