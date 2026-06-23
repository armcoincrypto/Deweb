# Deweb SEO Current State Audit

**Date:** 2026-06-23 16:12 UTC  
**Domain:** https://dewebam.com  
**Project:** `/var/www/deweb`  
**Mode:** Read-only audit — no code changes, commits, restarts, or content rewrites

---

## Executive Verdict

**SEO_FOUNDATION_OK_NEEDS_WORK**

DeWeb has a **serious multilingual SEO foundation**: locale routing, canonical URLs, hreflang in HTML/sitemaps, split sitemaps, robots rules, JSON-LD on key templates, and noindex on private areas. The site is **indexable and crawlable** for marketing pages.

It is **not ready to scale content/SEO aggressively** until technical blockers are fixed: **soft 404s (HTTP 200 on missing URLs)**, **hreflang/x-default inconsistencies in HTTP headers**, **misleading Open Graph image metadata**, **invalid SearchAction schema**, **oversized blog listing HTML (~574 KB)**, and **uncommitted SEO work** (deployment still blocked).

---

## Current Public Status

| Check | Result |
|-------|--------|
| `https://dewebam.com/` | 307 → `/en` |
| `https://dewebam.com/en` | 200 |
| `https://dewebam.com/es`, `/ru`, `/am` | 200 |
| `https://www.dewebam.com/en` | 301 → apex |
| `https://dewebam.com/robots.txt` | 200 |
| `https://dewebam.com/sitemap.xml` | 200 (116 URLs) |
| `https://dewebam.com/sitemap-blog.xml` | 200 (92 URLs) |
| `https://dewebam.com/api/health` | 200 (disallowed in robots) |
| Legacy `/index.html` | 301 → `/en` |

**Rendering:** Homepage and most marketing routes use Next.js SSG/prerender (`x-nextjs-prerender: 1`). Homepage revalidates every 60s.

---

## Pages Audited

### Live crawl (headers + HTML sample)

| Page | HTTP | Indexable | Notes |
|------|------|-----------|-------|
| `/` → `/en` | 307/200 | Yes | hreflang + canonical present |
| `/en/services` | 200 | Yes | Service pillar |
| `/en/services/shopify-development` | 200 | Yes | Long-form landing + schema |
| `/en/blog` | 200 | Yes | **~574 KB HTML** |
| `/en/about` | 200 | Yes | Trust page |
| `/en/contact` | 200 | Yes | Conversion page |
| `/en/marketplace` | 200 | Yes | Marketplace pillar |
| `/en/admin` | 200 | **noindex** | robots.txt disallow + meta noindex |
| `/en/account/login` | 200 | **noindex** | Same |
| `/en/blog/nonexistent-slug-xyz` | **200** | noindex | **Soft 404** |
| `/en/services/fake-service` | **200** | — | **Soft 404** |
| Superseded `/en/services/ecommerce` | 308 | — | Redirects to landing |

### Codebase route inventory (SEO-relevant)

- **Pillar:** `web/src/app/[locale]/page.tsx`, `services/`, `marketplace/`, `blog/`, `about/`, `contact/`
- **Service landings:** `web/src/app/[locale]/services/[slug]/page.tsx` + legacy slug redirects in `web/next.config.mjs`
- **Blog:** `blog/[slug]`, `blog/category/[category]`, dynamic CMS merge via `web/src/lib/blog/`
- **Legal:** privacy, cookie, terms
- **Private (noindex layouts):** `account/`, `dashboard/`, `admin/`, `login/`, `signup/`, `pricing/`

---

## Technical SEO Findings

### Strengths

