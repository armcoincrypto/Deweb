"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export function ParticlesBackground() {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-hero-mesh" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 242, 255, 0.1) 0%, transparent 40%)",
        }}
      />
      {!reduceMotion &&
        particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-deweb-cyan/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            y: [0, -30, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
