"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { dewebApi, type BlogPostListItem, type BlogStats } from "@/lib/api";
import { formatStatus, statusClass } from "@/lib/blog/admin-utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminBlogShell } from "./AdminBlogShell";

const STAT_CARDS: { key: keyof BlogStats; label: string; href?: string }[] = [
  { key: "total", label: "Total articles" },
  { key: "pending_review", label: "Pending review", href: "/admin/blog/pending" },
  { key: "published", label: "Published" },
  { key: "rejected", label: "Rejected" },
  { key: "draft", label: "Drafts" },
];

export function AdminBlogDashboard() {
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const data = await dewebApi.admin.blog.list();
    setStats(data.stats);
    setPosts(data.posts.slice(0, 10));
  }, []);

  useEffect(() => {
    load().catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [load]);

  return (
    <AdminBlogShell
      title="Blog approval panel"
      subtitle="Review AI-generated articles before they go live on dewebam.com."
    >
      {error && <p className="mb-4 text-red-400">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STAT_CARDS.map(({ key, label, href }) => {
          const value = stats?.[key] ?? "—";
          const card = (
            <GlassCard className="p-5">
              <p className="text-sm text-white/45">{label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{value}</p>
            </GlassCard>
          );
          return href ? (
            <Link key={key} href={href} className="block transition hover:opacity-90">
              {card}
            </Link>
          ) : (
            <div key={key}>{card}</div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/admin/blog/pending"
          className="rounded-full bg-deweb-cyan px-5 py-2.5 text-sm font-bold text-deweb-bg"
        >
          Review pending →
        </Link>
        <Link
          href="/admin/blog/topic-queue"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/70 hover:border-deweb-cyan/40"
        >
          Topic queue
        </Link>
        <Link
          href="/admin/blog/ai-generator"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/70 hover:border-deweb-cyan/40"
        >
          AI generator
        </Link>
        <Link
          href="/admin/blog/new"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/70 hover:border-deweb-cyan/40"
        >
          New manual post
        </Link>
      </div>

      <GlassCard className="mt-10 overflow-x-auto p-0">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-white">Recent articles</h2>
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-white/45">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Updated</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-white/50">
                  No CMS articles yet. Generate one with AI or create manually.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-5 py-4 font-medium text-white">{post.title}</td>
                  <td className="px-5 py-4 text-white/60">{post.categoryName}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${statusClass(post.status)}`}
                    >
                      {formatStatus(post.status)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white/45">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/blog/preview/${post.id}`}
                        className="text-deweb-cyan hover:underline"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="text-white/70 hover:text-white"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </GlassCard>
    </AdminBlogShell>
  );
}
