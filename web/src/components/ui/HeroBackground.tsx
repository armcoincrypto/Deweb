"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-hero-mesh" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(0,242,255,0.06),transparent)]" />

      {!reduceMotion && (
        <>
          <motion.div
            className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-deweb-cyan/10 blur-[100px]"
            animate={{ x: [0, 40, 0], y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-deweb-purple/15 blur-[90px]"
            animate={{ x: [0, -30, 0], y: [0, 25, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-deweb-magenta/8 blur-[80px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
