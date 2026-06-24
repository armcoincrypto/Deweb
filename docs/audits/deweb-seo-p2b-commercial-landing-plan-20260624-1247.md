# SEO-P2B Commercial Landing Page Expansion — Audit & Plan

**Date:** 2026-06-24 12:47 UTC  
**Project:** `/var/www/deweb`  
**Domain:** https://dewebam.com  
**Scope:** Audit + implementation plan only (no code changes)  
**Verdict:** `SEO_P2B_READY`

---

## Executive Summary

DEWEB has a **proven long-form service landing template** (`ServiceLandingPage` → `ServiceLandingView`) with ~1,800–2,400 words, **Service + FAQPage + BreadcrumbList + WebPage** schema, and strong cross-linking on 9 existing landings. P2A strengthened `/marketplace` (~892 hub words + FAQ schema).

**P2B gaps for the three priority targets:**

| Priority target | Current state | P2B action |
|-----------------|---------------|------------|
| Telegram Bot Development | Thin legacy `/services/bots` (~216 words, no FAQ) | **Net-new** `telegram-bot-development` landing + 301 from `bots` |
| AI Automation Development | Strong `ai-business-automation` (~1,784–2,085 words) exists; **7+ blog links to broken `/services/ai-automation` (404)** | **Expand + reposition** existing landing; add redirect alias; fix blog links |
| Crypto Payment Gateway Development | No page; crypto mentioned only in legacy ecommerce copy + backend routes | **Net-new** `crypto-payment-gateway-development` landing after **delivery credibility review** |

**Estimated 12-month organic opportunity (conservative cluster model):** **160–520 sessions/month** across three pages once indexed and partially ranked, with Telegram and AI automation as primary volume drivers and crypto as lower-volume / higher-intent.

---

## Existing Services Audit

### Long-form landings (strong — use as template)

| Slug | ~Words | Schema | Marketplace link |
|------|--------|--------|------------------|
| shopify-development | 2,388 | WebPage, Service, FAQ, Breadcrumb | Yes (hub) |
| shopify-store-design | 2,031 | Same | No |
| shopify-custom-apps | 2,037 | Same | No |
| ai-chatbot-development | 1,800 | Same | Yes (hub) |
| **ai-business-automation** | **1,784** | Same | **No** |
| web-application-development | 2,101 | Same | Yes (hub) |
| marketplace-development | 2,079 | Same | Yes (hub) |
| saas-development | 2,077 | Same | No |
| landing-page-development | 641 | Same | Yes (hub) |

**Template path:** `web/src/lib/service-landing/pages/{slug}.ts` + `web/src/i18n/content/{es,ru,am}/landings/{slug}.ts` + `meta.landings.{slug}` in locale JSON + `LANDING_SEO` in `seo-metadata.ts`.

### Legacy thin pages (weak)

| Slug | ~Words | Issue |
|------|--------|-------|
| **bots** | ~216 | Competes for Telegram intent without depth or FAQ |
| mobile | ~223 | Out of P2B scope |
| uiux, branding, seo, marketing | ~210–219 | Out of P2B scope |

**Superseded redirects (working):** `ecommerce` → `shopify-development`, `ai` → `ai-chatbot-development`, `saas` → `saas-development`, `websites` → `web-application-development`.

### Broken internal links (must fix in P2B)

Blog articles linking to **non-existent** `/services/ai-automation` (404):

- `ai-automation-for-ecommerce.ts`
- `ai-chatbots-for-business.ts`
- `future-of-ai-in-business.ts`
- `custom-web-application-development.ts`
- `how-to-build-a-marketplace-website.ts`
- `best-ecommerce-platforms.ts`
- `saas-development-guide.ts`

Telegram blog (`telegram-bot-development-guide.ts`) links to broken `/services/automation` and `/services/custom-web-development`.

### Marketplace hub (post-P2A)

**Currently linked:** shopify-development, ai-chatbot-development, web-application-development, marketplace-development, landing-page-development, `/services`, blog/category/marketplace, contact.