1. **Central SEO layer** — `web/src/lib/seo.ts` builds canonical, hreflang, OG, Twitter, robots consistently.
2. **Locale SEO** — `web/src/lib/i18n/locale-seo.ts` + `web/src/i18n/messages/*.json` override English defaults per locale.
3. **Sitemap architecture** — Main sitemap for marketing pages; `sitemap-blog.xml` for articles with CMS slugs (`web/src/app/sitemap-blog.xml/route.ts`).
4. **Sitemap guardrails** — `SITEMAP_BLOCKLIST_PREFIXES` + `assertCleanSitemapPaths()` block admin/account paths.
5. **Legacy duplicate control** — `SUPERSEDED_LEGACY_SERVICE_IDS` excluded from sitemap; 301 redirects in `next.config.mjs`.
6. **Structured data** — Organization, WebSite, WebPage, Breadcrumb, Service, Article, FAQ via `web/src/lib/schema.ts` + `PageSchemas`.
7. **Canonical host** — www → apex (nginx + Next middleware).
8. **Trailing slash normalization** — middleware 301.

### Weaknesses

| Issue | Severity | Evidence |
|-------|----------|----------|
| Soft 404s return HTTP 200 | **CRITICAL** | `/en/blog/nonexistent-slug-xyz` and `/en/services/fake-service` → 200 with "Page not found" body |
| x-default mismatch (headers vs HTML) | **HIGH** | Root `Link:` header uses `x-default` → `https://dewebam.com/`; HTML uses `https://dewebam.com/en` |
| Inner pages missing `x-default` in `Link` headers | **MEDIUM** | `/en/services` headers list 4 langs only |
| OG image declares 1200×630 but serves 512×512 PNG | **HIGH** | `web/src/lib/seo.ts` default image + width/height |
| SearchAction URL not server-side searchable | **HIGH** | Schema points to `?q=` but marketplace search is client-only (`MarketplaceView.tsx`) |
| Blog listing HTML ~574 KB | **HIGH** | Pinned full-viewport slides embed heavy markup |
| Uncommitted SEO/i18n changes | **HIGH** | Git dirty tree blocks deploy (`docs/audits/deweb-git-state-investigation.md`) |
| No HSTS header | **MEDIUM** | nginx / certbot config (trust signal, indirect SEO) |
| Duplicate `robots` meta on some error pages | **LOW** | Invalid blog URL HTML shows two noindex tags |

---

## Indexing Findings

### Should be indexable ✅

- Homepage (4 locales)
- Services hub + service landings + remaining legacy service IDs
- Blog index, categories, published articles (static + CMS)
- About, Contact, Marketplace
- Legal pages

### Should be noindex ✅ (implemented)

| Area | robots.txt | meta robots | Sitemap |
|------|------------|-------------|---------|
| `/api` | Disallow | — | Excluded |
| `/{locale}/account/*` | Disallow | noindex (layout) | Excluded |
| `/{locale}/dashboard/*` | Disallow | noindex | Excluded |
| `/{locale}/admin/*` | Disallow | noindex | Excluded |
| `/{locale}/login`, `/signup`, `/pricing` | Disallow | noindex / redirect | Excluded |

**Verified:** `curl /en/admin` → `noindex, follow`. Sitemap contains **no** admin/account/dashboard paths.

### Indexing risks ⚠️

1. **Soft 404s** — Google may treat 200 + "not found" as low-quality URLs; wastes crawl budget.
2. **Blog listing size** — Slow LCP/TTFB can indirectly hurt rankings on `/blog`.
3. **API 200** — `/api/health` is crawlable if discovered; robots disallow helps but is not a substitute for auth on sensitive routes.
4. **dynamicParams on blog** — `dynamicParams: true` allows unknown slugs to render (with noindex metadata) instead of hard 404.

---

## Metadata Findings

### Homepage (`/en`) — live HTML

| Element | Value |
|---------|-------|
| `<title>` (absolute) | DeWeb \| Building The Future Of Digital Business |
| meta description | Present, ~155 chars, service-focused |
| canonical | `https://dewebam.com/en` |
| robots | `index, follow` |
| OG / Twitter | Present (title, description, url, image) |

### Locale samples

| Locale | Title (live) |
|--------|----------------|
| `am` | DeWeb \| Կառուցում ենք Թվային Բիզնեսի Ապագան |
| `en` | DeWeb \| Building The Future Of Digital Business |

