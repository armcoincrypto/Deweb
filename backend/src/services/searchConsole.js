import fs from "fs";
import { db } from "../db.js";

const SITE_URL = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || "https://dewebam.com";

export function getSearchConsoleStatus() {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  const connected = Boolean(credPath && fs.existsSync(credPath));
  return {
    connected,
    siteUrl: SITE_URL,
    message: connected
      ? "Google Search Console credentials configured."
      : "Not connected — set GOOGLE_APPLICATION_CREDENTIALS to enable sync.",
  };
}

function aggregateFromDb(slug) {
  const where = slug ? "WHERE slug = ?" : "";
  const params = slug ? [slug] : [];

  const totals = db
    .prepare(
      `SELECT
         COALESCE(SUM(clicks), 0) AS clicks,
         COALESCE(SUM(impressions), 0) AS impressions,
         CASE WHEN SUM(impressions) > 0
           THEN ROUND(SUM(clicks) * 1.0 / SUM(impressions), 4)
           ELSE 0 END AS ctr,
         CASE WHEN SUM(impressions) > 0
           THEN ROUND(SUM(position * impressions) * 1.0 / SUM(impressions), 2)
           ELSE 0 END AS avgPosition
       FROM blog_search_console_daily ${where}`
    )
    .get(...params);

  const queryWhere = slug
    ? "WHERE slug = ? AND query IS NOT NULL AND query != ''"
    : "WHERE query IS NOT NULL AND query != ''";

  const topQueries = db
    .prepare(
      `SELECT query, SUM(clicks) AS clicks, SUM(impressions) AS impressions,
              CASE WHEN SUM(impressions) > 0
                THEN ROUND(SUM(clicks) * 1.0 / SUM(impressions), 4) ELSE 0 END AS ctr,
              CASE WHEN SUM(impressions) > 0
                THEN ROUND(SUM(position * impressions) * 1.0 / SUM(impressions), 2) ELSE 0 END AS position
       FROM blog_search_console_daily ${queryWhere}
       GROUP BY query
       ORDER BY clicks DESC, impressions DESC
       LIMIT 15`
    )
    .all(...params);

  const daily = db
    .prepare(
      `SELECT date, SUM(clicks) AS clicks, SUM(impressions) AS impressions
       FROM blog_search_console_daily ${where}
       GROUP BY date
       ORDER BY date DESC
       LIMIT 30`
    )
    .all(...params);

  return {
    clicks: totals.clicks,
    impressions: totals.impressions,
    ctr: totals.ctr,
    avgPosition: totals.avgPosition,
    topQueries,
    daily: daily.reverse(),
  };
}

/**
 * Returns GSC data from local cache table. Sync from Google API is optional future work.
 */
export function getSearchConsoleOverview() {
  const status = getSearchConsoleStatus();
  const data = aggregateFromDb();
  return { status, ...data };
}

export function getSearchConsoleForSlug(slug) {
  const status = getSearchConsoleStatus();
  const data = aggregateFromDb(slug);
  return { status, slug, ...data };
}

/**
 * Placeholder sync — only runs when credentials exist. Safe no-op otherwise.
 */
export async function syncSearchConsoleData() {
  const status = getSearchConsoleStatus();
  if (!status.connected) {
    return { ok: false, synced: 0, message: status.message };
  }
  return {
    ok: true,
    synced: 0,
    message: "GSC API sync not implemented yet. Import data into blog_search_console_daily.",
  };
}
