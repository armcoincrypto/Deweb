# SEO-P2C Internal Link Recovery + Hire Intent Audit

**Date:** 2026-06-24 13:45 UTC  
**Domain:** https://dewebam.com  
**Verdict:** `SEO_P2C_READY`

---

## Phase 1 — Internal Link Recovery (Complete)

### Valid service URL inventory

**Long-form landings (200):**
`shopify-development`, `shopify-store-design`, `shopify-custom-apps`, `ai-chatbot-development`, `ai-business-automation`, `web-application-development`, `marketplace-development`, `saas-development`, `landing-page-development`, `telegram-bot-development`

**Legacy thin pages (200):**
`mobile`, `uiux`, `branding`, `seo`, `marketing`

**Permanent redirects (308, not 404):**
`ecommerce` → `shopify-development`, `ai` → `ai-chatbot-development`, `saas` → `saas-development`, `websites` → `web-application-development`, `bots` → `telegram-bot-development`, `ai-automation` → `ai-business-automation`

### Broken links found and fixed

| Broken URL | Valid destination | Files fixed |
|------------|-------------------|-------------|
| `/services/custom-web-development` | `/services/web-application-development` | `competitive-bidding-it-projects.ts`, `marketplace-monetization-strategies.ts`, `outsourcing-software-development-2026.ts` |
| `/services/ecommerce-development` | `/services/shopify-development` | `ai-automation-for-ecommerce.ts`, `best-shopify-apps.ts`, `shopify-vs-woocommerce.ts`, `shopify-development-cost-2026.ts`, `technical-seo-for-ecommerce.ts` |
| `/services/woocommerce-development` | `/services/shopify-development` | `shopify-vs-woocommerce.ts` |
| `/services/technical-seo` | `/services/seo` | `shopify-development-cost-2026.ts` |
| `/services/product-strategy` | `/services/marketplace-development` | `marketplace-monetization-strategies.ts` |
| `/services/dedicated-development-team` | `/marketplace` | `outsourcing-software-development-2026.ts` |
| `/services/mvp-development` | `/services/saas-development` | `outsourcing-software-development-2026.ts` |
| `/services/ecommerce` (non-canonical) | `/services/shopify-development` | `ShopifySpotlight.tsx` |
| `/en/services/ai-automation` (AI blog generator) | `/en/services/ai-business-automation` | `backend/src/services/blogInternalLinks.js` |
| `/en/services/web-development` (AI blog generator) | `/en/services/web-application-development` | `backend/src/services/blogInternalLinks.js` |

### Post-fix verification

Unique `/services/*` hrefs in `web/src` (TypeScript/TSX):

```
/services/ai-business-automation
/services/ai-chatbot-development
/services/landing-page-development
/services/marketplace-development
/services/saas-development
/services/seo
/services/shopify-custom-apps
/services/shopify-development
/services/shopify-store-design
/services/telegram-bot-development
/services/web-application-development
```

Plus `/marketplace` in outsourcing article (valid).

**No internal service 404 targets remain in web source.**

### Build & live validation

```bash
cd /var/www/deweb/web && npm run build
sudo systemctl restart deweb-next
```

| Check | Result |
|-------|--------|
| Build | Pass (exit 0) |
| home | 200 |
| marketplace | 200 |
| blog fake slug | 404 |
| service fake slug | 404 |

---

## Phase 2 — Hire Intent Opportunity Audit (Plan Only)

Proposed marketplace hire-intent URLs (not implemented):

1. `/marketplace/hire-web-developers`
2. `/marketplace/hire-telegram-bot-developers`
3. `/marketplace/hire-ai-automation-specialists`

**Strategic rationale:** DEWEB already has strong **agency service landings** (`/services/*`) and a **marketplace hub** (`/marketplace`). Hire-intent pages should sit under `/marketplace/` to capture transactional “find/hire/post project” queries without cannibalizing service delivery pages. Each page should funnel to **post project**, **browse listings**, and **agency fallback** (`/contact`).

---

### Page 1: `/marketplace/hire-web-developers`

#### Keyword opportunity

| Tier | Keyword cluster | Est. monthly volume (US/global EN) | KD (est.) |
|------|-----------------|-------------------------------------|-----------|
| Primary | hire web developers | 1,000–3,000 | Medium |
| Primary | hire software developers | 2,000–5,000 | Medium–High |
| Secondary | hire web developer for project | 200–800 | Low–Medium |
| Secondary | freelance web developers marketplace | 300–1,000 | Medium |
| Long-tail | hire react developer for startup | 200–600 | Low |
| Long-tail | post web development project | 100–400 | Low |
| Long-tail | hire full stack developer remote | 500–1,500 | Medium |

