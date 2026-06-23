# Deweb P0 Production Safety Fixes

**Date:** 2026-06-23 13:57 UTC  
**Project:** `/var/www/deweb`  
**Scope:** P0 blockers only — no UI redesign, no secret rotation, no file deletions  
**Services restarted:** **No** (per instructions — restart pending approval)

---

## Summary

| Fix | Status | Live without API restart? |
|-----|--------|---------------------------|
| Frontend `npm run build` | ✅ Pass | N/A (build artifact ready; `deweb-next` still on old build) |
| `services-page.json` syntax | ✅ Fixed | ✅ Yes — `/api/services/page` → **200** immediately |
| Mount wallet/checkout/crypto/cards | ✅ Code changed | ❌ Needs `deweb-api` restart |
| Disable `/api/test-ai` in production | ✅ Code changed | ❌ Needs `deweb-api` restart |
| Sanitize `/api/x/status` | ✅ Code changed | ❌ Needs `deweb-api` restart |
| Login rate limiting | ✅ Code changed | ❌ Needs `deweb-api` restart |

**Verdict:** Code + build validation **passed**. Safe to restart **`deweb-api.service`** (required for 4 backend fixes). Optional restart **`deweb-next.service`** to serve the new build.

---

## Files Changed

| File | Change |
|------|--------|
| `web/tsconfig.json` | Excluded unready WIP dirs from TypeScript build (`3d/`, `homepage/`, `premium/`, `animations/`, unused `ui/*`, `lib/design-system/motion.ts`) |
| `backend/src/data/services-page.json` | Removed illegal trailing commas in `grid` items |
| `backend/src/index.js` | Mounted `/api/wallet`, `/api/checkout`, `/api/crypto`, `/api/cards`; gated `/api/test-ai` to non-production only |
| `backend/src/routes/auth.js` | Added `loginLimiter` (10 req / 5 min per IP) on `POST /login` |
| `backend/src/services/xOAuth.js` | Removed `envFile` and credential-presence fields from public status response; removed unused import |

---

## Exact Fixes

### 1. Frontend build failure

**Decision:** WIP 3D/homepage/premium components are **not wired into production routes** (`page.tsx` uses `CinematicHome`). Excluded them from `tsconfig.json` `exclude` instead of installing heavy 3D deps.

**Result:** `npm run build` completes successfully.

### 2. Invalid JSON

Removed trailing commas after `"price"` fields in seven `grid` objects in `services-page.json`.

**Validation:**
```bash
node -e "JSON.parse(require('fs').readFileSync('backend/src/data/services-page.json','utf8'))"
# services-page.json: VALID
```

### 3. Missing backend routes

Added imports and mounts in `backend/src/index.js`:
```javascript
app.use("/api/wallet", walletRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/crypto", cryptoRoutes);
app.use("/api/cards", cardRoutes);
```

**Expected after restart:** `GET /api/wallet/me` without token → **401** (not 404).

### 4. Public `/api/test-ai`

Wrapped mount in production guard:
```javascript
if (process.env.NODE_ENV !== "production") {
  app.use("/api/test-ai", testAiRoutes);
}
```

**Expected after restart:** `GET /api/test-ai` → **404** (route not registered).

### 5. `/api/x/status` env exposure

Response reduced to:
```json
{
  "canPost": true,
  "mode": "oauth1",
  "creditsNote": "..."
}
```

Removed: `envFile`, `hasApiKey`, `hasApiSecret`, `hasAccessToken`, `hasAccessTokenSecret`, `hasBearerToken`.

### 6. Login rate limiting

```javascript
const loginLimiter = rateLimit({ windowMs: 300000, max: 10, keyFn: ipKey });
router.post("/login", loginLimiter, (req, res) => { ... });
```

---

## Commands Run

