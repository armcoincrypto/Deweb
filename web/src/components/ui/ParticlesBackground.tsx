"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export function ParticlesBackground() {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: (i * 23 + 7) % 100,
        y: (i * 31 + 11) % 100,
        size: (i % 3) + 1,
        duration: 12 + (i % 6),
        delay: i * 0.3,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-hero-mesh opacity-60 md:opacity-80" />
      {!reduceMotion &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute hidden rounded-full bg-deweb-cyan/20 md:block"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{ opacity: [0.15, 0.5, 0.15] }}
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
