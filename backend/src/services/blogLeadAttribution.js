import { db, uid, nowIso } from "../db.js";
import { cleanText } from "../utils/sanitize.js";

export function saveBlogLeadAttribution(leadId, body) {
  const lastBlogSlug = cleanText(
    body.lastBlogSlug || body.last_blog_slug,
    200
  );
  if (!lastBlogSlug) return null;

  const post = db
    .prepare("SELECT id, slug FROM blog_posts WHERE slug = ? LIMIT 1")
    .get(lastBlogSlug);

  const id = uid();
  const t = nowIso();

  db.prepare(`
    INSERT INTO blog_lead_attribution (
      id, lead_id, post_id, slug, visitor_id, source, medium, campaign, referrer, landing_page, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    leadId,
    post?.id || null,
    lastBlogSlug,
    cleanText(body.visitorId || body.visitor_id, 80) || null,
    cleanText(body.utmSource || body.utm_source || body.source, 120) || null,
    cleanText(body.utmMedium || body.utm_medium || body.medium, 120) || null,
    cleanText(body.utmCampaign || body.utm_campaign || body.campaign, 200) || null,
    cleanText(body.referrer, 2000) || null,
    cleanText(body.landingPage || body.landing_page, 500) || null,
    t
  );

  return id;
}