**Mentioned in copy but not linked:** Telegram bots (`hireItem4`, FAQ3), AI automation workflows.

**Not linked:** ai-business-automation, saas-development, bots.

---

## Priority Target 1: Telegram Bot Development

### Gap analysis

- **URL gap:** No `telegram-bot-development` slug in `SERVICE_LANDING_SLUGS`.
- **Content gap:** `/services/bots` is legacy `ServiceDetailView` — ~216 words, H1 "Bots — What We Offer", no FAQ schema.
- **Intent gap:** Marketplace hub and blog target "hire Telegram bot developers" but send users to thin `/services/bots` or unrelated AI chatbot page.
- **Blog asset:** `telegram-bot-development-guide` exists (15 min read, AI category) — strong internal link source once landing exists.

### Recommended URL

`/services/telegram-bot-development` (canonical)  
**301 redirect:** `/services/bots` → `/services/telegram-bot-development`  
**Retire:** `bots` from active legacy list (add to `SUPERSEDED_LEGACY_SERVICE_IDS`).

### Keyword map

| Tier | Keyword / phrase | Intent | Page placement |
|------|------------------|--------|----------------|
| Primary | telegram bot development services | Commercial | H1, title, intro |
| Primary | hire telegram bot developer | Commercial | H1 variant, CTA, FAQ |
| Secondary | telegram bot development company | Commercial | intro, benefits |
| Secondary | custom telegram bot development | Commercial | sections |
| Secondary | telegram bot api development | Informational/commercial | technical section |
| Long-tail | telegram bot with payments | Commercial | section + FAQ |
| Long-tail | telegram mini app development | Commercial | section |
| Long-tail | telegram customer support bot | Commercial | use-case section |
| Long-tail | telegram bot crm integration | Commercial | integrations section |
| Long-tail | python telegram bot development | Informational | tech stack section |
| Marketplace bridge | post telegram bot project | Transactional | CTA + marketplace link |

### Content outline (~1,800–2,200 words)

1. **Hero** — H1: "Telegram Bot Development Services"; subtitle: hire for support, sales, payments, Mini Apps; badge: "Messaging Automation"; priceRange: "From $600"
2. **Intro (3 paragraphs)** — business outcomes, Bot API + secure architecture, DEWEB delivery model
3. **What we build (6 hire items)** — support bots, lead gen, payment bots, Mini Apps, moderation, internal ops bots
4. **Section: Bot types and use cases** (2 paras) — support, ecommerce, community, notifications
5. **Section: Telegram Bot API architecture** (2 paras) — webhooks, async queues, rate limits, security
6. **Section: Payments and subscriptions in Telegram** (2 paras) — Telegram Payments API, Stripe, invoicing (factual only)
7. **Section: CRM and business integrations** (2 paras) — HubSpot, webhooks, marketplace/order flows
8. **Section: AI-powered Telegram bots** (2 paras) — link to `ai-chatbot-development`, RAG, human handoff
9. **Section: Mini Apps and Web Apps in Telegram** (2 paras) — TWA overview, when to use vs classic bot
10. **Section: Security, compliance, and operations** (2 paras) — token handling, logging, moderation
11. **Benefits grid (6)** — 24/7 support, faster lead response, lower ops cost, etc.
12. **Process (5 steps)** — discovery → flows → build → test → launch/support
13. **FAQ (7–8)** — cost, timeline, ownership, payments, languages, maintenance, vs chatbot page
14. **Related services (4)** — ai-chatbot-development, ai-business-automation, web-application-development, marketplace-development
15. **CTA** — primary `/contact`, secondary `/marketplace` ("Post a Telegram bot project")

### Internal linking plan

**Inbound (to new page):**

| Source | Anchor (varied) |
|--------|-----------------|
| `/marketplace` hub | "Telegram bot development" (new category row) |
| `/services` index | Service banner + footer (add link) |
| `telegram-bot-development-guide` blog | Fix broken links → new slug |
| `ai-chatbots-for-business`, `future-of-ai-in-business` | Contextual "Telegram bot development services" |
| `PlatformFooter`, `ContactView` | Footer nav item |
| `ai-chatbot-development` landing | Related services card |

