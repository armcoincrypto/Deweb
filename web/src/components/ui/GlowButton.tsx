"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type GlowButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
};

export function GlowButton({
  children,
  href,
  variant = "primary",
  className,
  onClick,
}: GlowButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-300";

  const variants = {
    primary:
      "bg-deweb-cyan text-deweb-bg shadow-glow hover:shadow-glow-lg hover:brightness-110",
    secondary:
      "border border-deweb-cyan/50 bg-deweb-cyan/10 text-deweb-cyan backdrop-blur-sm hover:border-deweb-cyan hover:bg-deweb-cyan/20",
    ghost:
      "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10",
  };

  const classes = cn(base, variants[variant], className);

  const inner = (
    <motion.span
      className={classes}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {variant === "primary" && (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent"
          aria-hidden="true"
        />
      )}
      <span className="relative">{children}</span>
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block border-0 bg-transparent p-0">
      {inner}
    </button>
  );
}
