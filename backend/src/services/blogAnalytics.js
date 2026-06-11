import crypto from "crypto";
import { db, uid, nowIso } from "../db.js";
import { cleanText } from "../utils/sanitize.js";

const VIEW_DEDUPE_MS = 30 * 60 * 1000;

export const BLOG_EVENT_TYPES = new Set([
  "blog_view",
  "cta_click",
  "service_link_click",
  "contact_click",
  "social_share_click",
  "scroll_50",
  "scroll_90",
]);

const IP_SALT =
  process.env.IP_HASH_SALT || process.env.JWT_SECRET || "deweb-blog-analytics-v1";

export function hashIp(ip) {
  if (!ip) return null;
  return crypto.createHash("sha256").update(`${IP_SALT}:${ip}`).digest("hex");
}

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return String(forwarded).split(",")[0].trim();
  return req.ip || "";
}

function resolvePostBySlug(slug) {
  return db
    .prepare("SELECT id, slug FROM blog_posts WHERE slug = ? LIMIT 1")
    .get(slug);
}

function isDuplicateView(slug, visitorId) {
  const cutoff = new Date(Date.now() - VIEW_DEDUPE_MS).toISOString();
  const row = db
    .prepare(
      `SELECT id FROM blog_post_views
       WHERE slug = ? AND visitor_id = ? AND created_at > ?
       LIMIT 1`
    )
    .get(slug, visitorId, cutoff);
  return Boolean(row);
}

export function trackBlogView(req, body) {
  const slug = cleanText(body.slug, 200);
  const visitorId = cleanText(body.visitorId || body.visitor_id, 80);
  if (!slug || !visitorId) {
    return { ok: false, error: "slug and visitorId are required." };
  }
  if (isDuplicateView(slug, visitorId)) {
    return { ok: true, deduped: true };
  }

  const post = resolvePostBySlug(slug);
  const id = uid();
  const t = nowIso();
  const ipHash = hashIp(getClientIp(req));
  const userAgent = cleanText(req.headers["user-agent"], 500);
  const referrer = cleanText(body.referrer || req.headers.referer, 2000);
  const path = cleanText(body.path, 500);
  const locale = cleanText(body.locale, 10);

  db.prepare(`
    INSERT INTO blog_post_views (
      id, post_id, slug, visitor_id, ip_hash, user_agent, referrer, path, locale, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    post?.id || null,
    slug,
    visitorId,
    ipHash,
    userAgent,
    referrer,
    path,
    locale,
    t
  );

  db.prepare(`
    INSERT INTO blog_post_events (id, post_id, slug, visitor_id, event_type, event_data, created_at)
    VALUES (?, ?, ?, ?, 'blog_view', ?, ?)
  `).run(id, post?.id || null, slug, visitorId, JSON.stringify({ path, locale }), t);

  return { ok: true, id };
}

export function trackBlogEvent(req, body) {
  const slug = cleanText(body.slug, 200);
  const visitorId = cleanText(body.visitorId || body.visitor_id, 80);
  const eventType = cleanText(body.eventType || body.event_type, 60);
  if (!slug || !visitorId || !eventType) {
    return { ok: false, error: "slug, visitorId, and eventType are required." };
  }
  if (!BLOG_EVENT_TYPES.has(eventType)) {
    return { ok: false, error: "Invalid event type." };
  }

  const post = resolvePostBySlug(slug);
  const eventData =
    body.eventData && typeof body.eventData === "object"
      ? body.eventData
      : body.event_data && typeof body.event_data === "object"
        ? body.event_data
        : {};

  const id = uid();
  const t = nowIso();

  db.prepare(`
    INSERT INTO blog_post_events (id, post_id, slug, visitor_id, event_type, event_data, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    post?.id || null,
    slug,
    visitorId,
    eventType,
    JSON.stringify(eventData),
    t
  );

  return { ok: true, id };
}

function parseAiMeta(row) {
  if (!row?.ai_meta) return {};
  try {
    return JSON.parse(row.ai_meta);
  } catch {
    return {};
  }
}

export function getAnalyticsOverview() {
  const totalViews = db
    .prepare("SELECT COUNT(*) AS c FROM blog_post_views")
    .get().c;
  const totalLeads = db
    .prepare("SELECT COUNT(*) AS c FROM blog_lead_attribution")
    .get().c;

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const articlesPublishedThisMonth = db
    .prepare(
      `SELECT COUNT(*) AS c FROM blog_posts
       WHERE status = 'published' AND published_at >= ?`
    )
    .get(monthStart.toISOString()).c;

  const posts = db
    .prepare(
      `SELECT p.id, p.title, p.slug, p.status, p.published_at, p.ai_meta
       FROM blog_posts p
       ORDER BY (p.published_at IS NULL), p.published_at DESC, p.updated_at DESC`
    )
    .all();

  const viewCounts = db
    .prepare(
      `SELECT slug, COUNT(*) AS views FROM blog_post_views GROUP BY slug`
    )
    .all();
  const viewsBySlug = new Map(viewCounts.map((r) => [r.slug, r.views]));

  const ctaCounts = db
    .prepare(
      `SELECT slug, COUNT(*) AS clicks FROM blog_post_events
       WHERE event_type IN ('cta_click', 'contact_click')
       GROUP BY slug`
    )
    .all();
  const ctaBySlug = new Map(ctaCounts.map((r) => [r.slug, r.clicks]));

  const leadCounts = db
    .prepare(
      `SELECT slug, COUNT(*) AS leads FROM blog_lead_attribution GROUP BY slug`
    )
    .all();
  const leadsBySlug = new Map(leadCounts.map((r) => [r.slug, r.leads]));

  const postRows = posts.map((p) => {
    const views = viewsBySlug.get(p.slug) || 0;
    const ctaClicks = ctaBySlug.get(p.slug) || 0;
    const leads = leadsBySlug.get(p.slug) || 0;
    const conversionRate = views > 0 ? Math.round((leads / views) * 10000) / 100 : 0;
    const aiMeta = parseAiMeta(p);
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      status: p.status,
      publishedAt: p.published_at,
      views,
      ctaClicks,
      leads,
      conversionRate,
      targetKeyword: aiMeta.targetKeyword || "",
      buyerStage: aiMeta.buyerStage || "",
      qualityScore: aiMeta.qualityScore?.score ?? null,
    };
  });

  let bestConvertingArticle = null;
  for (const row of postRows) {
    if (row.views < 5) continue;
    if (
      !bestConvertingArticle ||
      row.conversionRate > bestConvertingArticle.conversionRate
    ) {
      bestConvertingArticle = {
        id: row.id,
        title: row.title,
        slug: row.slug,
        conversionRate: row.conversionRate,
        views: row.views,
        leads: row.leads,
      };
    }
  }

  const topReferrers = db
    .prepare(
      `SELECT referrer, COUNT(*) AS views
       FROM blog_post_views
       WHERE referrer IS NOT NULL AND referrer != ''
       GROUP BY referrer
       ORDER BY views DESC
       LIMIT 15`
    )
    .all();

  const topKeywords = postRows
    .filter((p) => p.targetKeyword)
    .sort((a, b) => b.leads - a.leads || b.views - a.views)
    .slice(0, 10)
    .map((p) => ({
      keyword: p.targetKeyword,
      slug: p.slug,
      title: p.title,
      views: p.views,
      leads: p.leads,
    }));

  return {
    summary: {
      totalViews,
      totalLeads,
      articlesPublishedThisMonth,
      bestConvertingArticle,
    },
    posts: postRows,
    topReferrers,
    topKeywords,
  };
}

