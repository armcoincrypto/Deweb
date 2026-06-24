"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

function HeroOrb() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={ref} args={[1.4, 48, 48]}>
        <MeshDistortMaterial
          color="#00f2ff"
          emissive="#002830"
          roughness={0.2}
          metalness={0.8}
          distort={0.28}
          speed={1.2}
        />
      </Sphere>
    </Float>
  );
}

type HeroSceneProps = {
  className?: string;
};

/** Lazy hero WebGL — desktop/tablet only */
export function HeroScene({ className }: HeroSceneProps) {
  const { reduceMotion } = useMotionSafe();

  if (reduceMotion) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 1.25]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 4]} intensity={1} color="#00f2ff" />
        <Suspense fallback={null}>
          <HeroOrb />
        </Suspense>
      </Canvas>
    </div>
  );
}
