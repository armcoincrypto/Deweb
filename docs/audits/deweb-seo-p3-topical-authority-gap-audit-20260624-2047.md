# SEO-P3: Topical Authority Gap Audit

**Date:** 2026-06-24 20:47 CEST  
**Project:** `/var/www/deweb`  
**Domain:** https://dewebam.com  
**Scope:** 7 commercial content clusters  
**Verdict:** `TOPICAL_AUTHORITY_NEEDS_FOUNDATION`

---

## Executive Summary

DEWEB has strong **agency service landings** (10 pages), a **marketplace hub**, and **20 blog articles** across 5 categories. P2 work delivered high-value foundations: marketplace hub, hire-web-developers, telegram-bot-development landing, and ai-business-automation redirects.

**Topical authority is uneven.** Shopify and Marketplace clusters are the deepest. **Dedicated Development Teams** has no pillar URL. **Hire-intent** coverage exists for web developers only (1 of 3+ planned pages). Service landings link to other services but **not to blog guides or hire pages**, creating a one-way topical graph.

Before scaling content volume, build **Tier A foundation pages** (dedicated-team pillar, remaining hire landings, cluster hub cross-links). Then expand comparisons and cost guides in Tier B.

---

## Site Inventory (Baseline)

| Asset type | Count | Notes |
|------------|-------|-------|
| Service landings | 10 | Long-form, FAQ + Service schema |
| Marketplace routes | 2 | `/marketplace`, `/marketplace/hire-web-developers` |
| Blog articles | 20 | Static + CMS possible |
| Blog categories | 5 | shopify, ai, web-development, marketplace, saas |
| Hire-intent pages | 1 | Web developers only |
| Dedicated team pillar | 0 | Fragmented across hire section + 2 blog posts |

**Global linking gap:** Service landings expose `relatedServices` (service→service) but no `relatedGuides` or blog blocks. Blog→service links exist; reverse path is missing.

---

## Cluster Audits

### 1. Marketplace Development

#### Existing pages

| URL | Type | Status |
|-----|------|--------|
| `/services/marketplace-development` | Agency landing | Complete (~1,700+ words, 7 FAQs) |
| `/marketplace` | Hub + listings | Complete (P2A) |
| `/blog/how-to-build-a-marketplace-website` | Guide | Complete |
| `/blog/marketplace-monetization-strategies` | Guide | Complete |
| `/blog/competitive-bidding-it-projects` | Guide | Complete |
| `/blog/category/marketplace` | Category hub | Complete |

#### Missing pages

| Proposed URL | Intent | Priority |
|--------------|--------|----------|
| `/marketplace/hire-marketplace-developers` | Commercial hire | High |
| `/services/marketplace-development` → resources block | On-page hub | Medium |

#### Missing guides

- Marketplace development cost guide (2026)
- Multi-vendor vs single-vendor commerce decision guide
- Marketplace payment & payout architecture guide
- Vendor onboarding playbook (informational)

#### Missing comparisons

- Custom marketplace vs Sharetribe / off-the-shelf SaaS
- Commission vs subscription marketplace revenue models (partially in monetization article)
- Marketplace vs ecommerce platform (when to choose which)

#### Missing FAQs (site-wide gaps)

- Dedicated FAQ hub beyond landing inline FAQs
- “How long does marketplace development take?” standalone guide
- Cross-locale marketplace compliance FAQ (payments, KYC)

#### Internal linking opportunities

| From | To | Action |
|------|-----|--------|
| `/services/marketplace-development` | 3 marketplace blog posts | Add “Related guides” block |
| `/marketplace` hub | `/blog/category/marketplace` | Already partial — expand inline mentions |
| Marketplace blog posts | `/marketplace` + hire page (future) | Add marketplace hiring CTA |
| `/marketplace/hire-web-developers` | `/services/marketplace-development` | Already linked ✓ |

#### Keywords

**Commercial:** marketplace development services, build a marketplace platform, multi-vendor marketplace development, marketplace app development company, hire marketplace developers

**Informational:** how to build a marketplace website, marketplace monetization strategies, two-sided marketplace architecture, vendor onboarding marketplace, marketplace payment integration

#### Estimated authority gain

**Medium–High** — 3 strong guides + service landing already exist. Hire page + cost guide + service↔blog linking would close the commercial loop. **+25–35% cluster completeness.**

