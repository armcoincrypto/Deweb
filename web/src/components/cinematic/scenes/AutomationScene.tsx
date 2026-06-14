"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motion3DStyle } from "@/lib/motion-3d";

const systems = [
  { label: "CRM", icon: "📊", x: "10%", y: "25%" },
  { label: "Email", icon: "✉️", x: "75%", y: "20%" },
  { label: "Support", icon: "🎧", x: "15%", y: "70%" },
  { label: "Analytics", icon: "📈", x: "70%", y: "68%" },
];

export function AutomationScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_50%,rgba(52,211,153,0.1),transparent)]" />

      <motion.div
        style={{ ...motion3DStyle, left: "42%", top: "38%", position: "absolute" }}
        className="preserve-3d"
        animate={reduceMotion ? undefined : { rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#34d399]/40 bg-[#34d399]/10 text-2xl backdrop-blur-md sm:h-24 sm:w-24">
          ⚙️
        </div>
      </motion.div>

      {!reduceMotion &&
        systems.map((sys, i) => (
          <motion.div
            key={sys.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            style={{ ...motion3DStyle, left: sys.x, top: sys.y, position: "absolute" }}
            className="preserve-3d"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity }}
              className="glass-panel-glow flex items-center gap-2 rounded-xl px-3 py-2"
            >
              <span>{sys.icon}</span>
              <span className="text-xs font-bold text-white">{sys.label}</span>
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-1/2 h-px origin-left bg-gradient-to-r from-[#34d399] to-transparent"
              style={{ width: "120px", rotate: `${45 + i * 90}deg` }}
              animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.div>
        ))}

      {!reduceMotion &&
        ["Lead captured", "Email sent", "Task created", "Report updated"].map((action, i) => (
          <motion.p
            key={action}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: [0, 1, 1, 0], x: [-20, 0, 0, 20] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}
            className="absolute left-1/2 top-[85%] -translate-x-1/2 text-xs font-semibold text-[#34d399]"
          >
            ✓ {action}
          </motion.p>
        ))}
    </div>
  );
}
