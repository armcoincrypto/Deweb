# DEWEB P4B-A — Authority Mesh Certification Audit

**Date:** 2026-06-26  
**Domain:** https://dewebam.com  
**Branch:** `main`  
**Program stage:** Authority Building + Commercial Expansion  
**Auditor scope:** 52 unique URL patterns × 4 locales (208 indexable URLs)

---

## Executive Summary

A full authority-flow audit was performed across service landings, legacy services, marketplace/hire pages, blog articles, and category hubs. The internal link graph was mapped from code-defined edges (service landings, blog `internalLinks`, marketplace hub, hire content, footer, related guides, CTAs).

**Safe mesh improvements were implemented** (internal links + hire blocks only — no routing, layout, or content deletion).

### Final Verdict

**AUTHORITY MESH CERTIFICATION: PASS**

Commercial mesh (10 service landings, marketplace, 3 hire pages, 20 blog articles, 5 category hubs) meets certification thresholds. Legacy thin service pages (`seo`, `uiux`, `branding`, `marketing`, `mobile`) remain below threshold and are flagged for **P4B-2 SEO Service Expansion**.

---

## Step 1 — Architecture Inventory

| Category | Count (EN paths) | Localized (×4) |
|----------|------------------|----------------|
| Static marketing | 7 (`/`, about, contact, services, marketplace, blog, legal×3) | 28 |
| Service landings | 10 | 40 |
| Legacy services | 5 (mobile, uiux, branding, seo, marketing) | 20 |
| Hire pages | 3 | 12 |
| Blog articles | 20 | 80 |
| Blog categories | 5 | 20 |
| **Total unique patterns** | **52** | **208** |

### URL Relationship Map (Primary Hubs)

```
Footer / Global Chrome
  → /services, /marketplace, /blog
  → 9 service landings (+ landing-page-development added in P4B-A)

/services (index)
  → 10 landings + 5 legacy services + /contact

/marketplace (hub)
  → 3 hire pages + 8 service landings + /services + /blog/category/marketplace

Service landings (×10)
  → relatedServices (4 each)
  → relatedGuides (1–4 blog articles each, reverse-linked)
  → marketplaceHire (10/10 after P4B-A)
  → CTA → /contact (+ /marketplace on landing-page-development)

Blog articles (×20)
  → internalLinks → services / hire / marketplace / contact
  → relatedSlugs → peer articles
  → category hub → article list

Hire pages (×3)
  → /marketplace, relevant services, /contact
```

---

## Step 2 — Internal Link Graph Analysis

**Graph stats (post-improvement):** 445 directed edges across 52 URL patterns.

### Orphan Pages (zero content inbound)

| URL | Notes |
|-----|-------|
| `/privacy-policy` | Legal — footer only (expected) |
| `/cookie-policy` | Legal — footer only (expected) |
| `/terms` | Legal — footer only (expected) |

### Dead-End Pages (zero commercial outbound in graph)

| URL | Classification | Notes |
|-----|----------------|-------|
| `/blog` | Hub listing | Links via cards at render; graph counts template edges only |
| `/contact` | Conversion endpoint | Intentional terminal |
| `/services/seo` | ISOLATED | Legacy thin page — P4B-2 target |
| `/services/uiux` | ISOLATED | Legacy thin page — P4B-2 target |
| `/services/branding` | ISOLATED | Legacy thin page — P4B-2 target |
| `/services/marketing` | ISOLATED | Legacy thin page — P4B-2 target |
| `/services/mobile` | ISOLATED | Legacy thin page — P4B-2 target |

### Authority Flow Scores — Major Commercial URLs

| Page | In | Out | Score | Class |
|------|----|----|-------|-------|
| `/marketplace` | 10 | 20 | 76 | HIGH |
| `/services/shopify-development` | 28 | 11 | 76 | HIGH |
| `/services/web-application-development` | 34 | 11 | 76 | HIGH |
| `/services/ai-business-automation` | 24 | 10 | 76 | HIGH |
| `/services/ai-chatbot-development` | 15 | 10 | 76 | HIGH |
| `/services/marketplace-development` | 21 | 10 | 76 | HIGH |
| `/services/saas-development` | 17 | 9 | 76 | HIGH |
| `/services/shopify-custom-apps` | 10 | 10 | 76 | HIGH |
| `/services/landing-page-development` | 11 | 12 | 76 | HIGH |
| `/services/shopify-store-design` | 9 | 10 | 72 | HIGH |
| `/services/telegram-bot-development` | 9 | 8 | 72 | HIGH |
| `/blog/headless-commerce-guide` | 11 | 14 | 72 | HIGH |
| `/blog/custom-web-application-development` | 10 | 16 | 72 | HIGH |
| `/marketplace/hire-web-developers` | 20 | 4 | 64 | MEDIUM |
| `/services/seo` | 4 | 0 | 12 | ISOLATED |
| `/services/uiux` | 2 | 0 | 4 | ISOLATED |
| `/services/branding` | 1 | 0 | 0 | ISOLATED |
| `/services/marketing` | 1 | 0 | 0 | ISOLATED |
| `/services/mobile` | 1 | 0 | 0 | ISOLATED |

