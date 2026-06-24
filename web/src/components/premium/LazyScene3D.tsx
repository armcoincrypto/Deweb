"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";
import { cn } from "@/lib/utils";

function GlowOrb() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <Sphere ref={ref} args={[1.2, 64, 64]} scale={1.15}>
        <MeshDistortMaterial
          color="#00f2ff"
          emissive="#003840"
          roughness={0.15}
          metalness={0.85}
          distort={0.35}
          speed={1.5}
        />
      </Sphere>
    </Float>
  );
}

type LazyScene3DProps = {
  className?: string;
  /** Lower DPR on mobile for performance */
  mobileDpr?: number;
};

/** Lazy WebGL scene — client-only, never blocks SEO content */
export function LazyScene3D({ className, mobileDpr = 1 }: LazyScene3DProps) {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(window.innerWidth < 768 ? mobileDpr : 1.5);
  }, [mobileDpr]);

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#00f2ff" />
        <pointLight position={[-4, -2, 2]} intensity={0.5} color="#7c3aed" />
        <Suspense fallback={null}>
          <GlowOrb />
        </Suspense>
      </Canvas>
    </div>
  );
}
