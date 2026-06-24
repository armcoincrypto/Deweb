"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useParallaxSpeed } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

type ParallaxSectionProps = {
  children: ReactNode;
  className?: string;
  /** Background layer moves slower for depth */
  background?: ReactNode;
  speed?: number;
};

/** Scroll-linked depth — transform-only, no CLS */
export function ParallaxSection({
  children,
  className,
  background,
  speed,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const defaultSpeed = useParallaxSpeed();
  const parallaxSpeed = speed ?? defaultSpeed;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallaxSpeed * -60, parallaxSpeed * 60]);
  const bgY = useTransform(scrollYProgress, [0, 1], [parallaxSpeed * -100, parallaxSpeed * 100]);

  if (reduceMotion) {
    return (
      <section ref={ref} className={cn("relative", className)}>
        {background && <div className="pointer-events-none absolute inset-0 overflow-hidden">{background}</div>}
        <div className="relative z-10">{children}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className={cn("relative overflow-hidden", className)}>
      {background && (
        <motion.div className="pointer-events-none absolute inset-0" style={{ y: bgY }}>
          {background}
        </motion.div>
      )}
      <motion.div className="relative z-10" style={{ y }}>
        {children}
      </motion.div>
    </section>
  );
}
