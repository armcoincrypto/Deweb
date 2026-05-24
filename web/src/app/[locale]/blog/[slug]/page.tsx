import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/blog/BlogPostView";
import { getBlogPost } from "@/lib/blog-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return <BlogPostView post={post} />;
}
