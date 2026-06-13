"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "@/components/ui/HeroBackground";

type PageHeaderProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
};

export function PageHeader({ kicker, title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-white/[0.06]">
      <HeroBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="container-narrow relative z-10 px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-32"
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
  );
}
