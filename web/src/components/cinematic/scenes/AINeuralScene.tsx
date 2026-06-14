"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { x: 50, y: 40, color: "#00f2ff" },
  { x: 28, y: 58, color: "#34d399" },
  { x: 72, y: 55, color: "#7c3aed" },
];

export function AINeuralScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgba(0,242,255,0.08),transparent)]" />

      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {nodes.slice(1).map((node, i) => (
          <line
            key={i}
            x1={`${nodes[0].x}%`}
            y1={`${nodes[0].y}%`}
            x2={`${node.x}%`}
            y2={`${node.y}%`}
            stroke="#00f2ff"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
        ))}
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: 12,
            height: 12,
            transform: "translate(-50%, -50%)",
            background: node.color,
            boxShadow: `0 0 16px ${node.color}`,
          }}
          animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.div
        style={{ left: "20%", top: "25%", position: "absolute" }}
        className="content-panel max-w-[130px] rounded-xl px-3 py-2 text-xs text-white/80"
        animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        How can I help?
      </motion.div>
    </div>
  );
}
