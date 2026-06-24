"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { PointLight } from "three";
import { FloatingObjects } from "./FloatingObjects";
import { ParticleField } from "./ParticleField";
import { AnimatedGrid } from "./AnimatedGrid";

function AnimatedLights() {
  const cyan = useRef<PointLight>(null);
  const purple = useRef<PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (cyan.current) {
      cyan.current.position.x = Math.sin(t * 0.4) * 3;
      cyan.current.intensity = 0.9 + Math.sin(t * 0.8) * 0.25;
    }
    if (purple.current) {
      purple.current.position.x = Math.cos(t * 0.35) * 2.5;
      purple.current.intensity = 0.5 + Math.cos(t * 0.6) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.22} />
      <pointLight ref={cyan} position={[2, 2, 4]} color="#00f2ff" intensity={1} />
      <pointLight ref={purple} position={[-2, -1, 3]} color="#7c3aed" intensity={0.55} />
    </>
  );
}

type HomepageHeroSceneProps = {
  className?: string;
};

export function HomepageHeroScene({ className }: HomepageHeroSceneProps) {
  return (
    <div className={className} aria-hidden>
      <Canvas camera={{ position: [0, 0.4, 7], fov: 48 }} dpr={[1, 1.35]} gl={{ alpha: true, antialias: true }}>
        <AnimatedLights />
        <Suspense fallback={null}>
          <AnimatedGrid />
          <ParticleField count={520} />
          <FloatingObjects />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-deweb-bg/30 via-deweb-bg/55 to-deweb-bg" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,242,255,0.12),transparent)]" />
    </div>
  );
}
