import { Router } from "express";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { db, getPlatformStat } from "../db.js";

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let catalogCache = null;

function loadCatalog() {
  if (catalogCache) return catalogCache;
  const file = path.join(__dirname, "../data/services-catalog.json");
  catalogCache = JSON.parse(readFileSync(file, "utf8"));
  return catalogCache;
}

router.get("/catalog", (_req, res) => {
  res.json({ catalog: loadCatalog() });
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