**Outbound (from new page):**

| Target | Purpose |
|--------|---------|
| `/marketplace` | Hire/post project CTA |
| `/services/ai-chatbot-development` | Differentiate conversational AI scope |
| `/services/ai-business-automation` | Workflow automation cross-sell |
| `/services/web-application-development` | Backend/admin panels |
| `/services/marketplace-development` | Two-sided + payments architecture |
| `/blog/telegram-bot-development-guide` | Educational support link |
| `/contact` | Primary conversion |

### Traffic opportunity estimate

| Scenario | 6 mo sessions/mo | 12 mo sessions/mo | Notes |
|----------|------------------|-------------------|-------|
| Conservative | 40–80 | 80–150 | Long-tail + brand queries |
| Moderate | 80–140 | 150–280 | Page 1 for 2–3 mid-tail terms |
| Optimistic | 140–220 | 280–450 | Strong links + blog amplification |

**Competition:** Medium — many agencies have dedicated `/telegram-bot-development` pages; winnable with 2k-word depth + FAQ schema + marketplace differentiation.

**Lead value:** Medium-high (project tickets $600–$15k+).

---

## Priority Target 2: AI Automation Development

### Gap analysis

- **Not a greenfield page.** `/services/ai-business-automation` already exists (~1,784 words EN base, audit reported ~2,085 live) with full schema.
- **Slug/intent mismatch:** Buyers search "AI automation development" / "AI automation services"; current H1 is "AI Business Automation Services". Blog and backend use `ai-automation` slug — **404 on web**.
- **Marketplace disconnect:** Hub mentions "AI automation experts" but links only to `ai-chatbot-development`.
- **Differentiation risk:** Overlap with `ai-chatbot-development` — page must clarify automation vs conversational AI.

### Recommended approach (expand, do not duplicate)

**Option A (recommended):** Keep slug `ai-business-automation` for URL equity; expand to **2,000–2,400 words**; update H1/title to include "AI Automation Development"; add **301 alias** `/services/ai-automation` → `/services/ai-business-automation`.

**Option B (not recommended):** New slug `ai-automation-development` — splits equity, duplicates topic cluster.

### Keyword map

| Tier | Keyword / phrase | Intent | Page placement |
|------|------------------|--------|----------------|
| Primary | ai automation development services | Commercial | title, H1 support, intro |
| Primary | ai business automation services | Commercial | keep existing H1 alignment |
| Secondary | hire ai automation developer | Commercial | FAQ, CTA |
| Secondary | workflow automation agency | Commercial | sections |
| Secondary | ai process automation | Commercial | sections |
| Secondary | intelligent document processing | Commercial | existing section emphasis |
| Long-tail | ai automation for ecommerce | Commercial | section + link to blog |
| Long-tail | n8n / zapier alternative custom automation | Commercial | architecture section |
| Long-tail | ai automation roi / cost | Commercial | FAQ |
| Marketplace bridge | hire ai automation specialist | Transactional | marketplace CTA block |

### Content outline (expansion delta ~400–700 new words)

Existing 10 sections are strong. Add/revise:

1. **Title/meta refresh** — include "AI Automation Development" without dropping "Business"
2. **New intro paragraph** — explicit hire/post-project path via marketplace
3. **New section: AI automation vs AI chatbots** (2 paras) — link to chatbot landing
4. **New section: Ecommerce and marketplace automation** (2 paras) — tie to Shopify + marketplace-dev
5. **Expand FAQ (+2)** — "AI automation development cost", "How is this different from chatbots?"
6. **CTA secondary** — add `/marketplace` alongside `/contact`
7. **Related services** — ensure marketplace-development, shopify-development, telegram-bot-development (after P2B-1)

### Internal linking plan

**Fix immediately (implementation phase):**

- Replace all `/services/ai-automation` blog links → `/services/ai-business-automation`
- Add middleware or `next.config` redirect: `/services/ai-automation` → `/services/ai-business-automation` (all locales)

