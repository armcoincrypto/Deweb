# DEWEB armcoincrypto Backup — Working Tree Cleanup

**Date:** 2026-06-24 03:03 CEST  
**Target repo:** `git@github-deweb:armcoincrypto/Deweb.git`  
**Server path:** `/var/www/deweb`

---

## Summary

| Category | Count | Action |
|----------|-------|--------|
| Production fixes | 4 backend + SEO commits (prior) | Already in git history |
| Dependency fixes | `web/package.json` / lock | Commit (build recovery) |
| SEO fixes | middleware, seo, schema, blog/services pages | Commit (modified, some overlap prior commits) |
| WIP UI | 3d, homepage, premium, animations | **Commit** (included in full backup; build passes) |
| Docs | audits, runbooks | Commit |
| Generated / ignored | `.env`, `node_modules`, `.next`, uploads, sqlite | **Never commit** |
| Dangerous / stale | `backend/src/utils/auth.js`, `loadEnv.js` duplicates | **gitignore** (archived copies exist) |

---

## A — Production Fixes (in git history)

| Commit | Content |
|--------|---------|
| `acfeed7` | Backend routes, auth rate limit, xOAuth sanitize, frontendUrl, tsconfig excludes |
| `16cc14a` | SEO-P0: soft 404, x-default, OG image, SearchAction removal |
| `91ce55a`, `83cab33` | Deployment / recovery docs |

---

## B — Dependency Fixes (this session — 502 recovery)

Build failed after tsconfig removed WIP excludes; missing packages installed:

| Package | Reason |
|---------|--------|
| `lucide-react` | `accordion.tsx` ChevronDown icon |
| `@radix-ui/react-accordion` | FAQ accordion UI |
| `class-variance-authority` | `badge.tsx`, `button.tsx` |
| `@radix-ui/react-slot` | `button.tsx` |
| `motion` | `lib/design-system/motion.ts` (animations chain) |

Already present: `three`, `@react-three/*` (3D WIP).

---

## C — SEO Fixes (modified working tree)

| File | Notes |
|------|-------|
| `web/src/middleware.ts` | x-default Link headers |
| `web/src/lib/seo.ts` | OG 1200×630, hreflang helpers |
| `web/src/lib/schema.ts` | No SearchAction |
| `web/src/i18n/routing.ts` | `alternateLinks: false` |
| `web/src/app/[locale]/blog/[slug]/page.tsx` | `notFound()` / static params |
| `web/src/app/[locale]/services/[slug]/page.tsx` | `notFound()` / static params |

**Note:** Live blog fake slug returned HTTP 200 (cached prerender) after 502 recovery — SEO fix may need rebuild/cache bust; tracked in final report.

---

## D — WIP UI (committed in full backup)

| Path | Notes |
|------|-------|
| `web/src/components/3d/` | React Three Fiber |
| `web/src/components/homepage/` | Alternate homepage |
| `web/src/components/premium/` | Premium UI kit |
| `web/src/components/animations/` | Scroll/animation helpers |
| `web/src/components/cinematic/ScrollUniverseLayer.tsx` | 3D globe layer (used in production home) |
| `web/src/components/ui/{accordion,badge,button,card,PhoneInput,SparkleField}.tsx` | shadcn-style components |
| `web/src/lib/design-system/` | Motion tokens |

**Not deleted** — all preserved in backup commit.

---

## E — Docs & Config

| Path | Notes |
|------|-------|
| `docs/audits/*` | Audit reports |
| `docs/runbooks/*` | Deployment runbooks |
| `docs/archive/*` | Stale utils archive |
| `deploy/nginx-deweb-production.conf` | Production nginx template |
| `.gitignore` | Expanded secret/artifact ignores |

---

## F — Do NOT Commit

| Item | Protection |
|------|------------|
| `backend/.env` | `.gitignore` (`*.env`) |
| `node_modules/` | `.gitignore` |
| `web/.next/` | `.gitignore` |
| `backend/data/*.sqlite*` | `.gitignore` |
| `backend/uploads/blog/*` | `.gitignore` |
| `backend/src/utils/auth.js` | Stale duplicate — `.gitignore` |
| `backend/src/utils/loadEnv.js` | Stale duplicate — `.gitignore` |
| Logs, PEM, private keys | `.gitignore` + pre-commit name scan |

---

## G — Remote Status

| Remote | URL |
|--------|-----|
| `origin` | `git@github-deweb:armcoincrypto/Deweb.git` |
| Remote `main` | `af15f47` — "Initial commit" (README only) |
| Local `main` | `83cab33` + pending backup commit |
| Histories | **Unrelated** — merge or force required for push |

---

## Backup Archive

`/var/backups/deweb/deweb-before-armcoincrypto-backup-20260624-025904.tar.gz` (37M)