*Volumes are directional estimates from industry SEO datasets (2026); validate in GSC/Ahrefs after launch.*

#### Search intent

**Transactional / commercial investigation.** User has a project or role to fill and wants to compare developers, review proposals, or publish a brief. Distinct from `/services/web-application-development` (agency “we build for you”).

#### Competition level

**Medium–High.** Competes with Upwork, Toptal, Lemon.io, agency “dedicated team” pages, and generic job boards. Win angle: **two-sided marketplace + agency delivery option** on one domain; niche filters (Shopify, SaaS, Next.js).

#### Recommended content structure (~900–1,200 words)

1. Hero — H1: "Hire Web Developers on DEWEB Marketplace"
2. Who this is for (founders, agencies, product teams)
3. What you can hire (frontend, full-stack, Next.js, APIs, maintenance)
4. How hiring works on DEWEB (post → proposals → chat → delivery)
5. Typical project types & budget ranges (ranges only, no fake claims)
6. Agency alternative — link to `/services/web-application-development`
7. FAQ (6–8) — timeline, vetting, remote, pricing, marketplace vs agency
8. CTA — Post project + Browse listings

#### Internal linking plan

| Direction | Target | Anchor examples |
|-----------|--------|-----------------|
| Inbound | `/marketplace` hub | "hire web developers" |
| Inbound | `/blog/how-to-hire-software-developers` | contextual link |
| Inbound | `/services/web-application-development` | "agency web app delivery" |
| Outbound | `/marketplace`, `/contact`, `/services/web-application-development`, `/services/saas-development` | varied |

#### Traffic potential (12 months post-launch)

| Scenario | Monthly organic sessions |
|----------|---------------------------|
| Conservative | 40–90 |
| Moderate | 90–180 |
| Optimistic | 180–350 |

#### Lead potential

**High volume, medium value.** Web dev hire queries convert to listings and contact; typical project $2k–$25k. Expect **2–6 qualified leads/month** at moderate rankings with strong CTAs.

---

### Page 2: `/marketplace/hire-telegram-bot-developers`

#### Keyword opportunity

| Tier | Keyword cluster | Est. monthly volume | KD (est.) |
|------|-----------------|---------------------|-----------|
| Primary | hire telegram bot developer | 300–1,200 | Low–Medium |
| Primary | telegram bot developer for hire | 200–800 | Low–Medium |
| Secondary | telegram bot development services | 500–2,000 | Medium |
| Secondary | hire telegram bot api developer | 100–400 | Low |
| Long-tail | telegram mini app developer | 200–600 | Low–Medium |
| Long-tail | telegram payment bot developer | 100–300 | Low |

#### Search intent

**Transactional.** User needs a bot built (support, payments, Mini App, CRM bot) and wants a specialist or team. Complements `/services/telegram-bot-development` (agency page).

#### Competition level

**Medium.** Many freelance landing pages and bot agencies (aziqdev, kolodych, etc.). DEWEB advantage: **marketplace proposals + existing telegram service landing + blog guide**.

#### Recommended content structure (~800–1,100 words)

1. Hero — H1: "Hire Telegram Bot Developers"
2. Bot types you can hire (support, sales, payments, Mini Apps, AI bots)
3. Skills to look for (Bot API, webhooks, payments, admin panels)
4. How DEWEB Marketplace works for bot projects
5. Agency path — `/services/telegram-bot-development`
6. Link to `/blog/telegram-bot-development-guide`
7. FAQ — cost ranges, timeline, Mini Apps, payments, maintenance
8. CTA — Post bot project + Contact DEWEB

#### Internal linking plan

| Direction | Target |
|-----------|--------|
| Inbound | `/marketplace` hub, `/services/telegram-bot-development`, telegram blog |
| Outbound | `/marketplace`, `/services/telegram-bot-development`, `/services/ai-chatbot-development`, `/contact` |

#### Traffic potential (12 months)

| Scenario | Monthly organic sessions |
|----------|---------------------------|
| Conservative | 25–60 |
| Moderate | 60–140 |
| Optimistic | 140–280 |

#### Lead potential

**Medium volume, medium–high value.** Bot projects often $300–$8k+. Expect **1–4 qualified leads/month** at moderate rankings; strong fit with new P2B service page.

---

### Page 3: `/marketplace/hire-ai-automation-specialists`

#### Keyword opportunity

