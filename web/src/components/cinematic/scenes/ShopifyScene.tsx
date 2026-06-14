"use client";

import { motion, useReducedMotion } from "framer-motion";

const products = [
  { name: "Product A", price: "$89", img: "👕", x: "15%", y: "22%" },
  { name: "Product B", price: "$149", img: "🎧", x: "65%", y: "18%" },
];

export function ShopifyScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(149,191,71,0.1),transparent)]" />

      {products.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.1 }}
          style={{ left: p.x, top: p.y, position: "absolute" }}
          className="w-32 sm:w-36"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
            className="content-panel rounded-xl p-3"
          >
            <div className="flex h-12 items-center justify-center rounded-lg bg-white/5 text-2xl">
              {p.img}
            </div>
            <p className="mt-2 text-xs font-bold text-white">{p.name}</p>
            <p className="text-sm font-bold text-[#95BF47]">{p.price}</p>
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        style={{ right: "10%", bottom: "20%", position: "absolute" }}
        className="content-panel w-40 rounded-xl p-3 sm:w-44"
        animate={reduceMotion ? undefined : { opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <p className="text-[10px] font-bold uppercase text-[#95BF47]">Checkout</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-[#95BF47]"
            animate={{ width: ["30%", "90%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
