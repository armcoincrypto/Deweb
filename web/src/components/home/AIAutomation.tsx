"use client";

import { motion } from "framer-motion";
import { aiShowcase } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AIAutomation() {
  return (
    <section id="ai" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(124, 58, 237, 0.2), transparent)",
        }}
      />
      <div className="container-narrow relative">
        <SectionHeading
          kicker="AI automation"
          title="Intelligence built into every layer"
          subtitle="From supplier matching to workflow bots — DEWEB combines marketplace bidding with AI-native delivery."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {aiShowcase.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80`}
              />
              <div className="relative flex h-48 items-end p-6 sm:h-56">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,7,10,0.95)_100%)]" />
                <div className="relative">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-deweb-cyan/40 bg-deweb-cyan/10 text-2xl backdrop-blur-sm">
                    {i === 0 ? "🤖" : i === 1 ? "📊" : "⚡"}
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{item.description}</p>
                </div>
              </div>
              <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-deweb-cyan/10 blur-2xl transition-all group-hover:bg-deweb-cyan/25" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
