import { notFound } from "next/navigation";
import { BlogArticleView } from "@/components/blog/BlogArticleView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAuthor, BLOG_ARTICLE_SLUGS } from "@/lib/blog";
import { fetchPublishedCmsPosts } from "@/lib/blog/cms";
import { getArticleMerged } from "@/lib/blog/server";
import { metadataFromEntry, absoluteUrl } from "@/lib/seo";
import { getLocalizedBlogSeo } from "@/lib/i18n/locale-seo";
import type { Locale } from "@/i18n/routing";
import {
  articleSchema,
  authorPersonSchema,
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
} from "@/lib/schema";

export const dynamicParams = false;
export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const staticSlugs = BLOG_ARTICLE_SLUGS.map((slug) => ({ slug }));
  const cmsItems = await fetchPublishedCmsPosts();
  const staticSet = new Set<string>(BLOG_ARTICLE_SLUGS);
  const cmsSlugs = cmsItems
    .filter((post) => !staticSet.has(post.slug))
    .map((post) => ({ slug: post.slug }));
  return [...staticSlugs, ...cmsSlugs];
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const article = await getArticleMerged(slug, loc);
  if (!article) notFound();
  const seo = article.seoTitle
    ? {
        title: article.seoTitle.includes("|") ? article.seoTitle : `${article.seoTitle} | DEWEB Blog`,
        description: article.metaDescription || article.excerpt,
      }
    : await getLocalizedBlogSeo(loc, slug, article.title, article.excerpt);
  return metadataFromEntry(seo, `/blog/${slug}`, locale, { image: article.image });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const article = await getArticleMerged(slug, loc);
  if (!article) notFound();

  const author = getAuthor(article.authorId);
  const path = `/blog/${slug}`;
  const url = absoluteUrl(locale, path);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.category, path: `/blog/category/${article.categorySlug}` },
    { name: article.title, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: article.title, description: article.excerpt, url }),
          breadcrumbSchema(breadcrumbs, locale),
          authorPersonSchema({
            id: author.id,
            name: author.name,
            role: author.role,
            url: `${absoluteUrl(locale, "/blog")}#author-${author.id}`,
          }),
          articleSchema({
            headline: article.title,
            description: article.excerpt,
            url,
            image: article.image,
            datePublished: article.date,
            authorId: author.id,
          }),
          faqPageSchema(article.faqs),
        ]}
      />
      <BlogArticleView article={article} breadcrumbs={breadcrumbs} locale={locale} />
    </>
  );
}
