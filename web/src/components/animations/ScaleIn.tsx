"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { scaleIn, transitionPremium } from "@/lib/design-system/motion";
import { VIEWPORT_REVEAL } from "@/lib/animations/config";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

type ScaleInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  onMount?: boolean;
  as?: "div" | "section" | "article" | "span";
};

export function ScaleIn({
  children,
  className,
  delay = 0,
  onMount = false,
  as = "div",
}: ScaleInProps) {
  const { reduceMotion } = useMotionSafe();
  const Comp = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      initial="hidden"
      {...(onMount ? { animate: "visible" } : { whileInView: "visible" })}
      viewport={onMount ? undefined : VIEWPORT_REVEAL}
      variants={scaleIn}
      transition={{ ...transitionPremium, delay }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
