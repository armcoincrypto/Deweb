"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DataStream } from "./DataStream";
import { motion3DStyle } from "@/lib/motion-3d";

const nodes = [
  { id: "shopify", label: "Shopify", icon: "🛒", x: 18, y: 28, z: 80, color: "#95BF47" },
  { id: "ai", label: "AI Core", icon: "🧠", x: 50, y: 42, z: 120, color: "#00f2ff" },
  { id: "saas", label: "SaaS", icon: "☁️", x: 78, y: 30, z: 60, color: "#7c3aed" },
  { id: "auto", label: "Automation", icon: "⚙️", x: 32, y: 68, z: 40, color: "#34d399" },
  { id: "web", label: "Web", icon: "💻", x: 68, y: 72, z: 50, color: "#38bdf8" },
];

const connections = [
  { from: nodes[0], to: nodes[1] },
  { from: nodes[1], to: nodes[2] },
  { from: nodes[1], to: nodes[3] },
  { from: nodes[1], to: nodes[4] },
  { from: nodes[3], to: nodes[4] },
];

const stores = [
  { name: "Store A", revenue: "$12.4k", x: "8%", y: "18%", rotateY: -20 },
  { name: "Store B", revenue: "$8.2k", x: "72%", y: "14%", rotateY: 18 },
  { name: "Store C", revenue: "$21k", x: "58%", y: "78%", rotateY: -8 },
];

export function EcosystemScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-hero-mesh" />
      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { scale: [1, 1.03, 1], x: [0, 8, 0], y: [0, -6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-deweb-cyan/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-deweb-purple/12 blur-[100px]" />
      </motion.div>

      {connections.map((c, i) => (
        <DataStream
          key={`${c.from.id}-${c.to.id}`}
          from={{ x: c.from.x, y: c.from.y }}
          to={{ x: c.to.x, y: c.to.y }}
          color={c.to.color}
          delay={i * 0.4}
        />
      ))}

      {!reduceMotion &&
        stores.map((store, i) => (
          <motion.div
            key={store.name}
            initial={{ opacity: 0, z: -100 }}
            animate={{ opacity: 1, z: 60, rotateY: store.rotateY }}
            transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
            style={{ ...motion3DStyle, left: store.x, top: store.y, position: "absolute" }}
            className="preserve-3d hidden w-36 sm:block lg:w-44"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
              className="glass-panel-glow rounded-xl border border-[#95BF47]/30 p-3 backdrop-blur-xl"
              style={{ boxShadow: "0 20px 50px rgba(149,191,71,0.15)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🛒</span>
                <span className="text-xs font-bold text-white">{store.name}</span>
              </div>
              <p className="mt-1 text-[10px] text-[#95BF47]">{store.revenue} / mo</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[#95BF47]"
                  animate={{ width: ["40%", "90%", "60%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}

      {!reduceMotion &&
        nodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{
              ...motion3DStyle,
              left: `${node.x}%`,
              top: `${node.y}%`,
              position: "absolute",
              transform: `translate(-50%, -50%) translateZ(${node.z}px)`,
            }}
            className="preserve-3d"
          >
            <motion.div
              animate={{ y: [0, -8, 0], boxShadow: [`0 0 20px ${node.color}33`, `0 0 40px ${node.color}55`, `0 0 20px ${node.color}33`] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-md sm:h-16 sm:w-16"
              style={{ borderColor: `${node.color}44`, background: `${node.color}15` }}
            >
              <span className="text-xl sm:text-2xl">{node.icon}</span>
            </motion.div>
            <span
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider"
              style={{ color: node.color }}
            >
              {node.label}
            </span>
          </motion.div>
        ))}

      {!reduceMotion &&
        Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-deweb-cyan/60"
            style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%` }}
            animate={{ opacity: [0.1, 0.8, 0.1], y: [0, -30, 0] }}
            transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
    </div>
  );
}
