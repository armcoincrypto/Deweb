# DEWEB Deployment Recovery + SEO-P0 Fix Report

**Date:** 2026-06-23 18:37 CEST  
**Domain:** https://dewebam.com  
**Project:** `/var/www/deweb`

---

## Final Verdict

**`DEPLOYMENT_READY_SEO_P0_PASS`**

Production safety fixes and SEO-P0 blockers are committed, built, deployed (local restart), and validated live. Remaining uncommitted WIP (components, i18n messages, package changes) does not block the P0 release path but should be triaged before the next `git pull` auto-deploy.

---

## Backup

| Item | Value |
|------|-------|
| Archive | `/var/backups/deweb/deweb-before-deploy-seo-p0-20260623-182715.tar.gz` |
| Excludes | `node_modules`, `web/.next`, `.git` |

---

## Commits Created

| SHA | Message |
|-----|---------|
| `acfeed7` | `fix: stabilize deweb production safety and deployment state` |
| `16cc14a` | `fix: resolve deweb seo p0 technical blockers` |

### Commit 1 — Production safety (`acfeed7`)

- `backend/src/index.js` — mount wallet/checkout/crypto/cards; guard `/api/test-ai` in production
- `backend/src/data/services-page.json` — valid JSON
- `backend/src/routes/auth.js` — login rate limiting
- `backend/src/services/xOAuth.js` — sanitized `/api/x/status` response
- `backend/src/utils/frontendUrl.js` — canonical frontend URL helper for auth emails
- `web/tsconfig.json` — exclude WIP 3D/homepage/premium paths from build
- `.gitignore` — ignore uploaded blog/social assets
- `docs/audits/*`, `docs/runbooks/*` — investigation and runbook docs
- `docs/archive/stale-utils/*` — archived duplicate utils (not deleted)

### Commit 2 — SEO-P0 (`16cc14a`)

- `web/src/app/[locale]/blog/[slug]/page.tsx` — `dynamicParams = false`, CMS slugs in `generateStaticParams`, `notFound()` for missing articles
- `web/src/app/[locale]/services/[slug]/page.tsx` — `dynamicParams = false`, `notFound()` for invalid services
- `web/src/middleware.ts` — custom `Link` headers; `x-default` → `https://dewebam.com/en`
- `web/src/i18n/routing.ts` — `alternateLinks: false` (single hreflang source)
- `web/src/lib/seo.ts` — OG constants (`1200×630`), `buildLanguageAlternates`, `buildAlternateLinkHeader`
- `web/src/lib/schema.ts` — removed invalid `SearchAction` from WebSite schema
- `web/public/og/deweb-og-1200x630.png` — real 1200×630 PNG asset
- Supporting SEO/i18n app routes and libs included under `web/src/app` and `web/src/lib`

---

## Commands Run

```bash
# Phase 1 — Backup
cd /var/www/deweb
sudo mkdir -p /var/backups/deweb
sudo tar -czf /var/backups/deweb/deweb-before-deploy-seo-p0-20260623-182715.tar.gz \
  --exclude=node_modules --exclude=web/.next --exclude=.git /var/www/deweb

# Phase 2/4 — Build validation
cd /var/www/deweb/web && npm run build
sudo nginx -t

# Phase 2 — Production safety commit
git add backend/src/index.js backend/src/data/services-page.json \
  backend/src/routes/auth.js backend/src/services/xOAuth.js \
  backend/src/utils/frontendUrl.js web/tsconfig.json .gitignore \
  docs/audits docs/runbooks docs/archive
git commit -m "fix: stabilize deweb production safety and deployment state"

# Phase 5 — SEO-P0 commit
git add web/src/app web/src/lib web/src/middleware.ts web/public/og web/src/i18n/routing.ts
git commit -m "fix: resolve deweb seo p0 technical blockers"

# Phase 6 — Deploy
sudo systemctl restart deweb-api
sudo systemctl restart deweb-next
```

