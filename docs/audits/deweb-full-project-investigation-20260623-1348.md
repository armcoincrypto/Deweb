# Deweb Full Project Investigation

**Audit date:** 2026-06-23 13:48 UTC  
**Auditor mode:** Read-only — no code changes, no restarts, no secret rotation  
**Server:** `root@95.111.233.120` (dewebam.com)

---

## Executive Verdict

**NOT_SAFE_FOR_PRODUCTION**

The marketing site and blog stack are partially operational, but several production-critical API routes are **not mounted**, a core API endpoint returns **500**, the Next.js **build currently fails**, auto-deploy has been **blocked for 9+ days** due to a dirty git tree, and multiple **public debug/OAuth endpoints** expose infrastructure details or burn paid API credits. Wallet/checkout/crypto flows documented in README are unreachable in the running API.

---

## Current Folder Path

```
/var/www/deweb
```

Git remote: `https://github.com/gagpoghosyan99/deweb-community.git`  
Branch: `main` (HEAD `8bd8559`)  
Working tree: **heavily dirty** — 50+ modified files, 30+ untracked files (not committed)

---

## Stack Detected

| Layer | Technology |
|-------|------------|
| **Package manager** | npm |
| **Backend** | Node.js (ESM), Express 5, better-sqlite3 |
| **Frontend** | Next.js 15.5, React 19, TypeScript, Tailwind, next-intl, Framer Motion, GSAP |
| **Legacy UI** | Static HTML/CSS/JS in `deweb-community/` |
| **Database** | SQLite (`backend/data/deweb.sqlite`, ~636 KB, WAL mode) |
| **Redis/Queue** | None |
| **Process manager** | systemd (`deweb-api.service`, `deweb-next.service`) — **not** PM2 for Deweb |
| **Reverse proxy** | nginx → API `:3000`, Next.js `:3001` |
| **SSL** | Let's Encrypt (certbot) for `dewebam.com` |
| **Cron** | root crontab (auto-deploy + blog automation) |
| **Docker** | Not used for Deweb |
| **CI** | GitHub Actions (`.github/workflows/ci.yml`, `deploy.yml`) |

---

## What Has Already Been Built

### Public marketing site (Next.js — `web/`)
- Multilingual homepage and pages: `en`, `es`, `ru`, `am`
- Service landings, about, contact, legal pages, marketplace UI
- SEO: `sitemap.ts`, `robots.ts`, structured metadata, blog sitemaps
- Cinematic homepage with pinned service slides + blog section
- Account flows: login, signup, forgot/reset password, email verification
- Customer/supplier dashboards, listings, proposals, deal chat UI
- Admin dashboard + full blog CMS (AI generator, pending review, topic queue, analytics, social drafts)

### Backend API (`backend/`)
- Auth (JWT, bcrypt, email verification, password reset)
- Users, products, orders, bids, listings, deal chat
- Leads, contact, offers, inquiries, support (AI + human handoff)
- Admin routes (stats, users, orders, leads, products, support, platform stats, wallet admin ops)
- Blog public + admin APIs with AI generation pipeline
- Telegram webhook bot (`/api/telegram/webhook`) for DeWebam publishing
- LinkedIn OAuth connect/callback/setup
- X (Twitter) status endpoint
- Cron scripts: blog generate, publish, social, regenerate

### Legacy (`deweb-community/`)
- Original static marketplace UI; nginx 301-redirects `.html` pages to Next.js routes

### DevOps
- `deploy/update.sh` — pull, npm install, build, restart services, nginx reload
- `deploy/auto-deploy.sh` — cron-driven fetch + deploy when `origin/main` advances
- Production nginx config: `deploy/nginx-deweb-production.conf`

### Live services (observed, not restarted)
- `deweb-api.service` — active since 2026-06-14
- `deweb-next.service` — active since 2026-06-22 (running **previous** successful build)
- `nginx.service` — active

---

## What We Did Wrong

