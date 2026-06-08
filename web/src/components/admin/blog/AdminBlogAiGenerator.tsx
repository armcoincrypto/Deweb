"use client";

import { useCallback, useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { dewebApi, type BlogAiGeneration, type BlogCategoryRecord } from "@/lib/api";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { AdminBlogShell } from "./AdminBlogShell";

const TONES = ["professional", "friendly", "technical", "conversational"];

export function AdminBlogAiGenerator() {
  const router = useRouter();
  const [categories, setCategories] = useState<BlogCategoryRecord[]>([]);
  const [history, setHistory] = useState<BlogAiGeneration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    categoryId: "",
    targetKeyword: "",
    topic: "",
    tone: "professional",
    wordCount: 1800,
  });

  const load = useCallback(async () => {
    const [cats, gens] = await Promise.all([
      dewebApi.admin.blog.categories(),
      dewebApi.admin.blog.aiGenerations(),
    ]);
    setCategories(cats.categories);
    setHistory(gens.generations);
    if (!form.categoryId && cats.categories[0]) {
      setForm((f) => ({ ...f, categoryId: cats.categories[0].id }));
    }
  }, [form.categoryId]);

  useEffect(() => {
    load().catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [load]);

  async function handleGenerate() {
    if (!form.topic.trim()) {
      setError("Article topic is required.");
      return;
    }
    if (!form.categoryId) {
      setError("Select a category.");
      return;
    }

    setLoading(true);
    setError("");
    setMsg("");

    try {
      const result = await dewebApi.admin.blog.aiGenerate({
        categoryId: form.categoryId,
        targetKeyword: form.targetKeyword.trim() || form.topic.trim(),
        topic: form.topic.trim(),
        tone: form.tone,
        wordCount: form.wordCount,
      });
      setMsg(result.message || "Saved as pending review.");
      router.push(`/admin/blog/pending`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminBlogShell
      title="AI blog generator"
      subtitle="Generates a draft article for admin review. Nothing is auto-published."
    >
      {error && <p className="mb-4 text-red-400">{error}</p>}
      {msg && <p className="mb-4 text-deweb-cyan">{msg}</p>}

      <div className="grid gap-8 lg:grid-cols-2">
        <GlassCard className="space-y-4 p-6">
          <label className="block">
            <span className="text-sm text-white/60">Category</span>
            <select
              value={form.categoryId}
              onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
              disabled={loading}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-white/60">Article topic</span>
            <input
              value={form.topic}
              onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
              placeholder="e.g. How to choose a Shopify development partner"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
              disabled={loading}
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/60">Target keyword</span>
            <input
              value={form.targetKeyword}
              onChange={(e) => setForm((f) => ({ ...f, targetKeyword: e.target.value }))}
              placeholder="Primary SEO keyword"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
              disabled={loading}
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/60">Tone</span>
            <select
              value={form.tone}
              onChange={(e) => setForm((f) => ({ ...f, tone: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
              disabled={loading}
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-white/60">
              Word count: {form.wordCount} (1500–2500)
            </span>
            <input
              type="range"
              min={1500}
              max={2500}
              step={100}
              value={form.wordCount}
              onChange={(e) => setForm((f) => ({ ...f, wordCount: Number(e.target.value) }))}
              className="mt-2 w-full"
              disabled={loading}
            />
          </label>

          {loading ? (
            <button
              type="button"
              disabled
              className="w-full rounded-full bg-deweb-cyan/50 px-7 py-3.5 text-sm font-bold text-deweb-bg opacity-70"
            >
              Generating draft…
            </button>
          ) : (
            <GlowButton onClick={handleGenerate}>Generate draft</GlowButton>
          )}

          <p className="text-xs text-white/40">
            Rate limit: 5 generations per hour. Requires OPENAI_API_KEY on the backend.
            Drafts must be reviewed before publishing.
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-white">Generation history</h2>
          {history.length === 0 ? (
            <p className="mt-4 text-sm text-white/50">No generations yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {history.map((g) => (
                <li
                  key={g.id}
                  className="rounded-lg border border-white/10 px-4 py-3 text-sm text-white/70"
                >
                  <p className="font-medium text-white">{g.topic}</p>
                  <p className="text-white/45">
                    {new Date(g.createdAt).toLocaleString()} · {g.wordCount} words · {g.tone}
                  </p>
                  {g.postId && (
                    <Link
                      href={`/admin/blog/edit/${g.postId}`}
                      className="mt-1 inline-block text-deweb-cyan hover:underline"
                    >
                      Edit draft →
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </div>
    </AdminBlogShell>
  );
}
