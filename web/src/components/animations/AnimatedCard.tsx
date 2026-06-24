"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { scaleIn, transitionFast } from "@/lib/design-system/motion";
import { VIEWPORT_REVEAL } from "@/lib/animations/config";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  inherit?: boolean;
};

/** Glass card with scroll reveal + subtle hover lift */
export function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true,
  inherit = false,
}: AnimatedCardProps) {
  const { reduceMotion } = useMotionSafe();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (inherit) {
    return (
      <motion.div
        variants={scaleIn}
        whileHover={
          hover
            ? {
                y: -3,
                scale: 1.01,
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
              }
            : undefined
        }
        className={cn("transition-shadow duration-200", className)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_REVEAL}
      variants={scaleIn}
      transition={{ ...transitionFast, delay }}
      whileHover={
        hover
          ? {
              y: -3,
              scale: 1.01,
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
            }
          : undefined
      }
      className={cn("transition-shadow duration-200", className)}
    >
      {children}
    </motion.div>
  );
}
