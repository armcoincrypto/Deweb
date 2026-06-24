"use client";

import { cn } from "@/lib/utils";

type BorderBeamProps = {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
};

/** Magic UI-style animated border beam */
export function BorderBeam({
  className,
  size = 180,
  duration = 12,
  colorFrom = "#00f2ff",
  colorTo = "#7c3aed",
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
      aria-hidden
    >
      <div
        className="absolute aspect-square animate-border-beam opacity-70"
        style={{
          width: size,
          background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          animationDuration: `${duration}s`,
        }}
      />
    </div>
  );
}
