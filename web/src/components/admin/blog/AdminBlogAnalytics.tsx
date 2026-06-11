"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { dewebApi, type BlogAnalyticsOverview } from "@/lib/api";
import { formatStatus, statusClass } from "@/lib/blog/admin-utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminBlogShell } from "./AdminBlogShell";
import { SearchConsolePanel } from "./SearchConsolePanel";

export function AdminBlogAnalytics() {
  const [data, setData] = useState<BlogAnalyticsOverview | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const res = await dewebApi.admin.blog.analytics.overview();
    setData(res);
  }, []);

  useEffect(() => {
    load().catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [load]);

  const summary = data?.summary;

  return (
    <AdminBlogShell
      title="Blog analytics"
      subtitle="Traffic, CTA clicks, and lead attribution for published articles."
    >
      {error && <p className="mb-4 text-red-400">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="p-5">
          <p className="text-sm text-white/45">Total blog views</p>
          <p className="mt-2 text-3xl font-bold text-white">{summary?.totalViews ?? "—"}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-white/45">Total blog leads</p>
          <p className="mt-2 text-3xl font-bold text-white">{summary?.totalLeads ?? "—"}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-white/45">Best converting article</p>
          <p className="mt-2 text-lg font-bold text-white">
            {summary?.bestConvertingArticle?.title ?? "—"}
          </p>
          {summary?.bestConvertingArticle && (
            <p className="mt-1 text-sm text-deweb-cyan">
              {summary.bestConvertingArticle.conversionRate}% · {summary.bestConvertingArticle.leads}{" "}
              leads
            </p>
          )}
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-white/45">Published this month</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {summary?.articlesPublishedThisMonth ?? "—"}
          </p>
        </GlassCard>
      </div>

      <div className="mt-10">
        <SearchConsolePanel data={data?.searchConsole} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h2 className="text-lg font-semibold text-white">Top referrers</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {(data?.topReferrers ?? []).length === 0 && (
              <li className="text-white/45">No referrer data yet.</li>
            )}
            {data?.topReferrers.map((r) => (
              <li key={r.referrer} className="flex justify-between gap-4 text-white/70">
                <span className="truncate">{r.referrer}</span>
                <span className="shrink-0 text-white">{r.views}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-lg font-semibold text-white">Top keywords / topics</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {(data?.topKeywords ?? []).length === 0 && (
              <li className="text-white/45">No keyword data yet.</li>
            )}
            {data?.topKeywords.map((k) => (
              <li key={k.slug} className="flex justify-between gap-4 text-white/70">
                <span className="truncate">
                  {k.keyword || k.title}
                  <span className="ml-2 text-white/35">({k.leads} leads)</span>
                </span>
                <span className="shrink-0 text-white">{k.views} views</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="mt-10 overflow-x-auto p-0">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-white">Performance by article</h2>
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-white/45">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Views</th>
              <th className="px-5 py-3 font-medium">CTA clicks</th>
              <th className="px-5 py-3 font-medium">Leads</th>
              <th className="px-5 py-3 font-medium">Conv. rate</th>
              <th className="px-5 py-3 font-medium">Published</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {(data?.posts ?? []).map((post) => (
              <tr key={post.id} className="text-white/75">
                <td className="max-w-xs px-5 py-4">
                  <p className="font-medium text-white">{post.title}</p>
                  {post.targetKeyword && (
                    <p className="mt-1 text-xs text-white/40">{post.targetKeyword}</p>
                  )}
                </td>
                <td className="px-5 py-4">{post.views}</td>
                <td className="px-5 py-4">{post.ctaClicks}</td>
                <td className="px-5 py-4">{post.leads}</td>
                <td className="px-5 py-4">{post.conversionRate}%</td>
                <td className="px-5 py-4 text-white/50">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-5 py-4">
                  <span className={statusClass(post.status)}>{formatStatus(post.status)}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {post.status === "published" && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-deweb-cyan hover:underline"
                      >
                        View post
                      </a>
                    )}
                    <Link
                      href={`/admin/blog/analytics/${post.id}`}
                      className="text-deweb-cyan hover:underline"
                    >
                      Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </AdminBlogShell>
  );
}
