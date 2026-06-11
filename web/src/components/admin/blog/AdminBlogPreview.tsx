"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { dewebApi, type BlogPostDetail } from "@/lib/api";
import { formatStatus, postToArticle, statusClass } from "@/lib/blog/admin-utils";
import { resolveBlogImageUrl } from "@/lib/blog/image-url";
import { BlogArticleView } from "@/components/blog/BlogArticleView";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminBlogShell } from "./AdminBlogShell";

type AdminBlogPreviewProps = {
  postId: string;
};

export function AdminBlogPreview({ postId }: AdminBlogPreviewProps) {
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    dewebApi.admin.blog
      .get(postId)
      .then(({ post: p }) => setPost(p))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [postId]);

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
          {post.featuredImage || post.aiMeta?.featuredImageUrl ? (
            <img
              src={resolveBlogImageUrl(post.featuredImage || post.aiMeta?.featuredImageUrl)}
              alt=""
              className="mt-3 max-h-40 w-full rounded-xl border border-white/10 object-cover"
            />
          ) : (
            <p className="mt-3 text-sm text-white/45">No image generated.</p>
          )}
        </GlassCard>
      </div>

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
    </AdminBlogShell>
  );
}