```bash
# JSON validation
node -e "JSON.parse(require('fs').readFileSync('/var/www/deweb/backend/src/data/services-page.json','utf8'))"

# Backend syntax
cd /var/www/deweb/backend && node --check src/index.js
node --check src/routes/auth.js
node --check src/services/xOAuth.js

# Frontend
cd /var/www/deweb/web && npm run build
npm run lint || true

# Backend tests
cd /var/www/deweb/backend && npm test || true

# Infra
nginx -t

# Local API (before restart)
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/api/services/page
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/api/wallet/me
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/api/test-ai
curl -s http://127.0.0.1:3000/api/x/status

# Public (via nginx)
curl -sI https://dewebam.com/en
curl -sI https://dewebam.com/api/health
curl -sI https://dewebam.com/api/services/page
curl -sI https://dewebam.com/api/wallet/me
curl -sI https://dewebam.com/api/test-ai
```

---

## Before / After Results

### Validation suite

| Command | Before (investigation) | After (this fix) |
|---------|------------------------|------------------|
| `npm run build` | ❌ FAIL (`@react-three/fiber` missing) | ✅ PASS |
| `npm run lint` | ❌ FAIL | ✅ PASS (warnings only) |
| `npm test` | ❌ No script | ❌ No script (unchanged) |
| `nginx -t` | ✅ OK | ✅ OK |

### API endpoints — **before `deweb-api` restart** (running process from 2026-06-14)

| Endpoint | HTTP | Notes |
|----------|------|-------|
| `/api/services/page` | **500 → 200** | JSON fix live immediately (no restart needed) |
| `/api/wallet/me` | **404** | Old process — routes not mounted yet |
| `/api/test-ai` | **200** | Old process — still public |
| `/api/x/status` | **200** | Still exposes `envFile` path in response body |

### API endpoints — **expected after `systemctl restart deweb-api`**

| Endpoint | Expected HTTP |
|----------|---------------|
| `/api/services/page` | 200 |
| `/api/wallet/me` (no auth) | 401 |
| `/api/test-ai` | 404 |
| `/api/x/status` | 200 with `{ canPost, mode, creditsNote }` only |

### Public curls (2026-06-23 13:57 UTC, pre-restart)

| URL | Status |
|-----|--------|
| `https://dewebam.com/en` | 200 |
| `https://dewebam.com/api/health` | 200 |
| `https://dewebam.com/api/services/page` | **200** |
| `https://dewebam.com/api/wallet/me` | 404 |
| `https://dewebam.com/api/test-ai` | 200 |

---

## Remaining Risks (post-P0)

| Priority | Risk |
|----------|------|
| **HIGH** | Auto-deploy still blocked by dirty git tree — cron fails on `git pull` |
| **HIGH** | LinkedIn OAuth `/api/linkedin/connect` unprotected when `LINKEDIN_OAUTH_SETUP_KEY` empty |
| **HIGH** | Demo users (`*@deweb.demo`) still in production DB |
| **HIGH** | No HSTS, no DB backups, services run as root |
| **MEDIUM** | WIP 3D/homepage components excluded from build — re-enable when deps added |
| **MEDIUM** | `verifyUrl`/`resetUrl` still returned in auth API when SMTP fails |
| **LOW** | ESLint warnings in unrelated files |

---

## Safe to Restart / Deploy?

| Action | Safe? | Notes |
|--------|-------|-------|
| `systemctl restart deweb-api` | **Yes — recommended** | Required to activate routes, test-ai block, x/status sanitization, login rate limit |
| `systemctl restart deweb-next` | **Yes — optional** | New build ready at `web/.next/`; current site still serves old build |
| Full `deploy/update.sh` | **Wait** | Resolve git dirty state first to avoid auto-deploy failures |

### Post-restart verification (run after approval)

```bash
systemctl restart deweb-api
sleep 2
curl -s -o /dev/null -w "services/page: %{http_code}\n" http://127.0.0.1:3000/api/services/page
curl -s -o /dev/null -w "wallet/me: %{http_code}\n" http://127.0.0.1:3000/api/wallet/me
curl -s -o /dev/null -w "test-ai: %{http_code}\n" http://127.0.0.1:3000/api/test-ai
curl -s http://127.0.0.1:3000/api/x/status | jq .
```

Expected: `200`, `401`, `404`, and x/status JSON without `envFile`.

---

*End of P0 fix report. No services were restarted during this session.*
