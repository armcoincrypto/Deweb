"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardReveal3D, transitionFast } from "@/lib/motion-3d";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
  tilt?: boolean;
};

export function GlassCard({ children, className, glow, delay = 0, tilt = false }: GlassCardProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion || tilt) {
    return (
      <div className={cn(glow ? "glass-panel-glow" : "content-panel", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={cardReveal3D}
      transition={{ ...transitionFast, delay }}
      className={cn(
        glow ? "glass-panel-glow" : "content-panel",
        "transition-shadow duration-200 hover:shadow-glow-sm",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
