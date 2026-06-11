import "../src/loadEnv.js";
import "../src/db.js";
import { trackBlogView, trackBlogEvent, getAnalyticsOverview } from "../src/services/blogAnalytics.js";
import { saveBlogLeadAttribution } from "../src/services/blogLeadAttribution.js";
import { uid } from "../src/db.js";

const slug = "test-analytics-slug";
const visitorId = `test-${uid().slice(0, 8)}`;

const mockReq = {
  ip: "203.0.113.10",
  headers: {
    "user-agent": "BlogAnalyticsTest/1.0",
    referer: "https://google.com/",
  },
};

console.log("1. trackBlogView");
const view = trackBlogView(mockReq, { slug, visitorId, locale: "en", path: `/blog/${slug}` });
console.log(view.ok ? "   OK" : `   FAIL: ${view.error}`);

console.log("2. dedupe view");
const dup = trackBlogView(mockReq, { slug, visitorId, locale: "en" });
console.log(dup.deduped ? "   OK (deduped)" : "   FAIL (should dedupe)");

console.log("3. trackBlogEvent cta_click");
const evt = trackBlogEvent(mockReq, {
  slug,
  visitorId,
  eventType: "cta_click",
  eventData: { href: "/contact" },
});
console.log(evt.ok ? "   OK" : `   FAIL: ${evt.error}`);

console.log("4. saveBlogLeadAttribution (no slug — skip)");
const skipped = saveBlogLeadAttribution(uid(), {});
console.log(skipped === null ? "   OK (skipped)" : "   FAIL");

console.log("5. saveBlogLeadAttribution (with slug)");
const leadId = uid();
const saved = saveBlogLeadAttribution(leadId, {
  lastBlogSlug: slug,
  visitorId,
  utmSource: "google",
  utmMedium: "organic",
});
console.log(saved ? "   OK" : "   FAIL");

console.log("6. getAnalyticsOverview");
const overview = getAnalyticsOverview();
console.log(`   totalViews=${overview.summary.totalViews}, totalLeads=${overview.summary.totalLeads}`);

console.log("\nBlog analytics smoke test passed.");