---

### 2. Telegram Bot Development

#### Existing pages

| URL | Type | Status |
|-----|------|--------|
| `/services/telegram-bot-development` | Agency landing | Complete (P2B, ~1,770 words EN, 8 FAQs) |
| `/blog/telegram-bot-development-guide` | Guide | Complete (filed under `ai` category) |
| `/marketplace` hub | Category link | Links to telegram service ✓ |

#### Missing pages

| Proposed URL | Intent | Priority |
|--------------|--------|----------|
| `/marketplace/hire-telegram-bot-developers` | Commercial hire | **High** (planned P2C) |
| `/blog/category/telegram` or tag hub | Topical grouping | Medium |

#### Missing guides

- Telegram Mini Apps development guide
- Telegram bot development cost guide
- Telegram payments & subscription bots guide
- Telegram bot + CRM integration playbook

#### Missing comparisons

- Telegram bot vs WhatsApp Business API
- Telegram vs Discord bots for community/support
- Telegram Mini App vs native mobile app
- Custom Telegram bot vs no-code bot builders

#### Missing FAQs

- Telegram-only FAQ cluster (currently merged into service landing + 1 blog)
- Bot hosting / webhook reliability FAQ
- Telegram Bot API rate limits & scaling FAQ

#### Internal linking opportunities

| From | To | Action |
|------|-----|--------|
| `/services/telegram-bot-development` | `telegram-bot-development-guide` | Add related guide block |
| `telegram-bot-development-guide` | `/marketplace` (future hire page) | Hire CTA |
| `/services/ai-business-automation` | `/services/telegram-bot-development` | Cross-link in related services ✓ (verify) |
| AI automation blog posts | Telegram landing | Add where channel-specific |

#### Keywords

**Commercial:** telegram bot development services, hire telegram bot developer, telegram mini app development, telegram bot development company, custom telegram bot

**Informational:** how to build a telegram bot, telegram bot api tutorial, telegram mini apps guide, telegram bot payments, telegram bot vs whatsapp bot

#### Estimated authority gain

**High** — Service landing is strong but **blog depth is thin (1 article)**. Hire page + 2–3 guides + comparison posts would materially shift E-E-A-T. **+40–50% cluster completeness.**

---

### 3. AI Automation

#### Existing pages

| URL | Type | Status |
|-----|------|--------|
| `/services/ai-business-automation` | Agency landing | Complete (7 FAQs) |
| `/services/ai-chatbot-development` | Related landing | Complete (7 FAQs) |
| `/blog/ai-chatbots-for-business` | Guide | Complete |
| `/blog/ai-automation-for-ecommerce` | Guide | Complete |
| `/blog/future-of-ai-in-business` | Guide | Complete |
| `/blog/telegram-bot-development-guide` | Cross-cluster | Complete |
| `/blog/category/ai` | Category hub | Complete |

#### Missing pages

| Proposed URL | Intent | Priority |
|--------------|--------|----------|
| `/marketplace/hire-ai-automation-specialists` | Commercial hire | **High** (planned P2C) |
| Unified `/services/ai-automation` | N/A | Redirects to ai-business-automation ✓ |

#### Missing guides

- AI business automation cost / ROI guide
- Workflow automation architecture guide (CRM, ERP, ecommerce ops)
- AI agent vs rules-based automation decision guide
- AI automation for support teams (vertical playbook)

#### Missing comparisons

- Custom AI automation vs Zapier / Make / n8n
- AI chatbot vs human support hybrid models
- ai-business-automation vs ai-chatbot-development (when to choose — on-site comparison page)

#### Missing FAQs

- Consolidated AI automation FAQ hub linking both service pages
- Data privacy / GDPR for AI automation FAQ
- Model selection & hallucination risk FAQ for business buyers

#### Internal linking opportunities

| From | To | Action |
|------|-----|--------|
| Both AI service landings | Top 4 AI blog posts | Related guides block |
| AI blog posts | Future hire-ai page | Commercial CTA |
| `/marketplace` hub | Both AI services | Already linked ✓ |
| `ai-chatbots-for-business` | `/services/telegram-bot-development` | Cross-link for channel bots |

#### Keywords

**Commercial:** ai business automation services, ai automation company, hire ai automation specialist, ai workflow automation development, ai chatbot development services

