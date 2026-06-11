import { db, parseJson } from "../db.js";
import { slugify } from "../utils/blogHelpers.js";
import { cleanText } from "../utils/sanitize.js";

const MAX_LINKS = 6;
const SITE_LOCALE = "en";

const SERVICE_LINKS = {
  shopify: {
    href: `/${SITE_LOCALE}/services/shopify-development`,
    label: "Shopify development services",
  },
  ai: {
    href: `/${SITE_LOCALE}/services/ai-automation`,
    label: "AI automation services",
  },
  saas: {
    href: `/${SITE_LOCALE}/services/saas-development`,
    label: "SaaS development services",
  },
  marketplace: {
    href: `/${SITE_LOCALE}/services/marketplace-development`,
    label: "Marketplace development services",
  },
  "web-development": {
    href: `/${SITE_LOCALE}/services/web-development`,
    label: "Web development services",
  },
};

const CONTACT_LINK = {
  href: `/${SITE_LOCALE}/contact`,
  label: "Contact DEWEB for a free consultation",
};

function countUrl(links, href) {
  return links.filter((l) => l.href === href).length;
}

function addLink(links, link, maxPerUrl = 2) {
  if (!link?.href || links.length >= MAX_LINKS) return;
  if (countUrl(links, link.href) >= maxPerUrl) return;
  if (links.some((l) => l.href === link.href && l.label === link.label)) return;
  links.push({ href: link.href, label: link.label });
}

function keywordOverlap(a, b) {
  const wordsA = new Set(String(a).toLowerCase().split(/\W+/).filter((w) => w.length > 3));
  const wordsB = new Set(String(b).toLowerCase().split(/\W+/).filter((w) => w.length > 3));
  let score = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) score++;
  }
  return score;
}

function findRelatedPosts({ slug, categorySlug, targetKeyword, limit = 3 }) {
  const rows = db
    .prepare(
      `SELECT p.slug, p.title, p.excerpt, p.ai_meta, c.slug AS category_slug
       FROM blog_posts p
       JOIN blog_categories c ON c.id = p.category_id
       WHERE p.slug != ? AND p.status IN ('published', 'pending_review', 'scheduled', 'approved')
       ORDER BY p.updated_at DESC
       LIMIT 40`
    )
    .all(slug);

  const scored = rows.map((row) => {
    const aiMeta = parseJson(row.ai_meta, {});
    const kw = aiMeta.targetKeyword || "";
    let score = 0;
    if (row.category_slug === categorySlug) score += 3;
    score += keywordOverlap(targetKeyword, kw);
    score += keywordOverlap(targetKeyword, row.title);
    return { row, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.row);
}

/**
 * Build internal links for a draft/post and merge into content + ai_meta.
 */
export function enrichDraftInternalLinks(draft, { categorySlug, categoryName } = {}) {
  const slug = draft.slug || slugify(draft.title);
  const catSlug = categorySlug || draft.categorySlug || "";
  const targetKeyword = draft.aiMeta?.targetKeyword || draft.title || "";
  const links = [];

  const service = SERVICE_LINKS[catSlug];
  if (service) addLink(links, service);

  addLink(links, CONTACT_LINK);

  const related = findRelatedPosts({
    slug,
    categorySlug: catSlug,
    targetKeyword,
    limit: 3,
  });

  for (const post of related) {
    addLink(links, {
      href: `/${SITE_LOCALE}/blog/${post.slug}`,
      label: cleanText(post.title, 120),
    });
  }

  if (links.length < MAX_LINKS && categoryName) {
    addLink(links, {
      href: `/${SITE_LOCALE}/blog/category/${catSlug}`,
      label: `More ${categoryName} articles`,
    });
  }

  const content = draft.content || {};
  const existing = Array.isArray(content.internalLinks) ? content.internalLinks : [];
  for (const link of existing) {
    addLink(links, link);
  }

  draft.content = { ...content, internalLinks: links.slice(0, MAX_LINKS) };
  draft.aiMeta = {
    ...(draft.aiMeta || {}),
    internalLinks: links.slice(0, MAX_LINKS),
  };

  return draft;
}
