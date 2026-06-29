"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, Link } from "@/i18n/routing";
import {
  dewebApi,
  type BlogCategoryRecord,
  type BlogPostContent,
  type BlogPostDetail,
  type BlogPostInput,
} from "@/lib/api";
import type { BlogPostStatus } from "@/lib/blog/admin-utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { AdminBlogShell } from "./AdminBlogShell";

const DEFAULT_CTA: BlogPostContent["cta"] = {
  title: "Need Shopify, AI, SaaS or Marketplace development?",
  description: "Contact DEWEB to discuss your project with marketplace developers.",
  primaryLabel: "Get a Free Consultation",
  primaryHref: "/contact",
};

const EMPTY_CONTENT: BlogPostContent = {
  intro: [""],
  sections: [{ title: "", paragraphs: [""] }],
  faqs: [{ question: "", answer: "" }],
  internalLinks: [],
  cta: DEFAULT_CTA,
};

type AdminBlogEditorProps = {
  postId?: string;
};

export function AdminBlogEditor({ postId }: AdminBlogEditorProps) {
  const router = useRouter();
  const isEdit = Boolean(postId);
  const [categories, setCategories] = useState<BlogCategoryRecord[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [aiMeta, setAiMeta] = useState<BlogPostDetail["aiMeta"]>({});

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    seoTitle: "",
    metaDescription: "",
    featuredImage: "",
    categoryId: "",
    authorName: "DEWEB Editorial Team",
    status: "draft" as BlogPostStatus,
    tags: "",
    content: EMPTY_CONTENT,
  });

  const loadCategories = useCallback(async () => {
    const { categories: c } = await dewebApi.admin.blog.categories();
    setCategories(c);
    if (!form.categoryId && c[0]) {
      setForm((f) => ({ ...f, categoryId: c[0].id }));
    }
  }, [form.categoryId]);

  useEffect(() => {
    loadCategories().catch((e) => setError(e instanceof Error ? e.message : "Failed"));
  }, [loadCategories]);

  useEffect(() => {
    if (!postId) return;
    setLoading(true);
    dewebApi.admin.blog
      .get(postId)
      .then(({ post }) => {
        setAiMeta(post.aiMeta || {});
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          seoTitle: post.seoTitle,
          metaDescription: post.metaDescription,
          featuredImage: post.featuredImage,
          categoryId: post.categoryId,
          authorName: post.authorName,
          status: post.status as BlogPostStatus,
          tags: post.tags.join(", "),
          content: {
            intro: post.content.intro?.length ? post.content.intro : [""],
            sections: post.content.sections?.length
              ? post.content.sections
              : [{ title: "", paragraphs: [""] }],
            faqs: post.content.faqs?.length
              ? post.content.faqs
              : [{ question: "", answer: "" }],
            internalLinks: post.content.internalLinks || [],
            cta: post.content.cta || DEFAULT_CTA,
          },
        });
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [postId]);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function buildPayload(): BlogPostInput {
    const content: BlogPostContent = {
      intro: form.content.intro.map((p) => p.trim()).filter(Boolean),
      sections: form.content.sections
        .map((s) => ({
          title: s.title.trim(),
          paragraphs: s.paragraphs.map((p) => p.trim()).filter(Boolean),
        }))
        .filter((s) => s.title || s.paragraphs.length),
      faqs: form.content.faqs
        .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
        .filter((f) => f.question && f.answer),
      internalLinks: form.content.internalLinks,
      cta: form.content.cta,
    };

    return {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      seoTitle: form.seoTitle.trim() || form.title.trim(),
      metaDescription: form.metaDescription.trim() || form.excerpt.trim(),
      featuredImage: form.featuredImage.trim(),
      categoryId: form.categoryId,
      authorName: form.authorName.trim(),
      status: form.status,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      content,
      aiMeta,
    };
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setMsg("");
    try {
      const payload = buildPayload();

      if (isEdit && postId) {
        await dewebApi.admin.blog.update(postId, payload);
        setMsg("Saved. Use Pending queue to approve or publish.");
      } else {
        const { post } = await dewebApi.admin.blog.create(payload);
        setMsg("Created");
        router.push(`/admin/blog/edit/${post.id}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminBlogShell title={isEdit ? "Edit article" : "New article"}>
        <p className="text-white/50">Loading…</p>
      </AdminBlogShell>
    );
  }

  return (
    <AdminBlogShell
      title={isEdit ? "Edit article" : "New article"}
      subtitle="Review content before publishing. Drafts are not visible on the public blog."
    >
      {error && <p className="mb-4 text-red-400">{error}</p>}
      {msg && <p className="mb-4 text-deweb-cyan">{msg}</p>}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="space-y-4 p-6">
            <Field label="Title" value={form.title} onChange={(v) => updateField("title", v)} />
            <Field label="Slug" value={form.slug} onChange={(v) => updateField("slug", v)} hint="/blog/..." />
            <Field label="Excerpt" value={form.excerpt} onChange={(v) => updateField("excerpt", v)} multiline />
            <Field label="SEO title" value={form.seoTitle} onChange={(v) => updateField("seoTitle", v)} />
            <Field
              label="Meta description"
              value={form.metaDescription}
              onChange={(v) => updateField("metaDescription", v)}
              multiline
            />
            <Field
              label="Featured image URL"
              value={form.featuredImage}
              onChange={(v) => updateField("featuredImage", v)}
            />
            <Field label="Tags (comma-separated)" value={form.tags} onChange={(v) => updateField("tags", v)} />
          </GlassCard>

          <GlassCard className="space-y-4 p-6">
            <h2 className="text-lg font-semibold text-white">Intro</h2>
            {form.content.intro.map((p, i) => (
              <textarea
                key={i}
                value={p}
                onChange={(e) => {
                  const intro = [...form.content.intro];
                  intro[i] = e.target.value;
                  updateField("content", { ...form.content, intro });
                }}
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
              />
            ))}
            <button
              type="button"
              className="text-sm text-deweb-cyan"
              onClick={() =>
                updateField("content", { ...form.content, intro: [...form.content.intro, ""] })
              }
            >
              + Add paragraph
            </button>
          </GlassCard>

          <GlassCard className="space-y-4 p-6">
            <h2 className="text-lg font-semibold text-white">Sections</h2>
            {form.content.sections.map((section, si) => (
              <div key={si} className="rounded-lg border border-white/10 p-4">
                <input
                  value={section.title}
                  onChange={(e) => {
                    const sections = [...form.content.sections];
                    sections[si] = { ...section, title: e.target.value };
                    updateField("content", { ...form.content, sections });
                  }}
                  placeholder="Section title"
                  className="mb-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                />
                <textarea
                  value={section.paragraphs.join("\n\n")}
                  onChange={(e) => {
                    const sections = [...form.content.sections];
                    sections[si] = {
                      ...section,
                      paragraphs: e.target.value.split("\n\n"),
                    };
                    updateField("content", { ...form.content, sections });
                  }}
                  rows={6}
                  placeholder="Paragraphs (separate with blank line)"
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                />
              </div>
            ))}
            <button
              type="button"
              className="text-sm text-deweb-cyan"
              onClick={() =>
                updateField("content", {
                  ...form.content,
                  sections: [...form.content.sections, { title: "", paragraphs: [""] }],
                })
              }
            >
              + Add section
            </button>
          </GlassCard>

          <GlassCard className="space-y-4 p-6">
            <h2 className="text-lg font-semibold text-white">FAQ</h2>
            {form.content.faqs.map((faq, fi) => (
              <div key={fi} className="space-y-2 rounded-lg border border-white/10 p-4">
                <input
                  value={faq.question}
                  onChange={(e) => {
                    const faqs = [...form.content.faqs];
                    faqs[fi] = { ...faq, question: e.target.value };
                    updateField("content", { ...form.content, faqs });
                  }}
                  placeholder="Question"
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => {
                    const faqs = [...form.content.faqs];
                    faqs[fi] = { ...faq, answer: e.target.value };
                    updateField("content", { ...form.content, faqs });
                  }}
                  rows={3}
                  placeholder="Answer"
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                />
              </div>
            ))}
            <button
              type="button"
              className="text-sm text-deweb-cyan"
              onClick={() =>
                updateField("content", {
                  ...form.content,
                  faqs: [...form.content.faqs, { question: "", answer: "" }],
                })
              }
            >
              + Add FAQ
            </button>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="space-y-4 p-6">
            <label className="block text-sm text-white/60">Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <Field label="Author" value={form.authorName} onChange={(v) => updateField("authorName", v)} />

            <label className="block text-sm text-white/60">Status</label>
            <select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value as BlogPostStatus)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
            >
              <option value="draft">Draft</option>
              <option value="pending_review">Pending review</option>
              <option value="approved">Approved</option>
              <option value="published">Published</option>
              <option value="rejected">Rejected</option>
            </select>

            <div className="flex flex-col gap-2 pt-4">
              {saving ? (
                <button
                  type="button"
                  disabled
                  className="w-full rounded-full bg-deweb-cyan/50 px-7 py-3.5 text-sm font-bold text-deweb-bg opacity-70"
                >
                  Saving…
                </button>
              ) : (
                <GlowButton onClick={handleSave}>Save changes</GlowButton>
              )}
              {postId && (
                <>
                  <Link
                    href={`/admin/blog/preview/${postId}`}
                    className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white/70 hover:border-deweb-cyan/40"
                  >
                    Preview
                  </Link>
                  <Link
                    href="/admin/blog/pending"
                    className="rounded-xl border border-deweb-cyan/40 px-4 py-3 text-center text-sm font-semibold text-deweb-cyan hover:bg-deweb-cyan/10"
                  >
                    Approve / Publish →
                  </Link>
                </>
              )}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4 p-6">
            <h3 className="font-semibold text-white">Featured image prompt</h3>
            <Field
              label=""
              value={aiMeta.featuredImagePrompt || ""}
              onChange={(v) => setAiMeta((m) => ({ ...m, featuredImagePrompt: v }))}
              multiline
            />
          </GlassCard>

          <GlassCard className="space-y-4 p-6">
            <h3 className="font-semibold text-white">LinkedIn post</h3>
            <Field
              label=""
              value={aiMeta.linkedinDraft || ""}
              onChange={(v) => setAiMeta((m) => ({ ...m, linkedinDraft: v }))}
              multiline
            />
          </GlassCard>

          <GlassCard className="space-y-4 p-6">
            <h3 className="font-semibold text-white">Facebook post</h3>
            <Field
              label=""
              value={aiMeta.facebookDraft || ""}
              onChange={(v) => setAiMeta((m) => ({ ...m, facebookDraft: v }))}
              multiline
            />
          </GlassCard>

          <GlassCard className="space-y-4 p-6">
            <h3 className="font-semibold text-white">X / Twitter thread</h3>
            <Field
              label="One tweet per line"
              value={(aiMeta.twitterThread || []).join("\n")}
              onChange={(v) =>
                setAiMeta((m) => ({
                  ...m,
                  twitterThread: v.split("\n").map((t) => t.trim()).filter(Boolean),
                }))
              }
              multiline
            />
          </GlassCard>
        </div>
      </div>
    </AdminBlogShell>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
}) {
  const cls =
    "w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white placeholder:text-white/30";
  return (
    <label className="block">
      <span className="text-sm text-white/60">{label}</span>
      {hint && <span className="ml-2 text-xs text-white/30">{hint}</span>}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}
