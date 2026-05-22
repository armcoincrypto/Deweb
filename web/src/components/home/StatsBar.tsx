"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

export function StatsBar() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.02] py-16">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-deweb-cyan sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm font-medium text-white/50">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