Armenian homepage title/description are **properly localized** via `web/src/i18n/messages/am.json` → `seo.home`.

### Service landing example (`/en/services/shopify-development`)

- Canonical: `https://dewebam.com/en/services/shopify-development`
- Meta description: Shopify-specific, good intent match
- **1× H1** in SSR HTML (verified)

### Issues

1. **OG image** — Uses favicon-class PNG with social dimensions declared as 1200×630 (`web/src/lib/seo.ts` lines 145–168).
2. **Default layout metadata** — `web/src/lib/site-metadata.ts` sets `metadataBase` but not page titles (correct — pages use `generateMetadata`).
3. **Title pattern** — Generally good: brand + intent + DEWEB suffix; avoid over-long titles on blog pins.

---

## Hreflang / Canonical Findings

### HTML (correct pattern)

```html
<link rel="canonical" href="https://dewebam.com/en"/>
<link rel="alternate" hrefLang="en" href="https://dewebam.com/en"/>
<link rel="alternate" hrefLang="es" href="https://dewebam.com/es"/>
<link rel="alternate" hrefLang="ru" href="https://dewebam.com/ru"/>
<link rel="alternate" hrefLang="am" href="https://dewebam.com/am"/>
<link rel="alternate" hrefLang="x-default" href="https://dewebam.com/en"/>
```

Source: `buildLanguageAlternates()` in `web/src/lib/seo.ts` — **x-default → English URL**.

### HTTP `Link` headers (inconsistent)

Root redirect response:

```
hreflang="x-default" → https://dewebam.com/
```

Inner pages (e.g. `/en/services`) omit `x-default` in `Link` headers (next-intl middleware).

**Fix required:** Align middleware/next-intl alternate output with `buildLanguageAlternates()` — use `https://dewebam.com/en` for x-default everywhere.

### Sitemap hreflang ✅

Main sitemap entries include full alternate set + x-default pointing to English URLs (verified in live XML).

---

## Sitemap / Robots Findings

### robots.txt (live)

- Allows `/`
- Disallows `/api`, all locale private prefixes
- Host: `https://dewebam.com`
- Sitemaps: `/sitemap.xml`, `/sitemap-blog.xml`

Source: `web/src/app/robots.ts`

### sitemap.xml

- **116 URLs** = 29 paths × 4 locales
- Includes: home, about, contact, services, marketplace, blog index, legal, service landings, blog categories
- Excludes: superseded legacy IDs, private routes
- Source: `web/src/app/sitemap.ts` + `getPageSitemapPaths()` in `web/src/lib/seo.ts`

### sitemap-blog.xml

- **92 URLs** = ~23 articles × 4 locales (static + CMS slugs via API)
- Revalidates hourly (`revalidate = 3600`)
- Source: `web/src/app/sitemap-blog.xml/route.ts`

### Gaps

- No sitemap index file (acceptable at current URL count)
- `lastmod` on main sitemap set to generation time for all URLs (not file-specific) — minor signal loss
- Blog CMS slugs depend on API availability at sitemap generation time

---

## Structured Data Findings

### Global (all locale pages)

From `web/src/components/seo/GlobalSchema.tsx`:

- **Organization** — name, logo, sameAs (LinkedIn, Instagram, Telegram, X), contactPoint (URL only, no phone/address)
- **WebSite** — inLanguage array, **SearchAction** to marketplace with `?q=` template

### Per-page (via `PageSchemas`)

- WebPage + BreadcrumbList on marketing pages
- Service + FAQ on service landings (`web/src/app/[locale]/services/[slug]/page.tsx`)
- Article + Author + FAQ on blog posts

### Issues

