/**
 * P4B-A Authority Mesh Certification audit.
 * Usage: cd web && npx tsx scripts/p4ba-authority-mesh-audit.ts
 */
import fs from "fs";
import path from "path";
import {
  PUBLIC_STATIC_PATHS,
  getLegacyServicePaths,
  getLandingServicePaths,
  getBlogCategoryPaths,
  getStaticBlogPaths,
} from "../src/lib/seo";
import { getServiceLandingPage, SERVICE_LANDING_SLUGS } from "../src/lib/service-landing";
import { SERVICE_RELATED_GUIDES } from "../src/lib/service-landing/related-guides";
import { getArticle, BLOG_ARTICLE_SLUGS } from "../src/lib/blog";
import { blogCategories } from "../src/lib/blog/categories";

const OUT = path.join(__dirname, "../../docs/audits/p4ba-authority-mesh-data.json");

type PageType =
  | "home"
  | "static"
  | "pillar"
  | "service-landing"
  | "legacy-service"
  | "marketplace"
  | "hire"
  | "blog-article"
  | "blog-category"
  | "legal";

type LinkEdge = { from: string; to: string; source: string; label?: string };

type PageNode = {
  path: string;
  type: PageType;
  inbound: number;
  outbound: number;
  inboundByType: Record<string, number>;
  outboundByType: Record<string, number>;
  classification: "HIGH" | "MEDIUM" | "LOW" | "ISOLATED";
  authorityScore: number;
  funnelPaths: string[];
  missingFunnelPaths: string[];
};

const GLOBAL_LINKS: LinkEdge[] = [
  { from: "__global__", to: "/services", source: "footer-nav" },
  { from: "__global__", to: "/marketplace", source: "footer-nav" },
  { from: "__global__", to: "/blog", source: "footer-nav" },
  { from: "__global__", to: "/services/shopify-development", source: "footer" },
  { from: "__global__", to: "/services/shopify-store-design", source: "footer" },
  { from: "__global__", to: "/services/shopify-custom-apps", source: "footer" },
  { from: "__global__", to: "/services/ai-chatbot-development", source: "footer" },
  { from: "__global__", to: "/services/ai-business-automation", source: "footer" },
  { from: "__global__", to: "/services/telegram-bot-development", source: "footer" },
  { from: "__global__", to: "/services/web-application-development", source: "footer" },
  { from: "__global__", to: "/services/marketplace-development", source: "footer" },
  { from: "__global__", to: "/services/saas-development", source: "footer" },
  { from: "__global__", to: "/services/landing-page-development", source: "footer" },
  { from: "__global__", to: "/services/seo", source: "footer" },
  { from: "__global__", to: "/services/mobile", source: "footer" },
  { from: "__global__", to: "/dedicated-development-team", source: "footer" },
  { from: "__global__", to: "/", source: "site-chrome" },
  { from: "__global__", to: "/about", source: "site-chrome" },
  { from: "__global__", to: "/contact", source: "site-chrome" },
];

const MARKETPLACE_HUB_LINKS = [
  "/dedicated-development-team",
  "/marketplace/hire-marketplace-developers",
  "/marketplace/hire-telegram-bot-developers",
  "/marketplace/hire-ai-automation-specialists",
  "/marketplace/hire-web-developers",
  "/services/shopify-development",
  "/services/ai-chatbot-development",
  "/services/ai-business-automation",
  "/services/telegram-bot-development",
  "/services/web-application-development",
  "/services/marketplace-development",
  "/services/landing-page-development",
  "/services",
  "/blog/category/marketplace",
  "/contact",
];

const DEDICATED_TEAM_LINKS = [
  "/services/marketplace-development",
  "/services/web-application-development",
  "/services/saas-development",
  "/services/mobile",
  "/services/seo",
  "/services/landing-page-development",
  "/marketplace",
  "/marketplace/hire-web-developers",
  "/marketplace/hire-marketplace-developers",
  "/contact",
];

const HIRE_MARKETPLACE_LINKS = [
  "/marketplace",
  "/services/marketplace-development",
  "/services/web-application-development",
  "/services/mobile",
  "/services/saas-development",
  "/services/seo",
  "/services/landing-page-development",
  "/marketplace/hire-web-developers",
  "/account/listings",
];

const HIRE_WEB_LINKS = [
  "/marketplace",
  "/services/web-application-development",
  "/services/marketplace-development",
  "/contact",
];