**Inbound:**

| Source | Anchor |
|--------|--------|
| `/marketplace` hub | New row: "AI automation development" → ai-business-automation |
| `/services` footer/banners | Already partially present |
| Blog cluster (7 articles) | Fixed links |
| `ai-chatbot-development` | Related services |
| `telegram-bot-development` (new) | Related services |

**Outbound:**

| Target | Purpose |
|--------|---------|
| `/marketplace` | Hire automation specialists |
| `/services/ai-chatbot-development` | Scope boundary |
| `/services/shopify-development` | Ecommerce automation |
| `/services/web-application-development` | Custom integrations |
| `/blog/ai-automation-for-ecommerce` | Supporting content |
| `/contact` | Agency delivery CTA |

### Traffic opportunity estimate

| Scenario | Incremental 12 mo sessions/mo | Notes |
|----------|-------------------------------|-------|
| Conservative | 30–60 | Mostly from fixing 404 link equity |
| Moderate | 60–120 | Repositioned title/H1 + marketplace links |
| Optimistic | 120–200 | Ranks for "ai automation development" cluster |

**Competition:** High — crowded agency SERPs; DEWEB already has content depth advantage.

**Lead value:** High (retainers and multi-workflow programs).

---

## Priority Target 3: Crypto Payment Gateway Development

### Gap analysis

- **No marketing page** exists.
- **Technical signals:** `backend/src/routes/crypto.js`, ecommerce copy mentions "Stripe / PayPal / crypto payments", marketplace-development mentions payments architecture.
- **Credibility gate:** Full investigation audit noted crypto/wallet routes and treasury config need production verification before marketing fund-moving services. **Page copy must reflect actual delivery scope** (integration vs full gateway build).

### Recommended URL

`/services/crypto-payment-gateway-development`

### Keyword map

| Tier | Keyword / phrase | Intent | Page placement |
|------|------------------|--------|----------------|
| Primary | crypto payment gateway development | Commercial | H1, title |
| Primary | cryptocurrency payment integration | Commercial | intro, sections |
| Secondary | custom crypto payment gateway | Commercial | sections |
| Secondary | accept crypto payments api | Commercial | technical section |
| Secondary | blockchain payment gateway development | Commercial | sections |
| Long-tail | usdt trc20 payment integration | Commercial | chains section |
| Long-tail | crypto checkout for website | Commercial | use cases |
| Long-tail | payment webhook crypto | Informational | dev section |
| Long-tail | non-custodial vs custodial gateway | Informational | FAQ |
| Marketplace bridge | crypto payment developer for marketplace | Transactional | marketplace CTA |

### Content outline (~1,600–2,200 words)

**Prerequisite:** Stakeholder sign-off on deliverables (integration layer vs full gateway product).

1. **Hero** — H1: "Crypto Payment Gateway Development"; subtitle: custom checkout, APIs, webhooks, multi-chain; priceRange: "From $2,500" (validate with sales)
2. **Intro (3 paragraphs)** — merchant needs, build vs integrate decision, DEWEB engineering approach
3. **Section: What we build** — invoice API, deposit addresses, confirmation policies, merchant dashboard, webhooks
4. **Section: Supported chains and stablecoins** — BTC, ETH, TRON/USDT, EVM L2s (only chains you actually support)
5. **Section: Integration patterns** — REST API, webhooks, HMAC verification, idempotency
6. **Section: Ecommerce and marketplace checkout** — Shopify, custom marketplaces, escrow (if true)
7. **Section: Security and compliance considerations** — key custody, KYC/AML partners, no over-claims
8. **Section: Build vs white-label gateway** — decision framework
9. **Benefits (6)** — lower fees, global reach, faster settlement, etc.
10. **Process (5 steps)** — discovery → architecture → build → security review → launch
11. **FAQ (7–8)** — cost, timeline, custody, chains, chargebacks, regulation disclaimer, maintenance
12. **Related services** — marketplace-development, web-application-development, shopify-development, saas-development
13. **CTA** — `/contact` + `/marketplace` for specialist hire

