"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type ServiceStoryCardProps = {
  active?: boolean;
  accent: string;
  children: React.ReactNode;
  className?: string;
};

export function ServiceStoryCard({ active = false, accent, children, className }: ServiceStoryCardProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={cn("hero-glass-panel service-story-card rounded-2xl p-6 sm:p-8 lg:p-10", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
          : { opacity: 0, y: 52, scale: 0.92, rotateX: 8 }
      }
      transition={{ duration: 0.75, ease: EASE }}
      className={cn(
        "hero-glass-panel service-story-card preserve-3d rounded-2xl p-6 sm:p-8 lg:p-10",
        active && "service-story-card--active",
        className
      )}
      style={{
        transformPerspective: 1200,
        ["--story-accent" as string]: accent,
      }}
    >
      {children}
    </motion.div>
  );
}
