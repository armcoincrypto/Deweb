"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motion3DStyle } from "@/lib/motion-3d";

const panels = [
  {
    label: "Shopify",
    icon: "🛒",
    metric: "Checkout UX",
    color: "#95BF47",
    x: "-12%",
    y: "8%",
    z: 40,
    rotateY: -18,
    rotateX: 8,
    delay: 0,
  },
  {
    label: "AI Automation",
    icon: "🤖",
    metric: "24/7 support",
    color: "#00f2ff",
    x: "78%",
    y: "12%",
    z: 60,
    rotateY: 22,
    rotateX: -6,
    delay: 0.15,
  },
  {
    label: "SaaS Platform",
    icon: "☁️",
    metric: "SaaS billing",
    color: "#7c3aed",
    x: "62%",
    y: "68%",
    z: 30,
    rotateY: -12,
    rotateX: 12,
    delay: 0.3,
  },
];

export function Floating3DPanels() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
      aria-hidden="true"
    >
      {panels.map((panel) => (
        <motion.div
          key={panel.label}
          initial={{ opacity: 0, z: -80, rotateX: 20, scale: 0.85 }}
          animate={{ opacity: 1, z: panel.z, rotateX: panel.rotateX, rotateY: panel.rotateY, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 + panel.delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            ...motion3DStyle,
            left: panel.x,
            top: panel.y,
            position: "absolute",
          }}
          className="preserve-3d w-44"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5 + panel.delay * 3, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel-glow rounded-xl border border-white/10 p-3 shadow-glow-sm backdrop-blur-xl"
            style={{
              boxShadow: `0 20px 40px ${panel.color}22, 0 0 30px ${panel.color}15`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{panel.icon}</span>
              <span className="text-xs font-bold text-white">{panel.label}</span>
            </div>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: panel.color }}>
              {panel.metric}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: panel.color }}
                initial={{ width: "30%" }}
                animate={{ width: ["30%", "85%", "55%", "85%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Subtle 3D wireframe cube */}
      <motion.div
        initial={{ opacity: 0, rotateX: 45, rotateY: 45 }}
        animate={{ opacity: 0.15, rotateX: 55, rotateY: 405 }}
        transition={{ rotateY: { duration: 24, repeat: Infinity, ease: "linear" }, opacity: { duration: 1 } }}
        style={{ ...motion3DStyle, left: "8%", top: "55%", position: "absolute" }}
        className="preserve-3d h-16 w-16 border border-deweb-cyan/30"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12, y: [0, -16, 0] }}
        transition={{ y: { duration: 8, repeat: Infinity }, opacity: { duration: 1 } }}
        style={{ ...motion3DStyle, right: "10%", top: "30%", position: "absolute" }}
        className="h-20 w-20 rounded-2xl border border-deweb-purple/40 bg-deweb-purple/5"
      />
    </div>
  );
}
