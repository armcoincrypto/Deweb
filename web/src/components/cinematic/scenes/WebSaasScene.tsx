"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motion3DStyle } from "@/lib/motion-3d";

const windows = [
  { title: "code.tsx", content: "export App", x: "10%", y: "16%", rotateY: -10, z: 30 },
  { title: "Dashboard", content: "MRR +32%", x: "52%", y: "12%", rotateY: 8, z: 55 },
  { title: "Live App", content: "1,840 users", x: "38%", y: "55%", rotateY: -4, z: 70 },
];

export function WebSaasScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(124,58,237,0.14),transparent)]" />

      {windows.map((win, i) => (
        <motion.div
          key={win.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotateY: win.rotateY }}
          transition={{ delay: 0.1 + i * 0.12 }}
          style={{ ...motion3DStyle, left: win.x, top: win.y, position: "absolute", z: win.z }}
          className="preserve-3d w-36 sm:w-44"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4.5 + i, repeat: Infinity }}
            className="glass-panel-glow overflow-hidden rounded-xl"
          >
            <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
              <span className="text-[9px] text-white/50">{win.title}</span>
            </div>
            <p className="p-2 font-mono text-xs text-deweb-cyan">{win.content}</p>
            <motion.div
              className="mx-2 mb-2 h-1 overflow-hidden rounded-full bg-white/10"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            >
              <motion.div
                className="h-full bg-deweb-purple"
                animate={{ width: ["15%", "92%"] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      <motion.p
        className="absolute right-[10%] top-[72%] font-mono text-[10px] text-deweb-cyan/70 sm:text-xs"
        animate={reduceMotion ? undefined : { opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        code → build → launch
      </motion.p>
    </div>
  );
}
