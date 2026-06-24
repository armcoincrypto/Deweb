"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { dewebApi, type BlogPostDetail, type BlogPostTranslation } from "@/lib/api";
import { cn } from "@/lib/utils";
import { formatStatus, postToArticle, statusClass } from "@/lib/blog/admin-utils";
import { BlogImage } from "@/components/blog/BlogImage";
import { usesDefaultBlogCover } from "@/lib/blog/images";
import { BlogArticleView } from "@/components/blog/BlogArticleView";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminBlogShell } from "./AdminBlogShell";

type AdminBlogPreviewProps = {
  postId: string;
};

type PreviewTab = "preview" | "translations";

export function AdminBlogPreview({ postId }: AdminBlogPreviewProps) {
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [translations, setTranslations] = useState<BlogPostTranslation[]>([]);
  const [tab, setTab] = useState<PreviewTab>("preview");
  const [error, setError] = useState("");
  const [translationMsg, setTranslationMsg] = useState("");
  const [generating, setGenerating] = useState(false);

  const loadTranslations = useCallback(
    () => dewebApi.admin.blog.translations.list(postId).then((r) => setTranslations(r.translations)),
    [postId]
  );

  useEffect(() => {
    dewebApi.admin.blog
      .get(postId)
      .then(({ post: p }) => setPost(p))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
    loadTranslations().catch(() => setTranslations([]));
  }, [postId, loadTranslations]);

  async function handleGenerateTranslations() {
    setGenerating(true);
    setTranslationMsg("");
    try {
      const res = await dewebApi.admin.blog.translations.generate(postId);
      setTranslationMsg(
        `Generated ${res.created.length} translation(s). Skipped: ${res.skipped.join(", ") || "none"}.`
      );
      await loadTranslations();
    } catch (e) {
      setTranslationMsg(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  async function updateTranslationStatus(id: string, status: BlogPostTranslation["status"]) {
    await dewebApi.admin.blog.translations.updateStatus(id, status);
    await loadTranslations();
  }

  if (error) {
    return (
      <AdminBlogShell title="Preview">
        <p className="text-red-400">{error}</p>
      </AdminBlogShell>
    );
  }

  if (!post) {
    return (
      <AdminBlogShell title="Preview">
        <p className="text-white/50">Loading preview…</p>
      </AdminBlogShell>
    );
  }

  const article = postToArticle(post);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.category, path: `/blog/category/${article.categorySlug}` },
    { name: article.title, path: `/blog/${article.slug}` },
  ];

  return (
    <AdminBlogShell
      title="Article preview"
      subtitle="This is how the article will appear on the public blog after publishing."
    >
      <GlassCard className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusClass(post.status)}`}
          >
            {formatStatus(post.status)}
          </span>
          <span className="text-sm text-white/45">Public URL: /blog/{post.slug}</span>
          {post.approvedAt && (
            <span className="text-xs text-white/40">
              Approved:{" "}
              {new Intl.DateTimeFormat("en-GB", {
                timeZone: "Asia/Yerevan",
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(post.approvedAt))}
            </span>
          )}
          {post.scheduledPublishAt && post.status === "scheduled" && (
            <span className="text-xs text-violet-300">
              Publishes:{" "}
              {new Intl.DateTimeFormat("en-GB", {
                timeZone: "Asia/Yerevan",
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(post.scheduledPublishAt))}
            </span>
          )}
          {post.publishedAt && (
            <span className="text-xs text-green-400/80">
              Live since: {new Date(post.publishedAt).toLocaleString()}
            </span>
          )}
          {post.aiMeta?.imageQualityScore != null && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                post.aiMeta.imageQualityScore >= 70
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-amber-500/20 text-amber-300"
              }`}
            >
              Image score: {post.aiMeta.imageQualityScore}
            </span>
          )}
          {post.aiMeta?.regenerationCount != null && post.aiMeta.regenerationCount > 0 && (
            <span className="text-xs text-violet-300">
              Regeneration #{post.aiMeta.regenerationCount}
            </span>
          )}
          {post.aiMeta?.rejectedFromPostId && (
            <Link
              href={`/admin/blog/preview/${post.aiMeta.rejectedFromPostId}`}
              className="text-xs text-amber-300 hover:underline"
            >
              Replaces rejected: {post.aiMeta.rejectedFromPostTitle || post.aiMeta.rejectedFromPostId.slice(0, 8)}
            </Link>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/blog/edit/${post.id}`}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 hover:border-deweb-cyan/40"
          >
            Edit
          </Link>
          <Link
            href="/admin/blog/pending"
            className="rounded-lg border border-deweb-cyan/40 px-4 py-2 text-sm font-semibold text-deweb-cyan hover:bg-deweb-cyan/10"
          >
            Back to pending
          </Link>
        </div>
      </GlassCard>

      {post.status !== "published" && (
        <p className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Preview only — this article is not public yet. Publish from the pending queue when ready.
        </p>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {(["preview", "translations"] as PreviewTab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium capitalize",
              tab === t
                ? "border-deweb-cyan/50 bg-deweb-cyan/15 text-deweb-cyan"
                : "border-white/10 text-white/60 hover:border-white/20"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "translations" && (
        <GlassCard className="mb-6 p-5">
          <h3 className="text-lg font-semibold text-white">Translations (RU · AM · ES)</h3>
          <p className="mt-1 text-sm text-white/45">
            Generate translations after the English article is published. Translations are saved as
            pending review — never auto-published.
          </p>
          {post.status !== "published" && (
            <p className="mt-3 text-sm text-amber-200">
              Publish the English article first to generate translations.
            </p>
          )}
          {post.status === "published" && (
            <button
              type="button"
              disabled={generating}
              onClick={handleGenerateTranslations}
              className="mt-4 rounded-full bg-deweb-cyan px-5 py-2.5 text-sm font-bold text-deweb-bg disabled:opacity-60"
            >
              {generating ? "Generating…" : "Generate translations"}
            </button>
          )}
          {translationMsg && <p className="mt-3 text-sm text-white/60">{translationMsg}</p>}
          <div className="mt-6 space-y-4">
            {translations.length === 0 && (
              <p className="text-sm text-white/45">No translations yet.</p>
            )}
            {translations.map((tr) => (
              <div
                key={tr.id}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white uppercase">{tr.locale}</p>
                    <p className="text-sm text-white/60">{tr.title}</p>
                    <p className="text-xs text-white/40">/blog/{tr.slug} · {tr.status}</p>
                  </div>
                  <div className="flex gap-2">
                    {tr.status === "pending_review" && (
                      <button
                        type="button"
                        onClick={() => updateTranslationStatus(tr.id, "approved")}
                        className="rounded-full bg-deweb-cyan px-3 py-1 text-xs font-bold text-deweb-bg"
                      >
                        Approve
                      </button>
                    )}
                    {tr.status === "approved" && (
                      <button
                        type="button"
                        onClick={() => updateTranslationStatus(tr.id, "published")}
                        className="rounded-full border border-green-500/40 px-3 py-1 text-xs text-green-300"
                      >
                        Publish manually
                      </button>
                    )}
                    {tr.status !== "rejected" && (
                      <button
                        type="button"
                        onClick={() => updateTranslationStatus(tr.id, "rejected")}
                        className="rounded-full border border-red-500/30 px-3 py-1 text-xs text-red-300"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-white/55">{tr.excerpt}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {tab === "preview" && (
        <>
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">SEO quality</h3>
          {post.aiMeta?.qualityScore ? (
            <div className="mt-3 space-y-2 text-sm text-white/65">
              <p>
                Score:{" "}
                <span className="font-bold text-deweb-cyan">
                  {post.aiMeta.qualityScore.score}/100
                </span>{" "}
                {post.aiMeta.qualityScore.passed ? "✓ passed" : "needs review"}
              </p>
              {post.aiMeta.targetKeyword && (
                <p>Keyword: {post.aiMeta.targetKeyword}</p>
              )}
              {post.aiMeta.buyerStage && (
                <p className="capitalize">Buyer stage: {post.aiMeta.buyerStage}</p>
              )}
              {post.aiMeta.qualityScore.issues?.length > 0 && (
                <ul className="list-disc pl-4 text-xs text-amber-200/80">
                  {post.aiMeta.qualityScore.issues.map((i) => (
                    <li key={i.slice(0, 40)}>{i}</li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className="mt-3 text-sm text-white/45">No quality score (manual post).</p>
          )}
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Featured image</h3>
          <div className="relative mt-3 aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
            <BlogImage
              src={post.featuredImage || post.aiMeta?.featuredImageUrl}
              alt=""
              categorySlug={post.categorySlug}
              fill
              showFallbackLabel
              sizes="400px"
            />
          </div>
          {usesDefaultBlogCover({
            src: post.featuredImage || post.aiMeta?.featuredImageUrl,
            categorySlug: post.categorySlug,
          }) && (
            <p className="mt-2 text-xs text-white/45">Default image used</p>
          )}
        </GlassCard>
      </div>

      {(post.content?.internalLinks?.length > 0 ||
        (post.aiMeta as { internalLinks?: { href: string; label: string }[] })?.internalLinks
          ?.length) && (
        <GlassCard className="mb-6 p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">
            Internal links (SEO)
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {(
              post.content?.internalLinks ||
              (post.aiMeta as { internalLinks?: { href: string; label: string }[] }).internalLinks ||
              []
            ).map((link) => (
              <li key={link.href}>
                <span className="text-deweb-cyan">{link.label}</span>
                <span className="text-white/40"> → {link.href}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      )}

      {(post.aiMeta?.linkedinPost ||
        post.aiMeta?.facebookPost ||
        post.aiMeta?.xThread?.length ||
        post.aiMeta?.instagramCaption) && (
        <GlassCard className="mb-6 p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">
            Social media drafts
          </h3>
          <p className="mt-1 text-xs text-white/40">Not auto-posted — copy when you publish.</p>
          <div className="mt-4 space-y-4 text-sm text-white/65">
            {post.aiMeta.linkedinPost && (
              <div>
                <p className="font-semibold text-deweb-cyan">LinkedIn</p>
                <p className="mt-1 whitespace-pre-wrap">{post.aiMeta.linkedinPost}</p>
              </div>
            )}
            {post.aiMeta.facebookPost && (
              <div>
                <p className="font-semibold text-deweb-cyan">Facebook</p>
                <p className="mt-1 whitespace-pre-wrap">{post.aiMeta.facebookPost}</p>
              </div>
            )}
            {post.aiMeta.xThread && post.aiMeta.xThread.length > 0 && (
              <div>
                <p className="font-semibold text-deweb-cyan">X thread</p>
                <ol className="mt-1 list-decimal space-y-2 pl-5">
                  {post.aiMeta.xThread.map((t) => (
                    <li key={t.slice(0, 30)}>{t}</li>
                  ))}
                </ol>
              </div>
            )}
            {post.aiMeta.instagramCaption && (
              <div>
                <p className="font-semibold text-deweb-cyan">Instagram</p>
                <p className="mt-1 whitespace-pre-wrap">{post.aiMeta.instagramCaption}</p>
              </div>
            )}
          </div>
        </GlassCard>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-deweb-bg">
        <BlogArticleView article={article} breadcrumbs={breadcrumbs} />
      </div>
        </>
      )}
    </AdminBlogShell>
  );
}