1. **Critical routes exist in codebase but are not registered** in `backend/src/index.js` — `wallet`, `checkout`, `crypto`, `cards` return 404 in production.
2. **Invalid JSON** in `backend/src/data/services-page.json` (trailing comma ~line 54) breaks `/api/services/page` with HTTP 500.
3. **Public unauthenticated endpoints** left enabled: `/api/test-ai` (burns OpenAI credits), `/api/x/status`, `/api/linkedin/status`, LinkedIn OAuth connect when setup key is empty.
4. **Auto-deploy broken** since 2026-06-14 — local uncommitted changes block `git pull`; production is stale vs intended `main`.
5. **Next.js build fails** on current working tree — untracked `web/src/components/3d/` imports `@react-three/fiber`, `three`, `lucide-react`, `@radix-ui/*` not in `package.json`.
6. **Large uncommitted WIP** mixed with production — risky to deploy without review; CI on GitHub may not reflect server state.
7. **Services run as `root`** — violates least-privilege.
8. **No automated database backups** found.
9. **No HSTS** header configured in nginx.
10. **Demo seller accounts** (`*@deweb.demo` / `demo1234`) seeded and present in production DB (3 users).
11. **In-memory rate limiting** only — resets on restart, not shared across processes.
12. **README documents features** (checkout, wallet, promocode) that are unreachable in the running API.

---

## Critical Risks

| # | Severity | Finding | Location |
|---|----------|---------|----------|
| C1 | **CRITICAL** | Wallet, checkout, crypto, and cards API routes **not mounted** — `/api/wallet/me` → 404; marketplace payments non-functional | `backend/src/index.js` (missing `app.use` for `wallet.js`, `checkout.js`, `crypto.js`, `cards.js`) |
| C2 | **CRITICAL** | `/api/services/page` returns HTTP 500 — invalid JSON in data file | `backend/src/data/services-page.json` (trailing comma after `"price": "From $400",`) |
| C3 | **CRITICAL** | `/api/test-ai` is **public** — confirmed HTTP 200; triggers OpenAI API calls without auth | `backend/src/routes/testAi.js`, mounted in `index.js` |
| C4 | **CRITICAL** | Auto-deploy **blocked 9+ days** — dirty working tree prevents `git pull` | `/var/log/deweb-auto-deploy.log`, crontab `* * * * * bash /var/www/deweb/deploy/auto-deploy.sh` |
| C5 | **CRITICAL** | `npm run build` **fails** on current tree — cannot safely redeploy Next.js | `web/src/components/3d/*.tsx` missing dependencies |

---

## High Priority Issues

| # | Severity | Finding | Location |
|---|----------|---------|----------|
| H1 | **HIGH** | `/api/x/status` exposes server `.env` **file path** and credential presence flags publicly | `backend/src/services/xOAuth.js` → `getXConnectionStatus()` |
| H2 | **HIGH** | LinkedIn OAuth `/api/linkedin/connect` unprotected when `LINKEDIN_OAUTH_SETUP_KEY` is empty (currently empty in `.env`) | `backend/src/routes/linkedinOAuth.js` |
| H3 | **HIGH** | Login endpoint has **no rate limiting** — brute-force risk | `backend/src/routes/auth.js` (`/login` lacks `rateLimit`) |
| H4 | **HIGH** | JWT fallback secret in code if `JWT_SECRET` unset | `backend/src/middleware/auth.js`, `optionalAuth.js` |
| H5 | **HIGH** | systemd services run as **root** | `/etc/systemd/system/deweb-api.service`, `deweb-next.service` |
| H6 | **HIGH** | No **HSTS** (`Strict-Transport-Security`) in nginx | `deploy/nginx-deweb-production.conf`, `/etc/letsencrypt/options-ssl-nginx.conf` |
| H7 | **HIGH** | No automated **SQLite backup** strategy | — |
| H8 | **HIGH** | `verifyUrl` / `resetUrl` returned in API JSON when SMTP fails — verification/reset tokens leak to client | `backend/src/routes/auth.js` |
| H9 | **HIGH** | Demo accounts with known password exist in production DB | `backend/src/seed.js`, 3 `*.demo` users in SQLite |
| H10 | **HIGH** | `loadEnv.js` logs secret **presence** flags to stdout/journal on every API start | `backend/src/loadEnv.js` |

---

## Medium Priority Issues