export function getPostAnalytics(postId) {
  const row = db
    .prepare("SELECT * FROM blog_posts WHERE id = ?")
    .get(postId);
  if (!row) return null;

  const slug = row.slug;
  const aiMeta = parseAiMeta(row);

  const viewsOverTime = db
    .prepare(
      `SELECT date(created_at) AS day, COUNT(*) AS views
       FROM blog_post_views
       WHERE slug = ? OR post_id = ?
       GROUP BY date(created_at)
       ORDER BY day ASC`
    )
    .all(slug, postId);

  const eventCounts = db
    .prepare(
      `SELECT event_type, COUNT(*) AS count
       FROM blog_post_events
       WHERE slug = ? OR post_id = ?
       GROUP BY event_type
       ORDER BY count DESC`
    )
    .all(slug, postId);

  const ctaClicks = db
    .prepare(
      `SELECT COUNT(*) AS c FROM blog_post_events
       WHERE (slug = ? OR post_id = ?) AND event_type IN ('cta_click', 'contact_click')`
    )
    .get(slug, postId).c;

  const totalViews = db
    .prepare(
      `SELECT COUNT(*) AS c FROM blog_post_views WHERE slug = ? OR post_id = ?`
    )
    .get(slug, postId).c;

  const leads = db
    .prepare(
      `SELECT bla.*, ls.name, ls.email, ls.submission_type, ls.status AS lead_status
       FROM blog_lead_attribution bla
       LEFT JOIN lead_submissions ls ON ls.id = bla.lead_id
       WHERE bla.slug = ? OR bla.post_id = ?
       ORDER BY bla.created_at DESC
       LIMIT 100`
    )
    .all(slug, postId)
    .map((r) => ({
      id: r.id,
      leadId: r.lead_id,
      visitorId: r.visitor_id,
      source: r.source,
      medium: r.medium,
      campaign: r.campaign,
      referrer: r.referrer,
      landingPage: r.landing_page,
      createdAt: r.created_at,
      name: r.name,
      email: r.email,
      submissionType: r.submission_type,
      leadStatus: r.lead_status,
    }));

  const referrers = db
    .prepare(
      `SELECT referrer, COUNT(*) AS views
       FROM blog_post_views
       WHERE (slug = ? OR post_id = ?) AND referrer IS NOT NULL AND referrer != ''
       GROUP BY referrer
       ORDER BY views DESC
       LIMIT 20`
    )
    .all(slug, postId);

  const utmCampaigns = db
    .prepare(
      `SELECT source, medium, campaign, COUNT(*) AS leads
       FROM blog_lead_attribution
       WHERE slug = ? OR post_id = ?
       GROUP BY source, medium, campaign
       ORDER BY leads DESC`
    )
    .all(slug, postId);

  return {
    post: {
      id: row.id,
      title: row.title,
      slug: row.slug,
      status: row.status,
      publishedAt: row.published_at,
      targetKeyword: aiMeta.targetKeyword || "",
      buyerStage: aiMeta.buyerStage || "",
      qualityScore: aiMeta.qualityScore?.score ?? null,
      qualityPassed: aiMeta.qualityScore?.passed ?? null,
    },
    totalViews,
    ctaClicks,
    conversionRate:
      totalViews > 0 ? Math.round((leads.length / totalViews) * 10000) / 100 : 0,
    viewsOverTime,
    eventCounts,
    leads,
    referrers,
    utmCampaigns,
  };
}