| Tier | Keyword cluster | Est. monthly volume | KD (est.) |
|------|-----------------|---------------------|-----------|
| Primary | hire ai automation specialist | 100–500 | Low–Medium |
| Primary | ai automation consultant | 500–2,000 | Medium |
| Secondary | hire ai automation developer | 200–800 | Medium |
| Secondary | workflow automation expert | 300–1,200 | Medium |
| Long-tail | n8n automation expert hire | 100–400 | Low |
| Long-tail | ai business automation freelancer | 100–300 | Low |

*Note: "hire ai developer" is broader (~2.9k/mo) but mixed intent (job seekers + hirers); use as secondary, not primary H1.*

#### Search intent

**Commercial / transactional.** Buyer wants automation built or operated (workflows, CRM sync, document processing, AI agents). Complements `/services/ai-business-automation`.

#### Competition level

**High and fragmented.** Agencies, Upwork, n8n/Make communities, AI staffing firms. Differentiation: **marketplace bidding + DEWEB automation service page + ecommerce/SaaS context**.

#### Recommended content structure (~900–1,200 words)

1. Hero — H1: "Hire AI Automation Specialists"
2. What specialists can deliver (workflow automation, AI assistants, integrations)
3. AI automation vs chatbots (link service pages)
4. Marketplace hiring workflow
5. When to use agency delivery (`/services/ai-business-automation`)
6. FAQ — tools, ROI, security, timeline, pricing models
7. CTA — Post project + Agency consultation

#### Internal linking plan

| Direction | Target |
|-----------|--------|
| Inbound | `/marketplace`, `/services/ai-business-automation`, `/blog/ai-automation-for-ecommerce` |
| Outbound | `/marketplace`, `/services/ai-business-automation`, `/services/ai-chatbot-development`, `/contact` |

#### Traffic potential (12 months)

| Scenario | Monthly organic sessions |
|----------|---------------------------|
| Conservative | 20–50 |
| Moderate | 50–120 |
| Optimistic | 120–220 |

#### Lead potential

**Lower volume, higher value.** Automation engagements $600–$30k+. Expect **1–3 qualified leads/month**; strong upsell to retained automation work.

---

## Cross-page architecture (recommended)

```
/marketplace (hub)
 ├── /marketplace/hire-web-developers
 ├── /marketplace/hire-telegram-bot-developers
 └── /marketplace/hire-ai-automation-specialists

Each hire page ↔ matching /services/* landing
Each hire page → /marketplace (post/browse)
Blog hire guides → hire pages (where relevant)
```

**Schema per hire page:** WebPage + BreadcrumbList + FAQPage (no fake AggregateRating).

**Locale:** All 4 locales if implemented (match marketplace hub pattern).

---

## Portfolio summary (hire pages)

| Page | Competition | 12-mo traffic (moderate) | Lead potential | Priority |
|------|-------------|--------------------------|----------------|----------|
| hire-web-developers | Medium–High | 90–180 sessions/mo | High volume | **P1** |
| hire-telegram-bot-developers | Medium | 60–140 sessions/mo | Medium–high value | **P1** |
| hire-ai-automation-specialists | High | 50–120 sessions/mo | High value | **P2** |

**Combined moderate estimate:** 200–440 organic sessions/month and **4–13 qualified leads/month** within 12 months (assumes indexing, internal links from hub/services/blog, no paid promotion).

---

## Implementation prerequisites (when approved)

1. Add `web/src/app/[locale]/marketplace/hire-[slug]/page.tsx` route pattern or static pages
2. i18n content blocks in `marketplace.hire.*` JSON keys
3. Hub section: "Hire by specialty" with 3 links
4. Sitemap inclusion under `/marketplace/*`
5. FAQ schema matching visible FAQ
6. Noindex until content + listings depth acceptable (optional gate)

---

## Remaining gaps

1. **Hire pages not built** — audit/plan only (by design).
2. **Legacy thin service pages** (`/services/seo`, etc.) remain low authority — not broken, out of P2C scope.
3. **Keyword volumes** need validation with Ahrefs/GSC after 30 days — estimates are directional.
4. **Marketplace UGC depth** — hire pages convert better when live listings exist in each category.

---

## Verdict

**`SEO_P2C_READY`**

Phase 1 internal link recovery is complete with build and live validation passing. Phase 2 hire-intent audit provides keyword maps, intent analysis, competition notes, content outlines, linking plans, and traffic/lead estimates sufficient to implement the three marketplace hire pages without additional research gates.

**Recommended implementation order:** hire-web-developers → hire-telegram-bot-developers → hire-ai-automation-specialists.
