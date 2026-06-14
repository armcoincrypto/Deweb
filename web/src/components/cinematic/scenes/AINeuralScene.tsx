"use client";

import { motion, useReducedMotion } from "framer-motion";

const neuralNodes = [
  { x: 50, y: 35, size: 20, color: "#00f2ff" },
  { x: 25, y: 55, size: 14, color: "#34d399" },
  { x: 75, y: 50, size: 14, color: "#7c3aed" },
  { x: 35, y: 75, size: 12, color: "#38bdf8" },
  { x: 65, y: 72, size: 12, color: "#f472b6" },
  { x: 50, y: 60, size: 10, color: "#00f2ff" },
];

const messages = [
  { text: "How can I help?", x: "15%", y: "22%", delay: 0 },
  { text: "I'd like a quote", x: "60%", y: "30%", delay: 1.2 },
  { text: "Connecting you…", x: "25%", y: "68%", delay: 2.4 },
];

export function AINeuralScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgba(0,242,255,0.1),transparent)]" />

      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {neuralNodes.slice(1).map((node, i) => (
          <motion.line
            key={i}
            x1={`${neuralNodes[0].x}%`}
            y1={`${neuralNodes[0].y}%`}
            x2={`${node.x}%`}
            y2={`${node.y}%`}
            stroke="#00f2ff"
            strokeWidth="1"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, strokeOpacity: [0.2, 0.6, 0.2] }}
            transition={{
              pathLength: { duration: 1.5, delay: i * 0.2 },
              strokeOpacity: { duration: 2, repeat: Infinity, delay: i * 0.3 },
            }}
          />
        ))}
      </svg>

      {!reduceMotion &&
        neuralNodes.map((node, i) => (
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
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

      {!reduceMotion &&
        messages.map((msg) => (
          <motion.div
            key={msg.text}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.9], y: [10, 0, 0, -5] }}
            transition={{ duration: 4, repeat: Infinity, delay: msg.delay, repeatDelay: 2 }}
            style={{ left: msg.x, top: msg.y, position: "absolute" }}
            className="glass-panel max-w-[140px] rounded-2xl rounded-bl-sm px-3 py-2 text-xs text-white/80"
          >
            {msg.text}
          </motion.div>
        ))}
    </div>
  );
}
