# DEWEB SEO-P1 Metadata, Sitemap & Schema Audit

**Date:** 2026-06-24 13:55 CEST  
**Project:** `/var/www/deweb/web`  
**Production:** https://dewebam.com

---

## Executive Verdict

**`SEO_P1_COMPLETE`**

Technical SEO improvements applied without UI/design changes. Build passes, live smoke tests pass, sitemap/robots validated, canonical hreflang restored, schema cleaned and enriched.

---

## Issues Found (before)

| Area | Issue |
|------|-------|
| WebSite schema | Invalid `SearchAction` pointing to client-only marketplace search (`?q=` not server-rendered) |
| Organization | Flat logo URL, single ContactPoint object, no email |
| Service schema | No `@id`, limited Offer metadata |
| FAQ schema | Empty FAQ arrays could emit invalid FAQPage |
| OG metadata | Default image was 512×512 favicon declared as 1200×630 |
| Sitemap `lastmod` | All URLs used build-time `now` |
| Canonical / hreflang | HTTP `Link` headers missing; `x-default` only in HTML |
| Middleware | No alternate Link headers after backup recovery |

---

## Changes Made

### Schema (`web/src/lib/schema.ts`)

- **Organization:** ImageObject logo, `email`, `contactPoint` array with email + `areaServed`, OG image reference
- **WebSite:** Removed `SearchAction`; added `copyrightHolder`
- **Service:** Added `@id`, `serviceType`, Offer `availability` + `url`
- **FAQ:** Returns `null` when no valid Q&A pairs; callers filter via `JsonLd`

### Metadata (`web/src/lib/seo.ts`)

- Added `DEFAULT_OG_IMAGE` (`/og/deweb-og-1200x630.png`) with truthful 1200×630 dimensions
- Default OG uses real asset instead of favicon

### Sitemap (`web/src/app/sitemap.ts`, `web/src/lib/sitemap-utils.ts`)

- **`pathLastModified()`** — stable dates per path type:
  - Marketing pages: `2026-06-23`
  - Service pages: `2026-06-15`
  - Blog categories: `2026-06-20`
  - Legal pages: from `LEGAL_LAST_UPDATED` (June 8, 2026)
- Blog sitemap unchanged (already uses per-post dates via `blogPathLastModified`)

### Canonical / hreflang (`web/src/middleware.ts`, `web/src/i18n/routing.ts`)

- `alternateLinks: false` on next-intl routing (single hreflang source)
- Custom HTTP `Link` headers with `x-default` → `https://dewebam.com/en`

### JsonLd (`web/src/components/seo/JsonLd.tsx`)

- Filters `null`/`undefined` schema entries (empty FAQ safe)

---

## Validation Results

### Build

```bash
cd /var/www/deweb/web && npm run build
# PASS
```

### Live smoke

```
home: 200
blog fake: 404
service fake: 404
```

### robots.txt

```
User-Agent: *
Allow: /
Disallow: /api, /en/account, /en/dashboard, /en/admin, ...
Sitemap: https://dewebam.com/sitemap.xml
Sitemap: https://dewebam.com/sitemap-blog.xml
Host: https://dewebam.com
```

### sitemap.xml (sample)

```xml
<loc>https://dewebam.com/en</loc>
<xhtml:link hreflang="x-default" href="https://dewebam.com/en" />
<lastmod>2026-06-23T00:00:00.000Z</lastmod>
```

### Canonical consistency

HTTP `Link` header on `/en`:

```
hreflang="x-default" → https://dewebam.com/en
```

HTML metadata: `deweb-og-1200x630.png` at 1200×630; no `SearchAction` in page source.

Organization JSON-LD includes `email`; WebSite schema has no SearchAction.

---

## Files Changed

| File | Change |
|------|--------|
| `web/src/lib/schema.ts` | Organization, WebSite, Service, FAQ schema |
| `web/src/lib/seo.ts` | OG constants and truthful dimensions |
| `web/src/lib/sitemap-utils.ts` | `pathLastModified()` |
| `web/src/app/sitemap.ts` | Per-path lastmod |
| `web/src/middleware.ts` | hreflang Link headers |
| `web/src/i18n/routing.ts` | `alternateLinks: false` |
| `web/src/components/seo/JsonLd.tsx` | Null-safe schema array |
| `web/src/components/seo/PageSchemas.tsx` | Skip empty FAQ schema |

---

## Remaining SEO (P2+)

- Per-locale metadata copy review (i18n `seo.*` messages)
- Blog listing HTML payload size
- `LocalBusiness` schema if physical address is added
- HSTS preload at nginx
- Automated sitemap lastmod from CMS/content file mtimes

---

## Commit

```
fix/seo: P1 metadata, sitemap lastmod, and schema improvements
```