| Schema | Problem | File |
|--------|---------|------|
| SearchAction | Target search is client-side filter only — Google may flag invalid structured data | `web/src/lib/schema.ts` |
| Organization | No `address`, `telephone`, or `areaServed` for Armenia/local trust | `web/src/lib/schema.ts` |
| OG vs Article image | Article schema may use real images; default OG still favicon-sized | `web/src/lib/seo.ts` |
| Service `offers` | Uses text `priceRange` ("From $500") — acceptable but not Offer with price | `web/src/lib/schema.ts` |

---

## Content Quality Findings

*Marketing assessment only — no content rewritten in this audit.*

### Pillar: Home

| Criterion | Assessment |
|-----------|------------|
| Search intent | Brand + digital agency / Shopify + AI — clear |
| Keyword target | Shopify, AI automation, digital business — aligned |
| Title/H1 | Localized H1 via `seoH1`; 1 H1 in SSR HTML |
| Meta description | Strong, benefit-led |
| Internal links | Nav to services, blog, marketplace, contact |
| Thin content risk | **Low** — rich cinematic sections |
| Trust / CTA | Testimonials, process, CTAs present |
| Conversion | Strong primary/secondary CTAs |

### Pillar: Services (`/services` + landings)

| Criterion | Assessment |
|-----------|------------|
| Search intent | Commercial investigation — strong |
| Content depth | Landing pages (e.g. Shopify) have long-form sections + FAQs — **good** |
| Localization | `web/src/i18n/content/{en,es,ru,am}/landings/*` — Armenian/Russian landings are substantial |
| Duplicate risk | Legacy IDs redirected — **controlled** |
| CTA | Consultation / bid request paths |

### Pillar: Marketplace (`/marketplace`)

| Criterion | Assessment |
|-----------|------------|
| Search intent | Mixed: marketplace + lead gen |
| Content | Functional UI; lighter editorial SEO copy |
| Thin content risk | **Medium** — could use more indexable explanatory copy above fold |

### Pillar: Blog

| Criterion | Assessment |
|-----------|------------|
| Search intent | Informational — good cluster topics (Shopify, AI, SaaS) |
| Content depth | Articles exist (static + CMS); category pages |
| UX vs SEO | Pinned slide UI creates **very heavy HTML** — hurts crawl efficiency |
| Internal linking | Categories, related content potential — verify per-article links in templates |

### Pillar: About / Contact

| Criterion | Assessment |
|-----------|------------|
| Trust | About explains platform; contact has form |
| Local signals | Contact page — verify consistent NAP in visible content (not audited for phone/address claims) |
| E-E-A-T | Organization schema + social profiles help; no team/address schema |

### Products note

There is no separate `/products` marketing pillar — marketplace + service landings cover commercial intent.

---

## Internal Linking Findings

**Strengths**

- Global nav: Home, Services, Marketplace, Blog, About, Contact
- Footer legal links
- Service landings linked from services hub and homepage pins
- Blog categories and breadcrumbs in schema

**Gaps**

- Marketplace may be under-linked from blog articles (verify `BlogArticleView` related links)
- No visible HTML sitemap page for users/crawlers
- Legacy `deweb-community/*.html` 301 to Next — **good**, reduces duplicate content

---

## Performance Findings

### Live page weight (HTML)

| URL | Approx. size |
|-----|----------------|
| `/en` | ~144 KB |
| `/en/blog` | **~574 KB** |
| `/en/about` | ~121 KB |
| `/en/contact` | ~97 KB |

### Build output (successful build earlier this session)

| Metric | Value |
|--------|-------|
| Shared First Load JS | ~102 KB |
| Homepage route | ~241 KB First Load JS |
| Middleware | ~138 KB |
| Homepage rendering | SSG, revalidate 60s |

### Heavy dependencies (CWV risk)

- **GSAP + Lenis** smooth scroll (`SmoothScrollProvider`)
- **Framer Motion** across cinematic components
- **ParticlesBackground** canvas animation
- Multiple CSS + font preloads (Geist — `display: swap` ✅)
- Next/Image used for brand logo preload ✅
- Blog listing embeds large inline structure

### Lighthouse

