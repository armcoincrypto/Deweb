# Deweb Git State Investigation

**Date:** 2026-06-23  
**Project:** `/var/www/deweb`  
**Scope:** HIGH-1 Deployment State Recovery & Release Hygiene  
**Mode:** Read-only investigation — no commits, merges, resets, pushes, or deletions performed

---

## Executive Summary

| Item | Finding |
|------|---------|
| **Branch** | `main` @ `8bd8559` — matches `origin/main` (no commits behind/ahead) |
| **Dirty working tree** | **56 modified** + **26 untracked** files (after `.gitignore` fix: uploads no longer pollute status) |
| **Why pull was blocked (Jun 14)** | Auto-deploy tried fast-forward `06c3104 → 8bd8559` while local uncommitted edits overlapped incoming files |
| **Why pull works today (same SHA)** | `git pull` returns "Already up to date" — no merge required |
| **Why pull will block again** | Next `origin/main` advance + 56+ local modifications → `update.sh` `git pull` aborts |
| **Build artifacts in git** | ✅ None — `.next/`, `node_modules/` not tracked |
| **Generated uploads in git** | ✅ Blog PNGs now gitignored; only `backend/uploads/blog/.gitkeep` tracked |
| **P0 fixes in git** | ❌ Not committed — production runs from dirty working tree |
| **Stashes** | 5 WIP stashes exist (May–Jun 2026) — recovery option, review before drop |

### Final Verdict

**DEPLOYMENT_BLOCKED**

Safe repeatable deployments require committing (or safely stashing) local work, pushing to GitHub, and updating `deploy/update.sh` to handle dirty-tree scenarios — **before** the next remote push.

---

## Phase 1 — Git State Investigation

### Commands Run

```bash
cd /var/www/deweb
git status
git branch -a
git remote -v
git log --oneline -20
git stash list
git fetch origin main          # failed: no GitHub credentials in this shell
git rev-parse HEAD
git rev-parse origin/main
git diff --stat
git ls-files | grep -E '\.next/|node_modules/|uploads/'
git pull --dry-run             # failed: no GitHub credentials
tail -40 /var/log/deweb-auto-deploy.log
```

### Branch & Remote

```
* main
  remotes/origin/main
origin  https://github.com/gagpoghosyan99/deweb-community.git (fetch/push)
HEAD    8bd8559 Show clear X API credits error instead of missing-keys hint.
```

### Stash List

| Stash | Base commit message |
|-------|---------------------|
| `stash@{0}` | Fix ru/am testimonial translations and ignore Lighthouse reports |
| `stash@{1}` | Add translations, CTA tracking, social proof, and Lighthouse audit |
| `stash@{2}` | Refine DeWeb for smoother animations… (duplicate) |
| `stash@{3}` | Refine DeWeb for smoother animations… |
| `stash@{4}` | Redesign homepage with Antigravity-style sections… |

**Note:** Stashes preserve older WIP. Do **not** `git stash drop` without review. Prefer `git stash show -p stash@{N}` before applying.

### Auto-Deploy Failure (2026-06-14)

From `/var/log/deweb-auto-deploy.log`:

```
Deploying 06c31044 -> 8bd85593
error: Your local changes to the following files would be overwritten by merge:
    backend/.env.example
    backend/src/services/dewebamBot.js
    backend/src/services/dewebamPublish.js
    backend/src/services/xOAuth.js
fatal: Cannot fast-forward your working tree.
```

**Root cause:** Cron `auto-deploy.sh` detected new remote commits and ran `update.sh`, which calls `git pull origin main`. Git refused because uncommitted local edits conflicted with incoming changes.

**Current status:** Those four files are **no longer modified** — the Jun 14 pull eventually partially applied or changes were reconciled. However, **55+ other files** are now modified/untracked, so the **same failure mode** will recur on the next remote advance.

### Build Artifact Audit

| Path | Tracked in git? | Correct? |
|------|-----------------|----------|
| `node_modules/` | No | ✅ |
| `web/.next/` | No | ✅ |
| `web/out/` | No | ✅ |
| `backend/data/*.sqlite` | No (gitignored) | ✅ |
| `web/.lighthouse/report.json` | No (`web/.gitignore`) | ✅ |
| `backend/uploads/blog/.gitkeep` | Yes | ✅ placeholder only |
| `backend/uploads/blog/*.png` | No (added to root `.gitignore` this audit) | ✅ |
| `*.png` favicons in `web/public/` | Yes | ✅ intentional assets |

**Conclusion:** No `.next` or `node_modules` committed. Upload PNGs were polluting `git status` — fixed via `.gitignore` update (not yet committed).

---

## Phase 2 — File Classification

Legend: **Keep** = retain on server | **Commit** = should enter git | **Ignore** = gitignore | **Archive** = move to stash/backup, do not commit as-is

### Modified Files (56)

#### 1. Production source code — **Commit**

