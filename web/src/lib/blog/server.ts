import type { Locale } from "@/i18n/routing";
import type { BlogArticleSlug } from "@/lib/blog/article-slugs";
import { getLocalizedBlogArticle } from "@/lib/i18n/content";
import type { BlogArticle } from "./types";
import { normalizeArticleImage } from "./images";
import { getAllArticles as getStaticArticles, getArticle as getStaticArticle } from "./index";
import {
  cmsPostToArticle,
  fetchCmsPostBySlug,
  fetchPublishedCmsPosts,
  type CmsBlogListItem,
} from "./cms";

function cmsListToArticle(item: CmsBlogListItem): BlogArticle {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    category: item.categoryName,
    categorySlug: item.categorySlug,
    date: item.publishedAt || item.updatedAt,
    readTime: item.readingTime || "5 min",
    image: normalizeArticleImage({
      image: item.featuredImage,
      categorySlug: item.categorySlug,
    }),
    authorId: "deweb-editorial",
    tags: [],
    intro: [item.excerpt],
    sections: [],
    faqs: [],
    relatedSlugs: [],
    internalLinks: [],
    cta: {
      title: "Need Shopify, AI, SaaS or Marketplace development?",
      description: "Contact DEWEB to discuss your project with verified developers.",
      primaryLabel: "Get a Free Consultation",
      primaryHref: "/contact",
    },
  };
}

async function localizeStaticArticle(
  article: BlogArticle,
  locale?: Locale
): Promise<BlogArticle> {
  if (!locale || locale === "en") return article;
  const localized = await getLocalizedBlogArticle(article.slug as BlogArticleSlug, locale);
  return localized ?? article;
}

export async function getAllArticlesMerged(locale?: Locale): Promise<BlogArticle[]> {
  const staticList = await Promise.all(
    getStaticArticles().map((a) => localizeStaticArticle(a, locale))
  );
  const cmsItems = await fetchPublishedCmsPosts();
  const staticSlugs = new Set(staticList.map((a) => a.slug));
  const cmsArticles = cmsItems
    .filter((p) => !staticSlugs.has(p.slug))
    .map(cmsListToArticle);
  return [...staticList, ...cmsArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleMerged(
  slug: string,
  locale?: Locale
): Promise<BlogArticle | undefined> {
  const staticArticle = getStaticArticle(slug);
  if (staticArticle) {
    return localizeStaticArticle(staticArticle, locale);
  }

  const cmsPost = await fetchCmsPostBySlug(slug);
  if (cmsPost) return cmsPostToArticle(cmsPost);
  return undefined;
}
