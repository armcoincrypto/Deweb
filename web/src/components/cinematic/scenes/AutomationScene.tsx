"use client";

import { motion, useReducedMotion } from "framer-motion";

const systems = [
  { label: "CRM", icon: "📊", x: "10%", y: "22%" },
  { label: "Email", icon: "✉️", x: "74%", y: "20%" },
  { label: "Forms", icon: "📝", x: "14%", y: "68%" },
  { label: "Tasks", icon: "✅", x: "70%", y: "65%" },
];

export function AutomationScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(52,211,153,0.12),transparent)]" />

      <motion.div
        style={{ left: "46%", top: "42%", position: "absolute", transform: "translate(-50%, -50%)" }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#34d399]/40 bg-[#34d399]/12 text-2xl backdrop-blur-md"
        animate={reduceMotion ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        ⚙️
      </motion.div>

      {systems.map((sys, i) => (
        <motion.div
          key={sys.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.1 }}
          style={{ left: sys.x, top: sys.y, position: "absolute" }}
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity }}
            className="glass-panel-glow flex items-center gap-2 rounded-lg px-3 py-2"
          >
            <span>{sys.icon}</span>
            <span className="text-xs font-bold text-white">{sys.label}</span>
          </motion.div>
        </motion.div>
      ))}

      {!reduceMotion &&
        ["Lead saved", "Email sent", "Task created"].map((action, i) => (
          <motion.p
            key={action}
            className="absolute left-1/2 top-[82%] -translate-x-1/2 text-xs font-semibold text-[#34d399]"
            animate={{ opacity: [0, 1, 0], y: [8, 0, -8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 1.8 }}
          >
            ✓ {action}
          </motion.p>
        ))}
    </div>
  );
}
