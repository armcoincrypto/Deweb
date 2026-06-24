"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { EASE_PREMIUM } from "@/lib/animations/config";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

function parseValue(raw: string | number) {
  if (typeof raw === "number") {
    return { prefix: "", value: raw, suffix: "", animatable: true };
  }
  const match = String(raw).match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
  if (!match) {
    return { prefix: "", value: 0, suffix: String(raw), animatable: false };
  }
  return {
    prefix: match[1],
    value: parseFloat(match[2]),
    suffix: match[3],
    animatable: true,
  };
}

type AnimatedCounterProps = {
  value: string | number;
  className?: string;
  duration?: number;
};

export function AnimatedCounter({ value, className, duration = 1.1 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { reduceMotion } = useMotionSafe();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(parsed.animatable ? 0 : parsed.value);

  useEffect(() => {
    if (!parsed.animatable) return;
    if (reduceMotion || !inView) {
      setDisplay(parsed.value);
      return;
    }

    const controls = animate(0, parsed.value, {
      duration,
      ease: EASE_PREMIUM,
      onUpdate: (v) => setDisplay(Math.round(v * 10) / 10),
    });

    return () => controls.stop();
  }, [inView, parsed.value, parsed.animatable, reduceMotion, duration]);

  if (!parsed.animatable) {
    return <span className={className}>{value}</span>;
  }

  const formatted =
    Number.isInteger(parsed.value) ? Math.round(display).toString() : display.toFixed(1);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  );
}