**Informational:** ai automation for business, ai automation roi, ai chatbots for business, ai automation ecommerce, future of ai in business

#### Estimated authority gain

**Medium** — Good service + blog base. Main gaps are **hire intent**, **cost/ROI guide**, and **tooling comparisons**. **+20–30% cluster completeness.**

---

### 4. Web Application Development

#### Existing pages

| URL | Type | Status |
|-----|------|--------|
| `/services/web-application-development` | Agency landing | Complete (7 FAQs) |
| `/marketplace/hire-web-developers` | Hire landing | Complete (P2D, ~807 words, 7 FAQs) |
| `/blog/custom-web-application-development` | Guide | Complete |
| `/blog/nextjs-vs-wordpress` | Comparison | Complete |
| `/blog/how-to-hire-software-developers` | Hire guide | Complete |
| `/blog/outsourcing-software-development-2026` | Hire/outsource | Complete |
| `/blog/category/web-development` | Category hub | Complete |

#### Missing pages

| Proposed URL | Intent | Priority |
|--------------|--------|----------|
| `/marketplace/hire-dedicated-development-team` or service pillar | Dedicated teams | **High** (see cluster 5) |
| Web app cost guide (dedicated URL or blog) | Commercial investigation | Medium |

#### Missing guides

- Web application development cost guide (2026)
- React / Next.js stack guide for founders
- API-first product architecture guide
- Legacy app modernization guide

#### Missing comparisons

- React vs Vue for business web apps
- Monolith vs microservices for SMB products
- In-house vs outsourced web development (partially in outsourcing article)

#### Missing FAQs

- Hire page covers 7 FAQs ✓
- Service landing covers 7 FAQs ✓
- Gap: unified FAQ index across hire + service + blog trio

#### Internal linking opportunities

| From | To | Action |
|------|-----|--------|
| `/services/web-application-development` | `/marketplace/hire-web-developers` | **Add hire CTA block** |
| `/services/web-application-development` | 4 web-dev blog posts | Related guides |
| `how-to-hire-software-developers` | `/marketplace/hire-web-developers` | **Missing** — currently links service/contact only |
| `outsourcing-software-development-2026` | `/marketplace/hire-web-developers` | Replace generic `/marketplace` for dedicated-team intent |

#### Keywords

**Commercial:** web application development services, custom web app development company, hire web developers, hire software developers, dedicated development team

**Informational:** custom web application development, nextjs vs wordpress, how to hire software developers, outsourcing software development, web app development cost

#### Estimated authority gain

**Low–Medium (incremental)** — Best-covered cluster. Gains now come from **tightening internal links** and dedicated-team pillar, not net-new service pages. **+10–15% cluster completeness.**

---

### 5. Dedicated Development Teams

#### Existing pages

| URL | Type | Status |
|-----|------|--------|
| `/marketplace/hire-web-developers` (engagement section) | Partial hire | Fragment only |
| `/blog/how-to-hire-software-developers` | Informational | Complete |
| `/blog/outsourcing-software-development-2026` | Informational + FAQ | Complete |
| `/marketplace` | Generic fallback | Links dedicated intent to hub |

#### Missing pages

| Proposed URL | Intent | Priority |
|--------------|--------|----------|
| `/marketplace/hire-dedicated-development-team` **or** `/services/dedicated-development-team` | **Pillar** | **Critical** |
| Staff augmentation vs dedicated team comparison | Commercial investigation | High |

#### Missing guides

- Dedicated development team cost guide (2026)
- Nearshore vs offshore dedicated team guide
- How to structure a dedicated squad (roles, ceremonies, KPIs)
- Dedicated team vs project-based outsourcing (extend outsourcing article)

#### Missing comparisons

- Staff augmentation vs dedicated team vs project outsourcing
- Dedicated team vs freelance marketplace hiring
- In-house team vs dedicated external team

#### Missing FAQs

- No cluster-specific FAQ schema page
- Hire-web FAQ #6 touches topic but insufficient for “dedicated development team” queries
- Missing: team size, contract length, IP ownership, timezone overlap FAQs as standalone hub

#### Internal linking opportunities

| From | To | Action |
|------|-----|--------|
| `outsourcing-software-development-2026` | Dedicated pillar (future) | Replace `/marketplace` generic link |
| `how-to-hire-software-developers` | `/marketplace/hire-web-developers` | Add explicit hire link |
| All service landings | Dedicated pillar | “Need a full team?” CTA |
| `/marketplace` hub | Dedicated hire page | New category row |

