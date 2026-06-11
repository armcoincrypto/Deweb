"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { dewebApi, type BlogSocialPost, type BlogSocialStatus } from "@/lib/api";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminBlogShell } from "./AdminBlogShell";

const PLATFORMS = ["", "linkedin", "facebook", "x", "instagram"] as const;
const STATUSES = ["", "draft", "approved", "posted", "rejected"] as const;

export function AdminBlogSocial() {
  const [posts, setPosts] = useState<BlogSocialPost[]>([]);
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError("");
    const data = await dewebApi.admin.blog.social.list({
      platform: platform || undefined,
      status: status || undefined,
    });
    setPosts(data.posts);
  }, [platform, status]);

  useEffect(() => {
    load().catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [load]);

  async function copyContent(post: BlogSocialPost) {
    await navigator.clipboard.writeText(post.content);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function updateStatus(id: string, newStatus: BlogSocialStatus) {
    await dewebApi.admin.blog.social.update(id, { status: newStatus });
    await load();
  }

  async function saveEdit(id: string) {
    await dewebApi.admin.blog.social.update(id, { content: editContent });
    setEditingId(null);
    await load();
  }

  return (
    <AdminBlogShell
      title="Social distribution center"
      subtitle="Review and approve social drafts. Nothing is auto-posted."
    >
      {error && <p className="mb-4 text-red-400">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm text-white"
        >
          {PLATFORMS.map((p) => (
            <option key={p || "all"} value={p}>
              {p ? p.toUpperCase() : "All platforms"}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm text-white"
        >
          {STATUSES.map((s) => (
            <option key={s || "all"} value={s}>
              {s ? s.replace("_", " ") : "All statuses"}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 space-y-6">
        {posts.length === 0 && (
          <GlassCard className="p-8 text-center text-white/50">
            No social drafts yet. They are created when articles are published.
          </GlassCard>
        )}
        {posts.map((post) => (
          <GlassCard key={post.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-deweb-cyan">
                  {post.platform}
                </p>
                <h3 className="mt-1 font-semibold text-white">{post.postTitle}</h3>
                <p className="mt-1 text-sm text-white/45">
                  <a
                    href={`https://dewebam.com/en/blog/${post.postSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-deweb-cyan hover:underline"
                  >
                    /blog/{post.postSlug}
                  </a>
                  {" · "}
                  <span className="capitalize">{post.status}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copyContent(post)}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/70 hover:border-deweb-cyan/40"
                >
                  {copiedId === post.id ? "Copied!" : "Copy"}
                </button>
                {post.status === "draft" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(post.id, "approved")}
                    className="rounded-full bg-deweb-cyan px-4 py-1.5 text-xs font-bold text-deweb-bg"
                  >
                    Approve
                  </button>
                )}
                {post.status !== "rejected" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(post.id, "rejected")}
                    className="rounded-full border border-red-500/30 px-4 py-1.5 text-xs text-red-300"
                  >
                    Reject
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(post.id);
                    setEditContent(post.content);
                  }}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/60"
                >
                  Edit
                </button>
                {post.postSlug && (
                  <Link
                    href={`/admin/blog/preview/${post.blogPostId}`}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/60"
                  >
                    Article
                  </Link>
                )}
              </div>
            </div>
            {editingId === post.id ? (
              <div className="mt-4 space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={8}
                  className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => saveEdit(post.id)}
                    className="rounded-full bg-deweb-cyan px-4 py-2 text-xs font-bold text-deweb-bg"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="text-xs text-white/50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                {post.content}
              </pre>
            )}
          </GlassCard>
        ))}
      </div>
    </AdminBlogShell>
  );
}
