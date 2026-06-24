# Deweb armcoincrypto Backup — Final Report

**Date:** 2026-06-24 03:05 CEST  
**Project:** `/var/www/deweb`  
**Target repo:** https://github.com/armcoincrypto/Deweb  
**Production:** https://dewebam.com

---

## Executive Verdict

**`SITE_RECOVERED_BACKUP_PUSHED`**

The frontend 502 is resolved (home returns **200**). Full production source is committed and pushed to `armcoincrypto/Deweb`. Working tree is clean. One non-blocking SEO regression remains: invalid blog slugs return HTTP **200** (soft 404) because `dynamicParams = true` was restored in the backup commit.

---

## Root Cause (502)

| Item | Finding |
|------|---------|
| Symptom | `https://dewebam.com/en` → **502** |
| Service | `deweb-next` crash-looping (restart counter 84+) |
| Cause | `npm run build` failed — missing npm packages after WIP UI files entered TypeScript compile scope |
| First error | `class-variance-authority` (badge/button components) |
| Additional | `motion` (design-system/animations chain) |

Production `.next` was missing/stale; `next start` could not serve pages until a successful build.

---

## What Was Fixed

1. **Tar backup** — `/var/backups/deweb/deweb-before-armcoincrypto-backup-20260624-025904.tar.gz` (37M)
2. **Dependencies installed** in `/var/www/deweb/web`:
   - `lucide-react`, `@radix-ui/react-accordion`
   - `class-variance-authority`, `@radix-ui/react-slot`
   - `motion`
3. **`npm run build`** — PASS from `/var/www/deweb/web`
4. **`deweb-next` restarted** — only after build passed
5. **Remote switched** — `git@github-deweb:armcoincrypto/Deweb.git`
6. **`.gitignore` hardened** — `*.env`, sqlite WAL/journal, logs, stale utils
7. **Full source backup commit** — 155 files, no secrets/artifacts
8. **Merged remote Initial commit** — README conflict resolved
9. **Pushed to GitHub** — `origin/main` @ `8bec0c2`

---

## Git Remote Status

```
origin  git@github-deweb:armcoincrypto/Deweb.git (fetch/push)
HEAD    8bec0c2 (main, origin/main)
```

```
git ls-remote origin main
8bec0c2068232f17403228173909dc277990b0a0  refs/heads/main
```

Working tree: **clean**

---

## GitHub Auth Status

| Check | Result |
|-------|--------|
| `git ls-remote origin` | **PASS** (deploy key on `github-deweb` host) |
| `git push origin main` | **PASS** |

---

## Commits Created (this session)

| SHA | Message |
|-----|---------|
| `4b0c236` | chore: backup deweb production source to armcoincrypto repo |
| `8bec0c2` | chore: merge armcoincrypto remote and resolve README |

Prior history (included in push): `acfeed7`, `16cc14a`, `91ce55a`, `83cab33`, …

---

## Files Committed (backup — 155 files)

Includes: backend, web (app, components, i18n, lib), deploy configs, docs/audits, WIP 3d/homepage/premium/animations, package files.

**Not committed (protected):**

| Item | Protection |
|------|------------|
| `backend/.env` | `.gitignore` |
| `node_modules/` | `.gitignore` |
| `web/.next/` | `.gitignore` |
| `backend/data/*.sqlite*` | `.gitignore` |
| `backend/uploads/` | `.gitignore` |
| Stale `backend/src/utils/auth.js`, `loadEnv.js` | `.gitignore` |

Pre-commit scan: no `.env`, `.pem`, private keys, or uploads staged.

---

## Build Results

```bash
cd /var/www/deweb/web && npm run build  → PASS (post-recovery and post-push)
cd /var/www/deweb/backend && node --check src/index.js → PASS
```

Packages added to `web/package.json`:

- `class-variance-authority`, `@radix-ui/react-slot`, `motion`
- (Already present: `lucide-react`, `@radix-ui/react-accordion`, `three`, `@react-three/*`)

---

## Nginx Results

```
nginx -t → syntax ok, test successful
```

---

## Live Smoke Results

| Check | Result | Expected |
|-------|--------|----------|
| `/api/health` | **200** | 200 |
| `/en` | **200** | 200 |
| `/en/blog/fake-slug` | **200** | 404 |

**502 recovery:** ✅ Home and API healthy.  
**SEO soft-404:** ⚠️ Blog invalid slug returns 200 (cached prerender + `dynamicParams = true` in current `blog/[slug]/page.tsx`). Fix in a follow-up commit.

---

## Correct Future Deploy Command

```bash
cd /var/www/deweb
git pull origin main

cd /var/www/deweb/web
npm ci
npm run build

nginx -t

sudo systemctl restart deweb-api
sudo systemctl restart deweb-next

curl -s -o /dev/null -w "health: %{http_code}\n" https://dewebam.com/api/health
curl -s -o /dev/null -w "home: %{http_code}\n" https://dewebam.com/en
```

**Never** run `npm run build` from `/var/www/deweb` root.

---

## Backups

| File | Size |
|------|------|
| `/var/backups/deweb/deweb-before-armcoincrypto-backup-20260624-025904.tar.gz` | 37M |
| `/var/backups/deweb/deweb-before-git-recovery-20260623-184711.tar.gz` | (prior) |
| `/var/backups/deweb/deweb-local-git-20260623-184711.bundle` | (prior) |

---

## Remaining Risks

1. **Blog soft 404** — re-apply `dynamicParams = false` + CMS slugs in `generateStaticParams`
2. **Large repo** — WIP 3D/homepage committed for backup; consider feature branches later
3. **npm audit** — 16 reported vulnerabilities (pre-existing)
4. **Node engine** — `camera-controls` wants Node ≥22; server runs v20 (warning only, build passes)
5. **Auto-deploy cron** — should work now that remote auth + clean tree are restored

---

## Next Priority

1. Re-apply blog SEO-P0 soft-404 fix and redeploy
2. Pin deploy key access on `armcoincrypto/Deweb` (rotate if needed)
3. Run `git pull` + `deploy/update.sh` on schedule to confirm auto-deploy
4. Triage npm audit at maintenance window

---

*Related: `docs/audits/deweb-armcoincrypto-backup-cleanup-20260624-0303.md`*
