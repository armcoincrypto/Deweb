# SEO-P2A Marketplace Hub Optimization Audit

**Date:** 2026-06-24 12:12 UTC  
**Domain:** https://dewebam.com  
**Scope:** `/marketplace` hub only (all locales)  
**Verdict:** `SEO_P2A_MARKETPLACE_COMPLETE`

---

## Phase 1 — Before State

| Item | Before |
|------|--------|
| H1 | Marketplace |
| Title | IT Marketplace \| Find Developers & Digital Services \| DEWEB |
| Meta description | Post projects, compare offers and connect with verified software developers and digital service providers. |
| Word count (hub body) | ~116 visible words |
| Internal links | Minimal (account CTAs only) |
| Schema | WebPage + BreadcrumbList |
| CTA structure | Filter tabs, Post Yours, Submit Offer |
| Locale coverage | EN/RU/ES/AM UI strings; thin copy only |

---

## Phase 2 — After State

| Item | After |
|------|--------|
| H1 | Software Development Marketplace |
| Supporting headline | Find developers, designers, AI engineers, automation specialists, and technical teams for your next project. |
| Title | Software Development Marketplace \| Hire Developers & Technical Experts \| DEWEB |
| Meta description | Post your software project, compare technical specialists, and connect with developers, designers, AI automation experts, and digital teams through DEWEB Marketplace. |
| Word count (hub body) | ~892 words (hub section) + H1/subtitle |
| Sections added | What you can hire for, How it works, Why DEWEB, Popular categories, For clients, For specialists, Resources, FAQ (8 items) |
| UI layout | Unchanged — hub content inserted above existing marketplace listings |

### Internal links added (existing pages only)

| Target | Anchor context |
|--------|----------------|
| `/services` | All digital services catalog |
| `/services/shopify-development` | Shopify development |
| `/services/ai-chatbot-development` | AI chatbot development |
| `/services/web-application-development` | Web application development |
| `/services/marketplace-development` | Marketplace development |
| `/services/landing-page-development` | Landing page development |
| `/blog/category/marketplace` | DEWEB Marketplace blog section |
| `/contact` | Contact DEWEB |

### Recommended future pages (not linked — do not exist yet)

- Dedicated `/marketplace/hire-web-developers` category landing
- Dedicated `/marketplace/hire-telegram-bot-developers` category landing
- `/services/telegram-bot-development` (if added as service slug)

---

## Phase 3 — Metadata

- Canonical: `https://dewebam.com/en/marketplace` ✓
- Hreflang: en, es, ru, am, x-default ✓
- OG image: `https://dewebam.com/og/deweb-og-1200x630.png` (1200×630) ✓
- No SearchAction added ✓

---

## Phase 4 — Structured Data

| Schema | Status |
|--------|--------|
| WebPage | Present |
| BreadcrumbList | Present (Home → Marketplace) |
| FAQPage | Added — 8 Q&A matching visible FAQ |
| AggregateRating | Not added (no fake reviews) |
| SearchAction | Not added (no server-rendered search URL) |

---

## Phase 5 — Locale Updates

| Locale | Hub copy | SEO title/description | Status |
|--------|----------|----------------------|--------|
| EN | Full hub + FAQ | Updated | Complete |
| RU | Full localized hub + FAQ | Updated | Complete |
| ES | Full localized hub + FAQ | Updated | Complete |
| AM | Full localized hub + FAQ | Updated | Complete |

---

## Files Changed

- `web/src/app/[locale]/marketplace/page.tsx` — MarketplaceHero, FAQ schema wiring
- `web/src/components/marketplace/MarketplaceHero.tsx` — new server hero wrapper
- `web/src/components/marketplace/MarketplaceHubContent.tsx` — new hub sections
- `web/src/components/marketplace/MarketplaceView.tsx` — removed duplicate PageHeader
- `web/src/lib/marketplace-hub.ts` — FAQ builder for schema
- `web/src/lib/seo-metadata.ts` — EN fallback metadata
- `web/src/i18n/messages/en.json` — hub copy, title, subtitle, SEO
- `web/src/i18n/messages/ru.json` — localized hub + SEO
- `web/src/i18n/messages/es.json` — localized hub + SEO
- `web/src/i18n/messages/am.json` — localized hub + SEO

---

## Phase 6 — Commands Run

```bash
cd /var/www/deweb/web && npm run build
sudo systemctl restart deweb-next

curl -s -o /dev/null -w "home: %{http_code}\n" https://dewebam.com/en
curl -s -o /dev/null -w "marketplace: %{http_code}\n" https://dewebam.com/en/marketplace
curl -s -o /dev/null -w "blog fake: %{http_code}\n" https://dewebam.com/en/blog/fake-slug
curl -s -o /dev/null -w "service fake: %{http_code}\n" https://dewebam.com/en/services/fake-slug

curl -s https://dewebam.com/en/marketplace | grep -i "canonical"
curl -s https://dewebam.com/en/marketplace | grep -i "application/ld+json"
curl -s https://dewebam.com/en/marketplace | grep -i "Software Development Marketplace"
```

### Validation Results

| Check | Result |
|-------|--------|
| `npm run build` | Pass (exit 0) |
| home | 200 |
| marketplace | 200 |
| blog fake slug | 404 |
| service fake slug | 404 |
| canonical | `https://dewebam.com/en/marketplace` |
| JSON-LD | WebPage, BreadcrumbList, FAQPage (+ site-wide Organization/WebSite) |
| H1 text | Software Development Marketplace |

---

## Remaining Gaps

1. Marketplace listings volume still low — hub is strong but live listings add limited UGC depth.
2. `Submit Offer` button remains English-only in MarketplaceView (pre-existing, out of P2A scope).
3. Category landing pages for hire-intent long-tail keywords not yet built.
4. No CollectionPage schema — WebPage used; acceptable for hub without curated item feed in HTML.

---

## Next SEO-P2B Recommendations

1. **P2B — Marketplace category landings:** Create `/marketplace/category/[slug]` or service-adjacent hire pages for long-tail intents (hire web developers, hire Telegram bot developers).
2. **P2B — Listing detail SEO:** Individual listing pages with unique titles, descriptions, and ItemList schema when listing volume grows.
3. **P2B — Blog interlinking:** Add contextual links from marketplace hub articles back to `/marketplace` with varied anchors.
4. **P2B — Supplier profiles:** Public specialist profile URLs for E-E-A-T and internal link equity.
5. **P2C — UGC growth:** Encourage seeded listings and case-study cross-links to increase marketplace authority signals.

---

**Final verdict:** `SEO_P2A_MARKETPLACE_COMPLETE`