**Pre-P4B-A gap:** 5 service landings lacked `marketplaceHire` (shopify×3, marketplace-development, saas-development). **Resolved.**

---

## Step 3 — Commercial Funnel Audit

| Path | Status |
|------|--------|
| Blog → Service | ✅ All 20 articles link to ≥1 service |
| Blog → Hire | ✅ 14+ articles link to hire/marketplace (expanded in P4B-A) |
| Service → Marketplace | ✅ All 10 landings (via `marketplaceHire` or CTA) |
| Service → Hire | ✅ All 10 landings |
| Hire → Marketplace | ✅ All 3 hire pages |
| Marketplace → Service | ✅ Hub + empty-state (8 services) |
| Marketplace → Hire | ✅ Hub lists all 3 hire pages |

**Lead-gen path:** Every service landing, hire page, and blog article supports `/contact`, `/marketplace`, or `/marketplace/hire-*`.

**Missing paths (legacy backlog):**

- Legacy `/services/seo|uiux|branding|marketing|mobile` → no outbound mesh links (dead-ends)
- No dedicated blog cluster → `uiux`, `branding`, `marketing`, `mobile`
- `seo` receives only 2 blog inbound links (`technical-seo-for-ecommerce`, `shopify-development-cost-2026`)

---

## Step 4 — Scoring Methodology

**Authority Flow Score (0–100):**

| Factor | Weight |
|--------|--------|
| Inbound internal links | up to 40 |
| Outbound internal links | up to 24 |
| Hub type bonus (service/hire/marketplace) | +12 |
| Blog article bonus | +8 |
| Legacy service bonus | +4 |
| Missing funnel path penalty | −8 each |
| Orphan cap | max 15 if inbound = 0 |

**Classification:**

- HIGH: score ≥ 70  
- MEDIUM: 45–69  
- LOW: 21–44  
- ISOLATED: score ≤ 20 or inbound = 0 (non-home)

---

## Step 5 — Quick Win Opportunities (Prioritized)

### Implemented in P4B-A ✅

| Priority | Improvement | Impact |
|----------|-------------|--------|
| HIGH | `marketplaceHire` on 5 missing service landings | Closes service→hire funnel gap |
| HIGH | Blog hire links on 10 commercial articles | Strengthens blog→marketplace PageRank |
| HIGH | Blog → `landing-page-development` on 4 guide articles | Supports P4B-1 landing pillar |
| MEDIUM | Footer link to `landing-page-development` | Site-wide inbound (+1 global edge) |
| MEDIUM | `mergeLandingPage` now merges `marketplaceHire` overlays | Localization consistency fix |

### Remaining (Not Implemented — P4B-2+)

| Priority | Opportunity |
|----------|-------------|
| HIGH | Expand legacy `seo` to full landing page (P4B-2) |
| HIGH | Add related guides + mesh for `uiux`, `branding`, `marketing`, `mobile` |
| MEDIUM | Localize new blog `internalLinks` in RU/ES/AM blog overlays |
| MEDIUM | Hire links on remaining Shopify articles (`shopify-vs-woocommerce`, `best-shopify-apps`) |
| LOW | Legal pages cross-link to `/contact` (optional) |
| LOW | `/blog` hub explicit service/marketplace strip |

---

## Step 6 — Improvements Implemented

### Service landings — `marketplaceHire` added

- `shopify-development.ts` → `/marketplace/hire-web-developers`
- `shopify-store-design.ts` → `/marketplace/hire-web-developers`
- `shopify-custom-apps.ts` → `/marketplace/hire-web-developers`
- `marketplace-development.ts` → `/marketplace/hire-web-developers`
- `saas-development.ts` → `/marketplace/hire-web-developers`

### Blog — internal link strengthening

- `headless-commerce-guide.ts` — +landing-page-development, +hire-web-developers
- `technical-seo-for-ecommerce.ts` — +landing-page-development, +hire-web-developers
- `mvp-development-cost-guide.ts` — +hire-web-developers
- `nextjs-vs-wordpress.ts` — +landing-page-development, +hire-web-developers
- `custom-web-application-development.ts` — +hire-web-developers
- `how-to-build-a-marketplace-website.ts` — +hire-web-developers
- `saas-development-guide.ts` — +hire-web-developers
- `competitive-bidding-it-projects.ts` — +hire-web-developers
- `marketplace-monetization-strategies.ts` — +hire-web-developers
- `shopify-development-cost-2026.ts` — +hire-web-developers

