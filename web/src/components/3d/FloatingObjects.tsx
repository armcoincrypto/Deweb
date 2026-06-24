"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Mesh } from "three";

const OBJECTS = [
  { position: [-2.2, 0.8, -1] as const, color: "#00f2ff", scale: 0.35 },
  { position: [2.4, -0.6, -0.5] as const, color: "#7c3aed", scale: 0.28 },
  { position: [0.5, 1.4, -1.5] as const, color: "#c026d3", scale: 0.22 },
] as const;

function FloatingBox({ position, color, scale }: (typeof OBJECTS)[number]) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * 0.2;
  });

  return (
    <Float speed={1.5} floatIntensity={0.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} transparent opacity={0.85} />
      </mesh>
    </Float>
  );
}

export function FloatingObjects() {
  return (
    <>
      {OBJECTS.map((obj) => (
        <FloatingBox key={obj.color} {...obj} />
      ))}
    </>
  );
}
