"use client";

import { Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import type { Group, Points } from "three";
import * as THREE from "three";
import { globeScrollState } from "@/lib/globe-scroll-state";
import { useWebGLSupported } from "@/hooks/useWebGLSupported";
import { VisualSectionErrorBoundary } from "@/components/ui/VisualSectionErrorBoundary";

const GLOBE_RADIUS = 1.35;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToColor(hex: string, target: THREE.Color) {
  target.set(hex || "#00f2ff");
  return target;
}

function OrbitSparkles({ lite = false }: { lite?: boolean }) {
  const ref = useRef<Points>(null);
  const count = lite ? 55 : 130;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = GLOBE_RADIUS + 0.55 + Math.random() * 1.15;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const accentRef = useRef(new THREE.Color("#00f2ff"));

  useFrame((state) => {
    if (!ref.current) return;
    hexToColor(globeScrollState.accent, accentRef.current);
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.color.lerp(accentRef.current, 0.04);
    mat.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={lite ? 0.028 : 0.034}
        color="#00f2ff"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function PerfectGlobe({ lite = false }: { lite?: boolean }) {
  const group = useRef<Group>(null);
  const accentColor = useRef(new THREE.Color("#00f2ff"));
  const segments = lite ? 48 : 72;

  useFrame((state) => {
    if (!group.current) return;
    const { progress, rotationY, activeIndex, slideProgress } = globeScrollState;
    const isService = activeIndex > 0;
    const t = state.clock.elapsedTime;

    hexToColor(globeScrollState.accent, accentColor.current);

    const targetX = isService ? 1.35 + slideProgress * 0.25 : 0;
    const targetY = isService ? -0.2 : 0;
    const targetZ = isService ? -0.35 : 0;

    group.current.position.x = lerp(group.current.position.x, targetX, 0.06);
    group.current.position.y = lerp(group.current.position.y, targetY, 0.06);
    group.current.position.z = lerp(group.current.position.z, targetZ, 0.06);

    const spin = isService ? 0.12 + slideProgress * 0.06 : 0.05;
    group.current.rotation.y = rotationY + t * spin;
    group.current.rotation.x = lerp(0.1 + progress * 0.28, 0.18 + activeIndex * 0.04, 0.02);
    group.current.rotation.z = isService ? Math.sin(t * 0.5 + activeIndex) * 0.06 : 0;

    const baseScale = 1.06 - progress * 0.38;
    const pulse = isService ? 1 + Math.sin(t * 1.8 + activeIndex) * 0.025 : 1;
    const s = Math.max(0.48, baseScale) * pulse;
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <OrbitSparkles lite={lite} />

      {/* Perfect primary wireframe */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, segments, segments]} />
        <meshBasicMaterial color="#00f2ff" wireframe transparent opacity={0.82} />
      </mesh>

      {/* Secondary latitude emphasis */}
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[GLOBE_RADIUS * 1.004, Math.floor(segments / 2), Math.floor(segments / 3)]} />
        <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.22} />
      </mesh>

      {/* Soft inner core */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.97, 32, 32]} />
        <meshStandardMaterial
          color="#041018"
          emissive="#00f2ff"
          emissiveIntensity={0.22}
          metalness={0.85}
          roughness={0.35}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Outer atmospheric ring */}
      <mesh rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[GLOBE_RADIUS * 1.12, 0.004, 8, 96]} />
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.35} />
      </mesh>

      <pointLight position={[0, 0, 2.5]} color="#00f2ff" intensity={0.9} distance={8} />
    </group>
  );
}

export type DigitalGlobeVariant = "full" | "lite";

type DigitalGlobeProps = {
  className?: string;
  variant?: DigitalGlobeVariant;
};

export function DigitalGlobe({
  className,
  variant = "full",
  fallback = null,
}: DigitalGlobeProps & { fallback?: ReactNode }) {
  const lite = variant === "lite";
  const webglSupported = useWebGLSupported();

  if (!webglSupported) {
    return <>{fallback}</>;
  }

  return (
    <VisualSectionErrorBoundary label="digital-globe" fallback={fallback}>
      <div className={className} aria-hidden>
        <Canvas
          camera={{ position: [0, 0.1, 4.6], fov: 42 }}
          dpr={lite ? [1, 1.15] : [1, 1.4]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.28} />
          <directionalLight position={[5, 3, 5]} intensity={0.85} color="#7dd3fc" />
          <directionalLight position={[-4, -2, 2]} intensity={0.3} color="#1e40af" />
          {!lite && <Stars radius={55} depth={30} count={500} factor={2.2} saturation={0} fade speed={0.25} />}
          <Suspense fallback={null}>
            <PerfectGlobe lite={lite} />
          </Suspense>
        </Canvas>
      </div>
    </VisualSectionErrorBoundary>
  );
}