### Internal linking plan

**Inbound:**

| Source | Anchor |
|--------|--------|
| `/marketplace` hub | New "Crypto payment gateway development" category link |
| `/services/marketplace-development` | Related services + in-body link |
| `/services` index | New banner/footer entry |
| Future blog: `crypto-payment-gateway-guide` (P2C) | Primary support article |

**Outbound:**

| Target | Purpose |
|--------|---------|
| `/marketplace` | Hire blockchain/payments developers |
| `/services/marketplace-development` | Two-sided payment flows |
| `/services/web-application-development` | API/back-end |
| `/services/shopify-development` | Store checkout |
| `/contact` | Scoping call |

### Traffic opportunity estimate

| Scenario | 12 mo sessions/mo | Notes |
|----------|-------------------|-------|
| Conservative | 20–50 | Niche queries, low brand volume |
| Moderate | 50–100 | Ranks for long-tail integration terms |
| Optimistic | 100–180 | Becomes topical authority with blog support |

**Competition:** Medium-low for **development services** (many SERP results are informational guides or gateway products, not agencies).

**Lead value:** Very high (projects often $10k–$80k+) but **lower lead volume**.

### Credibility prerequisite (before publish)

- [ ] Confirm DEWEB delivers custom gateway builds vs payment provider integration only
- [ ] List supported chains/APIs truthfully
- [ ] Legal/compliance disclaimer reviewed
- [ ] Align with production crypto API status (`/api/crypto`)

---

## Cross-Page Internal Linking Architecture

```
                    ┌─────────────────┐
                    │   /marketplace   │
                    │  (P2A hub)       │
                    └────────┬────────┘
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
 ┌───────────────┐  ┌─────────────────┐  ┌──────────────────────────┐
 │ telegram-bot  │  │ ai-business-    │  │ crypto-payment-gateway-  │
 │ -development  │  │ automation      │  │ development              │
 └───────┬───────┘  └────────┬────────┘  └────────────┬─────────────┘
         │                   │                        │
         └───────────┬───────┴────────────┬───────────┘
                     ▼                    ▼
           ai-chatbot-development   marketplace-development
                     │                    │
                     └────────┬───────────┘
                              ▼
                    web-application-development
                              │
                              ▼
                          /contact
```

**Marketplace hub additions (P2B):** Add 3 category rows to `marketplace.hub` in all locales + `MarketplaceHubContent.tsx` links.

**Anchor text rules:** Varied natural phrases; max one exact-match primary keyword link per page per target.

---

## Portfolio Traffic Opportunity Summary

| Page | 12 mo conservative | 12 mo moderate | 12 mo optimistic |
|------|--------------------|----------------|----------------|
| telegram-bot-development | 80 | 200 | 400 |
| ai-business-automation (expanded) | 30 | 90 | 180 |
| crypto-payment-gateway-development | 20 | 70 | 150 |
| **Total incremental** | **130** | **360** | **730** |

*Estimates assume: indexation within 2–4 weeks, no paid promotion, existing domain authority, EN-first rankings, and successful technical implementation. Validate with GSC/Ahrefs after 90 days.*

**Conversion note:** Marketplace CTAs on service pages should use secondary button pattern (already on landings) to capture hire-intent without cannibalizing contact-led agency leads.

---

## Implementation Plan (Phased — Do Not Start Without Approval)

### Phase 0 — Preconditions (1 day)

- [ ] Stakeholder approval on crypto delivery scope
- [ ] Confirm pricing bands for `priceRange` fields
- [ ] Assign locale reviewers for RU/ES/AM overlays

### Phase 1 — Quick wins (1–2 days)

1. Add 301: `/services/ai-automation` → `/services/ai-business-automation`
2. Fix 7 blog internal links to broken `ai-automation`
3. Fix telegram blog broken `/services/automation` and `/services/custom-web-development` links
4. Add marketplace hub links for `ai-business-automation` (immediate, no new page)

