"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { heroReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";

type PageHeaderProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
};

export function PageHeader({ kicker, title, subtitle }: PageHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-b border-white/[0.06]">
      <HeroBackground />
      <div className="perspective-3d" style={{ perspective: PERSPECTIVE }}>
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          variants={heroReveal3D}
          transition={transition3D}
          style={motion3DStyle}
          className="preserve-3d container-narrow relative z-10 px-4 pb-14 pt-[var(--navbar-offset)] sm:px-6 lg:px-8 lg:pb-16 lg:pt-32"
        >
          {kicker && (
            <span className="inline-flex items-center gap-2 rounded-full border border-deweb-cyan/25 bg-deweb-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan">
              {kicker}
            </span>
          )}
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/55 sm:text-xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
