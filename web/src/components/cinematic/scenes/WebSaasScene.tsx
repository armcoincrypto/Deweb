"use client";

import { motion, useReducedMotion } from "framer-motion";

const windows = [
  { title: "Dashboard", content: "Sales +28%", x: "10%", y: "20%" },
  { title: "App", content: "1,240 users", x: "55%", y: "45%" },
];

export function WebSaasScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(124,58,237,0.1),transparent)]" />

      {windows.map((win, i) => (
        <motion.div
          key={win.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.1 }}
          style={{ left: win.x, top: win.y, position: "absolute" }}
          className="w-36 sm:w-40"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
            className="content-panel overflow-hidden rounded-lg"
          >
            <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
              <span className="text-[9px] text-white/50">{win.title}</span>
            </div>
            <p className="p-2 font-mono text-xs text-deweb-cyan">{win.content}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
