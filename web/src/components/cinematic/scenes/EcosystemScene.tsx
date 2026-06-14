"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DataStream } from "./DataStream";
import { motion3DStyle } from "@/lib/motion-3d";

const nodes = [
  { id: "shopify", icon: "🛒", x: 18, y: 28, z: 50, color: "#95BF47" },
  { id: "ai", icon: "🧠", x: 50, y: 42, z: 70, color: "#00f2ff" },
  { id: "saas", icon: "☁️", x: 78, y: 30, z: 40, color: "#7c3aed" },
  { id: "auto", icon: "⚙️", x: 32, y: 68, z: 30, color: "#34d399" },
  { id: "web", icon: "💻", x: 68, y: 72, z: 35, color: "#38bdf8" },
];

const connections = [
  { from: nodes[0], to: nodes[1] },
  { from: nodes[1], to: nodes[2] },
  { from: nodes[1], to: nodes[3] },
  { from: nodes[3], to: nodes[4] },
];

const stores = [
  { name: "Store", revenue: "+28%", x: "8%", y: "16%", rotateY: -14 },
  { name: "Shop", revenue: "+41%", x: "72%", y: "14%", rotateY: 12 },
];

type EcosystemSceneProps = {
  variant?: "hero" | "full";
};

export function EcosystemScene({ variant = "full" }: EcosystemSceneProps) {
  const reduceMotion = useReducedMotion();
  const isHero = variant === "hero";

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      animate={reduceMotion ? undefined : { scale: [1, 1.02, 1], x: [0, 6, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-hero-mesh" />
      <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-deweb-cyan/10 blur-[110px]" />
      <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-deweb-purple/10 blur-[90px]" />

      {!reduceMotion &&
        connections.slice(0, isHero ? 2 : connections.length).map((c, i) => (
          <DataStream
            key={`${c.from.id}-${c.to.id}`}
            from={{ x: c.from.x, y: c.from.y }}
            to={{ x: c.to.x, y: c.to.y }}
            color={c.to.color}
            delay={i * 0.25}
          />
        ))}

      {!reduceMotion &&
        stores.map((store, i) => (
          <motion.div
            key={store.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85, rotateY: store.rotateY }}
            transition={{ delay: 0.3 + i * 0.15 }}
            style={{ ...motion3DStyle, left: store.x, top: store.y, position: "absolute" }}
            className="preserve-3d hidden w-32 sm:block lg:w-36"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
              className="glass-panel-glow rounded-xl border border-[#95BF47]/25 p-2.5 backdrop-blur-md"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🛒</span>
                <span className="text-[10px] font-bold text-white">{store.name}</span>
              </div>
              <p className="mt-1 text-[10px] font-bold text-[#95BF47]">{store.revenue}</p>
            </motion.div>
          </motion.div>
        ))}

      {nodes.slice(0, isHero ? 3 : 5).map((node, i) => (
        <motion.div
          key={node.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.08 }}
          style={{
            ...motion3DStyle,
            left: `${node.x}%`,
            top: `${node.y}%`,
            position: "absolute",
            transform: `translate(-50%, -50%) translateZ(${isHero ? 0 : node.z}px)`,
          }}
          className="preserve-3d"
        >
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -6, 0], boxShadow: [`0 0 16px ${node.color}33`, `0 0 28px ${node.color}44`, `0 0 16px ${node.color}33`] }
            }
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-md sm:h-12 sm:w-12"
            style={{ borderColor: `${node.color}44`, background: `${node.color}15` }}
          >
            <span className="text-base sm:text-lg">{node.icon}</span>
          </motion.div>
        </motion.div>
      ))}

      {!reduceMotion &&
        Array.from({ length: isHero ? 8 : 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-deweb-cyan/50"
            style={{ left: `${(i * 19) % 100}%`, top: `${(i * 27) % 100}%` }}
            animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -20, 0] }}
            transition={{ duration: 2.5 + (i % 4), repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
    </motion.div>
  );
}