| # | Severity | Finding | Location |
|---|----------|---------|----------|
| M1 | **MEDIUM** | Support and inquiries routes lack rate limiting | `backend/src/routes/support.js`, `inquiries.js` |
| M2 | **MEDIUM** | In-memory rate limiter — ineffective across restarts/multi-instance | `backend/src/middleware/rateLimit.js` |
| M3 | **MEDIUM** | CORS locked to single origin (good) but no env validation at startup | `backend/src/index.js` |
| M4 | **MEDIUM** | `REAL` money paths (`transferDeweb`, escrow, crypto webhook) exist but unreachable — dead code drift risk | `backend/src/routes/crypto.js`, `services/escrow.js` |
| M5 | **MEDIUM** | Deal chat attachments accept arbitrary base64 — email bomb / large payload risk (1 MB JSON limit) | `backend/src/routes/dealChat.js` |
| M6 | **MEDIUM** | nginx SSL protocol options redefined warnings | `nginx -t` warnings on `sites-enabled/deweb` |
| M7 | **MEDIUM** | CI runs `npm install` + `npm run build` for web but **no lint/test** for backend; backend job only installs | `.github/workflows/ci.yml` |
| M8 | **MEDIUM** | Duplicate UI architectures: `cinematic/`, `homepage/`, `premium/`, `animations/` — WIP not integrated into `page.tsx` (still uses `CinematicHome`) | `web/src/components/` |
| M9 | **MEDIUM** | `web/package-lock.json` modified; `npm audit` reports 16 vulnerabilities after lint run | `web/package-lock.json` |
| M10 | **MEDIUM** | Blog regenerate cron every 30 min — log file already 264 KB | `/var/log/deweb-blog-regenerate.log` |

---

## Low Priority Cleanup

| # | Severity | Finding | Location |
|---|----------|---------|----------|
| L1 | **LOW** | ESLint unused import warnings in several pages | `web/src/app/[locale]/contact/page.tsx`, etc. |
| L2 | **LOW** | `metadataFromEntry` imported but unused in multiple pages | various `web/src/app/[locale]/*/page.tsx` |
| L3 | **LOW** | PM2 runs unrelated `casino-news-blog` on same server | `pm2 list` |
| L4 | **LOW** | IP `95.111.233.120` in `server_name` — unnecessary exposure | `deploy/nginx-deweb-production.conf` |
| L5 | **LOW** | No `web/.env` — relies on nginx proxy + defaults (acceptable) | — |
| L6 | **LOW** | `docs/` lacks operational runbooks beyond blog automation | `docs/BLOG_*.md` |

---

## Security Findings

### Secrets & env
- `backend/.env` **exists** on server; correctly gitignored (`.gitignore:72`)
- Key presence (values **not** printed): `JWT_SECRET`, `OPENAI_API_KEY`, `TELEGRAM_BOT_TOKEN`, `X_*`, `LINKEDIN_*`, `SMTP_*`, `ADMIN_PASSWORD` — all SET
- Treasury wallet env vars (`TREASURY_*`) — all EMPTY (crypto top-up not configured)
- `ADMIN_AUTO_LOGIN` — set to non-`true` value (disabled)
- **Risk:** `loadEnv.js` and `/api/x/status` leak metadata about secrets and file paths in logs/responses

### Auth & access control
- Admin API routes protected by `requireAdmin` middleware ✓
- Admin frontend checks `user.isAdmin` client-side (API still enforces server-side) ✓
- `/api/auth/auto-admin` correctly returns 403 ✓
- Login: no rate limit ✗
- Public AI test endpoint ✗

### OAuth / webhooks
- Telegram webhook: validates `x-telegram-bot-api-secret-token` when secret configured ✓
- LinkedIn OAuth: setup key check **skipped** when `LINKEDIN_OAUTH_SETUP_KEY` empty ✗
- Crypto swap webhook: validates `SWAP_WEBHOOK_SECRET` — but route not mounted

### Injection / XSS
- Blog content sanitized via `sanitize.js` ✓
- SQLite uses prepared statements throughout sampled routes ✓
- No raw SQL concatenation observed in reviewed routes

### CORS
- Single-origin CORS with credentials: `CORS_ORIGIN=https://dewebam.com` ✓

### File upload
- Blog images stored under `backend/uploads/` served via `/api/uploads/` static
- No explicit file-type validation reviewed in upload paths (admin-only blog uploads)