const HIRE_AI_LINKS = ["/marketplace", "/services/ai-business-automation", "/services/ai-chatbot-development", "/contact"];
const HIRE_TELEGRAM_LINKS = [
  "/marketplace",
  "/services/telegram-bot-development",
  "/services/ai-business-automation",
  "/contact",
];

const MARKETPLACE_EMPTY_STATE_LINKS = [
  "/services/telegram-bot-development",
  "/services/ai-business-automation",
  "/services/shopify-development",
  "/services/saas-development",
  "/services/marketplace-development",
  "/services/web-application-development",
];

function normalizePath(href: string): string | null {
  if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("/account")) return null;
  const clean = href.split("?")[0].split("#")[0];
  if (!clean.startsWith("/")) return null;
  return clean.replace(/\/$/, "") || "/";
}

function pageType(p: string): PageType {
  if (p === "/") return "home";
  if (p.startsWith("/blog/category/")) return "blog-category";
  if (p.startsWith("/blog/")) return "blog-article";
  if (p === "/dedicated-development-team") return "pillar";
  if (p.startsWith("/marketplace/hire-")) return "hire";
  if (p === "/marketplace") return "marketplace";
  if (p.startsWith("/services/") && getServiceLandingPage(p.replace("/services/", ""))) return "service-landing";
  if (p.startsWith("/services/")) return "legacy-service";
  if (["/privacy-policy", "/cookie-policy", "/terms"].includes(p)) return "legal";
  return "static";
}

function collectUrls(): string[] {
  const urls = new Set<string>([
    ...PUBLIC_STATIC_PATHS,
    ...getLegacyServicePaths(),
    ...getLandingServicePaths(),
    ...getStaticBlogPaths(),
    ...getBlogCategoryPaths(),
  ]);
  return [...urls].sort();
}

function buildEdges(): LinkEdge[] {
  const edges: LinkEdge[] = [...GLOBAL_LINKS];

  for (const slug of SERVICE_LANDING_SLUGS) {
    const page = getServiceLandingPage(slug)!;
    const from = page.path;

    for (const svc of page.relatedServices) {
      edges.push({ from, to: `/services/${svc.slug}`, source: "service-relatedServices" });
    }
    if (page.marketplaceHire) {
      edges.push({ from, to: page.marketplaceHire.href, source: "service-marketplaceHire" });
    }
    if (page.cta.primaryHref) edges.push({ from, to: page.cta.primaryHref, source: "service-cta-primary" });
    if (page.cta.secondaryHref) edges.push({ from, to: page.cta.secondaryHref, source: "service-cta-secondary" });

    for (const guide of SERVICE_RELATED_GUIDES[slug] ?? []) {
      edges.push({ from, to: `/blog/${guide}`, source: "service-relatedGuides" });
      edges.push({ from: `/blog/${guide}`, to: from, source: "blog-reverse-guide" });
    }
  }

  for (const slug of BLOG_ARTICLE_SLUGS) {
    const article = getArticle(slug)!;
    const from = `/blog/${slug}`;
    for (const link of article.internalLinks ?? []) {
      const to = normalizePath(link.href);
      if (to) edges.push({ from, to, source: "blog-internalLinks", label: link.label });
    }
    if (article.cta?.primaryHref) {
      const to = normalizePath(article.cta.primaryHref);
      if (to) edges.push({ from, to, source: "blog-cta-primary" });
    }
    if (article.cta?.secondaryHref) {
      const to = normalizePath(article.cta.secondaryHref);
      if (to) edges.push({ from, to, source: "blog-cta-secondary" });
    }
    for (const rel of article.relatedSlugs ?? []) {
      edges.push({ from, to: `/blog/${rel}`, source: "blog-relatedSlugs" });
    }
    edges.push({ from, to: `/blog/category/${article.categorySlug}`, source: "blog-category" });
  }

  for (const cat of blogCategories) {
    const from = `/blog/category/${cat.slug}`;
    for (const slug of BLOG_ARTICLE_SLUGS) {
      const article = getArticle(slug);
      if (article?.categorySlug === cat.slug) {
        edges.push({ from, to: `/blog/${slug}`, source: "blog-category-hub" });
      }
    }
  }

  edges.push({ from: "/marketplace", to: "/contact", source: "marketplace-hub" });
  for (const to of MARKETPLACE_HUB_LINKS) {
    edges.push({ from: "/marketplace", to, source: "marketplace-hub" });
  }
  for (const to of MARKETPLACE_EMPTY_STATE_LINKS) {
    edges.push({ from: "/marketplace", to, source: "marketplace-empty-state" });
  }

  const hireMap: Record<string, string[]> = {
    "/marketplace/hire-marketplace-developers": HIRE_MARKETPLACE_LINKS,
    "/marketplace/hire-web-developers": HIRE_WEB_LINKS,
    "/marketplace/hire-ai-automation-specialists": HIRE_AI_LINKS,
    "/marketplace/hire-telegram-bot-developers": HIRE_TELEGRAM_LINKS,
  };
  for (const [from, targets] of Object.entries(hireMap)) {
    for (const to of targets) edges.push({ from, to, source: "hire-content" });
  }
  for (const to of DEDICATED_TEAM_LINKS) {
    edges.push({ from: "/dedicated-development-team", to, source: "pillar-content" });
  }

  edges.push({ from: "/services", to: "/contact", source: "services-index" });
  for (const slug of SERVICE_LANDING_SLUGS) {
    edges.push({ from: "/services", to: `/services/${slug}`, source: "services-index" });
  }
  for (const p of getLegacyServicePaths()) {
    edges.push({ from: "/services", to: p, source: "services-index-legacy" });
  }

  edges.push({ from: "/", to: "/services", source: "homepage" });
  edges.push({ from: "/", to: "/marketplace", source: "homepage" });
  edges.push({ from: "/", to: "/blog", source: "homepage" });
  edges.push({ from: "/", to: "/dedicated-development-team", source: "homepage" });
  edges.push({ from: "/about", to: "/services/web-application-development", source: "about-featured" });
  edges.push({ from: "/about", to: "/dedicated-development-team", source: "about-featured" });
  edges.push({ from: "/marketplace/hire-web-developers", to: "/dedicated-development-team", source: "hire-crosslink" });
  edges.push({ from: "/marketplace/hire-marketplace-developers", to: "/dedicated-development-team", source: "hire-crosslink" });

  return edges;
}

