"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motion3DStyle } from "@/lib/motion-3d";

const products = [
  { name: "Hoodie", price: "$89", img: "👕", x: "12%", y: "18%", z: 40 },
  { name: "Earbuds", price: "$149", img: "🎧", x: "62%", y: "14%", z: 60 },
  { name: "Watch", price: "$299", img: "⌚", x: "48%", y: "52%", z: 50 },
];

export function ShopifyScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_45%,rgba(149,191,71,0.14),transparent)]" />

      {products.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotateY: [-10, 8, -10] }}
          transition={{
            opacity: { delay: 0.1 + i * 0.1 },
            rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ ...motion3DStyle, left: p.x, top: p.y, position: "absolute" }}
          className="preserve-3d w-32 sm:w-36"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
            className="glass-panel-glow rounded-xl p-3"
          >
            <div className="flex h-14 items-center justify-center rounded-lg bg-white/5 text-2xl">
              {p.img}
            </div>
            <p className="mt-2 text-xs font-bold text-white">{p.name}</p>
            <p className="text-sm font-bold text-[#95BF47]">{p.price}</p>
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        style={{ right: "8%", bottom: "18%", position: "absolute" }}
        className="glass-panel-glow w-44 rounded-xl p-3 sm:w-48"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <p className="text-[10px] font-bold uppercase text-[#95BF47]">Checkout flow</p>
        {["Cart", "Pay", "Done"].map((step, i) => (
          <motion.p
            key={step}
            className="mt-1.5 text-xs text-white/70"
            animate={{ opacity: i <= 1 ? 1 : 0.4 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
          >
            {i <= 1 ? "✓" : "○"} {step}
          </motion.p>
        ))}
      </motion.div>

      <motion.div
        style={{ left: "10%", bottom: "22%", position: "absolute" }}
        className="glass-panel w-36 rounded-xl p-3"
        animate={reduceMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <p className="text-[10px] text-white/50">Sales today</p>
        <p className="text-lg font-bold text-[#95BF47]">$4,280</p>
      </motion.div>
    </div>
  );
}
