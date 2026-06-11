"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { dewebApi, type BlogPostAnalyticsDetail } from "@/lib/api";
import { formatStatus, statusClass } from "@/lib/blog/admin-utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminBlogShell } from "./AdminBlogShell";
import { SearchConsolePanel } from "./SearchConsolePanel";

type Props = {
  postId: string;
};

export function AdminBlogPostAnalytics({ postId }: Props) {
  const [data, setData] = useState<BlogPostAnalyticsDetail | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const res = await dewebApi.admin.blog.analytics.post(postId);
    setData(res);
  }, [postId]);

  useEffect(() => {
    load().catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [load]);

  const post = data?.post;
  const maxViews = Math.max(...(data?.viewsOverTime.map((d) => d.views) ?? [1]), 1);

  return (
    <AdminBlogShell
      title={post?.title ?? "Article analytics"}
      subtitle="Views, engagement events, and attributed leads."
    >
      <Link
        href="/admin/blog/analytics"
        className="mb-6 inline-block text-sm text-deweb-cyan hover:underline"
      >
        ← Back to analytics
      </Link>

      {error && <p className="mb-4 text-red-400">{error}</p>}

      {post && (
        <div className="mb-8 flex flex-wrap gap-3 text-sm text-white/55">
          <span className={statusClass(post.status)}>{formatStatus(post.status)}</span>
          {post.publishedAt && (
            <span>Published {new Date(post.publishedAt).toLocaleDateString()}</span>
          )}
          {post.targetKeyword && <span>Keyword: {post.targetKeyword}</span>}
          {post.buyerStage && <span>Buyer stage: {post.buyerStage}</span>}
          {post.qualityScore != null && (
            <span>
              Quality: {post.qualityScore}/100
              {post.qualityPassed === false ? " (needs review)" : ""}
            </span>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="p-5">
          <p className="text-sm text-white/45">Total views</p>
          <p className="mt-2 text-3xl font-bold text-white">{data?.totalViews ?? "—"}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-white/45">CTA clicks</p>
          <p className="mt-2 text-3xl font-bold text-white">{data?.ctaClicks ?? "—"}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-white/45">Attributed leads</p>
          <p className="mt-2 text-3xl font-bold text-white">{data?.leads?.length ?? "—"}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-white/45">Conversion rate</p>
          <p className="mt-2 text-3xl font-bold text-white">{data?.conversionRate ?? 0}%</p>
        </GlassCard>
      </div>

      <div className="mt-10">
        <SearchConsolePanel data={data?.searchConsole} compact />
      </div>

      <GlassCard className="mt-10 p-5">
        <h2 className="text-lg font-semibold text-white">Views over time</h2>
        <div className="mt-6 space-y-2">
          {(data?.viewsOverTime ?? []).length === 0 && (
            <p className="text-sm text-white/45">No views recorded yet.</p>
          )}
          {data?.viewsOverTime.map((row) => (
            <div key={row.day} className="flex items-center gap-4 text-sm">
              <span className="w-28 shrink-0 text-white/50">{row.day}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-deweb-cyan"
                  style={{ width: `${Math.round((row.views / maxViews) * 100)}%` }}
                />
              </div>
              <span className="w-10 text-right text-white">{row.views}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h2 className="text-lg font-semibold text-white">Event counts</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {(data?.eventCounts ?? []).length === 0 && (
              <li className="text-white/45">No events yet.</li>
            )}
            {data?.eventCounts.map((e) => (
              <li key={e.event_type} className="flex justify-between text-white/70">
                <span>{e.event_type}</span>
                <span>{e.count}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-lg font-semibold text-white">Referrers</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {(data?.referrers ?? []).length === 0 && (
              <li className="text-white/45">No referrer data.</li>
            )}
            {data?.referrers.map((r) => (
              <li key={r.referrer} className="flex justify-between gap-4 text-white/70">
                <span className="truncate">{r.referrer}</span>
                <span>{r.views}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="mt-10 p-5">
        <h2 className="text-lg font-semibold text-white">UTM campaigns</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {(data?.utmCampaigns ?? []).length === 0 && (
            <li className="text-white/45">No UTM-attributed leads.</li>
          )}
          {data?.utmCampaigns.map((u, i) => (
            <li key={i} className="flex justify-between text-white/70">
              <span>
                {[u.source, u.medium, u.campaign].filter(Boolean).join(" / ") || "Direct"}
              </span>
              <span>{u.leads} leads</span>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="mt-10 overflow-x-auto p-0">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-white">Lead attribution</h2>
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-white/45">
            <tr>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Source</th>
              <th className="px-5 py-3 font-medium">Referrer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {(data?.leads ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-white/45">
                  No attributed leads yet.
                </td>
              </tr>
            )}
            {data?.leads.map((lead) => (
              <tr key={lead.id} className="text-white/75">
                <td className="px-5 py-4 text-white/50">
                  {new Date(lead.createdAt).toLocaleString()}
                </td>
                <td className="px-5 py-4">{lead.name || "—"}</td>
                <td className="px-5 py-4">{lead.email || "—"}</td>
                <td className="px-5 py-4">{lead.submissionType || "—"}</td>
                <td className="px-5 py-4">
                  {[lead.source, lead.medium, lead.campaign].filter(Boolean).join(" / ") || "—"}
                </td>
                <td className="max-w-xs truncate px-5 py-4">{lead.referrer || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </AdminBlogShell>
  );
}
