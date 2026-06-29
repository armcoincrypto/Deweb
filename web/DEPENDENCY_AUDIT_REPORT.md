# DEWEB Dependency Audit Report

**Date:** 2026-06-29  
**Project:** `/var/www/deweb/web`  
**Command:** `npm audit`  
**Total vulnerabilities:** 15 (5 critical, 2 high, 8 moderate, 0 low)

## Summary

| Severity | Count | Production runtime impact |
|----------|-------|---------------------------|
| Critical | 5 | **None** — all in dev-only `to-ico` dependency chain |
| High | 2 | **None** — dev-only (`jpeg-js`, `url-regex` via `jimp`/`to-ico`) |
| Moderate | 8 | **Low–medium** — see notes below |
| Low | 0 | — |

**Recommendation:** No dependency upgrades applied in this pass. Most findings are dev-build tooling or require major version bumps (`npm audit fix --force`).

---

## Critical (5)

| Package | Chain | Production impact | Fix available |
|---------|-------|-------------------|---------------|
| `form-data` ≤2.5.5 | `to-ico` → `jimp` → `request` | Dev only (favicon generation) | `npm audit fix --force` (breaking: downgrades `to-ico`) |
| `jimp` ≤0.3.5 | `to-ico` → `resize-img` | Dev only | Same |
| `minimist` ≤0.2.3 | `to-ico` → `mkdirp` | Dev only | Same |
| `mkdirp` 0.4.1–0.5.1 | `to-ico` → `jimp` | Dev only | Same |
| `request` * | `to-ico` → `jimp` | Dev only (deprecated package) | Same |

**Notes:** `to-ico` is listed in `package.json` devDependencies for generating `app/icon.png`. It does not ship to the Next.js production bundle.

---

## High (2)

| Package | Chain | Production impact | Fix available |
|---------|-------|-------------------|---------------|
| `jpeg-js` ≤0.4.3 | `to-ico` → `jimp` / `resize-img` | Dev only | `npm audit fix --force` |
| `url-regex` * | `to-ico` → `jimp` | Dev only | `npm audit fix` (non-breaking for this path) |

---

## Moderate (8)

| Package | Chain | Production impact | Fix available |
|---------|-------|-------------------|---------------|
| `next` 9.3.4-canary – 16.3.0-canary.5 | Direct dependency | **Runtime** — bundled PostCSS advisory | Requires Next.js upgrade path review |
| `postcss` <8.5.10 | `next` nested | Low — build-time CSS processing | Resolved with Next.js upgrade |
| `next-intl` * | Direct dependency | **Runtime** — open redirect + precompile prototype pollution (experimental feature) | `npm audit fix --force` → next-intl@4.13.0 (breaking) |
| `qs` <6.14.1 | `to-ico` → `request` | Dev only | `npm audit fix --force` |
| `resize-img` ≤1.1.2 | `to-ico` | Dev only | `npm audit fix --force` |
| `to-ico` ≥1.1.0 | Direct devDependency | Dev only | Replace with maintained favicon tool or pin 1.0.1 |
| `tough-cookie` <4.1.3 | `to-ico` → `request` | Dev only | `npm audit fix --force` |
| `uuid` <11.1.1 | `to-ico` → `request` | Dev only | `npm audit fix --force` |

---

## Actions taken (P8.2)

- **No upgrades applied** — per scope: avoid breaking migrations.
- Documented all findings for a future maintenance window.

## Suggested follow-up (out of scope)

1. **Low risk:** Replace `to-ico` with a maintained favicon pipeline (sharp/png-to-ico script) to clear 10+ dev-chain advisories.
2. **Medium risk:** Plan `next-intl` minor/major upgrade after regression testing redirect middleware.
3. **Medium risk:** Track Next.js 15.5.x → latest patch releases for PostCSS nested dependency updates.
4. **Optional:** Run `npm audit fix` (without `--force`) for `url-regex` only and verify `to-ico` still works.

---

## Verification

```bash
cd /var/www/deweb/web
npm audit
npm run build
```

Both commands were run successfully at audit time (build passes with current lockfile).
