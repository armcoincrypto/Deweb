"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  cardReveal3D,
  panelReveal3D,
  motion3DStyle,
  transition3D,
  PERSPECTIVE,
} from "@/lib/motion-3d";
import type { Variants } from "framer-motion";

type ScrollReveal3DProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  depth?: "card" | "panel";
  variants?: Variants;
};

export function ScrollReveal3D({
  children,
  className,
  delay = 0,
  depth = "card",
  variants,
}: ScrollReveal3DProps) {
  const reduceMotion = useReducedMotion();
  const preset = variants ?? (depth === "panel" ? panelReveal3D : cardReveal3D);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("perspective-3d", className)} style={{ perspective: PERSPECTIVE }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={preset}
        transition={{ ...transition3D, delay }}
        style={motion3DStyle}
        className="preserve-3d"
      >
        {children}
      </motion.div>
    </div>
  );
}
