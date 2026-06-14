"use client";

import { motion, useReducedMotion } from "framer-motion";

type DataStreamProps = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color?: string;
  delay?: number;
};

export function DataStream({ from, to, color = "#00f2ff", delay = 0 }: DataStreamProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`stream-${from.x}-${from.y}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke={`url(#stream-${from.x}-${from.y})`}
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0.2, 0.7, 0.2] }}
        transition={{
          pathLength: { duration: 2, delay },
          opacity: { duration: 3, repeat: Infinity, delay },
        }}
      />
      <motion.circle
        r="3"
        fill={color}
        initial={{ cx: `${from.x}%`, cy: `${from.y}%`, opacity: 0 }}
        animate={{
          cx: [`${from.x}%`, `${to.x}%`],
          cy: [`${from.y}%`, `${to.y}%`],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" }}
      />
    </svg>
  );
}