#### Keywords

**Commercial:** dedicated development team, hire dedicated developers, dedicated software development team, staff augmentation services, offshore development team

**Informational:** staff augmentation vs dedicated team, how to hire a development team, outsourcing vs dedicated team, dedicated team pricing model

#### Estimated authority gain

**Very High (from low base)** — Weakest cluster. One pillar page + 2 guides could **double topical coverage**. **+60–80% cluster completeness.** Blocks full authority until built.

---

### 6. Shopify Development

#### Existing pages

| URL | Type | Status |
|-----|------|--------|
| `/services/shopify-development` | Agency landing | Complete (7 FAQs) |
| `/services/shopify-store-design` | Related landing | Complete |
| `/services/shopify-custom-apps` | Related landing | Complete |
| `/blog/shopify-development-cost-2026` | Cost guide | Complete |
| `/blog/shopify-vs-woocommerce` | Comparison | Complete |
| `/blog/best-shopify-apps` | Listicle | Complete |
| `/blog/shopify-plus-vs-standard` | Comparison | Complete |
| `/blog/best-ecommerce-platforms` | Comparison | Complete |
| `/blog/headless-commerce-guide` | Guide | Complete |
| `/blog/technical-seo-for-ecommerce` | Guide | Complete |
| `/blog/category/shopify` | Category hub | Complete (7 articles) |

#### Missing pages

| Proposed URL | Intent | Priority |
|--------------|--------|----------|
| `/marketplace/hire-shopify-developers` | Commercial hire | Medium |
| Shopify migration landing section or guide | Commercial + info | Medium |

#### Missing guides

- Shopify migration guide ( WooCommerce / Magento → Shopify )
- Shopify B2B / wholesale development guide
- Shopify Hydrogen / headless implementation guide (extend headless article)
- Shopify app vs custom theme decision guide

#### Missing comparisons

- Shopify vs BigCommerce (platforms article is broad; Shopify-specific angle thin)
- Shopify theme customization vs custom app build
- Shopify Partners agency vs freelancer marketplace

#### Missing FAQs

- Landing FAQs exist per page ✓
- Missing centralized Shopify FAQ hub for long-tail (“Shopify checkout customization cost”, etc.)

#### Internal linking opportunities

| From | To | Action |
|------|-----|--------|
| 3 Shopify service landings | 7 shopify blog posts | Related guides block (high impact) |
| Shopify blog posts | Future hire-shopify page | Hire CTA |
| `/marketplace/hire-web-developers` | Shopify services | Cross-sell for ecommerce web builds |
| `shopify-development-cost-2026` | `/services/shopify-store-design` | Currently only shopify-development |

#### Keywords

**Commercial:** shopify development services, shopify developer agency, hire shopify developer, shopify store development, shopify custom app development

**Informational:** shopify development cost, shopify vs woocommerce, best shopify apps, shopify plus vs standard, headless commerce shopify

#### Estimated authority gain

**Low (incremental)** — Deepest cluster. Focus on **hire intent** + **migration guide** + **service↔blog linking**. **+10–15% cluster completeness.**

---

### 7. SaaS Development

#### Existing pages

| URL | Type | Status |
|-----|------|--------|
| `/services/saas-development` | Agency landing | Complete (7 FAQs) |
| `/blog/saas-development-guide` | Guide | Complete |
| `/blog/mvp-development-cost-guide` | Cost guide | Complete |
| `/blog/category/saas` | Category hub | Complete (2 articles) |

#### Missing pages

| Proposed URL | Intent | Priority |
|--------------|--------|----------|
| `/marketplace/hire-saas-developers` | Commercial hire | Medium |
| SaaS architecture deep-dive (blog or landing section) | Informational authority | High |

#### Missing guides

- Multi-tenant SaaS architecture guide
- SaaS pricing model & billing integration guide (Stripe, Paddle)
- SaaS MVP vs full product roadmap guide
- SaaS security & compliance starter guide (SOC2 path)

#### Missing comparisons

- SaaS vs marketplace business model (product strategy)
- Build SaaS in-house vs agency vs dedicated team
- Monolith SaaS vs modular services for early stage

#### Missing FAQs