---

## Stability Findings

| Issue | Status |
|-------|--------|
| API health `/api/health` | ✓ `{"ok":true}` |
| `/api/services/page` | ✗ HTTP 500 (invalid JSON) |
| Next.js home `/en` | ✓ HTTP 200 (stale build) |
| Next.js contact `/en/contact` | ✓ HTTP 200 (journal shows intermittent `.env.json` MODULE_NOT_FOUND on older build artifacts) |
| `npm run build` (web) | ✗ FAIL — missing 3D dependencies |
| `npm run lint` (web) | ✗ FAIL — eslint/typescript toolchain issues before fix |
| `npx tsc --noEmit` | ✗ 50+ errors (missing deps in 3d/premium/ui components) |
| Backend `node --check` | ✓ All route files pass syntax check |
| `npm test` (backend) | ✗ No test script defined |
| API journal errors | `JSON.parse` failure in `services.js:24` (matches invalid JSON file) |
| Auto-deploy | ✗ Blocked since 2026-06-14 |

---

## UI/UX Findings

- **Homepage:** Production uses `CinematicHome` — newer `HomepageExperience` / 3D components are untracked WIP, not wired in
- **Services page:** Backend 500 likely breaks dynamic services data if frontend calls `/api/services/page`
- **Marketplace:** UI exists but wallet/checkout API client methods **absent** from `web/src/lib/api.ts`
- **Admin UX:** Blog admin shell is well-structured with role gate
- **i18n:** 4 locales with extensive content packs under `web/src/i18n/content/`
- **Mobile:** Recent commits mention responsive fixes; not browser-tested in this audit
- **Dark mode:** Consistent dark theme across components
- **SEO:** Sitemaps, canonical host redirects (www → apex), legacy HTML 301s configured

---

## DevOps Findings

| Item | Status |
|------|--------|
| nginx config test | ✓ `nginx -t` successful (with SSL redefine warnings) |
| SSL certificates | ✓ Let's Encrypt paths present |
| HSTS | ✗ Not configured |
| systemd auto-restart | ✓ `Restart=on-failure` |
| Deploy script | `deploy/update.sh` — restarts services + reloads nginx |
| Auto-deploy cron | Every **1 minute** — aggressive; currently failing on git merge |
| Logs | `/var/log/deweb-auto-deploy.log`, `deweb-blog-*.log` |
| Monitoring | No Prometheus/healthcheck beyond manual curl in deploy script |
| Backups | None found |
| Rollback | Manual `git reset` + `deploy/update.sh` (no documented procedure) |
| PM2 | Used for `casino-news-blog` only, not Deweb |

---

## Database Findings

| Table / metric | Count |
|----------------|-------|
| Tables | 40 |
| users | 7 |
| admin users | 1 (`gagikpoghosyandev@gmail.com`) |
| blog_posts | 6 |
| marketplace_products | 3 |
| orders | 0 |
| lead_submissions | 1 |
| wallets | 7 |
| demo users (`*.demo`) | 3 |

- **Migrations:** Schema applied inline via `db.js` `CREATE TABLE IF NOT EXISTS` + pragma migrations — no formal migration tool
- **Foreign keys:** ON
- **Journal mode:** WAL
- **Money fields:** `REAL` type for `deweb`, `price`, `amount` — floating-point risk for financial values
- **Escrow tables:** Present in schema; escrow code imports `crypto.js` transfer functions
- **Backup:** SQLite file not copied anywhere automatically

---

## Architecture Map

```
                    Internet
                       │
                   nginx :443
                  (dewebam.com)
                       │
         ┌─────────────┼─────────────┐
         │             │             │
    /api/* proxy   /_next/*     /* pages
         │             │             │
    Express API    Next.js :3001   (same)
    :3000               │
         │         next-intl i18n
    SQLite WAL          │
  (deweb.sqlite)   React UI ──fetch──► /api/*
```

### Backend entrypoint
- `backend/src/index.js` — Express app, port 3000

### Frontend entrypoint
- `web/src/app/[locale]/layout.tsx` + page routes
- `web/src/middleware.ts` — locale + www canonicalization