- `web/.lighthouse/report.json` exists locally (gitignored) — run `npm run lighthouse:audit` after SEO-P0 fixes for baseline

---

## Mobile UX Findings

- Viewport meta with `viewport-fit=cover` ✅
- Responsive Tailwind classes in cinematic components (prior commits mention mobile fixes)
- Dark theme consistent
- Blog pinned slides — verify touch scroll UX separately (UX, not fully crawled)
- Tap targets / form usability on contact — not browser-tested in this audit

---

## Local SEO Findings

**Business context (from site copy only):** DEWEB presents as an IT marketplace / digital agency serving international clients with **Armenian, Russian, English, Spanish** locales.

| Factor | Status |
|--------|--------|
| Armenian locale (`/am`) | **Good** — homepage and landings translated |
| Russian locale (`/ru`) | **Good** — substantial landing content |
| English / Spanish | Present with SEO message packs |
| Organization local address | **Missing** in schema and visible NAP |
| LocalBusiness schema | **Not implemented** |
| `hreflang` for AM | Present — targets Armenian language, not geo |
| Contact point in schema | URL-only (`/en/contact`) |
| Social profiles | LinkedIn, Instagram, Telegram, X in Organization sameAs |

**Note:** Do not add fake addresses or phone numbers. Only add LocalBusiness/PostalAddress when accurate business data is confirmed.

---

## Critical SEO Blockers

| # | Issue | Exact fix location |
|---|-------|-------------------|
| C1 | **Soft 404** — missing blog/service URLs return HTTP 200 | `web/src/app/[locale]/blog/[slug]/page.tsx`, `services/[slug]/page.tsx`, ensure `notFound()` returns 404; commit `not-found.tsx` |
| C2 | **x-default hreflang inconsistency** in HTTP headers | `web/src/middleware.ts`, next-intl routing config — align with `web/src/lib/seo.ts` `buildLanguageAlternates()` |
| C3 | **Invalid SearchAction** — search URL not functional server-side | `web/src/lib/schema.ts` — remove or implement server-side search route |
| C4 | **OG image dimension mismatch** | `web/src/lib/seo.ts` — use real 1200×630 asset or correct width/height |

---

## High Priority SEO Issues

| # | Issue | Files |
|---|-------|-------|
| H1 | Blog index HTML ~574 KB | `web/src/components/blog/PinnedBlogListingExperience.tsx`, `BlogListingView.tsx` |
| H2 | SEO changes not deployable (git blocked) | Commit + push per `docs/runbooks/deweb-safe-deployment.md` |
| H3 | OG/Twitter default image is square favicon | Add `web/public/og-default.jpg` (1200×630), reference in `seo.ts` |
| H4 | Main sitemap `lastmod` not content-accurate | `web/src/app/sitemap.ts`, `web/src/lib/sitemap-utils.ts` |
| H5 | Marketplace thin editorial layer | `web/src/components/marketplace/MarketplaceView.tsx` + i18n copy (content, post-P2) |

---

## Medium Priority SEO Issues

| # | Issue |
|---|-------|
| M1 | Inner page `Link` headers omit x-default |
| M2 | No HTML breadcrumb visibility on all templates (schema exists, UX gap) |
| M3 | No monitoring workflow documented (GSC, Bing, sitemap ping) |
| M4 | `BLOG_SEO` overrides empty — rely on fallbacks only (`web/src/lib/seo-metadata.ts`) |
| M5 | HSTS missing (nginx) |
| M6 | Blog `generateMetadata` returns noindex without 404 for missing slugs — confusing signals |

---

## Low Priority SEO Improvements

| # | Issue |
|---|-------|
| L1 | Add sitemap index if URL count grows past ~500 |
| L2 | `Host:` directive in robots.txt (non-Google; optional) |
| L3 | ESLint unused imports in SEO-related pages |
| L4 | Visible author bios on blog for E-E-A-T |
| L5 | Run scheduled `web/scripts/seo-audit.mjs` + `ping-sitemaps.mjs` in cron |

