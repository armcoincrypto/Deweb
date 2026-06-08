"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { dewebApi, type BlogPostDetail } from "@/lib/api";
import { formatStatus, postToArticle, statusClass } from "@/lib/blog/admin-utils";
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
          <span className="text-sm text-white/45">
            Public URL: /blog/{post.slug}
          </span>
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

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-deweb-bg">
        <BlogArticleView article={article} breadcrumbs={breadcrumbs} />
      </div>
    </AdminBlogShell>
  );
}
