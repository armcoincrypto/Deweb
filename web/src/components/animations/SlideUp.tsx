"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, transitionPremium } from "@/lib/design-system/motion";
import { VIEWPORT_REVEAL } from "@/lib/animations/config";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

type SlideUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  onMount?: boolean;
  inherit?: boolean;
  as?: "div" | "section" | "article" | "span" | "p" | "h1" | "h2" | "h3";
};

export function SlideUp({
  children,
  className,
  delay = 0,
  distance = 24,
  onMount = false,
  inherit = false,
  as = "div",
}: SlideUpProps) {
  const { reduceMotion } = useMotionSafe();
  const Comp = motion[as];

  const variants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  };

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (inherit) {
    return (
      <Comp variants={distance === 24 ? fadeUp : variants} className={cn(className)}>
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      initial="hidden"
      {...(onMount ? { animate: "visible" } : { whileInView: "visible" })}
      viewport={onMount ? undefined : VIEWPORT_REVEAL}
      variants={distance === 24 ? fadeUp : variants}
      transition={{ ...transitionPremium, delay }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
