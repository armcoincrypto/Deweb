"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motion3DStyle } from "@/lib/motion-3d";

const products = [
  { name: "Premium Hoodie", price: "$89", img: "👕", x: "12%", y: "20%" },
  { name: "Wireless Earbuds", price: "$149", img: "🎧", x: "68%", y: "15%" },
  { name: "Smart Watch", price: "$299", img: "⌚", x: "55%", y: "55%" },
];

export function ShopifyScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(149,191,71,0.12),transparent)]" />

      {!reduceMotion &&
        products.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, z: -80, rotateY: -15 }}
            animate={{ opacity: 1, z: 50 + i * 20, rotateY: [-15, 10, -15] }}
            transition={{
              opacity: { delay: 0.2 + i * 0.15 },
              z: { delay: 0.2 + i * 0.15 },
              rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ ...motion3DStyle, left: p.x, top: p.y, position: "absolute" }}
            className="preserve-3d w-36 sm:w-44"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
              className="glass-panel-glow rounded-2xl border border-[#95BF47]/25 p-4"
            >
              <div className="flex h-16 items-center justify-center rounded-xl bg-white/5 text-3xl">
                {p.img}
              </div>
              <p className="mt-3 text-xs font-bold text-white">{p.name}</p>
              <p className="text-sm font-bold text-[#95BF47]">{p.price}</p>
            </motion.div>
          </motion.div>
        ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ ...motion3DStyle, right: "8%", bottom: "18%", position: "absolute" }}
        className="preserve-3d w-48 sm:w-56"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="glass-panel-glow rounded-2xl border border-[#95BF47]/30 p-4"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#95BF47]">Checkout</p>
          <div className="mt-3 space-y-2">
            {["Cart", "Shipping", "Payment", "Complete"].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0.3, x: -10 }}
                animate={{ opacity: i <= 2 ? 1 : 0.5, x: 0 }}
                transition={{ delay: 1 + i * 0.8, repeat: Infinity, repeatDelay: 3 }}
                className="flex items-center gap-2 text-xs text-white/70"
              >
                <span
                  className={`h-2 w-2 rounded-full ${i <= 2 ? "bg-[#95BF47]" : "bg-white/20"}`}
                />
                {step}
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="h-full bg-[#95BF47]"
              animate={{ width: ["0%", "100%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
