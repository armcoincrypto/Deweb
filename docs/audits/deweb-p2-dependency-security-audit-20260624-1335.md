# DEWEB P2 Dependency Security Audit

**Date:** 2026-06-24 13:35 CEST  
**Project:** `/var/www/deweb/web`  
**Node:** v20.20.2 | **npm:** 10.8.2  
**Audit source:** `/tmp/deweb-npm-audit.json`

---

## Executive Verdict

**`DEPENDENCY_REVIEW_REQUIRED`**

Safe non-breaking updates were applied (`npm audit fix` + `npm update` within semver). Build passes and live smoke tests are unchanged. **15 vulnerabilities remain** — most critical issues are dev-only (`to-ico` favicon script), but production-adjacent items (`next-intl`, bundled `postcss` via `next`) need planned major upgrades, not blind `npm audit fix --force`.

---

## Summary

| Metric | Before | After safe fixes |
|--------|--------|------------------|
| Total vulnerabilities | 16 | **15** |
| Critical | 5 | 5 |
| High | 2 | 2 |
| Moderate | 9 | 8 |
| Build | PASS | PASS |
| Live smoke | 200 / 404 / 404 | 200 / 404 / 404 |

---

## Actions Taken (safe only)

```bash
cd /var/www/deweb/web
npm audit fix          # no --force
npm update             # semver-compatible lockfile refresh
npm run build          # PASS
```

**Not run:** `npm audit fix --force` (would downgrade `to-ico` to 1.0.1, upgrade `next-intl` to 4.x major, or nonsensically suggest `next@9.3.3`).

### Packages updated (lockfile)

| Package | Before | After | Scope |
|---------|--------|-------|-------|
| `next` | 15.5.18 | **15.5.19** | Production (patch) |
| `js-yaml` | 4.1.1 | **4.2.0** | Dev (eslint chain) |
| `react` / `react-dom` | 19.2.6 | **19.2.7** | Production (patch) |
| `eslint-config-next` | 15.5.18 | **15.5.19** | Dev (patch) |
| Various transitive | — | patch/minor | Dev tooling |

`package.json` ranges unchanged — only `package-lock.json` refreshed.

---

## Vulnerability Analysis

### 1. `to-ico` chain — **dev-only, not production runtime**

**Direct dependency:** `to-ico@1.1.5` (devDependency)  
**Used by:** `scripts/generate-favicons.mjs` (`npm run favicons`) only  
**Not bundled** in Next.js production output.

| Package | Severity | Transitive via |
|---------|----------|----------------|
| `to-ico` | moderate | direct dev |
| `resize-img` | moderate | to-ico |
| `jimp` | critical | resize-img |
| `request` | critical | jimp |
| `form-data` | critical | request |
| `minimist` | critical | mkdirp → jimp |
| `jpeg-js` | high | jimp |
| `url-regex` | high | jimp |
| `qs`, `tough-cookie`, `uuid` | moderate | request |

**Risk in production:** **Low** — script runs locally/CI during favicon generation, not at request time.

**Fix path:** Replace `to-ico` with `sharp`-only ICO generation (script already uses `sharp`) or pin `to-ico@1.0.1` after testing favicon script. `npm audit fix --force` proposes `to-ico@1.0.1` as **semver-major** downgrade.

---

### 2. `next-intl` — **direct production dependency**

| Advisory | Severity | Notes |
|----------|----------|-------|
| GHSA-8f24-v5vv-gm5j | moderate | Open redirect |
| GHSA-4c35-wcg5-mm9h | moderate | Prototype pollution via `experimental.messages.precompile` |

**Runtime exposure:** Middleware + i18n routing on every localized request.  
**Fix available:** `next-intl@4.13.0` — **major breaking upgrade** (v3 → v4).  
**Recommendation:** Schedule dedicated migration; do not force-upgrade in P2.

---

### 3. `postcss` (via `next`) — **production build/runtime adjacent**

| Advisory | Severity | Notes |
|----------|----------|-------|
| GHSA-qx2v-qp2m-jg93 | moderate | XSS via unescaped `</style>` in stringify |

**Bundled:** `next/node_modules/postcss` (Next 15.5.19 still reports vulnerable range `<8.5.10`).  
**npm audit fix --force** incorrectly suggests `next@9.3.3` — **reject**.  
**Fix path:** Upgrade to **Next 16.x** when ready (major). Monitor Next 15 patch releases.

---

### 4. `camera-controls` — **Node engine warning (not a CVE)**

```
camera-controls@3.1.2 requires node >=22.0.0
Server runs: node v20.20.2
```

**Transitive via:** `@react-three/drei@10.7.7` → `camera-controls`  
**Production use:** Yes — `@react-three/drei` imported by `DigitalGlobe`, cinematic `ScrollUniverseLayer` on live homepage.  
**Current impact:** EBADENGINE warning only; build and runtime work on Node 20.  
**Recommendation:** Either upgrade server to Node 22 LTS, or pin `@react-three/drei` to a version pulling `camera-controls@2.x` if Node 20 must stay.

---

## Direct vs Transitive

| Direct dep | Vuln reported | Production? | Safe fix now? |
|------------|---------------|-------------|---------------|
| `next` | postcss (transitive) | Yes | Patch 15.5.19 ✅ |
| `next-intl` | moderate (2) | Yes | No — needs v4 major |
| `to-ico` | entire chain | **No** (dev script) | No — needs replacement or tested downgrade |
| All others | — | No direct CVEs | — |

---

## `npm outdated` (major upgrades deferred)

| Package | Current | Latest | Risk if upgraded now |
|---------|---------|--------|----------------------|
| `next` | 15.5.19 | 16.2.9 | Major — App Router, postcss fix |
| `next-intl` | 3.26.5 | 4.13.0 | Major — API changes |
| `eslint` | 9.39.4 | 10.5.0 | Major |
| `tailwindcss` | 3.4.19 | 4.3.1 | Major |
| `framer-motion` | 11.18.2 | 12.41.0 | Major |
| `typescript` | 5.9.3 | 6.0.3 | Major |

---

## Validation

```bash
cd /var/www/deweb/web && npm run build  # PASS
```

Live smoke:

```
home: 200
blog fake: 404
service fake: 404
```

---

## Recommended Next Steps (P3)

1. **Replace `to-ico`** in `generate-favicons.mjs` with sharp-only ICO output → clears 10 audit findings without `--force`.
2. **Plan `next-intl` v4 migration** with redirect/middleware regression tests.
3. **Evaluate Node 22 LTS** on VPS for `camera-controls` compliance.
4. **Track Next 15/16** for postcss advisory resolution.
5. **Re-audit after each planned upgrade** — never use `npm audit fix --force` on production server.

---

## Commit

```
chore: audit and safely update deweb dependencies
```

Files: `web/package-lock.json`, this report (`package.json` unchanged).
