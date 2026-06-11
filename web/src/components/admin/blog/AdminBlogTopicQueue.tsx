"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { dewebApi, type BlogCategoryRecord, type BlogTopicQueueItem } from "@/lib/api";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminBlogShell } from "./AdminBlogShell";
import { ConfirmModal } from "./ConfirmModal";

const STATUS_CLASS: Record<string, string> = {
  queued: "bg-blue-500/20 text-blue-300",
  generating: "bg-amber-500/20 text-amber-300",
  done: "bg-emerald-500/20 text-emerald-300",
  failed: "bg-red-500/20 text-red-300",
};

const EMPTY_FORM = {
  topic: "",
  targetKeyword: "",
  categoryId: "",
  priority: 0,
  scheduledFor: "",
};

export function AdminBlogTopicQueue() {
  const [items, setItems] = useState<BlogTopicQueueItem[]>([]);
  const [categories, setCategories] = useState<BlogCategoryRecord[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BlogTopicQueueItem | null>(null);

  const load = useCallback(async () => {
    setError("");
    const [queue, cats] = await Promise.all([
      dewebApi.admin.blog.topicQueue.list(),
      dewebApi.admin.blog.categories(),
    ]);
    setItems(queue.items);
    setCategories(cats.categories);
    if (!form.categoryId && cats.categories[0]) {
      setForm((f) => ({ ...f, categoryId: cats.categories[0].id }));
    }
  }, [form.categoryId]);

  useEffect(() => {
    load().catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [load]);

  function resetForm() {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      categoryId: categories[0]?.id || "",
    });
  }

  function startEdit(item: BlogTopicQueueItem) {
    setEditingId(item.id);
    setForm({
      topic: item.topic,
      targetKeyword: item.targetKeyword,
      categoryId: item.categoryId,
      priority: item.priority,
      scheduledFor: item.scheduledFor.slice(0, 16),
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.topic.trim()) {
      setError("Topic is required.");
      return;
    }
    if (!form.categoryId) {
      setError("Select a category.");
      return;
    }

    setLoading(true);
    setError("");
    setMsg("");

    const body = {
      topic: form.topic.trim(),
      targetKeyword: form.targetKeyword.trim() || form.topic.trim(),
      categoryId: form.categoryId,
      priority: Number(form.priority) || 0,
      scheduledFor: form.scheduledFor
        ? new Date(form.scheduledFor).toISOString()
        : new Date().toISOString(),
    };

    try {
      if (editingId) {
        await dewebApi.admin.blog.topicQueue.update(editingId, body);
        setMsg("Topic updated.");
      } else {
        await dewebApi.admin.blog.topicQueue.create(body);
        setMsg("Topic added to queue.");
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleRetry(id: string) {
    setLoading(true);
    setError("");
    try {
      await dewebApi.admin.blog.topicQueue.retry(id);
      setMsg("Topic re-queued for generation.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Retry failed");
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setLoading(true);
    setError("");
    try {
      await dewebApi.admin.blog.topicQueue.delete(deleteTarget.id);
      setMsg("Topic deleted.");
      setDeleteTarget(null);
      if (editingId === deleteTarget.id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminBlogShell
      title="Topic queue"
      subtitle="Scheduled AI blog topics. Cron generates one draft at a time as pending_review."
    >
      {error && <p className="mb-4 text-red-400">{error}</p>}
      {msg && <p className="mb-4 text-deweb-cyan">{msg}</p>}

      <GlassCard className="p-6">
        <h2 className="text-lg font-bold text-white">
          {editingId ? "Edit topic" : "Add topic"}
        </h2>
        <form onSubmit={handleSave} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm text-white/50">Topic *</span>
            <input
              value={form.topic}
              onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm text-white/50">Target keyword</span>
            <input
              value={form.targetKeyword}
              onChange={(e) => setForm((f) => ({ ...f, targetKeyword: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white"
            />
          </label>
          <label className="block">
            <span className="text-sm text-white/50">Category *</span>
            <select
              value={form.categoryId}
              onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white"
              required
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-white/50">Priority (higher runs first)</span>
            <input
              type="number"
              value={form.priority}
              onChange={(e) => setForm((f) => ({ ...f, priority: Number(e.target.value) }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white"
            />
          </label>
          <label className="block">
            <span className="text-sm text-white/50">Scheduled for</span>
            <input
              type="datetime-local"
              value={form.scheduledFor}
              onChange={(e) => setForm((f) => ({ ...f, scheduledFor: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white"
            />
          </label>
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-deweb-cyan px-5 py-2.5 text-sm font-bold text-deweb-bg disabled:opacity-50"
            >
              {loading ? "Saving…" : editingId ? "Update topic" : "Add to queue"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/60"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>
      </GlassCard>

      <GlassCard className="mt-8 overflow-x-auto p-0">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-white/45">
            <tr>
              <th className="px-4 py-3">Topic</th>
              <th className="px-4 py-3">Keyword</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3">Intent</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Scheduled</th>
              <th className="px-4 py-3">Post</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center text-white/40">
                  No topics in queue. Add one above or run the cron after seeding topics.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/5 text-white/70">
                <td className="px-4 py-3 font-medium text-white">{item.topic}</td>
                <td className="px-4 py-3">{item.targetKeyword}</td>
                <td className="px-4 py-3 text-xs capitalize text-white/50">{item.buyerStage || "—"}</td>
                <td className="px-4 py-3 text-xs text-white/50">{item.searchIntent || "—"}</td>
                <td className="px-4 py-3">{item.categoryName}</td>
                <td className="px-4 py-3">{item.priority}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLASS[item.status] || ""}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-white/45">
                  {new Date(item.scheduledFor).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {item.generatedPostId ? (
                    <Link
                      href={`/admin/blog/preview/${item.generatedPostId}`}
                      className="text-deweb-cyan hover:underline"
                    >
                      {item.generatedPostTitle || "View draft"}
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {item.status !== "generating" && (
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="text-xs text-white/55 hover:text-white"
                      >
                        Edit
                      </button>
                    )}
                    {item.status === "failed" && (
                      <button
                        type="button"
                        onClick={() => handleRetry(item.id)}
                        className="text-xs text-deweb-cyan hover:underline"
                      >
                        Retry
                      </button>
                    )}
                    {item.status !== "generating" && (
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  {item.lastError && item.status === "failed" && (
                    <p className="mt-1 max-w-xs text-xs text-red-400/80">{item.lastError}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete topic?"
        message={`Remove "${deleteTarget?.topic}" from the queue?`}
        confirmLabel="Delete"
        variant="danger"
        loading={loading}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminBlogShell>
  );
}
