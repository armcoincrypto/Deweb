"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingObjects } from "./FloatingObjects";
import { ParticleField } from "./ParticleField";
import { AnimatedGrid } from "./AnimatedGrid";
import { useMotionSafe, useIsCoarsePointer } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

type InteractiveBackgroundProps = {
  className?: string;
  intensity?: "low" | "medium";
};

/** Full-scene 3D background — CSS fallback on mobile */
export function InteractiveBackground({ className, intensity = "low" }: InteractiveBackgroundProps) {
  const { reduceMotion } = useMotionSafe();
  const coarse = useIsCoarsePointer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || reduceMotion || coarse) {
    return (
      <div
        className={cn("pointer-events-none absolute inset-0 bg-hero-mesh opacity-60", className)}
        aria-hidden
      />
    );
  }

  const particleCount = intensity === "low" ? 280 : 450;

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <Canvas camera={{ position: [0, 0.5, 6], fov: 50 }} dpr={[1, 1.2]} gl={{ alpha: true, antialias: false }}>
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 2, 3]} intensity={0.8} color="#00f2ff" />
        <Suspense fallback={null}>
          <AnimatedGrid />
          <ParticleField count={particleCount} />
          <FloatingObjects />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-deweb-bg/20 via-deweb-bg/50 to-deweb-bg" />
    </div>
  );
}
