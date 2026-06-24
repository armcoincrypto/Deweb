"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsCoarsePointer, useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
};

/** Subtle magnetic pull — desktop only, respects reduced motion */
export function MagneticButton({
  children,
  className,
  strength = 0.32,
  as = "div",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotionSafe();
  const coarsePointer = useIsCoarsePointer();
  const disabled = reduceMotion || coarsePointer;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  if (disabled) {
    const Tag = as;
    return <Tag className={cn("inline-block", className)}>{children}</Tag>;
  }

  const Comp = motion[as];

  return (
    <Comp
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </Comp>
  );
}
