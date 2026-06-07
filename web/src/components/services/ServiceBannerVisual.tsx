"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ServiceBannerVisual as VisualType } from "@/lib/service-banners-data";

type Props = { type: VisualType; accent?: string; glow?: string };

export function ServiceBannerVisual({ type, accent, glow }: Props) {
  const glowColor = glow || accent || "rgba(0,242,255,0.25)";

  return (
    <div className="relative h-full min-h-[260px] w-full overflow-hidden lg:min-h-[300px]">
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${glowColor}, transparent 65%)`,
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-2 rounded-2xl border border-white/[0.1] bg-gradient-to-br from-[#0c1628]/90 via-[#081018]/95 to-[#05070a]/90 shadow-[inset_0_0_60px_rgba(0,242,255,0.06)] backdrop-blur-sm">
        {type === "shopify" && <ShopifyDashboard />}
        {type === "ai" && <AIVisual />}
        {type === "software" && <SoftwareVisual />}
        {type === "marketplace" && <MarketplaceVisual />}
        {type === "mobile" && <MobileVisual />}
        {type === "uiux" && <UiuxVisual />}
        {type === "seo" && <SeoVisual />}
        {type === "enterprise" && <EnterpriseVisual />}
      </div>
    </div>
  );
}

function WindowChrome({ title }: { title?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
      </div>
      {title && <span className="text-[10px] font-medium text-white/40">{title}</span>}
    </div>
  );
}

function ShopifyDashboard() {
  return (
    <div className="flex h-full flex-col">
      <WindowChrome title="Shopify Plus Analytics" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <Image src="/shopify-logo.svg" alt="Shopify" width={36} height={42} />
          <div>
            <p className="text-sm font-bold text-white">Revenue Overview</p>
            <p className="text-[10px] text-[#95BF47]">+24% this month</p>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between gap-2 px-1">
          {[45, 72, 58, 90, 68, 85, 75].map((h, i) => (
            <motion.div
              key={i}
              className="w-full max-w-[28px] rounded-t bg-gradient-to-t from-[#95BF47]/50 to-[#95BF47]"
              initial={{ height: 0 }}
              whileInView={{ height: h }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Orders", "CVR", "AOV"].map((label, i) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
              <p className="text-[9px] text-white/40">{label}</p>
              <p className="text-xs font-bold text-deweb-cyan">{["1.2k", "3.4%", "$89"][i]}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-1 items-center justify-center">
          <div className="relative h-16 w-16">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#95BF47"
                strokeWidth="4"
                strokeDasharray="65 100"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
              65%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-4">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <motion.div
          className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-deweb-cyan/50 bg-deweb-cyan/10 shadow-glow"
          animate={{ boxShadow: ["0 0 20px rgba(0,242,255,0.2)", "0 0 50px rgba(0,242,255,0.45)", "0 0 20px rgba(0,242,255,0.2)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-5xl">🧠</span>
        </motion.div>
      </div>
      <svg className="absolute inset-0 h-full w-full opacity-60" aria-hidden>
        <line x1="28%" y1="50%" x2="55%" y2="30%" stroke="rgba(0,242,255,0.4)" strokeWidth="1" />
        <line x1="28%" y1="50%" x2="55%" y2="50%" stroke="rgba(0,242,255,0.4)" strokeWidth="1" />
        <line x1="28%" y1="50%" x2="55%" y2="70%" stroke="rgba(0,242,255,0.4)" strokeWidth="1" />
        <line x1="55%" y1="30%" x2="78%" y2="25%" stroke="rgba(0,242,255,0.3)" strokeWidth="1" />
        <line x1="55%" y1="50%" x2="78%" y2="50%" stroke="rgba(0,242,255,0.3)" strokeWidth="1" />
        <line x1="55%" y1="70%" x2="78%" y2="75%" stroke="rgba(0,242,255,0.3)" strokeWidth="1" />
      </svg>
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3">
        {[
          { icon: "💬", label: "Chat" },
          { icon: "📊", label: "Leads" },
          { icon: "⚡", label: "Auto" },
        ].map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-2 rounded-lg border border-deweb-cyan/30 bg-white/5 px-3 py-2"
          >
            <span>{node.icon}</span>
            <span className="text-[10px] font-semibold text-white/70">{node.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SoftwareVisual() {
  return (
    <div className="flex h-full flex-col">
      <WindowChrome title="Admin Dashboard" />
      <div className="grid flex-1 grid-cols-4 gap-1.5 p-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded border border-white/5 bg-gradient-to-br from-white/[0.06] to-transparent p-1.5"
          >
            <div className="h-1.5 w-2/3 rounded bg-deweb-cyan/40" />
            <div className="mt-2 h-6 rounded bg-white/5" />
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-3">
        <div className="h-14 rounded-lg bg-gradient-to-r from-deweb-cyan/20 via-purple-500/10 to-transparent" />
        <div className="mt-2 flex gap-2">
          {[60, 80, 45].map((w, i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-deweb-cyan/60" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketplaceVisual() {
  return (
    <div className="flex h-full flex-col">
      <WindowChrome title="DEWEB Marketplace" />
      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { v: "248", l: "Bids" },
            { v: "$12k", l: "Volume" },
            { v: "98%", l: "Success" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg border border-deweb-cyan/20 bg-deweb-cyan/5 py-2">
              <p className="text-sm font-bold text-deweb-cyan">{s.v}</p>
              <p className="text-[9px] text-white/40">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-2">
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-2">
              <div className="h-8 w-8 rounded-full bg-deweb-cyan/20" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-3/4 rounded bg-white/20" />
                <div className="h-1 w-1/2 rounded bg-white/10" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400">Bid</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(0,242,255,0.12),transparent_50%)]" />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`absolute rounded-2xl border border-white/15 bg-[#0a1520] p-1 shadow-glow-sm ${
            i === 0 ? "left-[8%]" : i === 1 ? "left-1/2 -translate-x-1/2" : "right-[8%]"
          }`}
          style={{
            width: i === 1 ? 72 : 56,
            top: i === 1 ? "18%" : "28%",
            zIndex: i === 1 ? 3 : 1,
          }}
          animate={{ y: i === 1 ? [0, -8, 0] : [0, -4, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="rounded-xl bg-gradient-to-b from-deweb-cyan/25 to-transparent"
            style={{ aspectRatio: "9/16", width: "100%", minHeight: i === 1 ? 120 : 90 }}
          >
            {i === 1 && (
              <div className="p-2 text-center">
                <p className="text-[9px] font-bold text-deweb-cyan">DEWEB</p>
                <div className="mt-3 space-y-1.5 px-1">
                  <div className="h-1.5 rounded bg-white/25" />
                  <div className="h-8 rounded bg-white/10" />
                  <div className="h-1.5 rounded bg-white/15" />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
      <div className="absolute bottom-4 left-1/2 h-8 w-24 -translate-x-1/2 rounded-full bg-deweb-cyan/20 blur-xl" />
    </div>
  );
}

function UiuxVisual() {
  return (
    <div className="flex h-full items-center justify-center gap-2 p-4">
      <div className="w-[55%] rounded-lg border border-white/20 bg-white p-2 shadow-lg">
        <div className="mb-2 h-2 w-1/3 rounded bg-slate-300" />
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-10 rounded bg-slate-100" />
          ))}
        </div>
        <div className="mt-2 h-16 rounded bg-slate-50" />
      </div>
      <div className="flex w-[28%] flex-col gap-2">
        <div className="aspect-[3/4] rounded-lg border border-white/20 bg-white/95 p-1.5 shadow-md">
          <div className="h-full rounded bg-slate-100" />
        </div>
        <div className="flex justify-center gap-1">
          {["#00f2ff", "#1e293b", "#95BF47", "#c026d3"].map((c) => (
            <div key={c} className="h-4 w-4 rounded-full border border-white/20" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SeoVisual() {
  return (
    <div className="flex h-full flex-col">
      <WindowChrome title="Growth Analytics" />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-end gap-1 px-1" style={{ height: 70 }}>
          {[35, 55, 45, 70, 50, 80, 60, 75, 65, 90].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/40 to-emerald-400"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="grid grid-cols-5 gap-0.5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{
                background: `rgba(16,185,129,${0.15 + (i % 5) * 0.12})`,
              }}
            />
          ))}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2">
          <div className="rounded border border-white/10 p-2">
            <p className="text-[9px] text-white/40">Organic</p>
            <p className="text-sm font-bold text-emerald-400">+127%</p>
          </div>
          <div className="rounded border border-white/10 p-2">
            <p className="text-[9px] text-white/40">Keywords</p>
            <p className="text-sm font-bold text-deweb-cyan">Top 10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnterpriseVisual() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.1),transparent_60%)]" />
      <div className="relative" style={{ transform: "rotateX(55deg) rotateZ(-30deg)" }}>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex h-14 w-14 flex-col items-center justify-center rounded-lg border border-deweb-cyan/40 bg-gradient-to-b from-deweb-cyan/20 to-[#0a1520] shadow-[0_0_20px_rgba(0,242,255,0.2)]"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
            >
              <span className="text-lg">▮</span>
              <span className="text-[7px] text-deweb-cyan/70">SRV</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="absolute -top-8 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-deweb-cyan/50 bg-deweb-cyan/20 text-xl shadow-glow"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ☁️
        </motion.div>
      </div>
    </div>
  );
}
