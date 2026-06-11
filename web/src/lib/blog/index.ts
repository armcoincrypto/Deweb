import type { BlogArticle } from "./types";
import { normalizeArticleImage } from "./images";
import { BLOG_ARTICLE_SLUGS, type BlogArticleSlug } from "./article-slugs";
import { shopifyDevelopmentCost2026 } from "./articles/shopify-development-cost-2026";
import { shopifyVsWoocommerce } from "./articles/shopify-vs-woocommerce";
import { bestShopifyApps } from "./articles/best-shopify-apps";
import { aiChatbotsForBusiness } from "./articles/ai-chatbots-for-business";
import { aiAutomationForEcommerce } from "./articles/ai-automation-for-ecommerce";
import { howToBuildMarketplaceWebsite } from "./articles/how-to-build-a-marketplace-website";
import { customWebApplicationDevelopment } from "./articles/custom-web-application-development";
import { saasDevelopmentGuide } from "./articles/saas-development-guide";
import { bestEcommercePlatforms } from "./articles/best-ecommerce-platforms";
import { futureOfAiInBusiness } from "./articles/future-of-ai-in-business";
import { nextjsVsWordpress } from "./articles/nextjs-vs-wordpress";
import { shopifyPlusVsStandard } from "./articles/shopify-plus-vs-standard";
import { howToHireSoftwareDevelopers } from "./articles/how-to-hire-software-developers";
import { mvpDevelopmentCostGuide } from "./articles/mvp-development-cost-guide";
import { headlessCommerceGuide } from "./articles/headless-commerce-guide";
import { technicalSeoForEcommerce } from "./articles/technical-seo-for-ecommerce";
import { telegramBotDevelopmentGuide } from "./articles/telegram-bot-development-guide";
import { marketplaceMonetizationStrategies } from "./articles/marketplace-monetization-strategies";
import { outsourcingSoftwareDevelopment2026 } from "./articles/outsourcing-software-development-2026";
import { competitiveBiddingItProjects } from "./articles/competitive-bidding-it-projects";

const articlesMap: Record<BlogArticleSlug, BlogArticle> = {
  "shopify-development-cost-2026": shopifyDevelopmentCost2026,
  "shopify-vs-woocommerce": shopifyVsWoocommerce,
  "best-shopify-apps": bestShopifyApps,
  "ai-chatbots-for-business": aiChatbotsForBusiness,
  "ai-automation-for-ecommerce": aiAutomationForEcommerce,
  "how-to-build-a-marketplace-website": howToBuildMarketplaceWebsite,
  "custom-web-application-development": customWebApplicationDevelopment,
  "saas-development-guide": saasDevelopmentGuide,
  "best-ecommerce-platforms": bestEcommercePlatforms,
  "future-of-ai-in-business": futureOfAiInBusiness,
  "nextjs-vs-wordpress": nextjsVsWordpress,
  "shopify-plus-vs-standard": shopifyPlusVsStandard,
  "how-to-hire-software-developers": howToHireSoftwareDevelopers,
  "mvp-development-cost-guide": mvpDevelopmentCostGuide,
  "headless-commerce-guide": headlessCommerceGuide,
  "technical-seo-for-ecommerce": technicalSeoForEcommerce,
  "telegram-bot-development-guide": telegramBotDevelopmentGuide,
  "marketplace-monetization-strategies": marketplaceMonetizationStrategies,
  "outsourcing-software-development-2026": outsourcingSoftwareDevelopment2026,
  "competitive-bidding-it-projects": competitiveBiddingItProjects,
};

export { BLOG_ARTICLE_SLUGS };
export type { BlogArticle, BlogArticleSlug };
export { blogCategories, getCategory } from "./categories";
export { blogAuthors, getAuthor } from "./authors";
export { articleWordCount } from "./types";

function withNormalizedCover(article: BlogArticle): BlogArticle {
  return { ...article, image: normalizeArticleImage(article) };
}

export function getAllArticles(): BlogArticle[] {
  return BLOG_ARTICLE_SLUGS.map((slug) => withNormalizedCover(articlesMap[slug])).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticle(slug: string): BlogArticle | undefined {
  const article = articlesMap[slug as BlogArticleSlug];
  return article ? withNormalizedCover(article) : undefined;
}

export function getArticlesByCategory(categorySlug: string): BlogArticle[] {
  return getAllArticles().filter((a) => a.categorySlug === categorySlug);
}

export function searchArticles(query: string, source?: BlogArticle[]): BlogArticle[] {
  const q = query.toLowerCase().trim();
  const list = source ?? getAllArticles();
  if (!q) return list;
  return list.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.sections.some(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.paragraphs.some((p) => p.toLowerCase().includes(q))
      )
  );
}

export function getRelatedArticles(article: BlogArticle): BlogArticle[] {
  const fromSlugs = article.relatedSlugs
    .map((s) => getArticle(s))
    .filter((a): a is BlogArticle => !!a);
  if (fromSlugs.length >= 3) return fromSlugs.slice(0, 4);

  const sameCategory = getArticlesByCategory(article.categorySlug).filter(
    (a) => a.slug !== article.slug
  );
  const merged = [...fromSlugs];
  for (const a of sameCategory) {
    if (!merged.find((m) => m.slug === a.slug)) merged.push(a);
    if (merged.length >= 4) break;
  }
  return merged.slice(0, 4);
}

/** Legacy compat for sitemap/seo */
export function getBlogPost(slug: string) {
  const a = getArticle(slug);
  if (!a) return undefined;
  return {
    slug: a.slug,
    category: a.category,
    date: a.date,
    readTime: a.readTime,
    image: a.image,
  };
}

export const blogPosts = getAllArticles().map((a) => ({
  slug: a.slug,
  category: a.category,
  date: a.date,
  readTime: a.readTime,
  image: a.image,
}));