function hasPath(edges: LinkEdge[], fromPrefix: string, toPrefix: string): boolean {
  return edges.some((e) => {
    const fromOk = fromPrefix === "blog" ? e.from.startsWith("/blog/") && !e.from.startsWith("/blog/category/") : e.from.startsWith(fromPrefix);
    const toOk = toPrefix === "service" ? e.to.startsWith("/services/") : e.to.startsWith(toPrefix);
    return fromOk && toOk;
  });
}

function funnelCheck(edges: LinkEdge[], path: string, type: PageType): { paths: string[]; missing: string[] } {
  const out = edges.filter((e) => e.from === path).map((e) => e.to);
  const paths: string[] = [];
  const missing: string[] = [];

  const needsLead = !["legal", "blog-category"].includes(type);
  if (needsLead) {
    const hasLead = out.some((t) => ["/contact", "/marketplace", "/signup"].includes(t) || t.startsWith("/marketplace/hire-"));
    if (hasLead) paths.push("lead-gen");
    else missing.push("lead-gen");
  }

  if (type === "blog-article") {
    if (out.some((t) => t.startsWith("/services/"))) paths.push("blog→service");
    else missing.push("blog→service");
    if (out.some((t) => t.startsWith("/marketplace/hire-") || t === "/marketplace")) paths.push("blog→hire/marketplace");
  }

  if (type === "service-landing") {
    if (out.some((t) => t.startsWith("/marketplace"))) paths.push("service→marketplace/hire");
    else missing.push("service→marketplace/hire");
    if (out.some((t) => t.startsWith("/blog/"))) paths.push("service→blog");
    else missing.push("service→blog");
  }

  if (type === "marketplace" || type === "hire" || type === "pillar") {
    if (out.some((t) => t.startsWith("/services/"))) paths.push("marketplace/hire→service");
    else missing.push("marketplace/hire→service");
  }

  if (type === "pillar") {
    if (out.some((t) => t.startsWith("/marketplace"))) paths.push("pillar→marketplace/hire");
    else missing.push("pillar→marketplace/hire");
    if (out.some((t) => t === "/contact")) paths.push("lead-gen");
  }

  return { paths, missing };
}

function scorePage(inbound: number, outbound: number, type: PageType, missing: string[]): number {
  let score = 0;
  score += Math.min(inbound * 4, 40);
  score += Math.min(outbound * 3, 24);
  if (type === "service-landing" || type === "hire" || type === "marketplace" || type === "pillar") score += 12;
  if (type === "blog-article") score += 8;
  if (type === "legacy-service") score += 4;
  score -= missing.length * 8;
  if (inbound === 0 && type !== "home") score = Math.min(score, 15);
  if (inbound <= 1 && outbound <= 1 && !["legal", "static"].includes(type)) score = Math.min(score, 25);
  return Math.max(0, Math.min(100, Math.round(score)));
}