| File | Notes |
|------|-------|
| `backend/src/data/services-page.json` | P0 JSON fix |
| `backend/src/index.js` | P0 route mounts + test-ai guard |
| `backend/src/routes/auth.js` | P0 login rate limit |
| `backend/src/services/xOAuth.js` | P0 status sanitization |
| `web/src/app/[locale]/**/*.tsx` (18 pages) | SEO, i18n, marketplace, legal |
| `web/src/app/globals.css` | Styles |
| `web/src/app/robots.ts` | SEO |
| `web/src/app/sitemap.ts` | SEO |
| `web/src/components/**/*.tsx` (16 files) | UI components |
| `web/src/i18n/messages/*.json` (4 locales) | Translations |
| `web/src/lib/api.ts` | API client |
| `web/src/lib/home-pinned-services-data.ts` | Homepage data |
| `web/src/lib/seo.ts` | SEO helpers |
| `web/src/middleware.ts` | Canonical redirects |
| `web/tsconfig.json` | P0 build fix (exclude WIP dirs) |
| `web/next.config.mjs` | Redirects, images |
| `web/scripts/seo-audit.mjs` | Tooling |

#### 2. Configuration — **Commit**

| File | Notes |
|------|-------|
| `deploy/nginx-deweb-production.conf` | Production nginx template |
| `web/package.json` | Pin typescript + types versions |
| `web/package-lock.json` | Lockfile — commit with package.json |
| `.gitignore` | Upload ignore rules (this audit) |

#### 3. Generated / binary assets — **Commit** (if intentional)

| File | Notes |
|------|-------|
| `deweb-community/android-chrome-192x192.png` | Favicon |
| `deweb-community/android-chrome-512x512.png` | Favicon |
| `deweb-community/site.webmanifest` | PWA manifest |

#### 4. Editor / local tooling — **Keep local, optional commit**

| File | Recommendation |
|------|----------------|
| `web/.cursor/rules/deweb.mdc` | Commit if team uses Cursor rules; else Keep |
| `backend/src/loadEnv.js` | **Commit** after deduping with `utils/loadEnv.js` |

---

### Untracked Files (26)

#### Production source — **Commit**

| Path | Notes |
|------|-------|
| `backend/src/utils/frontendUrl.js` | **Required** — imported by `routes/auth.js` |
| `web/src/i18n/content/` | Locale content packs |
| `web/src/lib/i18n/` | i18n helpers |
| `web/src/lib/sitemap-utils.ts` | Sitemap helpers |
| `web/src/lib/country-codes.ts` | Phone input data |
| `web/src/app/[locale]/not-found.tsx` | 404 page |
| `web/src/app/not-found.tsx` | Root 404 |
| `web/src/app/sitemap-blog.xml/` | Blog sitemap route |
| `web/src/components/ui/PhoneInput.tsx` | UI component |
| `web/scripts/ping-sitemaps.mjs` | Ops script |
| `web/public/brand-logo-full.png` | Brand asset |
| `web/components.json` | shadcn config |
| `docs/audits/` | Audit reports |

#### WIP (not in production routes) — **Keep local, commit later or exclude**

| Path | Notes |
|------|-------|
| `web/src/components/3d/` | Excluded from build via tsconfig |
| `web/src/components/homepage/` | Not wired in `page.tsx` |
| `web/src/components/premium/` | Not wired in production routes |
| `web/src/components/animations/` | Used only by WIP dirs |
| `web/src/components/ui/accordion.tsx` | WIP deps |
| `web/src/components/ui/badge.tsx` | WIP deps |
| `web/src/components/ui/button.tsx` | WIP deps |
| `web/src/components/ui/card.tsx` | WIP deps |
| `web/src/lib/animations/` | WIP |
| `web/src/lib/design-system/` | WIP (imports `motion` pkg) |
| `web/.cursor/rules/design-system.mdc` | Editor config |

#### Duplicates / mistakes — **Archive (do not commit)**

| File | Notes |
|------|-------|
| `backend/src/utils/auth.js` | Stale copy of `routes/auth.js` — **missing loginLimiter**; not imported anywhere |
| `backend/src/utils/loadEnv.js` | Duplicate of `backend/src/loadEnv.js` — consolidate before commit |

#### Previously untracked, now ignored — **Ignore**

| Path | Rule |
|------|------|
| `backend/uploads/blog/*.png` | `.gitignore` `backend/uploads/blog/*` |
| `backend/uploads/social/` | `.gitignore` `backend/uploads/social/` |

---

## Phase 3 — `.gitignore` Audit

### Already covered ✅

| Pattern | Location |
|---------|----------|
| `node_modules/` | Root |
| `web/node_modules/` | Root |
| `web/.next/`, `.next/`, `out/` | Root + `web/.gitignore` |
| `.env`, `.env.*` | Root |
| `backend/data/*.sqlite*` | Root |
| `coverage/`, `*.log` | Root |
| `web/.lighthouse` | `web/.gitignore` |
| `*.tsbuildinfo` | Root + web |

### Added this audit ✅

