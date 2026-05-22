"use client";

import { motion } from "framer-motion";

type PageHeaderProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
};

export function PageHeader({ kicker, title, subtitle }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container-narrow border-b border-white/[0.06] px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32"
    >
      {kicker && (
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan">
          {kicker}
        </span>
      )}
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-white/55">{subtitle}</p>
      )}
    </motion.div>
  );
}
