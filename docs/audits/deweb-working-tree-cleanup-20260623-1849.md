# DEWEB Working Tree Cleanup Report

**Date:** 2026-06-23 18:49 CEST  
**Project:** `/var/www/deweb`  
**Branch:** `main` (ahead of `origin/main` by 2 commits)  
**Dirty file count:** 54 modified/untracked entries (pre-cleanup snapshot)

---

## Summary

| Category | Count | Action taken |
|----------|-------|--------------|
| A — Must commit now | 3 docs | Staged for docs commit |
| B — Keep local WIP | 19 untracked + related | Left in place (not imported by production build) |
| C — Archive duplicates | 2 untracked | Copied to `docs/archive/stale-utils/`; originals kept locally |
| D — Ignore / defer | 32 modified | Left uncommitted; documented below |

**Stash:** Not used — WIP dirs are untracked and excluded from `web/tsconfig.json`; production build passes without stashing.

---

## A — Must Commit Now

| File | Reason |
|------|--------|
| `docs/audits/deweb-deployment-seo-p0-fix-20260623-1837.md` | Deployment + SEO-P0 audit from prior session |
| `docs/audits/deweb-working-tree-cleanup-20260623-1849.md` | This report |
| `docs/audits/deweb-github-deploy-recovery-final-20260623-1850.md` | Final recovery report (created after validation) |
| `docs/runbooks/deweb-safe-deployment.md` | Updated deploy/auth runbook |

**Already committed (prior session):**

- `acfeed7` — production safety fixes
- `16cc14a` — SEO-P0 fixes

---

## B — Keep Local WIP (do not commit)

These are experimental UI / 3D work. Excluded from TypeScript build via `web/tsconfig.json`. Not imported by any `web/src/app/**` route.

| Path | Notes |
|------|-------|
| `web/src/components/3d/` | React Three Fiber experiments |
| `web/src/components/homepage/` | Alternate homepage sections |
| `web/src/components/premium/` | Premium UI primitives |
| `web/src/components/animations/` | Animation helpers for WIP homepage |
| `web/src/components/cinematic/ScrollUniverseLayer.tsx` | Imports 3D globe (WIP) |
| `web/src/components/cinematic/ServiceStoryCard.tsx` | Cinematic experiment |
| `web/src/components/ui/PhoneInput.tsx` | Design-system WIP |
| `web/src/components/ui/SparkleField.tsx` | Design-system WIP |
| `web/src/components/ui/accordion.tsx` | shadcn WIP (tsconfig excluded) |
| `web/src/components/ui/badge.tsx` | shadcn WIP |
| `web/src/components/ui/button.tsx` | shadcn WIP |
| `web/src/components/ui/card.tsx` | shadcn WIP |
| `web/.cursor/rules/design-system.mdc` | Cursor rules only |
| `web/components.json` | shadcn config |
| `web/public/brand-logo-full.png` | Asset not yet wired to production |

**Related modified deps (WIP — do not commit):**

| File | Change |
|------|--------|
| `web/package.json` | Adds `@react-three/*`, `three`, `@types/three` (WIP 3D) |
| `web/package-lock.json` | Lockfile for WIP deps |

Note: `sharp` is already in committed `package.json`; working tree adds only Three.js packages.

---

## C — Archive Duplicates

| File | Status | Action |
|------|--------|--------|
| `backend/src/utils/auth.js` | Stale duplicate of `backend/src/routes/auth.js` (missing rate limit) | Copied to `docs/archive/stale-utils/auth.js.untracked-copy`; **not deleted** |
| `backend/src/utils/loadEnv.js` | Duplicate of `backend/src/loadEnv.js` | Copied to `docs/archive/stale-utils/loadEnv.js.untracked-copy`; **not deleted** |

Canonical sources: `backend/src/routes/auth.js`, `backend/src/loadEnv.js`.

---

## D — Modified / Deferred (not committed this recovery)

