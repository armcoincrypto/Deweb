"use client";

import { motion } from "framer-motion";
import { liveBids } from "@/lib/data";

function MiniChart() {
  const points = [72, 68, 65, 58, 52, 48, 44, 40];
  const w = 200;
  const h = 60;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * (h - 8) - 4;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0, 242, 255, 0.4)" />
          <stop offset="100%" stopColor="rgba(0, 242, 255, 0)" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${path} L ${w} ${h} L 0 ${h} Z`}
        fill="url(#chartGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="#00f2ff"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

export function LiveDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-12 max-w-5xl"
    >
      <div className="absolute -inset-4 rounded-3xl bg-deweb-cyan/10 blur-3xl" />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass-panel-glow glow-border relative overflow-hidden rounded-2xl border border-white/10 p-1 sm:rounded-3xl"
      >
        <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <div className="border-b border-white/10 bg-black/30 p-5 lg:border-b-0 lg:border-r">
            <p className="text-[10px] font-bold uppercase tracking-widest text-deweb-cyan">
              Active project
            </p>
            <h3 className="mt-2 text-lg font-bold text-white">Custom AI CRM</h3>
            <p className="mt-1 text-sm text-white/50">Budget: $5k – $10k</p>
            <div className="mt-6">
              <p className="text-xs text-white/40">Live price comparison</p>
              <MiniChart />
              <p className="mt-2 flex items-center gap-2 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Bids dropping — save up to 18%
              </p>
            </div>
          </div>

          {/* Offers */}
          <div className="p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Competitive offers</h4>
              <span className="rounded-full bg-deweb-cyan/20 px-3 py-1 text-xs font-bold text-deweb-cyan">
                4 live bids
              </span>
            </div>
            <div className="space-y-3">
              {liveBids.map((bid, i) => (
                <motion.div
                  key={bid.supplier}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.01, borderColor: "rgba(0, 242, 255, 0.4)" }}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-white">{bid.supplier}</p>
                    <p className="text-xs text-white/45">{bid.project}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-deweb-cyan">{bid.price}</span>
                    <span className="text-xs text-amber-400">★ {bid.rating}</span>
                    {bid.trend === "down" && (
                      <span className="text-xs font-bold text-emerald-400">↓ Lower</span>
                    )}
                    {bid.trend === "new" && (
                      <span className="text-xs font-bold text-deweb-cyan">New</span>
                    )}
                    <button
                      type="button"
                      className="rounded-lg border border-deweb-cyan/40 px-3 py-1.5 text-xs font-bold text-deweb-cyan hover:bg-deweb-cyan/10"
                    >
                      Compare
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Timeline */}
            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/40">
                Project timeline
              </p>
              <div className="flex gap-2">
                {["Brief", "Bids", "Select", "Build", "Launch"].map((phase, i) => (
                  <div key={phase} className="flex-1 text-center">
                    <div
                      className={`mx-auto h-1.5 rounded-full ${
                        i <= 2 ? "bg-deweb-cyan" : "bg-white/10"
                      }`}
                    />
                    <p className="mt-2 text-[10px] text-white/50">{phase}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
