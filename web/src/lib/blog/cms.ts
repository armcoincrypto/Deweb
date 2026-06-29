import type { BlogArticle } from "./types";
import { getArticle as getStaticArticle } from "./index";
import { normalizeArticleImage } from "./images";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window === "undefined" ? "http://127.0.0.1:3000/api" : "/api");

export type CmsBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: {
    intro: string[];
    sections: { title: string; paragraphs: string[] }[];
    faqs: { question: string; answer: string }[];
    internalLinks: { href: string; label: string }[];
    cta: BlogArticle["cta"] | null;
  };
  seoTitle: string;
  metaDescription: string;
  featuredImage: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  authorName: string;
  status: "draft" | "published";
  readingTime: string;
  tags: string[];
  aiMeta?: {
    featuredImagePrompt?: string;
    linkedinDraft?: string;
    twitterThread?: string[];
    facebookDraft?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type CmsBlogListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  categoryName: string;
  categorySlug: string;
  authorName: string;
  status: string;
  readingTime: string;
  featuredImage: string;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
};

export type CmsBlogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

const DEFAULT_CTA: BlogArticle["cta"] = {
  title: "Need Shopify, AI, SaaS or Marketplace development?",
  description: "Contact DEWEB to discuss your project with marketplace developers.",
  primaryLabel: "Get a Free Consultation",
  primaryHref: "/contact",
};

export function cmsPostToArticle(post: CmsBlogPost): BlogArticle {
  const content = post.content || {
    intro: [],
    sections: [],
    faqs: [],
    internalLinks: [],
    cta: null,
  };
  return {
    postId: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    seoTitle: post.seoTitle,
    metaDescription: post.metaDescription,
    category: post.categoryName,
    categorySlug: post.categorySlug,
    date: post.publishedAt || post.updatedAt,
    readTime: post.readingTime || "5 min",
    image: normalizeArticleImage({
      image: post.featuredImage,
      categorySlug: post.categorySlug,
    }),
    authorId: "deweb-editorial",
    tags: post.tags || [],
    intro: content.intro || [],
    sections: content.sections || [],
    faqs: content.faqs || [],
    relatedSlugs: [],
    internalLinks: content.internalLinks || [],
    cta: content.cta || DEFAULT_CTA,
  };
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchPublishedCmsPosts(): Promise<CmsBlogListItem[]> {
  const data = await fetchJson<{ posts: CmsBlogListItem[] }>("/blog");
  return data?.posts ?? [];
}

export async function fetchCmsPostBySlug(slug: string): Promise<CmsBlogPost | null> {
  if (getStaticArticle(slug)) return null;
  const data = await fetchJson<{ post: CmsBlogPost }>(`/blog/${encodeURIComponent(slug)}`);
  return data?.post ?? null;
}

export async function fetchCmsSitemapPosts(): Promise<{ slug: string; date: string }[]> {
  const data = await fetchJson<{ posts: { slug: string; date: string }[] }>("/blog/sitemap");
  return data?.posts ?? [];
}

export async function fetchCmsCategories(): Promise<CmsBlogCategory[]> {
  const data = await fetchJson<{ categories: CmsBlogCategory[] }>("/blog/categories");
  return data?.categories ?? [];
}