### Production-adjacent (review before next release)

| File | Classification | Notes |
|------|----------------|-------|
| `backend/src/loadEnv.js` | Defer | Adds `FRONTEND_URL` debug log only; low risk, optional commit |
| `deploy/nginx-deweb-production.conf` | Defer | Valid SEO/nginx improvements (apex canonical, www 301); live nginx may differ — review before commit + reload |
| `web/next.config.mjs` | Defer | SEO/i18n config deltas — partially overlapping committed work |
| `web/scripts/seo-audit.mjs` | Defer | Audit tooling |
| `web/scripts/ping-sitemaps.mjs` | Untracked | New script |
| `web/tailwind.config.js` | Defer | Design tokens WIP |

### i18n / content (large SEO pass — separate PR)

| File | Notes |
|------|-------|
| `web/src/i18n/messages/en.json` | Translation updates |
| `web/src/i18n/messages/es.json` | Translation updates |
| `web/src/i18n/messages/ru.json` | Translation updates |
| `web/src/i18n/messages/am.json` | Translation updates |
| `web/src/i18n/content/` | Untracked content merge layer |

### Component / layout deltas (non-P0)

| File |
|------|
| `web/src/components/about/AboutView.tsx` |
| `web/src/components/account/ProfileView.tsx` |
| `web/src/components/auth/ForgotPasswordForm.tsx` |
| `web/src/components/auth/ResetPasswordForm.tsx` |
| `web/src/components/auth/SignupForm.tsx` |
| `web/src/components/blog/BlogListingFilters.tsx` |
| `web/src/components/blog/BlogListingView.tsx` |
| `web/src/components/blog/PinnedBlogListingExperience.tsx` |
| `web/src/components/cinematic/CinematicHome.tsx` |
| `web/src/components/cinematic/PinnedServiceExperience.tsx` |
| `web/src/components/cinematic/PinnedServiceSlide.tsx` |
| `web/src/components/cinematic/SmoothScrollProvider.tsx` |
| `web/src/components/cookies/CookieConsent.tsx` |
| `web/src/components/home/HomePortfolio.tsx` |
| `web/src/components/layout/PlatformFooter.tsx` |
| `web/src/components/legal/LegalPageView.tsx` |
| `web/src/components/services/ServiceBanners.tsx` |
| `web/src/components/services/ServicesView.tsx` |
| `web/src/components/ui/ParticlesBackground.tsx` |

### Legacy static / misc

| File | Notes |
|------|-------|
| `deweb-community/android-chrome-192x192.png` | Favicon binary |
| `deweb-community/android-chrome-512x512.png` | Favicon binary |
| `deweb-community/site.webmanifest` | PWA manifest |
| `web/.cursor/rules/deweb.mdc` | Editor rules only |

---

## Build Dependency Check

```
cd /var/www/deweb/web && npm run build   → PASS (2026-06-23 18:48)
```

Production routes under `web/src/app/**` do **not** import WIP `homepage/`, `3d/`, `premium/`, or `animations/` directories. WIP can remain untracked without blocking deploy.

---

## Recommended Next Git Actions

1. **Human:** Add deploy key to GitHub (see final recovery report).
2. **After auth works:** `git push origin main` (2 existing commits + docs commit).
3. **Separate PR:** i18n message updates + component SEO pass.
4. **Separate branch:** WIP 3D/homepage (`web/src/components/{3d,homepage,premium,animations}`).
5. **Optional:** Add `backend/src/utils/auth.js` and `backend/src/utils/loadEnv.js` to `.gitignore` to prevent accidental commit.

---

## Backups Created This Session

| Artifact | Path |
|----------|------|
| Tree archive | `/var/backups/deweb/deweb-before-git-recovery-20260623-184711.tar.gz` |
| Git bundle | `/var/backups/deweb/deweb-local-git-20260623-184711.bundle` |
