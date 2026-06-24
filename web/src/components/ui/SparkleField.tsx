"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Density = "low" | "medium" | "high";

type SparkleFieldProps = {
  className?: string;
  density?: Density;
  /** Larger sparkles near focal area (homepage globe) */
  focal?: boolean;
};

const COUNTS: Record<Density, number> = {
  low: 32,
  medium: 58,
  high: 88,
};

export function SparkleField({ className, density = "medium", focal = false }: SparkleFieldProps) {
  const reduceMotion = useReducedMotion();

  const sparkles = useMemo(
    () =>
      Array.from({ length: COUNTS[density] }, (_, i) => {
        const angle = (i / COUNTS[density]) * Math.PI * 2 + (i % 7) * 0.4;
        const dist = focal ? 28 + (i % 5) * 9 : 8 + (i % 11) * 8;
        const cx = focal ? 50 : 8 + (i * 13) % 84;
        const cy = focal ? 38 + Math.sin(angle) * (dist * 0.35) : 8 + (i * 19) % 84;
        const isShine = i % 9 === 0 || i % 13 === 0;
        return {
          id: i,
          left: focal ? cx + Math.cos(angle) * dist * 0.55 : cx,
          top: focal ? cy + Math.sin(angle) * dist * 0.4 : cy,
          size: isShine ? 3.5 + (i % 3) : (i % 4 === 0 ? 2.5 : i % 3 === 0 ? 2 : 1.5) + (focal ? 0.5 : 0),
          depth: (i % 5) * 14 - 28,
          opacity: isShine ? 0.55 + (i % 4) * 0.1 : 0.28 + (i % 6) * 0.1,
          duration: 5 + (i % 8) * 1.2,
          delay: i * 0.18,
          shine: isShine,
        };
      }),
    [density, focal]
  );

  return (
    <div
      className={cn("sparkle-field pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          className={cn(
            "sparkle-dot",
            s.shine && "sparkle-dot--shine",
            !reduceMotion && "sparkle-dot--animate"
          )}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            ["--sparkle-z" as string]: `${s.depth}px`,
            ["--sparkle-dur" as string]: `${s.duration}s`,
            ["--sparkle-delay" as string]: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/** CSS wireframe globe for mobile / lite mode */
export function CssGlobe({ className, accent = "#00f2ff" }: { className?: string; accent?: string }) {
  return (
    <div
      className={cn("css-globe pointer-events-none absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2", className)}
      style={{ ["--globe-accent" as string]: accent }}
      aria-hidden
    >
      <div className="css-globe__ring css-globe__ring--1" />
      <div className="css-globe__ring css-globe__ring--2" />
      <div className="css-globe__ring css-globe__ring--3" />
      <div className="css-globe__core" />
      <SparkleField density="medium" focal className="opacity-90" />
    </div>
  );
}
