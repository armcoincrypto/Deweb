"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { trackHomeCta, type CtaEventType } from "@/lib/cta-tracking";

type GlowButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  trackCta?: {
    eventType: CtaEventType;
    placement: string;
    label: string;
  };
};

export function GlowButton({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  trackCta,
}: GlowButtonProps) {
  const reduceMotion = useReducedMotion();

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-200";

  const variants = {
    primary:
      "bg-deweb-cyan text-deweb-bg shadow-[0_4px_24px_rgba(0,242,255,0.35)] hover:shadow-[0_6px_32px_rgba(0,242,255,0.5)] hover:brightness-110",
    secondary:
      "border-2 border-deweb-cyan/50 bg-deweb-cyan/10 text-deweb-cyan hover:border-deweb-cyan hover:bg-deweb-cyan/20",
    ghost:
      "border border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10",
  };

  const classes = cn(base, variants[variant], className);

  const hoverProps = reduceMotion
    ? {}
    : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } };

  function handleTrack() {
    if (!trackCta || !href) return;
    trackHomeCta(trackCta.eventType, {
      placement: trackCta.placement,
      label: trackCta.label,
      href,
    });
  }

  const inner = (
    <motion.span className={classes} {...hoverProps}>
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" onClick={() => { handleTrack(); onClick?.(); }}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => { handleTrack(); onClick?.(); }} className="inline-block border-0 bg-transparent p-0">
      {inner}
    </button>
  );
}
