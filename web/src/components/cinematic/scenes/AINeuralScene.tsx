"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { x: 50, y: 38, color: "#00f2ff", size: 14 },
  { x: 28, y: 55, color: "#34d399", size: 10 },
  { x: 72, y: 52, color: "#7c3aed", size: 10 },
  { x: 40, y: 72, color: "#38bdf8", size: 8 },
];

const messages = [
  { text: "How can I help?", x: "14%", y: "20%" },
  { text: "I need a quote", x: "58%", y: "28%" },
  { text: "Lead captured ✓", x: "22%", y: "68%" },
];

export function AINeuralScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(0,242,255,0.12),transparent)]" />

      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {nodes.slice(1).map((node, i) => (
          <motion.line
            key={i}
            x1={`${nodes[0].x}%`}
            y1={`${nodes[0].y}%`}
            x2={`${node.x}%`}
            y2={`${node.y}%`}
            stroke="#00f2ff"
            strokeWidth="1"
            animate={{ strokeOpacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
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
            width: node.size,
            height: node.size,
            transform: "translate(-50%, -50%)",
            background: node.color,
            boxShadow: `0 0 ${node.size * 2}px ${node.color}`,
          }}
          animate={reduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}

      {!reduceMotion &&
        messages.map((msg, i) => (
          <motion.div
            key={msg.text}
            style={{ left: msg.x, top: msg.y, position: "absolute" }}
            className="glass-panel max-w-[130px] rounded-xl rounded-bl-sm px-3 py-2 text-xs text-white/85"
            animate={{ opacity: [0.4, 1, 0.4], y: [4, 0, 4] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 1.2 }}
          >
            {msg.text}
          </motion.div>
        ))}
    </div>
  );
}
