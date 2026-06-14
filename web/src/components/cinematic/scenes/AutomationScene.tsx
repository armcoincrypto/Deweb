"use client";

import { motion, useReducedMotion } from "framer-motion";

const systems = [
  { label: "CRM", icon: "📊", x: "12%", y: "28%" },
  { label: "Email", icon: "✉️", x: "72%", y: "25%" },
  { label: "Support", icon: "🎧", x: "18%", y: "68%" },
];

export function AutomationScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_50%,rgba(52,211,153,0.08),transparent)]" />

      <div
        style={{ left: "45%", top: "42%", position: "absolute", transform: "translate(-50%, -50%)" }}
        className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#34d399]/35 bg-[#34d399]/10 text-xl"
      >
        ⚙️
      </div>

      {systems.map((sys, i) => (
        <motion.div
          key={sys.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          style={{ left: sys.x, top: sys.y, position: "absolute" }}
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity }}
            className="content-panel flex items-center gap-2 rounded-lg px-3 py-2"
          >
            <span>{sys.icon}</span>
            <span className="text-xs font-bold text-white">{sys.label}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
