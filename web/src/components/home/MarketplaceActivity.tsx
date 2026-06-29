"use client";

import { motion } from "framer-motion";
import { recentActivity, liveBids } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ActivityChart({ variant }: { variant: "bids" | "deals" }) {
  const isDeals = variant === "deals";
  const points = isDeals ? [20, 28, 35, 42, 55, 68, 82] : [90, 75, 62, 55, 48, 42, 38];
  const color = isDeals ? "#34d399" : "#00f2ff";
  const w = 280;
  const h = 100;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * (h - 12) - 6;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full">
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </svg>
  );
}

export function MarketplaceActivity() {
  return (
    <section id="services" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          kicker="Live activity"
          title="Real-time marketplace pulse"
          subtitle="Watch bids flow in, prices compete down, and deals close — transparency at every step."
        />
        <div className="grid gap-6 lg:grid-cols-12">
          <GlassCard className="lg:col-span-3 p-5" delay={0}>
            <h4 className="mb-4 text-sm font-bold text-white">Recent bids</h4>
            <ul className="space-y-4">
              {recentActivity.map((a) => (
                <li key={a.project + a.time} className="flex gap-3 border-b border-white/5 pb-4 last:border-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-deweb-cyan/30 to-purple-500/30 text-xs font-bold">
                    {a.user[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white/80">
                      <span className="font-semibold text-white">{a.user}</span> {a.action}{" "}
                      <span className="text-deweb-cyan">{a.project}</span>
                    </p>
                    <p className="text-xs text-white/40">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard glow className="lg:col-span-6 p-6" delay={0.1}>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-bold text-white">Illustrative price comparison</h4>
              <span className="text-xs text-white/45">Example view</span>
            </div>
            <p className="text-sm text-white/50 mb-4">Scoped proposals can be compared side by side after posting a brief.</p>
            <ActivityChart variant="bids" />
            <div className="mt-4 space-y-2">
              {liveBids.slice(0, 3).map((b, i) => (
                <div
                  key={`${b.project}-${i}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-white/70">{b.project}</span>
                  <span className="font-semibold text-deweb-cyan">{b.price}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="lg:col-span-3 p-5" delay={0.2}>
            <h4 className="mb-2 text-sm font-bold text-white">Completed deals</h4>
            <p className="text-2xl font-bold text-emerald-400">Active</p>
            <p className="text-xs text-white/45 mb-4">marketplace activity</p>
            <ActivityChart variant="deals" />
            <p className="mt-4 text-xs text-white/40">Illustrative bidding activity on DEWEB Marketplace</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