- Landing has 7 FAQs ✓
- Thin blog FAQ surface for billing, tenancy, churn analytics topics

#### Internal linking opportunities

| From | To | Action |
|------|-----|--------|
| `/services/saas-development` | 2 saas blog posts + MVP guide | Related guides block |
| `saas-development-guide` | `/services/marketplace-development` | Already in internal links ✓ |
| `/marketplace/hire-web-developers` | `/services/saas-development` | Cross-link for product teams |
| SaaS category hub | Only 2 posts — needs 3+ more for hub authority |

#### Keywords

**Commercial:** saas development services, saas development company, hire saas developers, mvp development services, multi-tenant saas development

**Informational:** saas development guide, mvp development cost, saas architecture, saas pricing models, build a saas product

#### Estimated authority gain

**Medium–High** — Service landing strong; **blog cluster is thin (2 posts)** vs Shopify (7). Adding 3–4 guides would significantly improve hub authority. **+35–45% cluster completeness.**

---

## Cross-Cluster Patterns

### Strengths

1. Long-form service landings with FAQ + Service schema on all primary clusters
2. Marketplace hub + hire-web-developers establishes a replicable hire-intent template
3. Shopify and Marketplace blog clusters are publication-ready
4. Internal blog→service links largely recovered (P2C)
5. Redirect hygiene for legacy service slugs is solid

### Systemic gaps

| Gap | Impact | Fix pattern |
|-----|--------|-------------|
| No service→blog “Related guides” | Weak topical reinforcement | Reusable `RelatedGuides` component on landings |
| Hire pages 1/4+ needed | Missed transactional queries | Roll out hire template (P2D pattern) |
| No dedicated-team pillar | Critical E-E-A-T hole | Tier A page first |
| Telegram blog under `ai` category | Topical blur | Retag + optional category |
| Blog categories with &lt;3 posts (saas: 2) | Weak hub pages | Minimum 4 articles per priority hub |
| `how-to-hire-software-developers` skips hire landing | Leaks link equity | Single internal link fix |

---

## Opportunity Ranking

### Tier A — Foundation (build before scale)

Highest authority gain per unit of work; closes commercial loops and critical gaps.

| # | Opportunity | Cluster | Type | Est. authority gain |
|---|-------------|---------|------|---------------------|
| A1 | `/marketplace/hire-dedicated-development-team` or `/services/dedicated-development-team` | Dedicated Teams | Pillar page | Very High |
| A2 | `/marketplace/hire-telegram-bot-developers` | Telegram | Hire landing | High |
| A3 | `/marketplace/hire-ai-automation-specialists` | AI Automation | Hire landing | High |
| A4 | Service landing “Related guides” block (all 7 clusters) | Cross-cluster | Internal linking | High |
| A5 | Fix hire blog links → `/marketplace/hire-web-developers` | Web / Dedicated | Link recovery | Medium |
| A6 | `/marketplace/hire-marketplace-developers` | Marketplace | Hire landing | High |

### Tier B — Authority expansion (after Tier A)

Deepen informational coverage and comparisons; strengthen category hubs.

| # | Opportunity | Cluster | Type | Est. authority gain |
|---|-------------|---------|------|---------------------|
| B1 | SaaS multi-tenant architecture guide | SaaS | Blog | High |
| B2 | Marketplace development cost guide | Marketplace | Blog | Medium–High |
| B3 | Telegram Mini Apps + cost guides (2 posts) | Telegram | Blog | High |
| B4 | AI automation ROI / cost guide | AI Automation | Blog | Medium |
| B5 | Staff augmentation vs dedicated team comparison | Dedicated Teams | Blog | High |
| B6 | Web application development cost guide | Web Apps | Blog | Medium |
| B7 | Shopify migration guide | Shopify | Blog | Medium |
| B8 | Custom marketplace vs off-the-shelf comparison | Marketplace | Blog | Medium |

### Tier C — Long-tail & polish

Supporting content; lower priority until Tier A/B complete.

