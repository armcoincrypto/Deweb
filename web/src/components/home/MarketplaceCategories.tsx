"use client";

import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MarketplaceCategories() {
  return (
    <section id="marketplace" className="section-padding bg-gradient-to-b from-transparent via-deweb-cyan/[0.02] to-transparent">
      <div className="container-narrow">
        <SectionHeading
          kicker="Marketplace"
          title="Every IT category. One competitive platform."
          subtitle="Browse verified suppliers across AI, web, mobile, design, and custom software."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="#hero"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 40px rgba(0, 242, 255, 0.15)",
              }}
              className="group glass-panel flex items-center gap-4 p-6 transition-all"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl transition-all group-hover:bg-deweb-cyan/20 group-hover:shadow-glow-sm">
                {cat.icon}
              </span>
              <div>
                <h3 className="font-bold text-white group-hover:text-deweb-cyan transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-white/45">{cat.count}</p>
              </div>
              <span className="ml-auto text-deweb-cyan opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
