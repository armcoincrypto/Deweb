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

export async function getAllArticlesMerged(): Promise<BlogArticle[]> {
  const staticList = getStaticArticles();
  const cmsItems = await fetchPublishedCmsPosts();
  const staticSlugs = new Set(staticList.map((a) => a.slug));
  const cmsArticles = cmsItems
    .filter((p) => !staticSlugs.has(p.slug))
    .map(cmsListToArticle);
  return [...staticList, ...cmsArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleMerged(slug: string): Promise<BlogArticle | undefined> {
  const staticArticle = getStaticArticle(slug);
  if (staticArticle) return staticArticle;

  const cmsPost = await fetchCmsPostBySlug(slug);
  if (cmsPost) return cmsPostToArticle(cmsPost);
  return undefined;
}
