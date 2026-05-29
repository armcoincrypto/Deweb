import { Router } from "express";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { db, getPlatformStat } from "../db.js";
import { detectCategory, parseBudget, suggestTimeline } from "../lib/servicesIntelligence.js";

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let catalogCache = null;
let pageCache = null;

function loadCatalog() {
  if (catalogCache) return catalogCache;
  const file = path.join(__dirname, "../data/services-catalog.json");
  catalogCache = JSON.parse(readFileSync(file, "utf8"));
  return catalogCache;
}

function loadPageData() {
  if (pageCache) return pageCache;
  const file = path.join(__dirname, "../data/services-page.json");
  pageCache = JSON.parse(readFileSync(file, "utf8"));
  return pageCache;
}

router.get("/catalog", (_req, res) => {
  res.json({ catalog: loadCatalog() });
});

/** Full services page payload with live platform stats. */
router.get("/page", (_req, res) => {
  const page = loadPageData();
  const users = db.prepare("SELECT COUNT(*) AS c FROM users").get().c;
  const orders = db.prepare("SELECT COUNT(*) AS c FROM orders").get().c;
  const inquiries = db.prepare("SELECT COUNT(*) AS c FROM service_inquiries").get().c;

  const liveStats = page.stats.map((s, i) => {
    if (i === 0) return { ...s, value: getPlatformStat("display_projects", s.value) };
    if (i === 1) return { ...s, value: getPlatformStat("display_success_rate", s.value) };
    return s;
  });

  res.json({
    ...page,
    stats: liveStats,
    live: {
      users: Number(getPlatformStat("display_users", String(users))),
      orders: Number(getPlatformStat("display_orders", String(orders))),
      inquiries,
      successRate: getPlatformStat("display_success_rate", "98")
    }
  });
});

/** Smart estimate from brief text (no auth). */
router.post("/estimate", (req, res) => {
  const message = String(req.body.message || "").trim();
  const budget = String(req.body.budget || "").trim();
  const category = String(req.body.category || "").trim();

  if (!message || message.length < 10) {
    return res.status(400).json({ error: "Describe your project in at least 10 characters." });
  }

  const detectedCategory = detectCategory(message, category);
  const budgetParsed = parseBudget(budget);
  const suggestedTimeline = suggestTimeline(detectedCategory, budgetParsed);

  res.json({
    detectedCategory,
    suggestedTimeline,
    budgetParsed,
    confidence: message.length > 80 ? "high" : message.length > 30 ? "medium" : "low"
  });
});

/** Public homepage stats (admin can override via platform_stats). */
router.get("/public-stats", (_req, res) => {
  const users = db.prepare("SELECT COUNT(*) AS c FROM users").get().c;
  const orders = db.prepare("SELECT COUNT(*) AS c FROM orders").get().c;
  res.json({
    users: getPlatformStat("display_users", String(users)),
    orders: getPlatformStat("display_orders", String(orders)),
    volume: getPlatformStat("display_volume", "0"),
    successRate: getPlatformStat("display_success_rate", "94")
  });
});

export default router;