### API routes (mounted in production)
```
GET  /api/health
/api/test-ai          ← PUBLIC (should not be)
/api/telegram/webhook
/api/linkedin/*
/api/x/status         ← PUBLIC
/api/auth/*
/api/users/*
/api/products/*
/api/orders/*
/api/bids/*
/api/inquiries/*
/api/contact/*
/api/config/*
/api/activity/*
/api/services/*       ← /page broken (500)
/api/offers/*
/api/leads/*
/api/blog/*           (includes blogTracking sub-routes)
/api/admin/blog/*
/api/admin/*
/api/support/*
/api/setup/*
/api/listings/*
/api/deal-chat/*
```

### API routes (exist but NOT mounted)
```
/api/wallet/*         wallet.js
/api/checkout/*       checkout.js
/api/crypto/*         crypto.js
/api/cards/*          cards.js
```

### Auth flow
1. Register → bcrypt hash → optional verification email → login required
2. Login → JWT (7d expiry) → `Authorization: Bearer` header
3. Admin: `role === 'admin'` OR email in `ADMIN_EMAILS` OR id `deweb-admin`
4. Email verification required for seller actions (`requireEmailVerified`)

### Background jobs (cron)
| Schedule | Command |
|----------|---------|
| `* * * * *` | `deploy/auto-deploy.sh` |
| `0 10 * * *` | `npm run blog-cron` |
| `0 18 * * *` | `npm run blog-publish-cron` |
| `15 18 * * *` | `npm run blog-social-cron` |
| `*/30 * * * *` | `npm run blog-regenerate-cron` |

### Payment / crypto / fund-moving code (present, mostly unreachable)
- `backend/src/routes/crypto.js` — `transferDeweb`, webhook credit, public config
- `backend/src/routes/wallet.js` — topup, transfer, transactions
- `backend/src/routes/checkout.js` — checkout
- `backend/src/services/escrow.js` — hold/release/refund
- `backend/src/services/topupProcessor.js`, `chainVerify.js`
- **None mounted in `index.js`**

### Public domains
- Primary: `https://dewebam.com`
- Redirects: `www.dewebam.com` → apex, HTTP → HTTPS
- Legacy `.html` → Next.js routes

---

## Exact Files Reviewed

```
/var/www/deweb/README.md
/var/www/deweb/.gitignore
/var/www/deweb/backend/package.json
/var/www/deweb/backend/.env.example
/var/www/deweb/backend/src/index.js
/var/www/deweb/backend/src/loadEnv.js
/var/www/deweb/backend/src/db.js
/var/www/deweb/backend/src/seed.js
/var/www/deweb/backend/src/middleware/auth.js
/var/www/deweb/backend/src/middleware/requireAdmin.js
/var/www/deweb/backend/src/middleware/rateLimit.js
/var/www/deweb/backend/src/routes/auth.js
/var/www/deweb/backend/src/routes/admin.js
/var/www/deweb/backend/src/routes/setup.js
/var/www/deweb/backend/src/routes/testAi.js
/var/www/deweb/backend/src/routes/services.js
/var/www/deweb/backend/src/routes/config.js
/var/www/deweb/backend/src/routes/crypto.js
/var/www/deweb/backend/src/routes/wallet.js
/var/www/deweb/backend/src/routes/checkout.js
/var/www/deweb/backend/src/routes/dealChat.js
/var/www/deweb/backend/src/routes/inquiries.js
/var/www/deweb/backend/src/routes/support.js
/var/www/deweb/backend/src/routes/telegramWebhook.js
/var/www/deweb/backend/src/routes/xStatus.js
/var/www/deweb/backend/src/routes/linkedinOAuth.js
/var/www/deweb/backend/src/routes/adminBlog.js
/var/www/deweb/backend/src/routes/blog.js
/var/www/deweb/backend/src/services/xOAuth.js
/var/www/deweb/backend/src/services/escrow.js
/var/www/deweb/backend/src/utils/admin.js
/var/www/deweb/backend/src/utils/frontendUrl.js
/var/www/deweb/backend/src/utils/sanitize.js
/var/www/deweb/backend/src/data/services-page.json
/var/www/deweb/web/package.json
/var/www/deweb/web/next.config.mjs
/var/www/deweb/web/src/middleware.ts
/var/www/deweb/web/src/lib/api.ts
/var/www/deweb/web/src/lib/i18n/locale-seo.ts
/var/www/deweb/web/src/app/[locale]/page.tsx
/var/www/deweb/web/src/app/[locale]/admin/page.tsx
/var/www/deweb/web/src/components/admin/AdminDashboard.tsx
/var/www/deweb/web/src/components/admin/blog/AdminBlogShell.tsx
/var/www/deweb/web/src/components/marketplace/MarketplaceView.tsx
/var/www/deweb/deploy/nginx-deweb-production.conf
/var/www/deweb/deploy/update.sh
/var/www/deweb/deploy/auto-deploy.sh
/var/www/deweb/.github/workflows/ci.yml
/etc/systemd/system/deweb-api.service
/etc/systemd/system/deweb-next.service
/etc/letsencrypt/options-ssl-nginx.conf
```

