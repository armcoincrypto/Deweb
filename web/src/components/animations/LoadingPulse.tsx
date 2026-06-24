"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

type LoadingPulseProps = {
  className?: string;
  lines?: number;
};

/** Subtle skeleton pulse — loading states without layout shift */
export function LoadingPulse({ className, lines = 3 }: LoadingPulseProps) {
  const { reduceMotion } = useMotionSafe();

  return (
    <div className={cn("space-y-3", className)} aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 overflow-hidden rounded-lg bg-white/[0.06]"
          style={{ width: `${88 - i * 12}%` }}
        >
          {!reduceMotion && (
            <motion.div
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.12,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
