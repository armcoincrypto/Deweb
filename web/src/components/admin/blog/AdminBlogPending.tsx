"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { dewebApi, type BlogPostListItem } from "@/lib/api";
import { formatStatus, statusClass } from "@/lib/blog/admin-utils";
import { resolveBlogImageUrl } from "@/lib/blog/image-url";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminBlogShell } from "./AdminBlogShell";
import { ConfirmModal } from "./ConfirmModal";
import { ApproveScheduleModal } from "./ApproveScheduleModal";

type PendingAction = "publish" | "reject" | "delete" | null;

export function AdminBlogPending() {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<PendingAction>(null);
  const [target, setTarget] = useState<BlogPostListItem | null>(null);
  const [approveTarget, setApproveTarget] = useState<BlogPostListItem | null>(null);

  const load = useCallback(async () => {
    setError("");
    const { posts: p } = await dewebApi.admin.blog.pending();
    setPosts(p);
  }, []);

  useEffect(() => {
    load().catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [load]);

  function openAction(type: PendingAction, post: BlogPostListItem) {
    setTarget(post);
    setAction(type);
  }

  async function handleApprove(opts: {
    publishMode: "scheduled" | "immediate";
    scheduledPublishAt?: string;
  }) {
    if (!approveTarget) return;
    setLoading(true);
    setError("");
    try {
      const result = await dewebApi.admin.blog.approve(approveTarget.id, opts);
      setMsg(result.message || `Approved "${approveTarget.title}"`);
      setApproveTarget(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Approve failed");
    } finally {
      setLoading(false);
    }
  }

  async function runAction() {
    if (!target || !action) return;
    setLoading(true);
    setError("");
    try {
      if (action === "publish") await dewebApi.admin.blog.publish(target.id);
      if (action === "reject") {
        const result = await dewebApi.admin.blog.reject(target.id);
        if (result.requeued) {
          setMsg(
            `"${target.title}" rejected. New topic queued for improved AI regeneration (priority ${result.requeued.priority}).`
          );
          setAction(null);
          setTarget(null);
          await load();
          return;
        }
      }
      if (action === "delete") await dewebApi.admin.blog.delete(target.id);
      setMsg(
        action === "publish"
          ? `"${target.title}" is now live at /blog/${target.slug}`
          : `Action completed for "${target.title}"`
      );
      setAction(null);
      setTarget(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setLoading(false);
    }
  }

  const modalCopy: Record<
    NonNullable<PendingAction>,
    { title: string; message: string; confirmLabel: string; variant?: "danger" | "primary" }
  > = {
    publish: {
      title: "Publish article now?",
      message: "This will make the article visible on /blog immediately, bypassing any schedule.",
      confirmLabel: "Publish now",
    },
    reject: {
      title: "Reject article?",
      message:
        "The article will be marked rejected. If it was AI-generated, a new topic will be queued with higher priority for an improved regeneration.",
      confirmLabel: "Reject",
      variant: "danger",
    },
    delete: {
      title: "Delete article?",
      message: "This permanently removes the article. This cannot be undone.",
      confirmLabel: "Delete",
      variant: "danger",
    },
  };

  const modal = action ? modalCopy[action] : null;

  function formatSchedule(iso: string | null | undefined) {
    if (!iso) return "—";
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Yerevan",
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(iso));
  }

  return (
    <AdminBlogShell
      title="Pending articles"
      subtitle="Review AI drafts, approve with scheduling, or publish manually. Default publish slot: 18:00 Asia/Yerevan."
    >
      {error && <p className="mb-4 text-red-400">{error}</p>}
      {msg && <p className="mb-4 text-deweb-cyan">{msg}</p>}

      <GlassCard className="overflow-x-auto p-0">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-white/45">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Keyword</th>
              <th className="px-4 py-3 font-medium">SEO</th>
              <th className="px-4 py-3 font-medium">Publish at</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-white/50">
                  No pending articles.{" "}
                  <Link href="/admin/blog/topic-queue" className="text-deweb-cyan hover:underline">
                    Topic queue
                  </Link>
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="max-w-[220px] px-4 py-4">
                    <p className="font-medium text-white">{post.title}</p>
                    <p className="mt-1 text-xs text-white/40">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-4">
                    {post.featuredImage ? (
                      <img
                        src={resolveBlogImageUrl(post.featuredImage)}
                        alt=""
                        className="h-12 w-20 rounded-lg border border-white/10 object-cover"
                      />
                    ) : (
                      <span className="text-xs text-white/35">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-white/60">{post.targetKeyword || "—"}</td>
                  <td className="px-4 py-4">
                    {post.qualityScore != null ? (
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                          post.qualityScore >= 75
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {post.qualityScore}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-4 text-xs text-white/50">
                    {post.status === "scheduled"
                      ? formatSchedule(post.scheduledPublishAt)
                      : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${statusClass(post.status)}`}
                    >
                      {formatStatus(post.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex min-w-[260px] flex-wrap gap-2">
                      <Link
                        href={`/admin/blog/preview/${post.id}`}
                        className="rounded border border-white/10 px-2 py-1 text-xs text-deweb-cyan hover:border-deweb-cyan/40"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="rounded border border-white/10 px-2 py-1 text-xs text-white/70 hover:border-white/30"
                      >
                        Edit
                      </Link>
                      {post.status === "pending_review" && (
                        <button
                          type="button"
                          onClick={() => setApproveTarget(post)}
                          className="rounded border border-blue-500/30 px-2 py-1 text-xs text-blue-300 hover:bg-blue-500/10"
                        >
                          Approve
                        </button>
                      )}
                      {post.status !== "published" && (
                        <button
                          type="button"
                          onClick={() => openAction("publish", post)}
                          className="rounded border border-green-500/30 px-2 py-1 text-xs text-green-400 hover:bg-green-500/10"
                        >
                          Publish now
                        </button>
                      )}
                      {post.status !== "published" && post.status !== "rejected" && (
                        <button
                          type="button"
                          onClick={() => openAction("reject", post)}
                          className="rounded border border-amber-500/30 px-2 py-1 text-xs text-amber-300 hover:bg-amber-500/10"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => openAction("delete", post)}
                        className="rounded border border-red-500/30 px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </GlassCard>

      <ApproveScheduleModal
        open={!!approveTarget}
        post={approveTarget}
        loading={loading}
        onConfirm={handleApprove}
        onCancel={() => !loading && setApproveTarget(null)}
      />

      <ConfirmModal
        open={!!action && !!target}
        title={modal?.title || ""}
        message={modal?.message || ""}
        confirmLabel={modal?.confirmLabel}
        variant={modal?.variant}
        loading={loading}
        onConfirm={runAction}
        onCancel={() => {
          if (!loading) {
            setAction(null);
            setTarget(null);
          }
        }}
      />
    </AdminBlogShell>
  );
}
