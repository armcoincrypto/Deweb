# SEO-P2D: Hire Web Developers Landing — Implementation Audit

**Date:** 2026-06-24 20:06 CEST  
**Project:** `/var/www/deweb`  
**URL:** `/marketplace/hire-web-developers` (locale-prefixed: `/en/marketplace/hire-web-developers`)  
**Verdict:** `SEO_P2D_WEB_DEVELOPERS_COMPLETE`

---

## Summary

Implemented the first hire-intent marketplace landing at `/marketplace/hire-web-developers` with commercial copy (~807 EN words), FAQ + breadcrumb JSON-LD, full EN/RU/ES/AM localization, sitemap registration, and hub cross-link from `/marketplace`.

---

## Deliverables

| Item | Status |
|------|--------|
| Route `web/src/app/[locale]/marketplace/hire-web-developers/page.tsx` | Done |
| Content component `HireWebDevelopersContent.tsx` | Done |
| Hero + breadcrumb UI `HireWebDevelopersHero.tsx` | Done |
| CTA block `HireWebDevelopersCta.tsx` | Done |
| FAQ helper `web/src/lib/marketplace-hire.ts` | Done |
| SEO metadata (`seo-metadata.ts` + `seo.hire-web-developers` i18n) | Done |
| Sitemap path (`PUBLIC_STATIC_PATHS`) | Done |
| Hub back-link on `/marketplace` | Done |

---

## Content Requirements

| Requirement | Result |
|-------------|--------|
| Word count 800–1200 | **807** EN words (body copy keys) |
| Commercial intent | Yes — hiring, proposals, budgets, engagement models |
| Why hire developers | `whyHireTitle` + 2 paragraphs |
| Types of developers | 6 role types |
| Engagement models | 4 models with internal links |
| Project process | 5-step ordered list |
| FAQ section | 7 Q&A pairs |
| CTA | Primary (post listing) + secondary (contact) |

---

## Internal Links (required)

| Target | Present |
|--------|---------|
| `/marketplace` (hub) | Yes — engagement model + related section |
| `/services/web-application-development` | Yes |
| Dedicated development team → `/marketplace` | Yes (engagement model 3) |
| `/services/marketplace-development` | Yes |
| `/contact` | Yes — CTA + related section |

---

## Schema

Validated on `http://127.0.0.1:3001/en/marketplace/hire-web-developers`:

- `BreadcrumbList` — Home → Marketplace → Hire Web Developers
- `FAQPage` — 7 FAQ entries via `PageSchemas` + `buildHireWebDevelopersFaqs()`

---

## Validation

| Check | Result |
|-------|--------|
| `npm run build` (web) | **PASS** (exit 0) |
| Home `/en/` | **200** (308 → follow → 200 on prod) |
| Hire page `/en/marketplace/hire-web-developers` | **200** |
| Blog fake slug `/en/blog/this-slug-does-not-exist-xyz` | **404** |
| Service fake slug `/en/services/this-service-does-not-exist-xyz` | **404** |
| Service restart `deweb-next` | Done (port 3001) |

Production (`https://dewebam.com`): hire page **200**, fake blog/service **404**.

---

## Design System

Matched existing marketplace patterns:

- `PageHeader` + container-narrow layout
- `text-white/65` body, `text-deweb-cyan` links
- `GlowButton` CTA (same as hub/services)
- `PageSchemas` for JSON-LD (same as marketplace hub)

---

## Locales

Full `marketplace.hireWebDevelopers.*` and `seo.hire-web-developers` keys added for **en**, **ru**, **es**, **am**.

---

## Out of Scope (unchanged)

- Other hire pages (`hire-telegram-bot-developers`, `hire-ai-automation-specialists`)
- Crypto gateway
- P2C blog internal link fixes (separate uncommitted changes)

---

## Final Verdict

**SEO_P2D_WEB_DEVELOPERS_COMPLETE**
