# DEWEB P4B-2 — SEO Service Expansion Audit

**Phase:** P4B-2 SEO Service Expansion  
**Date:** 2026-06-26  
**Domain:** https://dewebam.com  
**Branch:** `main` (local changes, not pushed)

---

## Final Verdict

**P4B-2 SEO SERVICE EXPANSION: COMPLETE**

---

## Objective

Promote legacy thin `/services/seo` from ISOLATED status to a full high-authority commercial service landing page across EN, RU, ES, and AM.

---

## Files Inspected

| Area | Path |
|------|------|
| Service landing architecture | `web/src/lib/service-landing/` |
| Legacy service route | `web/src/app/[locale]/services/[slug]/page.tsx` |
| Legacy SEO data | `web/src/lib/services-data.ts` |
| P4B-1 reference | `web/src/lib/service-landing/pages/landing-page-development.ts` |
| Schema helpers | `web/src/lib/schema.ts`, `ServiceLandingView.tsx` |
| i18n overlays | `web/src/i18n/content/{ru,es,am}/landings/` |
| SEO metadata | `web/src/lib/seo-metadata.ts` |
| Related guides | `web/src/lib/service-landing/related-guides.ts` |
| Authority mesh audit | `web/scripts/p4ba-authority-mesh-audit.ts` |

---

## Implementation Approach

**Safest path:** Add `seo` to `SERVICE_LANDING_SLUGS` while preserving URL `/services/seo`.

- Same slug, same route — no redirects or routing changes
- `isServiceLandingSlug("seo")` now renders `ServiceLandingView` with full schema stack
- Legacy `serviceCategories` entry retained for services index grid and banners
- `generateStaticParams` dedupes legacy slugs that are now landings

---

## Files Modified

### Core landing

| File | Change |
|------|--------|
| `web/src/lib/service-landing/pages/seo.ts` | **NEW** — EN base (~1,939 words) |
| `web/src/lib/service-landing/types.ts` | Added `seo` to `SERVICE_LANDING_SLUGS` |
| `web/src/lib/service-landing/index.ts` | Registered `seoServices` page |
| `web/src/lib/seo-metadata.ts` | Added `LANDING_SEO.seo` entry |
| `web/src/lib/service-landing/related-guides.ts` | 5 related blog guides |
| `web/src/app/[locale]/services/[slug]/page.tsx` | Dedupe static params for landing slugs |

### Localized overlays (NEW)

| File | Words (est.) |
|------|----------------|
| `web/src/i18n/content/ru/landings/seo.ts` | ~1,808 |
| `web/src/i18n/content/es/landings/seo.ts` | ~2,275 |
| `web/src/i18n/content/am/landings/seo.ts` | ~1,998 |

### Locale registration

| File |
|------|
| `web/src/i18n/content/ru/index.ts` |
| `web/src/i18n/content/ru/landings/index.ts` |
| `web/src/i18n/content/es/landings/index.ts` |
| `web/src/i18n/content/am/landings/index.ts` |

### Authority mesh

| File | Change |
|------|--------|
| `web/src/components/layout/PlatformFooter.tsx` | Footer link to `/services/seo` |
| `web/src/components/contact/ContactView.tsx` | Contact chip link to SEO |
| `web/src/lib/service-landing/pages/shopify-development.ts` | Related service → seo |
| `web/src/lib/service-landing/pages/web-application-development.ts` | Related service → seo |
| `web/src/lib/blog/articles/nextjs-vs-wordpress.ts` | Internal link → seo |
| `web/src/lib/blog/articles/headless-commerce-guide.ts` | Internal link → seo |
| `web/src/lib/blog/articles/mvp-development-cost-guide.ts` | Internal link → seo |
| `web/src/lib/blog/articles/custom-web-application-development.ts` | Internal link → seo |
| `web/src/i18n/messages/{en,ru,es,am}.json` | `footer.seoServices` key |

---

## URLs Affected

| Locale | URL |
|--------|-----|
| EN | https://dewebam.com/en/services/seo |
| RU | https://dewebam.com/ru/services/seo |
| ES | https://dewebam.com/es/services/seo |
| AM | https://dewebam.com/am/services/seo |

---

## Locales Updated

All four indexable locales: **EN, RU, ES, AM**

---

## Word Count Estimates

| Locale | Words | Target |
|--------|-------|--------|
| EN | 1,939 | 1,800–2,500 ✅ |
| RU | 1,808 | 1,800–2,500 ✅ |
| ES | 2,275 | 1,800–2,500 ✅ |
| AM | 1,998 | 1,800–2,500 ✅ |

---

## Keyword / Search Intent Coverage

**Primary themes covered:** SEO services, SEO agency, technical SEO, SEO optimization, SEO consulting, SEO strategy, website SEO service.

