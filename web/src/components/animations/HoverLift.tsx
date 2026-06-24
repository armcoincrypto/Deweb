"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

type HoverLiftProps = {
  children: ReactNode;
  className?: string;
  lift?: number;
};

export function HoverLift({ children, className, lift = 4 }: HoverLiftProps) {
  const { reduceMotion } = useMotionSafe();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ y: -lift, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
      whileTap={{ scale: 0.98 }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
