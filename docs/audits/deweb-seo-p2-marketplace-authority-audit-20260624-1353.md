# DEWEB SEO-P2 Marketplace Authority Audit

**Date:** 2026-06-24 13:53 CEST  
**Project:** `/var/www/deweb`  
**Scope:** `/services`, `/marketplace`, service landings, legacy service categories, blog category hubs (EN live crawl)  
**Method:** Live HTML crawl of `https://dewebam.com` + source review — **no code changes**

---

## Executive Verdict

**`MARKETPLACE_AUTHORITY_NEEDS_WORK`**

Technical SEO foundation is solid (schema, canonicals, indexation), but **marketplace organic authority is underdeveloped**. The live `/en/marketplace` hub is critically thin (116 words, generic H1). Service landing pages are strong (2,000+ words, Service + FAQ schema), creating a **content authority mismatch** between commercial service pages and the marketplace product surface.

**Highest ROI gap:** Expand and reposition `/marketplace` as the commercial hub for “hire developers / post projects / competitive bidding” intent, then wire internal links from service landings and blog category hubs.

---

## Portfolio Summary (22 pages audited)

| Segment | Pages | Avg words | Avg SEO score | Authority status |
|---------|-------|-----------|---------------|------------------|
| Hubs | 2 | 402 | 4.5/10 | Marketplace weak; Services moderate |
| Service landings | 9 | 1,894 | 8.1/10 | Strong long-form |
| Legacy service categories | 6 | 216 | 4.5/10 | Thin vs landings |
| Blog category hubs | 5 | 200 | 4.6/10 | Thin listing intros |

---

## Page-by-Page Audit

### Hubs

#### `/en/services`

| Field | Value |
|-------|-------|
| **URL** | https://dewebam.com/en/services |
| **Title** | Digital Services \| Shopify, AI Automation, SaaS & Web Apps \| DEWEB |
| **H1** | Build, Automate & Scale Your Business With Elite Digital Solutions |
| **Word count** | 688 |
| **Internal links** | 58 |
| **Schema** | WebPage, BreadcrumbList, Organization, WebSite, ContactPoint |
| **Primary keyword** | digital development services |
| **Secondary keywords** | Shopify development agency, AI automation services, SaaS development company, web application development |
| **Search intent** | Commercial investigation — compare service lines |
| **Commercial value** | High — top-of-funnel service discovery |
| **SEO score** | **6/10** |

**Notes:** H1 is brand-led, not keyword-aligned with title. Good internal linking via banners. Missing hub-level FAQ or Service aggregate schema. Moderate depth vs landing pages.

---

#### `/en/marketplace`

| Field | Value |
|-------|-------|
| **URL** | https://dewebam.com/en/marketplace |
| **Title** | IT Marketplace \| Find Developers & Digital Services \| DEWEB |
| **H1** | Marketplace |
| **Word count** | **116** |
| **Internal links** | 42 |
| **Schema** | WebPage, BreadcrumbList, Organization, WebSite, ContactPoint |
| **Primary keyword** | IT marketplace |
| **Secondary keywords** | hire software developers, post development project, freelance developer marketplace, competitive bidding platform |
| **Search intent** | Transactional / commercial — find talent or post work |
| **Commercial value** | **Very high** — direct conversion surface |
| **SEO score** | **3/10** |

**Notes:** Critical P2 gap. Client-rendered listings add little indexable copy. No FAQ, no Service/ItemList schema, H1 not descriptive. Title is good but page body does not support rankings.

---

### Service Landing Pages (long-form)