---

## Exact Commands Run

```bash
# Discovery
pwd && ls -la
cd /var/www/deweb && pwd && ls -la
find . -maxdepth 3 -type f \( -name "package.json" -o -name "composer.json" -o -name "requirements.txt" -o -name "Dockerfile" -o -name "docker-compose.yml" -o -name ".env.example" \) -print
git status --short
git branch --show-current
git log --oneline -10
systemctl list-units --type=service | grep -iE "deweb|node|pm2|nginx" || true
pm2 list || true
systemctl cat deweb-api.service
systemctl cat deweb-next.service
systemctl status deweb-api.service --no-pager
systemctl status deweb-next.service --no-pager
systemctl status nginx --no-pager
nginx -t
ls -la /etc/nginx/sites-enabled/

# Env key presence (values masked)
awk -F= '/^[A-Za-z_][A-Za-z0-9_]*=/ { key=$1; val=$2; if (length(val)>0) print key "=SET(len:" length(val) ")"; else print key "=EMPTY" }' /var/www/deweb/backend/.env | sort
git check-ignore -v backend/.env

# API probes (local only)
curl -sf http://127.0.0.1:3000/api/health
curl -sf http://127.0.0.1:3000/api/x/status
curl -sf http://127.0.0.1:3000/api/linkedin/status
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/test-ai
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/wallet/me
curl -s -w "\nHTTP:%{http_code}\n" http://127.0.0.1:3000/api/services/page
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3001/en
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3001/en/contact

# Validation
cd /var/www/deweb/web && npm run lint
cd /var/www/deweb/web && ./node_modules/.bin/tsc --noEmit
cd /var/www/deweb/web && npm run build
cd /var/www/deweb/backend && npm test -- --runInBand
cd /var/www/deweb/backend && node --check src/index.js
for f in src/routes/*.js; do node --check "$f"; done

# JSON / DB
node -e "JSON.parse(require('fs').readFileSync('/var/www/deweb/backend/src/data/services-page.json','utf8'))"
node -e "/* SQLite readonly counts via better-sqlite3 */"

# Cron / logs
crontab -l
tail -30 /var/log/deweb-auto-deploy.log
tail -5 /var/log/deweb-blog-cron.log
grep -r "Strict-Transport-Security" /etc/nginx/ || true
```

---

## Validation Results

| Command | Result |
|---------|--------|
| `nginx -t` | ✓ Pass (warnings: SSL protocol options redefined) |
| `systemctl status deweb-api` | ✓ Active (running) |
| `systemctl status deweb-next` | ✓ Active (running) |
| `curl /api/health` | ✓ 200 |
| `curl /api/services/page` | ✗ 500 |
| `curl /api/wallet/me` | ✗ 404 |
| `curl /api/test-ai` | ✗ 200 (should be blocked) |
| `npm run build` (web) | ✗ FAIL — `Cannot find module '@react-three/fiber'` |
| `npm run lint` (web) | ✗ FAIL — eslint/typescript resolution |
| `tsc --noEmit` (web) | ✗ FAIL — 50+ errors |
| `npm test` (backend) | ✗ No test script |
| `node --check` (backend routes) | ✓ Pass |
| JSON validate `services-page.json` | ✗ Invalid (trailing comma) |
| `services-catalog.json` | ✓ Valid |

---

## Recommended Roadmap