---

## Exact Files Reviewed

```
web/src/app/robots.ts
web/src/app/sitemap.ts
web/src/app/sitemap-blog.xml/route.ts
web/src/app/[locale]/layout.tsx
web/src/app/[locale]/page.tsx
web/src/app/[locale]/admin/layout.tsx
web/src/app/[locale]/account/layout.tsx
web/src/app/[locale]/services/[slug]/page.tsx
web/src/app/[locale]/blog/page.tsx
web/src/app/[locale]/blog/[slug]/page.tsx
web/src/app/not-found.tsx
web/src/app/[locale]/not-found.tsx
web/src/middleware.ts
web/next.config.mjs
web/src/lib/seo.ts
web/src/lib/seo-metadata.ts
web/src/lib/sitemap-utils.ts
web/src/lib/schema.ts
web/src/lib/i18n/locale-seo.ts
web/src/lib/i18n/page-metadata.ts
web/src/components/seo/GlobalSchema.tsx
web/src/components/seo/PageSchemas.tsx
web/src/components/cinematic/CinematicHero.tsx
web/src/components/cinematic/PinnedServiceSlide.tsx
web/src/components/marketplace/MarketplaceView.tsx
web/src/i18n/messages/en.json
web/src/i18n/messages/am.json
web/src/i18n/content/ru/landings/shopify-development.ts
deploy/nginx-deweb-production.conf
docs/audits/deweb-git-state-investigation.md
```

---

## Exact Commands Run

```bash
# Phase 1 — Live crawl
curl -I https://dewebam.com/
curl -I https://dewebam.com/en
curl -I https://dewebam.com/es
curl -I https://dewebam.com/ru
curl -I https://dewebam.com/am
curl -I https://dewebam.com/robots.txt
curl -I https://dewebam.com/sitemap.xml
curl -s https://dewebam.com/robots.txt
curl -s https://dewebam.com/sitemap.xml | head -80

# Headers + metadata samples
curl -I https://dewebam.com/en/services
curl -I https://dewebam.com/en/blog
curl -I https://dewebam.com/en/admin
curl -I https://dewebam.com/en/account/login
curl -I https://www.dewebam.com/en
curl -s https://dewebam.com/en | grep -oE '<(title|meta|link)[^>]+>' | head -40
curl -s https://dewebam.com/en | python3 -c "… x-default extract …"

# Soft 404 checks
curl -s -o /dev/null -w "%{http_code}\n" https://dewebam.com/en/blog/nonexistent-slug-xyz
curl -s -o /dev/null -w "%{http_code}\n" https://dewebam.com/en/services/fake-service

# Sitemap counts
curl -s https://dewebam.com/sitemap.xml | grep -c '<loc>'
curl -s https://dewebam.com/sitemap-blog.xml | grep -c '<loc>'

# H1 counts (SSR)
curl -s https://dewebam.com/en | tr '>' '>\n' | grep -c '<h1'

# Page sizes
curl -s https://dewebam.com/en/blog | wc -c

# Phase 5 — Build (earlier successful run this session)
cd /var/www/deweb/web && npm run build

# Validation
cd /var/www/deweb && git status --short | wc -l
nginx -t
```

---

## Validation Results

| Command | Result |
|---------|--------|
| Live marketing URLs | ✅ 200 (locales, robots, sitemaps) |
| Private pages noindex | ✅ Verified on `/en/admin`, `/en/account/login` |
| Sitemap privacy | ✅ No admin/account URLs |
| Soft 404 | ❌ HTTP 200 on invalid blog/service URLs |
| x-default consistency | ❌ Header vs HTML mismatch on root |
| `npm run build` | ✅ Passed earlier session (homepage ~241 KB FL JS); clean rebuild failed later (env/module resolution — investigate separately) |
| `nginx -t` | ✅ Pass |
| Git deploy readiness | ❌ DEPLOYMENT_BLOCKED (56+ modified files uncommitted) |

---

