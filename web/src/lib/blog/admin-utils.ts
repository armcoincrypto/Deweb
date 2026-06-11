import type { BlogPostDetail, BlogPostListItem } from "@/lib/api";
import type { BlogArticle } from "@/lib/blog/types";

export type BlogPostStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "scheduled"
  | "published"
  | "rejected";

export const STATUS_LABELS: Record<BlogPostStatus, string> = {
  draft: "Draft",
  pending_review: "Pending review",
  approved: "Approved",
  scheduled: "Scheduled",
  published: "Published",
  rejected: "Rejected",
};

export const STATUS_STYLES: Record<BlogPostStatus, string> = {
  draft: "bg-white/10 text-white/70",
  pending_review: "bg-amber-500/20 text-amber-300",
  approved: "bg-blue-500/20 text-blue-300",
  scheduled: "bg-violet-500/20 text-violet-300",
  published: "bg-green-500/20 text-green-400",
  rejected: "bg-red-500/20 text-red-400",
};

export function postToArticle(post: BlogPostDetail): BlogArticle {
  const content = post.content;
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    seoTitle: post.seoTitle,
    metaDescription: post.metaDescription,
    category: post.categoryName,
    categorySlug: post.categorySlug,
    date: post.publishedAt || post.updatedAt || post.createdAt,
    readTime: post.readingTime || "5 min",
    image: post.featuredImage || "/images/blog-hero.jpg",
    authorId: "deweb-editorial",
    tags: post.tags,
    intro: content.intro || [],
    sections: content.sections || [],
    faqs: content.faqs || [],
    relatedSlugs: [],
    internalLinks: content.internalLinks || [],
    cta: content.cta || {
      title: "Need Shopify, AI, SaaS or Marketplace development?",
      description: "Contact DEWEB to discuss your project with verified developers.",
      primaryLabel: "Get a Free Consultation",
      primaryHref: "/contact",
    },
  };
}

export function formatStatus(status: string) {
  return STATUS_LABELS[status as BlogPostStatus] || status;
}

export function statusClass(status: string) {
  return STATUS_STYLES[status as BlogPostStatus] || STATUS_STYLES.draft;
}

export function isPendingLike(post: BlogPostListItem) {
  return ["pending_review", "draft", "approved", "scheduled"].includes(post.status);
}