### Phase 2 — Telegram landing (3–4 days)

1. Create `web/src/lib/service-landing/pages/telegram-bot-development.ts` (~1,800–2,200 words)
2. Register in `SERVICE_LANDING_SLUGS` + `seo-metadata.ts` + `meta.landings`
3. Add es/ru/am overlays
4. Add `bots` to `SUPERSEDED_LEGACY_SERVICE_IDS` + redirect config
5. Update marketplace hub, footer, services index, related services on peer landings
6. Update `telegram-bot-development-guide` internal links
7. Build, validate schema (Service + FAQ + Breadcrumb), curl 200/404 checks

### Phase 3 — AI automation expansion (2 days)

1. Expand `ai-business-automation.ts` (+400–700 words, marketplace CTA, differentiation section)
2. Refresh title/meta in all locales for "AI Automation Development" intent
3. Add marketplace hub link
4. Re-run word count target ≥ 2,000

### Phase 4 — Crypto payment gateway (4–5 days, gated)

1. **Only after Phase 0 sign-off**
2. Create `crypto-payment-gateway-development.ts` landing
3. Full i18n + schema + hub/footer links
4. Optional: plan P2C blog `crypto-payment-gateway-development-guide`

### Phase 5 — Validation & report

```bash
cd /var/www/deweb/web && npm run build
sudo systemctl restart deweb-next

# Status checks
curl -s -o /dev/null -w "%{http_code}" https://dewebam.com/en/services/telegram-bot-development
curl -s -o /dev/null -w "%{http_code}" https://dewebam.com/en/services/bots  # expect 301→200
curl -s -o /dev/null -w "%{http_code}" https://dewebam.com/en/services/ai-automation  # expect 301→200
curl -s -o /dev/null -w "%{http_code}" https://dewebam.com/en/services/crypto-payment-gateway-development

# Schema
curl -s https://dewebam.com/en/services/telegram-bot-development | grep -c 'FAQPage'
```

### Phase 6 — Commit

```
feat(seo): add P2B commercial service landings and marketplace links
```

---

## Files to Touch (Implementation Reference)

| File | Change |
|------|--------|
| `web/src/lib/service-landing/types.ts` | Add new slugs |
| `web/src/lib/service-landing/pages/*.ts` | New/expanded content |
| `web/src/lib/service-landing/index.ts` | Export registry |
| `web/src/lib/seo-metadata.ts` | LANDING_SEO entries |
| `web/src/lib/seo.ts` | SUPERSEDED_LEGACY_SERVICE_IDS + redirects |
| `web/src/i18n/messages/{en,ru,es,am}.json` | meta.landings + marketplace.hub |
| `web/src/i18n/content/{es,ru,am}/landings/*.ts` | Localized overlays |
| `web/src/components/marketplace/MarketplaceHubContent.tsx` | 3 new links |
| `web/src/components/layout/PlatformFooter.tsx` | Footer links |
| `web/src/lib/blog/articles/*.ts` | Fix broken service links |
| `next.config.ts` or middleware | 301 aliases |
| `docs/audits/` | P2B completion report |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Keyword cannibalization (chatbot vs automation vs telegram) | Clear differentiation sections + cross-links |
| Crypto over-claim | Credibility gate + legal disclaimer |
| Duplicate thin `/services/bots` | 301 to new landing |
| Broken blog links persist | Phase 1 link sweep |
| Locale drift | Same keys as EN hub additions in all 4 JSON files |

---

## Verdict

**`SEO_P2B_READY`**

Audit complete. Template, gap analysis, keyword maps, linking plan, and phased implementation are defined. **One gated prerequisite:** crypto payment gateway page requires delivery-scope confirmation before copy production. Telegram and AI automation can proceed immediately after approval.

**Not required for plan readiness:** Additional third-party keyword API research — recommended at 90-day post-launch review via GSC Search Console performance.

---

## Next Step

Approve Phase 1–3 implementation (Telegram + AI automation + link fixes). Schedule crypto credibility review for Phase 4.