```gitignore
# Runtime uploads (keep directory placeholders only)
backend/uploads/blog/*
!backend/uploads/blog/.gitkeep
backend/uploads/social/
```

### Not added (intentionally)

| Pattern | Reason |
|---------|--------|
| `docs/audits/` | Should be committed for audit trail |
| `web/src/components/3d/` | Source code — exclude via tsconfig, not gitignore |
| `.cursor/` | Team may want rules in repo |

**`.gitignore` change is unstaged** — requires commit approval.

---

## Phase 4 — Deployment Audit

### Current deployment flow

```
GitHub push (main)
    │
    ├─► GitHub Actions deploy.yml ──SSH──► deploy/update.sh
    │
    └─► Cron (* * * * *) auto-deploy.sh
            │ fetch origin/main
            │ if LOCAL != REMOTE → update.sh
            ▼
        deploy/update.sh
            1. git pull origin main          ← FAILS if dirty tree conflicts
            2. cd backend && npm install --omit=dev
            3. systemctl restart deweb-api
            4. cd web && npm install && npm run favicons && npm run build
            5. systemctl restart deweb-next
            6. cp nginx config → sites-available
            7. nginx -t && systemctl reload nginx
            8. curl health checks
```

### Build flow

| Component | Command | Working dir |
|-----------|---------|-------------|
| API | `node src/index.js` (no build step) | `/var/www/deweb/backend` |
| Frontend | `npm run build` → `next start -p 3001` | `/var/www/deweb/web` |
| Favicons | `npm run favicons` (during deploy) | `/var/www/deweb/web` |

### Restart flow

| Service | Unit file | User |
|---------|-----------|------|
| API | `/etc/systemd/system/deweb-api.service` | root |
| Next.js | `/etc/systemd/system/deweb-next.service` | root |
| nginx | `systemctl reload nginx` | root |

### Rollback capability

| Method | Exists? | Notes |
|--------|---------|-------|
| `git revert` / checkout previous SHA | Partial | Requires clean or stashed tree |
| `git reset --hard` | ❌ **Do not use** | Would destroy 56+ local modifications |
| Database rollback | ❌ | No automated backups |
| systemd restart previous build | Manual | Old `.next` overwritten on build |
| Stash recovery | ✅ | 5 stashes available |

### Failure points

1. **`git pull` with dirty working tree** — primary blocker (Jun 14, will recur)
2. **`npm run build` failure** — fixed in P0 but WIP dirs still excluded
3. **No pre-deploy validation** — `update.sh` does not run `npm run build` before restart API
4. **API restarted before frontend build** — brief API-only window during deploy
5. **Cron every minute** — noisy; hammers GitHub; logs failures repeatedly
6. **Runs as root** — security risk
7. **No git backup before pull** — `update.sh` has no `git stash` or tarball step
8. **GitHub Actions + cron double-deploy** — both trigger `update.sh` on push

---

## Phase 5 — Validation (this session)

```bash
cd /var/www/deweb && git status --short | wc -l    # 82 lines (56 M + 26 ??)
cd /var/www/deweb/web && npm run build             # ✅ PASS (exit 0)
nginx -t                                             # ✅ PASS
```

---

## Recommended Recovery Path (requires approval)

**Do not run without explicit sign-off.**

### Step A — Backup (mandatory first)

```bash
BACKUP="/var/backups/deweb-git-$(date -u +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP"
tar -czf "$BACKUP/deweb-working-tree.tar.gz" -C /var/www deweb
cp -a /var/www/deweb/backend/data/deweb.sqlite "$BACKUP/" 2>/dev/null || true
echo "Backup at $BACKUP"
```

### Step B — Organize commits (suggested split)

1. `fix: P0 production safety (API routes, JSON, rate limit, x status)`
2. `fix: web build + tsconfig exclude WIP 3d components`
3. `feat: i18n content packs + SEO/sitemap improvements`
4. `chore: gitignore runtime uploads + audit docs`
5. WIP components — **separate branch** or defer

### Step C — Remove duplicates before commit

- Delete or archive `backend/src/utils/auth.js` (stale duplicate)
- Merge `backend/src/utils/loadEnv.js` into `backend/src/loadEnv.js` or vice versa

### Step D — Push & verify deploy

```bash
git push origin main
bash /var/www/deweb/deploy/update.sh   # after tree is clean
```

### Step E — Harden auto-deploy (follow-up)

- Change cron from `* * * * *` to `*/5 * * * *` or webhook-only
- Add pre-pull backup to `update.sh`
- Add `git diff --quiet || { echo "dirty tree"; exit 1; }` guard with alert

---

## Files Changed During This Audit

| File | Change |
|------|--------|
| `.gitignore` | Added `backend/uploads/blog/*`, `backend/uploads/social/` |
| `docs/audits/deweb-git-state-investigation.md` | Created (this file) |
| `docs/runbooks/deweb-safe-deployment.md` | Created |

No git commits, stashes, resets, or pushes performed.

---

*End of git state investigation.*