**Secondary themes covered:** international SEO, multilingual SEO, ecommerce SEO, Shopify SEO, SaaS SEO, marketplace SEO, local SEO, SEO audit, content SEO, on-page SEO, technical SEO audit, organic traffic growth, SEO for lead generation.

**Semantic coverage:** crawlability, indexation, canonical tags, metadata, structured data, Core Web Vitals, internal linking, search intent, content architecture, technical audits, sitemap, robots.txt, hreflang, schema markup, conversion-focused SEO, Search Console, analytics, ranking opportunities.

**Compliance:** No guaranteed rankings. FAQ explicitly states rankings depend on competition, demand, content quality, and search engine behavior.

---

## Internal Links Added

### Outbound from `/services/seo` (14 graph edges)

| Destination | Type |
|-------------|------|
| `/services/landing-page-development` | relatedServices |
| `/services/web-application-development` | relatedServices |
| `/services/shopify-development` | relatedServices |
| `/services/marketplace-development` | relatedServices |
| `/services/saas-development` | relatedServices |
| `/services/uiux` | relatedServices |
| `/marketplace/hire-web-developers` | marketplaceHire |
| `/contact` | CTA primary |
| `/marketplace` | CTA secondary |
| 5 blog guides | relatedGuides (reverse-linked) |

### Inbound to `/services/seo` (18 graph edges, up from 4)

| Source type | Examples |
|-------------|----------|
| Footer (global) | Sitewide link |
| Contact page | Service chip |
| Service landings | landing-page-development, shopify-development, web-application-development |
| Blog articles | technical-seo-for-ecommerce, shopify-development-cost-2026, nextjs-vs-wordpress, headless-commerce-guide, mvp-development-cost-guide, custom-web-application-development |
| Related guides reverse | 5 blog → seo paths |
| Services index | `/services` grid |

---

## Related Guides Added

Registry entry in `SERVICE_RELATED_GUIDES.seo`:

1. `technical-seo-for-ecommerce`
2. `nextjs-vs-wordpress`
3. `headless-commerce-guide`
4. `shopify-development-cost-2026`
5. `mvp-development-cost-guide`

---

## Schema Validation Summary

Rendered via existing `ServiceLandingView` + `services/[slug]/page.tsx` stack:

| Schema | Status |
|--------|--------|
| WebPage | ✅ `webPageSchema({ name, description, url })` |
| BreadcrumbList | ✅ Home → Services → SEO Services |
| Service | ✅ `serviceSchema` with `priceRange: "From $400"` |
| FAQPage | ✅ 8 FAQs via `faqPageSchema(page.faqs)` |

**Not included (by design):** AggregateRating, fake reviews, fake offers, guaranteed-result claims.

Localized URLs use `absoluteUrl(locale, page.path)` — correct per-locale canonical paths.

---

## Authority Mesh Before / After

| Metric | Before (P4B-A) | After (P4B-2) |
|--------|----------------|---------------|
| Classification | ISOLATED | **HIGH** |
| Authority score | 12 | **76** |
| Inbound links | 4 | **18** |
| Outbound links | 0 | **14** |
| Funnel paths | Missing lead-gen | ✅ Complete |
| Page type | legacy-service (dead-end) | service-landing |

Audit source: `web/scripts/p4ba-authority-mesh-audit.ts` → `docs/audits/p4ba-authority-mesh-data.json`

---

## Build / Lint / Typecheck Results

```bash
cd /var/www/deweb/web
npm run build   # ✅ PASS (380 static pages)
npm run lint    # ✅ PASS (1 pre-existing warning: unused import in resolve-related-guides.ts)
npm run typecheck  # ❌ ABSENT — script not defined in package.json
npx tsc --noEmit   # Not run (not requested as mandatory; build includes type validation)
```

**Pre-existing warnings (unchanged):** RU/AM legal page `{date}` intl formatting during SSG.

---

## Risks and Follow-Up Notes

1. **Blog internalLinks localization** — EN base blog links updated; RU/ES/AM blog JSON overlays may still show EN labels until batch sync.
2. **Legacy `services-data.ts` SEO entry** — Retained for services grid/banners; landing page is canonical content at same URL.
3. **RU index pattern** — RU locale uses inline landing imports in `ru/index.ts` (not `landings/index.ts` alone); seo registered in both for consistency.
4. **Remaining ISOLATED legacy pages** — `uiux`, `branding`, `marketing`, `mobile` still thin; target for future phases.

---

## Recommended Next Task

**P4B-3 Mobile Development Expansion**

Mobile has stronger search demand and commercial upside than UI/UX, branding, and marketing legacy pages.

---

**P4B-2 SEO SERVICE EXPANSION: COMPLETE**