| URL | Title (truncated) | H1 | Words | Links | Schema (page-level) | Primary keyword | Score |
|-----|-------------------|-----|-------|-------|---------------------|-----------------|-------|
| [/en/services/shopify-development](https://dewebam.com/en/services/shopify-development) | Shopify Development Services \| Custom Stores… | Shopify Development Services | 2,388 | 53 | WebPage, Service, FAQPage, Breadcrumb, Offer | shopify development services | **9/10** |
| [/en/services/shopify-store-design](https://dewebam.com/en/services/shopify-store-design) | Shopify Store Design Services… | Shopify Store Design Services | 2,031 | 52 | Same | shopify store design services | **8/10** |
| [/en/services/shopify-custom-apps](https://dewebam.com/en/services/shopify-custom-apps) | Shopify Custom App Development… | Shopify Custom App Development | 2,037 | 52 | Same | shopify custom app development | **8/10** |
| [/en/services/ai-chatbot-development](https://dewebam.com/en/services/ai-chatbot-development) | AI Chatbot Development Services… | AI Chatbot Development Services | 2,109 | 53 | Same | ai chatbot development services | **9/10** |
| [/en/services/ai-business-automation](https://dewebam.com/en/services/ai-business-automation) | AI Business Automation Services… | AI Business Automation Services | 2,085 | 53 | Same | ai business automation services | **8/10** |
| [/en/services/web-application-development](https://dewebam.com/en/services/web-application-development) | Web Application Development Services… | Web Application Development Services | 2,101 | 53 | Same | web application development services | **8/10** |
| [/en/services/marketplace-development](https://dewebam.com/en/services/marketplace-development) | Marketplace Development Services… | Marketplace Development Services | 2,079 | 53 | Same | marketplace development services | **9/10** |
| [/en/services/saas-development](https://dewebam.com/en/services/saas-development) | SaaS Development Services… | SaaS Development Services | 2,077 | 53 | Same | saas development services | **8/10** |
| [/en/services/landing-page-development](https://dewebam.com/en/services/landing-page-development) | Landing Page Development… | Landing Page Development | **641** | 53 | Same | landing page development services | **5/10** |

**Landing page patterns (strong):**
- Secondary keywords: industry modifiers (Shopify Plus, RAG, multi-tenant, two-sided platform, conversion-focused)
- Intent: Commercial — hire agency / request quote
- Commercial value: High across all; Shopify + AI + marketplace-dev highest demand
- Internal links: Strong cross-links to related services + contact

**Weak outlier:** `landing-page-development` — 641 words vs ~2,000 peers; expand to Tier B.

---

### Legacy Service Category Pages

| URL | H1 | Words | Schema | Primary keyword | Score |
|-----|-----|-------|--------|-----------------|-------|
| [/en/services/bots](https://dewebam.com/en/services/bots) | Bots — What We Offer | 216 | Service, WebPage (no FAQ) | telegram bot development | **5/10** |
| [/en/services/mobile](https://dewebam.com/en/services/mobile) | Mobile Apps — What We Offer | 223 | Same | mobile app development services | **5/10** |
| [/en/services/uiux](https://dewebam.com/en/services/uiux) | UI/UX — What We Offer | 210 | Same | ui ux design services | **4/10** |
| [/en/services/branding](https://dewebam.com/en/services/branding) | Branding — What We Offer | 219 | Same | branding services | **4/10** |
| [/en/services/seo](https://dewebam.com/en/services/seo) | SEO — What We Offer | 215 | Same | seo services agency | **5/10** |
| [/en/services/marketing](https://dewebam.com/en/services/marketing) | Marketing — What We Offer | 215 | Same | digital marketing services | **4/10** |

**Notes:** Superseded legacy IDs (`ecommerce`, `ai`, `saas`, `websites`) redirect to landings — correct. Remaining legacy pages are thin duplicates competing with potential long-form landings. H1 format hurts keyword targeting.

---

### Blog Category Hubs

| URL | H1 | Words | Links | Schema | Primary keyword | Score |
|-----|-----|-------|-------|--------|-----------------|-------|
| [/en/blog/category/shopify](https://dewebam.com/en/blog/category/shopify) | Shopify & E-commerce | 207 | 57 | WebPage only | shopify development guides | **5/10** |
| [/en/blog/category/ai](https://dewebam.com/en/blog/category/ai) | AI & Automation | 201 | 57 | WebPage only | ai automation articles | **5/10** |
| [/en/blog/category/web-development](https://dewebam.com/en/blog/category/web-development) | Web Development | 206 | 57 | WebPage only | web development blog | **5/10** |
| [/en/blog/category/marketplace](https://dewebam.com/en/blog/category/marketplace) | Marketplace | 195 | 57 | WebPage only | marketplace platform guides | **5/10** |
| [/en/blog/category/saas](https://dewebam.com/en/blog/category/saas) | SaaS | 192 | 57 | WebPage only | saas development blog | **4/10** |

**Notes:** Article cards dominate; editorial intro is thin. No FAQ or CollectionPage schema. Strong internal link count from article list but low unique copy.

---

## Cross-Cutting Findings

### Canonical & metadata
- Titles and meta descriptions are unique and well-formed on all audited URLs
- H1/title alignment weak on `/marketplace`, `/services` hub, and legacy categories
- `marketplace-development` landing strong; `/marketplace` product page does not reinforce same keyword cluster

### Schema coverage

| Page type | WebPage | Service | FAQ | Breadcrumb |
|-----------|---------|---------|-----|------------|
| Hubs | ✅ | ❌ | ❌ | ✅ |
| Landings | ✅ | ✅ | ✅ | ✅ |
| Legacy | ✅ | ✅ | ❌ | ✅ |
| Blog categories | ✅ | ❌ | ❌ | ✅ |

### Internal linking gaps
- `/marketplace` rarely positioned as destination from service landings (copy CTA goes to `/contact`)
- `/services/marketplace-development` should prominently link to live `/marketplace` product
- Blog category `marketplace` should link to both marketplace hub and development landing
- Legacy categories lack deep cross-links to related long-form landings

---

## Opportunity Tiers

### Tier A — Highest ROI (do first)

| Page | Why | Action |
|------|-----|--------|
| **`/en/marketplace`** | 116 words, transactional intent, highest commercial value, worst score | Expand to 800–1,200 words SSR copy; rewrite H1; add FAQ + use-case sections; ItemList/OfferCatalog schema for public listings |
| **`/en/services/marketplace-development`** | Already ranks-capable; bridges “build marketplace” → “use marketplace” | Add prominent CTA block to `/marketplace`; FAQ answer linking product |
| **`/en/services/shopify-development`** | Highest search volume service line | Add “Post a Shopify project on DEWEB Marketplace” module; link to marketplace + shopify blog cluster |
| **`/en/blog/category/marketplace`** | Supports topical authority for marketplace keywords | 300–500 word editorial intro; links to marketplace hub + development landing + top articles |

**Estimated combined impact (6–12 months):** +800–2,500 organic visits/month if Tier A executed with indexation maintained.

---

### Tier B — Medium ROI

| Page | Action |
|------|--------|
| **`/en/services`** | Align H1 with “Digital Development Services”; add 200–400 words on marketplace + verified developers; FAQ schema |
| **`/en/services/landing-page-development`** | Expand content to ~1,500+ words to match other landings |
| **`/en/services/bots`** | Create long-form landing OR 301 to new `telegram-bot-development` page |
| **`/en/services/seo`** | Expand or landing-ify — supports authority flywheel for own marketing |
| **`/en/blog/category/shopify`** | Editorial hub copy + links to 3 Shopify landings |
| **`/en/blog/category/ai`** | Same pattern for AI landings |

**Estimated impact:** +300–900 organic visits/month incremental.

---

### Tier C — Lower ROI (defer)

| Page | Rationale |
|------|-----------|
| Legacy: `uiux`, `branding`, `marketing` | Crowded SERPs, lower margin, thin pages |
| **`/en/services/mobile`** | Competitive; needs full landing to justify investment |
| Blog: `saas`, `web-development` categories | Supportive clusters; prioritize after A/B |
| ES/RU/AM locale expansion | High effort; do after EN authority proven |

**Estimated impact:** +100–400 organic visits/month.

---

## Roadmap

### SEO-P2A — Marketplace authority sprint (4–6 weeks)

**Goal:** Make marketplace a rankable commercial hub.

| Task | Pages |
|------|-------|
| **Expand** | `/en/marketplace` — hero copy, how-it-works, trust signals, supplier/customer paths, FAQ (8–10 Qs), static SEO section above listings |
| **Rewrite** | H1 → “IT Marketplace for Verified Developers & Digital Services”; meta description A/B variant with “post projects” |
| **Schema** | Add `FAQPage`; consider `ItemList` for featured listings (if stable SSR snapshot) |
| **Internal links** | From `marketplace-development`, `shopify-development`, `ai-chatbot-development`, `/services`, footer |
| **Create** | None — expand existing |
| **Validate** | Word count ≥800; FAQ schema; links from 5+ authority pages |

**Traffic estimate:** +500–1,500 sessions/mo (EN) within 6–12 months.

---

### SEO-P2B — Service & content cluster alignment (6–10 weeks)

**Goal:** Eliminate thin-page gaps and strengthen topical clusters.

| Task | Pages |
|------|-------|
| **Expand** | `/en/services/landing-page-development` (to long-form standard) |
| **Expand** | `/en/services` hub editorial + FAQ |
| **Expand** | Blog categories: `marketplace`, `shopify`, `ai` intros |
| **Create** | `/en/services/telegram-bot-development` (optional landing; redirect `/services/bots`) |
| **Create** | `/en/guides/hire-shopify-developer` (informational → marketplace CTA) — *new URL, not in current IA* |
| **Consolidate** | Legacy `uiux`, `branding`, `marketing` — noindex or merge into design/marketing landing when created |

**Traffic estimate:** +300–900 sessions/mo incremental.

---

### SEO-P2C — Locale, long-tail & maintenance (10–16 weeks)

**Goal:** Scale authority after EN wins.

| Task | Pages |
|------|-------|
| **Translate/expand** | Top 4 landings + marketplace hub → ES, RU, AM |
| **Expand** | `/en/services/mobile`, `/en/services/seo` to landing-grade |
| **Create** | Blog pillar: “How to build a two-sided marketplace” (links to category + landing + product) |
| **Create** | Comparison pages: “DEWEB Marketplace vs Upwork” (informational, high intent) |
| **Maintain** | Monthly sitemap lastmod from CMS/listing activity; monitor cannibalization |

**Traffic estimate:** +200–600 sessions/mo per locale cluster over 12+ months.

---

## Pages to Create (net-new URLs)

| Proposed URL | Intent | Tier | Rationale |
|--------------|--------|------|-----------|
| `/en/services/telegram-bot-development` | Commercial | B | Replace thin `/services/bots` |
| `/en/guides/hire-shopify-developer` | Informational → commercial | B | Capture “hire shopify developer” long-tail |
| `/en/guides/post-software-project` | Informational → commercial | A | Funnel to `/marketplace` |
| `/en/compare/marketplace-vs-freelance-platforms` | Comparison | C | High-intent research traffic |

---

## Pages to Expand (existing)

| URL | Current words | Target words | Priority |
|-----|---------------|--------------|----------|
| `/en/marketplace` | 116 | 800–1,200 | **P0 within P2** |
| `/en/services/landing-page-development` | 641 | 1,500+ | High |
| `/en/services` | 688 | 900–1,100 | High |
| `/en/blog/category/marketplace` | 195 | 400–600 | High |
| `/en/blog/category/shopify` | 207 | 400–500 | Medium |
| `/en/services/bots` | 216 | Landing or redirect | Medium |

---

## Competitive Positioning Summary

| Strength | Weakness |
|----------|----------|
| 9 long-form service landings with FAQ + Service schema | Marketplace product page not crawlable-authority |
| Strong Shopify + AI commercial keywords | H1/metadata misalignment on hubs |
| Blog content exists for topical support | Category hubs lack editorial depth |
| Internal link density on landings (~53 links) | Marketplace not in conversion/link graph |

---

## Validation Performed (read-only)

```text
Live crawl: 22 URLs, all HTTP 200
Word counts: visible text extraction (scripts/styles removed)
Schema: JSON-LD @type extraction
No code or content modified
```

---

## Final Verdict

**`MARKETPLACE_AUTHORITY_NEEDS_WORK`**

The site has **strong service-line authority** but is **not marketplace-authority-ready** until `/en/marketplace` and related hubs are expanded and interlinked. Execute **SEO-P2A** before investing in locale scale (P2C).

---

*Next step when approved: implement SEO-P2A on `/marketplace` only — no design redesign, SSR editorial blocks + schema + internal links.*