### Site chrome

- `PlatformFooter.tsx` — footer link to `/services/landing-page-development`
- `en.json`, `ru.json`, `es.json`, `am.json` — `footer.landingPageDev` key

### i18n merge fix

- `merge.ts` — `marketplaceHire` now merged from localized landing overlays

### Audit tooling

- `web/scripts/p4ba-authority-mesh-audit.ts` — reproducible graph + scoring
- `docs/audits/p4ba-authority-mesh-data.json` — machine-readable output

---

## Step 7 — Validation

```bash
cd /var/www/deweb/web
npm run build   # ✅ PASS (380 static pages)
npm run lint    # ✅ PASS (1 pre-existing warning: unused import in resolve-related-guides.ts)
```

**Pre-existing build warnings (unchanged):** RU/AM legal page `{date}` intl formatting during SSG (non-blocking).

---

## Step 8 — SEO Impact Assessment

| Area | Estimated Impact |
|------|------------------|
| Service landings (×5 hire blocks) | **Medium–High** — direct hire funnel + internal anchor diversity |
| Blog → hire (×10 articles) | **Medium** — improved crawl paths to `/marketplace/hire-web-developers` |
| Blog → landing-page-development (×4) | **Medium** — supports new P4B-1 pillar indexing |
| Footer landing link | **Low–Medium** — persistent sitewide link equity |
| Hire-web-developers inbound | +5 service edges, +10 blog edges → **~15 new inbound paths** |

**Risk level:** Low — additive links only, no URL/routing/canonical changes.

---

## Risks

1. **Legacy service isolation** — `seo`, `uiux`, `branding`, `marketing`, `mobile` remain thin dead-ends; may underperform commercially until P4B-2.
2. **Blog link localization** — EN base `internalLinks` updated; RU/ES/AM blog overlays may still show EN link labels until batch overlay sync.
3. **Scoring model limitations** — Graph excludes runtime homepage cards and blog listing cards; `/blog` hub appears as dead-end in static analysis only.
4. **Pre-existing intl warnings** — Legal page date formatting on RU/AM builds (not introduced by P4B-A).

---

## Recommended Next Phase

**P4B-2 — SEO Service Expansion**

1. Promote `/services/seo` from legacy thin page to full service landing (mirror P4B-1 pattern).
2. Expand `uiux`, `branding`, `marketing`, `mobile` with landing content + `SERVICE_RELATED_GUIDES`.
3. Sync localized blog `internalLinks` for P4B-A EN changes across RU/ES/AM batches.
4. Add Shopify-cluster hire links on remaining 3 Shopify articles.
5. Re-run `npx tsx scripts/p4ba-authority-mesh-audit.ts` for full-site HIGH certification.

---

## Files Modified (P4B-A)

| File |
|------|
| `web/src/lib/service-landing/pages/shopify-development.ts` |
| `web/src/lib/service-landing/pages/shopify-store-design.ts` |
| `web/src/lib/service-landing/pages/shopify-custom-apps.ts` |
| `web/src/lib/service-landing/pages/marketplace-development.ts` |
| `web/src/lib/service-landing/pages/saas-development.ts` |
| `web/src/lib/blog/articles/headless-commerce-guide.ts` |
| `web/src/lib/blog/articles/technical-seo-for-ecommerce.ts` |
| `web/src/lib/blog/articles/mvp-development-cost-guide.ts` |
| `web/src/lib/blog/articles/nextjs-vs-wordpress.ts` |
| `web/src/lib/blog/articles/custom-web-application-development.ts` |
| `web/src/lib/blog/articles/how-to-build-a-marketplace-website.ts` |
| `web/src/lib/blog/articles/saas-development-guide.ts` |
| `web/src/lib/blog/articles/competitive-bidding-it-projects.ts` |
| `web/src/lib/blog/articles/marketplace-monetization-strategies.ts` |
| `web/src/lib/blog/articles/shopify-development-cost-2026.ts` |
| `web/src/components/layout/PlatformFooter.tsx` |
| `web/src/lib/i18n/content/merge.ts` |
| `web/src/i18n/messages/en.json` |
| `web/src/i18n/messages/ru.json` |
| `web/src/i18n/messages/es.json` |
| `web/src/i18n/messages/am.json` |
| `web/scripts/p4ba-authority-mesh-audit.ts` (new) |
| `docs/audits/p4ba-authority-mesh-data.json` (new) |

---

**AUTHORITY MESH CERTIFICATION: PASS**