---

## Before / After Results

### Deployment state

| Check | Before | After |
|-------|--------|-------|
| P0 fixes committed | No | Yes (`acfeed7`) |
| SEO-P0 fixes committed | No | Yes (`16cc14a`) |
| `npm run build` | Passed (with i18n warnings) | Passed |
| `nginx -t` | OK | OK |
| Auto-deploy `git pull` readiness | Blocked (dirty tree) | Partial — 2 commits local; WIP still uncommitted |

### SEO-P0 (live — https://dewebam.com)

| Check | Before | After |
|-------|--------|-------|
| `/en/blog/fake-slug` | 200 (soft 404) | **404** |
| `/en/services/fake-slug` | 200 (soft 404) | **404** |
| HTTP `Link` x-default | `https://dewebam.com/` | **`https://dewebam.com/en`** |
| HTML hreflang x-default | `https://dewebam.com/en` | **`https://dewebam.com/en`** (matches) |
| SearchAction schema | Present (invalid URL) | **Removed** |
| OG image | 512×512 declared as 1200×630 | **`/og/deweb-og-1200x630.png` (1200×630)** |
| `/api/health` | 200 | **200** |
| `/en` home | 200 | **200** |

### Live validation output (2026-06-23 18:37)

```
health: 200
home: 200
blog fake: 404
service fake: 404
```

HTTP Link header:

```
link: <https://dewebam.com/en>; rel="alternate"; hreflang="x-default"
```

HTML:

```
hrefLang="x-default" href="https://dewebam.com/en"
property="og:image" content="https://dewebam.com/og/deweb-og-1200x630.png"
property="og:image:width" content="1200"
property="og:image:height" content="630"
```

SearchAction: not found in page source (expected).

---

## Files Changed (summary)

**Backend (commit 1):** 6 source files + docs/archive  
**Frontend (commit 2):** 45 files — blog/services pages, middleware, seo/schema libs, OG asset, i18n routing, not-found boundaries, sitemap helpers  

**Not committed (intentionally):** WIP components (`3d/`, `homepage/`, `premium/`), i18n message JSON deltas, `package.json`/`package-lock.json` (sharp install), nginx deploy config, stale duplicate utils under `backend/src/utils/auth.js` and `loadEnv.js` (archived copies only).

---

## Remaining SEO Issues (post-P0)

From prior audit (`deweb-seo-current-state-audit-20260623-1612.md`), still open:

1. Blog listing HTML payload ~574 KB — performance/crawl efficiency
2. Marketplace thin/duplicate copy across locales
3. Sitemap `lastmod` accuracy for CMS posts
4. Missing `LocalBusiness` / richer entity schema where applicable
5. HSTS preload not enabled at nginx layer
6. Cookie-policy i18n `FORMATTING_ERROR` for `{date}` variable during static generation (build completes; should fix)
7. Push commits to `origin/main` before cron auto-deploy can succeed

---

## Next Roadmap

1. **Push commits** — `git push origin main` when ready so `deploy/update.sh` auto-pull succeeds
2. **Triage remaining dirty files** — commit valid i18n/SEO component work or stash WIP 3D/premium separately
3. **Fix cookie-policy `{date}` i18n** — eliminate build-time FORMATTING_ERROR warnings
4. **SEO P1** — reduce blog listing payload, improve marketplace copy, accurate sitemap dates
5. **Infrastructure** — enable HSTS, consider LocalBusiness schema on contact/about
6. **Monitor** — re-run `web/scripts/seo-audit.mjs` after push and GSC recrawl window

---

## Notes

- Blog soft-404 fix required `dynamicParams = false` plus CMS slugs in `generateStaticParams`; `notFound()` alone returned HTTP 200 with next-intl locale `not-found.tsx`.
- Middleware uses lightweight inline hreflang helpers (does not import heavy `seo.ts` graph).
- Services restart applied on-server; no hard reset or file deletion performed.
