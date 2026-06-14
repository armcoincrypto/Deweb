"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motion3DStyle } from "@/lib/motion-3d";

const windows = [
  { title: "Dashboard", content: "MRR +28%", x: "8%", y: "18%", rotateY: -12, z: 40 },
  { title: "Code Editor", content: "npm run build ✓", x: "55%", y: "12%", rotateY: 8, z: 70 },
  { title: "Live App", content: "Users: 1,240", x: "35%", y: "58%", rotateY: -5, z: 90 },
];

export function WebSaasScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(124,58,237,0.12),transparent)]" />

      {!reduceMotion &&
        windows.map((win, i) => (
          <motion.div
            key={win.title}
            initial={{ opacity: 0, z: -100, rotateX: 20 }}
            animate={{ opacity: 1, z: win.z, rotateX: 0, rotateY: win.rotateY }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.8 }}
            style={{ ...motion3DStyle, left: win.x, top: win.y, position: "absolute" }}
            className="preserve-3d w-40 sm:w-52"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity }}
              className="glass-panel-glow overflow-hidden rounded-xl border border-deweb-purple/25"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-400/80" />
                <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <span className="h-2 w-2 rounded-full bg-green-400/80" />
                <span className="ml-2 text-[10px] text-white/50">{win.title}</span>
              </div>
              <div className="p-3 font-mono text-xs text-deweb-cyan">{win.content}</div>
              <motion.div
                className="mx-3 mb-3 h-1 overflow-hidden rounded-full bg-white/10"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <motion.div
                  className="h-full bg-deweb-purple"
                  animate={{ width: ["20%", "95%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ left: "72%", top: "65%", position: "absolute" }}
        className="font-mono text-[10px] text-deweb-cyan/60 sm:text-xs"
      >
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          code → build → deploy → scale
        </motion.span>
      </motion.div>
    </div>
  );
}