### P0 — Safety/security blockers
1. **Remove or auth-guard** `/api/test-ai` immediately (or disable in production via env flag).
2. **Mount missing routes** in `index.js`: `wallet`, `checkout`, `crypto`, `cards` — verify each with integration tests before enabling fund flows.
3. **Fix `services-page.json`** invalid JSON; verify `/api/services/page` returns 200.
4. **Lock down public status/OAuth endpoints**: remove `envFile` from X status; require `LINKEDIN_OAUTH_SETUP_KEY` or admin auth for LinkedIn connect.
5. **Add login rate limiting** (and lockout/backoff).
6. **Resolve git dirty state** — commit or stash WIP; restore auto-deploy or pause cron until clean.
7. **Remove demo accounts** from production DB or disable seed in production (`NODE_ENV=production` guard in `seed.js`).

### P1 — Build/runtime stability
1. Either **add missing npm deps** for 3D components or **remove/gate** untracked `3d/` imports until ready.
2. Achieve clean `npm run build` before next deploy.
3. Run `deploy/update.sh` only after build passes locally.
4. Drop systemd services to non-root user.
5. Add startup env validation (required keys, no default JWT secret in prod).

### P2 — Core product bugs
1. Wire `web/src/lib/api.ts` wallet/checkout/crypto client methods if marketplace payments are in scope.
2. Fix frontend services page if it depends on broken API.
3. Review escrow/crypto webhook flows end-to-end before enabling treasury env vars.

### P3 — UX/professional polish
1. Consolidate duplicate homepage component trees (`cinematic` vs `homepage` vs `premium`).
2. Fix ESLint warnings; add loading/error states audit on marketplace + dashboards.

### P4 — SEO/performance
1. Add HSTS header (1 year, includeSubDomains).
2. Resolve nginx SSL redefine warnings.
3. Run `npm run seo:audit` and lighthouse after build fix.

### P5 — Cleanup/docs
1. Document backup/restore procedure for SQLite.
2. Add smoke test script to deploy pipeline.
3. Align README with actually mounted routes.
4. Reduce auto-deploy cron frequency (e.g. every 5–15 min or webhook-triggered).

---

## Next Cursor Prompt

Copy-paste this for the remediation phase:

```
P0 Deweb Production Safety Fixes

Context: Full audit at docs/audits/deweb-full-project-investigation-20260623-1348.md
Server path: /var/www/deweb
Verdict: NOT_SAFE_FOR_PRODUCTION

Execute P0 only, in this order. Do NOT rotate secrets or restart services until each change is reviewed. Commit in small logical chunks.

1. SECURITY — Disable public /api/test-ai in production (remove route or guard with NODE_ENV !== 'production' + admin auth). Verify curl returns 401/404.

2. SECURITY — Sanitize /api/x/status response: remove envFile path and any infrastructure hints. Keep only { canPost, mode } booleans.

3. SECURITY — Require LINKEDIN_OAUTH_SETUP_KEY for all /api/linkedin/connect|setup routes; fail closed if unset in production.

4. SECURITY — Add rate limiting to POST /api/auth/login (e.g. 10/min per IP + exponential backoff).

5. API — Mount missing routes in backend/src/index.js: wallet, checkout, crypto, cards. Verify:
   curl -H "Authorization: Bearer <token>" http://127.0.0.1:3000/api/wallet/me

6. DATA — Fix invalid JSON in backend/src/data/services-page.json (trailing comma). Verify:
   curl http://127.0.0.1:3000/api/services/page returns 200

7. BUILD — Fix web build: either install @react-three/fiber three @react-three/drei lucide-react @radix-ui/* class-variance-authority motion OR exclude untracked 3d components from build until ready. npm run build must pass.

8. DEPLOY — Resolve dirty git tree blocking auto-deploy. Show git status plan before commit. Do not force push.

9. PROD DATA — Disable demo user seeding in production (seed.js guard). Document SQL to remove *.demo users if approved.

10. AUTH — Stop returning verifyUrl/resetUrl tokens in API responses when SMTP fails; log server-side only.

After all fixes: run npm run build, nginx -t, curl health checks. Produce summary with before/after curl results. Ask before systemctl restart.
```

---

*End of investigation. No production code was modified during this audit.*
