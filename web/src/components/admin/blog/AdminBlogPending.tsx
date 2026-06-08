"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { dewebApi, type BlogPostListItem } from "@/lib/api";
import { formatStatus, statusClass } from "@/lib/blog/admin-utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminBlogShell } from "./AdminBlogShell";
import { ConfirmModal } from "./ConfirmModal";

type PendingAction = "approve" | "publish" | "reject" | "delete" | null;

export function AdminBlogPending() {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<PendingAction>(null);
  const [target, setTarget] = useState<BlogPostListItem | null>(null);

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

  async function runAction() {
    if (!target || !action) return;
    setLoading(true);
    setError("");
    try {
      if (action === "approve") await dewebApi.admin.blog.approve(target.id);
      if (action === "publish") await dewebApi.admin.blog.publish(target.id);
      if (action === "reject") await dewebApi.admin.blog.reject(target.id);
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
    approve: {
      title: "Approve article?",
      message: "This marks the article as approved. It will not be public until you publish.",
      confirmLabel: "Approve",
    },
    publish: {
      title: "Publish article?",
      message: "This will make the article visible on /blog and include it in the sitemap.",
      confirmLabel: "Publish",
    },
    reject: {
      title: "Reject article?",
      message: "The article will be marked rejected and hidden from the public blog.",
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

  return (
    <AdminBlogShell
      title="Pending articles"
      subtitle="AI-generated and draft articles awaiting review, approval, or publishing."
    >
      {error && <p className="mb-4 text-red-400">{error}</p>}
      {msg && <p className="mb-4 text-deweb-cyan">{msg}</p>}

      <GlassCard className="overflow-x-auto p-0">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-white/45">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Keyword</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Words</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-white/50">
                  No pending articles.{" "}
                  <Link href="/admin/blog/ai-generator" className="text-deweb-cyan hover:underline">
                    Generate with AI
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
                  <td className="px-4 py-4 text-white/60">{post.categoryName}</td>
                  <td className="px-4 py-4 text-white/60">{post.targetKeyword || "—"}</td>
                  <td className="px-4 py-4 text-white/45">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${statusClass(post.status)}`}
                    >
                      {formatStatus(post.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-white/60">{post.wordCount ?? "—"}</td>
                  <td className="px-4 py-4">
                    <div className="flex min-w-[280px] flex-wrap gap-2">
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
                      {post.status !== "approved" && (
                        <button
                          type="button"
                          onClick={() => openAction("approve", post)}
                          className="rounded border border-blue-500/30 px-2 py-1 text-xs text-blue-300 hover:bg-blue-500/10"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => openAction("publish", post)}
                        className="rounded border border-green-500/30 px-2 py-1 text-xs text-green-400 hover:bg-green-500/10"
                      >
                        Publish
                      </button>
                      <button
                        type="button"
                        onClick={() => openAction("reject", post)}
                        className="rounded border border-amber-500/30 px-2 py-1 text-xs text-amber-300 hover:bg-amber-500/10"
                      >
                        Reject
                      </button>
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
