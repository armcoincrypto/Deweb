"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { transitionPremium } from "@/lib/design-system/motion";
import { VIEWPORT_REVEAL } from "@/lib/animations/config";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  onMount?: boolean;
  as?: "div" | "section" | "ul" | "ol";
};

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.06,
  onMount = false,
  as = "div",
}: StaggerContainerProps) {
  const { reduceMotion } = useMotionSafe();
  const Comp = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <Comp
      initial="hidden"
      {...(onMount ? { animate: "visible" } : { whileInView: "visible" })}
      viewport={onMount ? undefined : VIEWPORT_REVEAL}
      variants={variants}
      transition={transitionPremium}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