function classify(inbound: number, outbound: number, score: number): PageNode["classification"] {
  if (inbound === 0 || score <= 20) return "ISOLATED";
  if (score >= 70) return "HIGH";
  if (score >= 45) return "MEDIUM";
  return "LOW";
}

function main() {
  const urls = collectUrls();
  const edges = buildEdges();
  const commercialPaths = urls.filter((u) =>
    ["/marketplace", "/services"].some((p) => u === p || u.startsWith(`${p}/`)) ||
    u.startsWith("/blog/") ||
    u === "/dedicated-development-team"
  );

  const nodes: PageNode[] = urls.map((p) => {
    const type = pageType(p);
    const inboundEdges = edges.filter((e) => e.to === p);
    const outboundEdges = edges.filter((e) => e.from === p);
    const globalInbound = type !== "legal" ? edges.filter((e) => e.from === "__global__" && e.to === p).length : 0;

    const inbound = inboundEdges.length + globalInbound;
    const outbound = outboundEdges.length;
    const inboundByType: Record<string, number> = {};
    const outboundByType: Record<string, number> = {};

    for (const e of inboundEdges) inboundByType[e.source] = (inboundByType[e.source] ?? 0) + 1;
    for (const e of outboundEdges) outboundByType[e.source] = (outboundByType[e.source] ?? 0) + 1;

    const { paths, missing } = funnelCheck(edges, p, type);
    const authorityScore = scorePage(inbound, outbound, type, missing);

    return {
      path: p,
      type,
      inbound,
      outbound,
      inboundByType,
      outboundByType,
      classification: classify(inbound, outbound, authorityScore),
      authorityScore,
      funnelPaths: paths,
      missingFunnelPaths: missing,
    };
  });

  const orphans = nodes.filter((n) => n.inbound === 0 && n.type !== "home");
  const deadEnds = nodes.filter((n) => n.outbound === 0 && !["legal"].includes(n.type));
  const isolated = nodes.filter((n) => n.classification === "ISOLATED");
  const ranked = [...nodes]
    .filter((n) => commercialPaths.includes(n.path) || n.type === "legacy-service")
    .sort((a, b) => b.authorityScore - a.authorityScore);

  const funnelMatrix = {
    "blog→service": hasPath(edges, "blog", "service"),
    "blog→hire": edges.some((e) => e.from.startsWith("/blog/") && (e.to.startsWith("/marketplace/hire-") || e.to === "/marketplace")),
    "service→marketplace": edges.some((e) => e.from.startsWith("/services/") && e.to.startsWith("/marketplace")),
    "service→hire": edges.some((e) => e.from.startsWith("/services/") && e.to.startsWith("/marketplace/hire-")),
    "hire→marketplace": edges.some((e) => e.from.startsWith("/marketplace/hire-") && e.to === "/marketplace"),
    "marketplace→service": edges.some((e) => e.from === "/marketplace" && e.to.startsWith("/services/")),
    "marketplace→hire": edges.some((e) => e.from === "/marketplace" && e.to.startsWith("/marketplace/hire-")),
  };

  const servicesMissingHire = SERVICE_LANDING_SLUGS.filter((slug) => !getServiceLandingPage(slug)?.marketplaceHire);

  const payload = {
    generatedAt: new Date().toISOString(),
    urlCount: urls.length,
    edgeCount: edges.length,
    funnelMatrix,
    servicesMissingMarketplaceHire: servicesMissingHire,
    orphans: orphans.map((n) => n.path),
    deadEnds: deadEnds.map((n) => n.path),
    isolated: isolated.map((n) => ({ path: n.path, score: n.authorityScore })),
    rankedCommercial: ranked.map((n) => ({
      path: n.path,
      type: n.type,
      classification: n.classification,
      authorityScore: n.authorityScore,
      inbound: n.inbound,
      outbound: n.outbound,
      missingFunnelPaths: n.missingFunnelPaths,
    })),
    edges: edges.filter((e) => e.from !== "__global__"),
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${OUT}`);
  console.log(`URLs: ${urls.length}, edges: ${edges.length}`);
  console.log(`Orphans: ${orphans.length}, isolated: ${isolated.length}`);
  console.log(`Services missing marketplaceHire: ${servicesMissingHire.join(", ") || "none"}`);
}

main();
