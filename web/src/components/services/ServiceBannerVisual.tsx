"use client";

import Image from "next/image";
import type { ServiceBannerVisual as VisualType } from "@/lib/service-banners-data";

type Props = { type: VisualType; accent?: string };

export function ServiceBannerVisual({ type, accent }: Props) {
  return (
    <div className="relative h-full min-h-[200px] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#0a1420] via-[#061018] to-deweb-bg lg:min-h-[240px]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${accent || "rgba(0,242,255,0.2)"}, transparent 55%)`,
        }}
      />

      {type === "shopify" && <ShopifyDashboard />}
      {type === "ai" && <AIVisual />}
      {type === "software" && <SoftwareVisual />}
      {type === "marketplace" && <MarketplaceVisual />}
      {type === "mobile" && <MobileVisual />}
      {type === "uiux" && <UiuxVisual />}
      {type === "seo" && <SeoVisual />}
      {type === "enterprise" && <EnterpriseVisual />}
    </div>
  );
}

function WindowChrome() {
  return (
    <div className="flex gap-1.5 border-b border-white/[0.06] px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-red-400/80" />
      <span className="h-2 w-2 rounded-full bg-amber-400/80" />
      <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
    </div>
  );
}

function ShopifyDashboard() {
  return (
    <div className="relative p-3">
      <WindowChrome />
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <Image src="/shopify-logo.svg" alt="" width={28} height={32} className="opacity-90" />
          <span className="rounded bg-[#95BF47]/20 px-2 py-0.5 text-[10px] font-bold text-[#95BF47]">
            Shopify Plus
          </span>
        </div>
        <p className="text-xs font-bold text-white/80">Store Analytics</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[72, 58, 85].map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-gradient-to-t from-deweb-cyan/40 to-deweb-cyan/80"
                style={{ height: h }}
              />
              <span className="text-[8px] text-white/30">W{i + 1}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-16 rounded-lg border border-deweb-cyan/20 bg-deweb-cyan/5" />
      </div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="relative">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-deweb-cyan/40 bg-deweb-cyan/10 text-5xl shadow-glow">
          🧠
        </div>
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <div
              key={i}
              className="absolute flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs"
              style={{
                left: `calc(50% + ${Math.cos(a) * 70}px)`,
                top: `calc(50% + ${Math.sin(a) * 70}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {["→", "⚡", "💬", "📊"][i]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SoftwareVisual() {
  return (
    <div className="p-3">
      <WindowChrome />
      <div className="space-y-2 p-3">
        <div className="h-2 w-2/3 rounded bg-white/15" />
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 rounded border border-white/5 bg-white/[0.04]" />
          ))}
        </div>
        <div className="h-24 rounded-lg border border-deweb-cyan/15 bg-gradient-to-r from-deweb-cyan/10 to-transparent" />
      </div>
    </div>
  );
}

function MarketplaceVisual() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="relative h-32 w-40">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-x-0 rounded-lg border border-white/10 bg-white/[0.06] p-2 backdrop-blur-sm"
            style={{ top: i * 28, zIndex: 3 - i, opacity: 1 - i * 0.15 }}
          >
            <div className="h-2 w-1/2 rounded bg-deweb-cyan/30" />
            <div className="mt-2 h-8 rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="flex h-full items-end justify-center gap-2 p-4 pb-2">
      {[0.85, 1, 0.9].map((scale, i) => (
        <div
          key={i}
          className="w-14 rounded-2xl border-2 border-white/15 bg-[#0c1520] p-1 shadow-glow-sm"
          style={{ transform: `scale(${scale})`, marginBottom: i === 1 ? 0 : 8 }}
        >
          <div className="aspect-[9/16] rounded-xl bg-gradient-to-b from-deweb-cyan/20 to-transparent p-1">
            <div className="mt-2 text-center text-[8px] font-bold text-deweb-cyan">DEWEB</div>
            <div className="mt-2 space-y-1">
              <div className="h-1 rounded bg-white/20" />
              <div className="h-1 w-2/3 rounded bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UiuxVisual() {
  return (
    <div className="p-3">
      <WindowChrome />
      <div className="grid grid-cols-2 gap-2 p-3">
        <div className="rounded-lg bg-white/90 p-2">
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="mt-2 h-12 rounded bg-slate-100" />
        </div>
        <div className="rounded-lg border border-white/20 bg-white/10 p-2">
          <div className="h-2 w-2/3 rounded bg-white/30" />
          <div className="mt-2 flex gap-1">
            {["#00f2ff", "#333", "#95BF47"].map((c) => (
              <div key={c} className="h-4 w-4 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SeoVisual() {
  return (
    <div className="p-3">
      <WindowChrome />
      <div className="grid grid-cols-2 gap-2 p-3">
        <div className="space-y-1">
          {[90, 70, 85, 60].map((w, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="h-1 flex-1 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-emerald-400/70" style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-end justify-center gap-0.5">
          {[40, 65, 50, 80, 55].map((h, i) => (
            <div
              key={i}
              className="w-3 rounded-t bg-gradient-to-t from-deweb-cyan/30 to-deweb-cyan"
              style={{ height: h }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EnterpriseVisual() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-10 rounded-lg border border-deweb-cyan/25 bg-gradient-to-br from-deweb-cyan/15 to-transparent shadow-[0_0_15px_rgba(0,242,255,0.15)]"
            style={{ transform: `translateY(${i % 2 === 0 ? 0 : 8}px)` }}
          />
        ))}
      </div>
    </div>
  );
}