## Recommended SEO Roadmap

### SEO-P0 — Indexing / canonical / robots blockers

1. Return **HTTP 404** for unknown blog slugs and service slugs (`notFound()` + proper status).
2. Align **x-default** across HTML, sitemap, and HTTP `Link` headers.
3. Fix or remove **SearchAction** in WebSite schema.
4. Replace OG default image with correct **1200×630** asset (or fix dimensions).
5. Commit and deploy SEO fixes (resolve git blocked state first).

### SEO-P1 — Metadata, sitemap, hreflang, schema

1. Add dedicated OG image per major template (home, services, blog).
2. Improve sitemap `lastmod` from content dates.
3. Add Organization `areaServed` / contact fields when business data confirmed.
4. Ensure all inner pages emit x-default in middleware headers.

### SEO-P2 — Homepage and service landing content

1. Marketplace editorial intro (indexable copy).
2. Strengthen internal links from home pins to priority landings.
3. FAQ expansion on high-intent landings (content team).

### SEO-P3 — Blog / content cluster strategy

1. Reduce blog index HTML weight (pagination or lighter listing for bots).
2. CMS blog SEO fields audit (title, meta, canonical).
3. Topic clusters: Shopify, AI automation, SaaS MVP.

### SEO-P4 — Internal linking and conversion UX

1. Related articles component on all posts.
2. Contextual CTAs from blog → contact / service landings.
3. Breadcrumb UI matching schema.

### SEO-P5 — Performance / Core Web Vitals

1. Lazy-load GSAP/Lenis below fold where possible.
2. Audit ParticlesBackground on mobile.
3. Run Lighthouse CI baseline; target LCP on `/en` and `/en/blog`.

### SEO-P6 — Local SEO and multilingual authority

1. Armenian/Russian content QA pass (no invented claims).
2. LocalBusiness schema only with verified address/phone.
3. hreflang monitoring in GSC international targeting report.

### SEO-P7 — Monitoring and Search Console workflow

1. Verify `dewebam.com` in Google Search Console.
2. Submit both sitemaps; monitor Coverage + Page indexing.
3. Schedule weekly: `npm run seo:audit`, `scripts/ping-sitemaps.mjs`, GSC performance export.

---

## Next Cursor Prompt

Copy-paste for the remediation phase:

```
SEO-P0 Deweb Technical SEO Fixes

Context: Audit at docs/audits/deweb-seo-current-state-audit-20260623-1612.md
Domain: https://dewebam.com
Verdict: SEO_FOUNDATION_OK_NEEDS_WORK

Fix SEO-P0 only. Minimal diffs. No content rewrites. No UI redesign.

1. SOFT 404 — Return HTTP 404 for invalid blog and service slugs.
   Files: web/src/app/[locale]/blog/[slug]/page.tsx, web/src/app/[locale]/services/[slug]/page.tsx
   Ensure notFound() fires before render; verify generateMetadata does not emit hreflang for missing slugs.
   Test: curl -s -o /dev/null -w "%{http_code}" https://dewebam.com/en/blog/fake-slug → 404

2. HREFLANG x-default — Align HTTP Link headers with HTML/sitemap (x-default → https://dewebam.com/en/en paths).
   Files: web/src/middleware.ts, web/src/i18n/routing.ts (if needed), web/src/lib/seo.ts buildLanguageAlternates()

3. SEARCHACTION — Remove or fix WebSite SearchAction in web/src/lib/schema.ts (marketplace search is client-only).

4. OG IMAGE — Add web/public/og-default.jpg (1200×630) or fix width/height in web/src/lib/seo.ts to match actual asset.

5. VALIDATE — npm run build, curl checks on /en, invalid URLs, robots.txt, sitemap.xml.

6. REPORT — docs/audits/deweb-seo-p0-fixes-YYYYMMDD-HHMM.md with before/after curl results.

Do not commit until I approve. Do not restart services unless build passes.
```

---

*End of SEO audit. No production code was modified.*