| # | Opportunity | Cluster | Type | Est. authority gain |
|---|-------------|---------|------|---------------------|
| C1 | Telegram vs WhatsApp bot comparison | Telegram | Blog | Medium |
| C2 | Zapier vs custom AI automation | AI Automation | Blog | Medium |
| C3 | React vs Vue for business apps | Web Apps | Blog | Low–Medium |
| C4 | `/marketplace/hire-shopify-developers` | Shopify | Hire landing | Medium |
| C5 | `/marketplace/hire-saas-developers` | SaaS | Hire landing | Medium |
| C6 | Telegram blog category or tag hub | Telegram | Taxonomy | Low |
| C7 | Consolidated FAQ index pages per cluster | Cross-cluster | FAQ hub | Low–Medium |

---

## Implementation Roadmap

### Phase 1 — Foundation (Weeks 1–2)

**Goal:** Close critical pillar and hire-intent gaps.

1. **Dedicated development team pillar** (A1) — choose URL:
   - Preferred: `/marketplace/hire-dedicated-development-team` (consistent with hire template)
   - Alternative: `/services/dedicated-development-team` (agency-led positioning)
2. **Hire telegram bot developers** (A2) — clone P2D template
3. **Hire AI automation specialists** (A3) — clone P2D template
4. **Internal link fixes** (A5) — `how-to-hire-software-developers`, `outsourcing-software-development-2026`
5. **Marketplace hub rows** for new hire pages (mirror hire-web-developers)

**Exit criteria:** 4 hire-intent URLs live; dedicated cluster has standalone pillar; hire blogs link correctly.

### Phase 2 — Topical mesh (Weeks 3–4)

**Goal:** Bidirectional cluster linking.

1. **`RelatedGuides` component** on all service landings (A4) — map each landing to 3–5 blog slugs
2. **Hire-marketplace-developers** (A6)
3. **Web application development** service → hire-web-developers CTA block
4. Publish **B5** (staff augmentation vs dedicated team) to support A1

**Exit criteria:** Every service landing links to ≥3 cluster blog posts; every hire page links to agency fallback + marketplace hub.

### Phase 3 — Hub depth (Weeks 5–8)

**Goal:** Raise thin clusters to minimum hub depth (4+ articles).

| Week | Deliverables |
|------|--------------|
| 5 | B1 SaaS architecture + B2 marketplace cost |
| 6 | B3 Telegram Mini Apps + Telegram bot cost |
| 7 | B4 AI automation ROI + B6 web app cost |
| 8 | B7 Shopify migration + B8 marketplace platform comparison |

**Exit criteria:** SaaS category ≥4 posts; Telegram cluster ≥3 posts; each cluster has ≥1 cost or comparison asset.

### Phase 4 — Long-tail (Ongoing)

- Tier C comparisons and secondary hire pages
- FAQ hub pages if GSC shows FAQ rich-result opportunity
- Locale expansion for new pages (EN first, then RU/ES/AM per P2 pattern)

---

## Metrics to Track Post-Implementation

| Metric | Tool | Target (90 days post Phase 2) |
|--------|------|-------------------------------|
| Impressions by cluster query group | GSC | +30% on Tier A URLs |
| Internal link clicks service↔blog | GA4 events | Measurable baseline → +20% |
| Hire page conversions (listing/contact) | GA4 | Baseline → +15% |
| FAQ rich results | GSC enhancements | Stable or growing |
| Indexed pages per cluster | GSC | +6–10 new URLs |

---

## Verdict Rationale

### `TOPICAL_AUTHORITY_NEEDS_FOUNDATION`

**Why not READY:**

- **Dedicated Development Teams** lacks any pillar URL — the largest single gap across all 7 clusters
- **Hire-intent layer** covers web developers only; telegram and AI automation hire pages remain planned but unbuilt
- **Service↔blog linking is one-directional** — landings do not reinforce guide authority
- **Telegram** (1 blog) and **SaaS** (2 blogs) hubs are too thin for competitive topical maps
- Key hire blog posts still route dedicated-team intent to generic `/marketplace`

**Why foundation exists:**

- P2 deliverables (marketplace hub, hire-web-developers, telegram landing, AI automation) provide **proven templates**
- Shopify and Marketplace clusters can shift to Tier B immediately after Phase 1
- No critical technical SEO blockers (404 hygiene, schema patterns, i18n) for new content

**Recommendation:** Execute **Phase 1–2 before high-volume blog production**. After Tier A ships, reassess — site should qualify for `TOPICAL_AUTHORITY_READY` and Phase 3 hub expansion.

---

## Final Verdict

**TOPICAL_AUTHORITY_NEEDS_FOUNDATION**
