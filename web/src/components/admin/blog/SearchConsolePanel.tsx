"use client";

import type { SearchConsoleData } from "@/lib/api";
import { GlassCard } from "@/components/ui/GlassCard";

type Props = {
  data?: SearchConsoleData & { slug?: string };
  compact?: boolean;
};

export function SearchConsolePanel({ data, compact }: Props) {
  const status = data?.status;
  const connected = status?.connected ?? false;

  return (
    <GlassCard className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Google Search Console</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            connected
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-white/10 text-white/50"
          }`}
        >
          {connected ? "Connected" : "Not connected"}
        </span>
      </div>
      {!connected && (
        <p className="mt-3 text-sm text-white/50">
          {status?.message ||
            "Set GOOGLE_APPLICATION_CREDENTIALS in backend .env to enable GSC sync."}
        </p>
      )}
      {connected && data && (
        <>
          <div className={`mt-4 grid gap-4 ${compact ? "grid-cols-2 sm:grid-cols-4" : "sm:grid-cols-4"}`}>
            <Metric label="Impressions" value={data.impressions} />
            <Metric label="Clicks" value={data.clicks} />
            <Metric label="CTR" value={`${(data.ctr * 100).toFixed(2)}%`} />
            <Metric label="Avg position" value={data.avgPosition || "—"} />
          </div>
          {!compact && (data.topQueries?.length ?? 0) > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white/70">Top queries</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {data.topQueries.map((q) => (
                  <li key={q.query} className="flex justify-between gap-4 text-white/65">
                    <span className="truncate">{q.query}</span>
                    <span className="shrink-0 text-white/45">
                      {q.clicks} clicks · pos {q.position}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      {connected && data && data.impressions === 0 && data.clicks === 0 && (
        <p className="mt-3 text-sm text-white/45">
          No GSC data imported yet. Sync or import into blog_search_console_daily.
        </p>
      )}
    </GlassCard>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
    </div>
  );
}
