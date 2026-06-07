import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { BlogPostView } from "@/components/blog/BlogPostView";
import { getBlogPost, blogPosts } from "@/lib/blog-data";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const t = await getTranslations({ locale, namespace: "blog" });
  const titleKey = `posts.${slug}.title` as const;
  const excerptKey = `posts.${slug}.excerpt` as const;
  const title = t.has(titleKey) ? t(titleKey) : slug;
  const description = t.has(excerptKey) ? t(excerptKey) : post.category;

  return buildPageMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    locale,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return <BlogPostView post={post} />;
}
