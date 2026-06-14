"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DataStream } from "./DataStream";

const nodes = [
  { id: "shopify", icon: "🛒", x: 22, y: 30, color: "#95BF47" },
  { id: "ai", icon: "🧠", x: 50, y: 45, color: "#00f2ff" },
  { id: "web", icon: "💻", x: 75, y: 35, color: "#38bdf8" },
];

const connections = [
  { from: nodes[0], to: nodes[1] },
  { from: nodes[1], to: nodes[2] },
];

export function EcosystemScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-hero-mesh opacity-70" />
      <div className="absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-deweb-cyan/8 blur-[100px]" />

      {!reduceMotion &&
        connections.map((c, i) => (
          <DataStream
            key={`${c.from.id}-${c.to.id}`}
            from={{ x: c.from.x, y: c.from.y }}
            to={{ x: c.to.x, y: c.to.y }}
            color={c.to.color}
            delay={i * 0.3}
          />
        ))}

      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm sm:h-14 sm:w-14"
            style={{ borderColor: `${node.color}44`, background: `${node.color}12` }}
          >
            <span className="text-lg sm:text-xl">{node.icon}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
