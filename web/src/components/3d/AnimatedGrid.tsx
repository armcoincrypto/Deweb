"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export function AnimatedGrid() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = -Math.PI / 2.2;
      ref.current.position.y = -1.2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -1.2, 0]}>
      <planeGeometry args={[18, 18, 24, 24]} />
      <meshBasicMaterial color="#00f2ff" wireframe transparent opacity={0.08} />
    </mesh>
  );
}
