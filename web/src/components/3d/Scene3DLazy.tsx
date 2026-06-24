"use client";

import dynamic from "next/dynamic";
import { useIsCoarsePointer } from "@/lib/animations/hooks";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

const InteractiveBackground = dynamic(
  () => import("./InteractiveBackground").then((m) => ({ default: m.InteractiveBackground })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh opacity-50" aria-hidden /> }
);

type Scene3DLazyProps = {
  className?: string;
  intensity?: "low" | "medium";
};

/** SSR-safe lazy 3D wrapper */
export function Scene3DLazy({ className, intensity = "low" }: Scene3DLazyProps) {
  const { reduceMotion } = useMotionSafe();
  const coarse = useIsCoarsePointer();

  if (reduceMotion || coarse) {
    return <div className={cn("absolute inset-0 bg-hero-mesh opacity-50", className)} aria-hidden />;
  }

  return <InteractiveBackground className={className} intensity={intensity} />;
}
