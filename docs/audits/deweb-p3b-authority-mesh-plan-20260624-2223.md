# P3B: Authority Mesh Audit & Implementation Plan

**Date:** 2026-06-24 22:23 CEST  
**Project:** `/var/www/deweb`  
**Domain:** https://dewebam.com  
**Scope:** 6 commercial topical clusters (post-P3A)  
**Verdict:** `AUTHORITY_MESH_READY`

---

## Executive Summary

DEWEB now has **strong commercial foundations** across six clusters: 10 service landings, 3 hire-intent marketplace pages, and 20 blog guides. P3A closed the largest hire-intent gaps for Telegram and AI automation.

**The authority mesh is incomplete.** Links flow mostly **blog → service** (one direction). Service landings do not surface related guides. Only 2 of 10 service landings link back to hire pages. Hire blog posts do not link to hire landings. Category hubs are uneven (Shopify: 7 posts; SaaS: 2; Telegram guide filed under AI).

P3B should **wire the mesh first** (Tier A infrastructure + link recovery), then **fill content gaps** (Tier B guides/comparisons/cost pages) to strengthen cluster depth.

---

## Current Mesh Architecture

```
                    ┌─────────────────┐
                    │  /marketplace   │  hub (892+ words, 8 FAQs)
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
  /hire-web-dev      /hire-telegram      /hire-ai-automation
         │                   │                   │
         ▼                   ▼                   ▼
  /services/web-*     /services/telegram   /services/ai-business
         ▲                   ▲                   ▲
         │                   │                   │
         └─────── blog guides (20) ─────────────┘
              (links exist ↑, reverse links missing)
```

**Mesh health:** Commercial pages ✓ | Hire funnel (3/6 clusters) ⚠ | Service↔blog bidirectional ✗ | Blog↔hire ✗

---

## Cluster Audits

### 1. Telegram Bot Development

#### Existing assets

| Type | URL / asset | Notes |
|------|-------------|-------|
| Service | `/services/telegram-bot-development` | ~1,770 EN words, 8 FAQs, Service schema |
| Hire | `/marketplace/hire-telegram-bot-developers` | ~826 EN words, 7 FAQs, reciprocal ✓ |
| Blog guides | `telegram-bot-development-guide` | 1 article; **miscategorized under `ai`** |
| Related service | `/services/ai-chatbot-development` | Cross-cluster |

#### Missing content

| Gap | Type | Priority |
|-----|------|----------|
| Telegram bot development cost guide (2026) | Cost | High |
| Telegram Mini Apps development guide | Guide | High |
| Telegram vs WhatsApp Business API | Comparison | Medium |
| Telegram payments & subscription bots guide | Guide | Medium |
| Telegram bot FAQ hub (beyond landing inline) | FAQ | Low |

#### Internal linking opportunities

| From | To | Status |
|------|-----|--------|
| Service landing | Hire page | **Done** (marketplaceHire) |
| Service landing | `telegram-bot-development-guide` | **Missing** |
| Hire page | Service + AI automation + chatbot | **Done** |
| `telegram-bot-development-guide` | Hire page | **Missing** |
| AI automation blogs | Telegram service/hire | Partial (service only) |
| Marketplace hub | Hire Telegram row | **Done** |

#### Estimates (12-month directional)

| Metric | Score | Rationale |
|--------|-------|-----------|
| Authority gain | **High** | 1 blog vs full service+hire; mesh + 2 guides = large relative lift |
| Indexing benefit | **Medium** | +3–4 URLs; stronger internal PageRank to hire + service |
| Traffic opportunity | **Medium** | Telegram bot dev queries growing; low competition vs web dev |
| Lead generation value | **High** | Hire page + bot agency CTA; strong commercial intent |

---

### 2. AI Automation

#### Existing assets

| Type | URL / asset | Notes |
|------|-------------|-------|
| Services | `/services/ai-business-automation`, `/services/ai-chatbot-development` | 7 FAQs each |
| Hire | `/marketplace/hire-ai-automation-specialists` | ~839 EN words, reciprocal on ai-business-automation ✓ |
| Blog guides | `ai-chatbots-for-business`, `ai-automation-for-ecommerce`, `future-of-ai-in-business` | 3 core + telegram guide overlap |
| Category hub | `/blog/category/ai` | 4+ articles |

#### Missing content

| Gap | Type | Priority |
|-----|------|----------|
| AI automation cost / ROI guide (2026) | Cost | High |
| Custom automation vs Zapier / Make / n8n | Comparison | High |
| AI business automation vs chatbot development (when to choose) | Comparison | Medium |
| Workflow automation architecture guide | Guide | Medium |
| AI chatbot landing → hire page reciprocal | Link | **Tier A** |

#### Internal linking opportunities

| From | To | Status |
|------|-----|--------|
| `ai-business-automation` | Hire page | **Done** |
| `ai-chatbot-development` | Hire page | **Missing** |
| Both AI services | Top 4 AI blog posts | **Missing** |
| AI blog posts | Hire page | **Missing** |
| Hire page | Both AI services + Telegram | **Done** |
| `future-of-ai-in-business` | Hire + both services | Partial |

#### Estimates

| Metric | Score | Rationale |
|--------|-------|-----------|
| Authority gain | **Medium–High** | Solid base; mesh + cost/comparison closes commercial loop |
| Indexing benefit | **Medium** | +2–3 URLs; improved hub depth for `/blog/category/ai` |
| Traffic opportunity | **High** | AI automation commercial queries strong in 2026 |
| Lead generation value | **Very High** | Dual service lines + hire page; high-ticket workflows |

---

### 3. Marketplace Development

#### Existing assets

| Type | URL / asset | Notes |
|------|-------------|-------|
| Service | `/services/marketplace-development` | 7 FAQs, long-form |
| Hire | — | **None** (hub mentions marketplace service only) |
| Hub | `/marketplace` | Links to marketplace-development |
| Blog guides | `how-to-build-a-marketplace-website`, `marketplace-monetization-strategies`, `competitive-bidding-it-projects` | 3 articles |
| Category hub | `/blog/category/marketplace` | 3 articles (minimum viable) |

#### Missing content

| Gap | Type | Priority |
|-----|------|----------|
| `/marketplace/hire-marketplace-developers` | Hire page | High |
| Marketplace development cost guide (2026) | Cost | High |
| Custom marketplace vs Sharetribe / off-the-shelf | Comparison | High |
| Vendor onboarding & payout architecture guide | Guide | Medium |
| Marketplace vs ecommerce platform decision | Comparison | Medium |

#### Internal linking opportunities

| From | To | Status |
|------|-----|--------|
| Service landing | 3 marketplace blog posts | **Missing** |
| Marketplace blog posts | Hire page (future) | **Missing** |
| `competitive-bidding-it-projects` | `/marketplace` hub | Partial (service links) |
| Marketplace hub | Hire marketplace (future) | **Missing** |
| Hire web / AI pages | Marketplace development service | Partial |

#### Estimates

| Metric | Score | Rationale |
|--------|-------|-----------|
| Authority gain | **Medium** | 3 guides exist; hire page + cost guide unlock cluster |
| Indexing benefit | **Medium–High** | Hire URL + 2 guides = new indexable commercial paths |
| Traffic opportunity | **Medium** | Niche but high deal value |
| Lead generation value | **Very High** | Marketplace builds = largest project budgets |

---

### 4. Web Application Development

#### Existing assets

| Type | URL / asset | Notes |
|------|-------------|-------|
| Service | `/services/web-application-development` | 7 FAQs |
| Hire | `/marketplace/hire-web-developers` | ~807 EN words |
| Blog guides | `custom-web-application-development`, `nextjs-vs-wordpress`, `how-to-hire-software-developers`, `outsourcing-software-development-2026` | 4 articles |
| Category hub | `/blog/category/web-development` | 4 articles |

#### Missing content

| Gap | Type | Priority |
|-----|------|----------|
| Web application development cost guide (2026) | Cost | High |
| React vs Vue for business web apps | Comparison | Medium |
| Service landing → hire reciprocal | Link | **Tier A** |
| `how-to-hire-software-developers` → hire-web-developers | Link | **Tier A** |
| Monolith vs microservices for SMB products | Comparison | Low |

#### Internal linking opportunities

| From | To | Status |
|------|-----|--------|
| Service landing | Hire page | **Missing** (no marketplaceHire) |
| Service landing | 4 web-dev blog posts | **Missing** |
| `how-to-hire-software-developers` | `/marketplace/hire-web-developers` | **Missing** |
| `outsourcing-software-development-2026` | Hire page (not generic `/marketplace`) | **Missing** |
| Hire page | Web service + marketplace + contact | **Done** |

#### Estimates

| Metric | Score | Rationale |
|--------|-------|-----------|
| Authority gain | **Medium** (incremental) | Best-covered cluster; mesh wiring = main gain |
| Indexing benefit | **Low–Medium** | Few new URLs; stronger signals to existing pages |
| Traffic opportunity | **Very High** | Largest query volume cluster |
| Lead generation value | **Very High** | Hire page already live; mesh increases conversion paths |

---

### 5. Shopify Development

#### Existing assets

| Type | URL / asset | Notes |
|------|-------------|-------|
| Services | `/services/shopify-development`, `shopify-store-design`, `shopify-custom-apps` | 7 FAQs each |
| Hire | — | **None** |
| Blog guides | 7 in `shopify` category | Includes cost + comparisons |
| Cost page | `shopify-development-cost-2026` | **Exists ✓** |
| Comparisons | `shopify-vs-woocommerce`, `shopify-plus-vs-standard`, `best-ecommerce-platforms` | **Strong ✓** |

#### Missing content

| Gap | Type | Priority |
|-----|------|----------|
| `/marketplace/hire-shopify-developers` | Hire page | Medium |
| Shopify migration guide (WooCommerce/Magento → Shopify) | Guide | Medium |
| Shopify Hydrogen / headless deep-dive | Guide | Low (headless-commerce-guide exists) |
| Service landings → shopify blog hub block | Link | **Tier A** |
| Shopify app vs custom theme decision | Comparison | Low |

#### Internal linking opportunities

| From | To | Status |
|------|-----|--------|
| 3 Shopify service landings | 7 shopify blog posts | **Missing** |
| `shopify-development-cost-2026` | `shopify-store-design` / `shopify-custom-apps` | **Missing** |
| Shopify blogs | Future hire page | **Missing** |
| Hire web page | Shopify services (cross-sell) | **Missing** |

#### Estimates

| Metric | Score | Rationale |
|--------|-------|-----------|
| Authority gain | **Low–Medium** | Deepest blog cluster; mesh adds crawl efficiency |
| Indexing benefit | **Low** | Mostly linking existing URLs |
| Traffic opportunity | **High** | Strong ecommerce query volume |
| Lead generation value | **High** | Cost + comparison content already converts |

---

### 6. SaaS Development

#### Existing assets

| Type | URL / asset | Notes |
|------|-------------|-------|
| Service | `/services/saas-development` | 7 FAQs |
| Hire | — | **None** |
| Blog guides | `saas-development-guide`, `mvp-development-cost-guide` | 2 articles only |
| Category hub | `/blog/category/saas` | **Thin (2 posts)** |

#### Missing content

| Gap | Type | Priority |
|-----|------|----------|
| Multi-tenant SaaS architecture guide | Guide | **High** |
| SaaS pricing models & billing integration guide | Guide | High |
| SaaS vs marketplace business model | Comparison | Medium |
| `/marketplace/hire-saas-developers` | Hire page | Medium |
| Dedicated SaaS FAQ hub | FAQ | Low |

#### Internal linking opportunities

| From | To | Status |
|------|-----|--------|
| Service landing | 2 saas blog posts + MVP guide | **Missing** |
| `saas-development-guide` | Service + marketplace-development | Partial (internalLinks ✓) |
| `mvp-development-cost-guide` | SaaS service + hire web (product teams) | Partial |
| SaaS category hub | Needs 2+ more posts for hub authority | **Gap** |

#### Estimates

| Metric | Score | Rationale |
|--------|-------|-----------|
| Authority gain | **High** | Thinnest cluster relative to service landing depth |
| Indexing benefit | **Medium–High** | +3–4 guides significantly strengthens `/blog/category/saas` |
| Traffic opportunity | **Medium–High** | SaaS MVP + architecture queries steady |
| Lead generation value | **High** | High ACV projects; MVP cost guide already captures intent |

---

## Cross-Cluster Mesh Gaps (Systemic)

| Gap | Clusters affected | P3B fix |
|-----|-------------------|---------|
| No `RelatedGuides` on service landings | All 6 | Tier A component |
| `marketplaceHire` only on 2 services | Web, Marketplace, Shopify, SaaS | Tier A reciprocal links |
| Blog posts don't link to hire pages | Web, Telegram, AI | Tier A link pass |
| Hire pages missing for 3 clusters | Marketplace, Shopify, SaaS | Tier B |
| Category hubs below 4 posts | SaaS (2), Marketplace (3) | Tier B content |
| Telegram guide under `ai` category | Telegram | Tier C taxonomy |
| No cluster-specific FAQ index pages | All | Tier C |

---

## Opportunity Ranking

### Tier A — Create next (mesh wiring + highest ROI content)

Infrastructure and links should ship **before** bulk new articles.

| # | Deliverable | Type | Clusters | Est. authority | Est. indexing | Est. traffic | Est. leads |
|---|-------------|------|----------|----------------|---------------|--------------|------------|
| A1 | `RelatedGuides` block on all service landings (slug → blog map) | Component | All 6 | High | Medium | Medium | High |
| A2 | `marketplaceHire` on `web-application-development` → hire-web-developers | Link | Web | Medium | Low | High | Very High |
| A3 | `marketplaceHire` on `ai-chatbot-development` → hire-ai-automation-specialists | Link | AI | Medium | Low | High | High |
| A4 | Blog link pass: hire-relevant posts → hire landings | Link | Web, Telegram, AI | Medium | Low | Medium | Very High |
| A5 | Fix `how-to-hire-software-developers` + `outsourcing-*` → hire-web-developers | Link | Web | Medium | Low | High | High |
| A6 | `telegram-bot-development-guide` → hire-telegram-bot-developers | Link | Telegram | Medium | Low | Medium | High |
| A7 | AI automation cost / ROI guide (2026) | Blog | AI | High | Medium | High | High |
| A8 | Marketplace development cost guide (2026) | Blog | Marketplace | High | Medium | Medium | Very High |
| A9 | Multi-tenant SaaS architecture guide | Blog | SaaS | High | Medium | Medium | High |

**Tier A outcome:** Bidirectional service ↔ blog ↔ hire mesh for 3 hire clusters; cost guides for 3 thin commercial loops.

---

### Tier B — Create later (cluster depth + hire expansion)

| # | Deliverable | Type | Clusters | Est. authority | Est. indexing | Est. traffic | Est. leads |
|---|-------------|------|----------|----------------|---------------|--------------|------------|
| B1 | `/marketplace/hire-marketplace-developers` | Hire page | Marketplace | High | Medium | Medium | Very High |
| B2 | Custom marketplace vs off-the-shelf comparison | Blog | Marketplace | Medium | Medium | Medium | High |
| B3 | Telegram Mini Apps guide + Telegram bot cost guide | Blog | Telegram | High | Medium | Medium | High |
| B4 | Custom automation vs Zapier/Make comparison | Blog | AI | Medium | Medium | High | Medium |
| B5 | Web application development cost guide (2026) | Blog | Web | Medium | Medium | Very High | High |
| B6 | SaaS pricing models & billing guide | Blog | SaaS | Medium | Medium | Medium | High |
| B7 | `/marketplace/hire-shopify-developers` | Hire page | Shopify | Medium | Medium | High | High |
| B8 | Shopify migration guide | Blog | Shopify | Medium | Medium | High | Medium |
| B9 | AI automation vs chatbot development comparison page | Blog/Landing section | AI | Medium | Low | Medium | High |

---

### Tier C — Optional (long-tail + polish)

| # | Deliverable | Type | Clusters |
|---|-------------|------|----------|
| C1 | `/marketplace/hire-saas-developers` | Hire page | SaaS |
| C2 | Telegram vs WhatsApp bot comparison | Blog | Telegram |
| C3 | React vs Vue for business apps | Blog | Web |
| C4 | Retag `telegram-bot-development-guide` → new `telegram` category | Taxonomy | Telegram |
| C5 | Cluster FAQ index pages (schema hubs) | Static/section | All |
| C6 | Hire web page → Shopify cross-sell block | Link | Shopify/Web |
| C7 | Vendor onboarding marketplace guide | Blog | Marketplace |

---

## Implementation Roadmap

### Phase 1 — Mesh infrastructure (Week 1)

**Goal:** Make authority flow bidirectional without new long-form content.

1. Build `RelatedGuides` component in `ServiceLandingView` with per-slug blog map in `service-landing/guides.ts`
2. Add `marketplaceHire` to `web-application-development` and `ai-chatbot-development`
3. Update blog `internalLinks` in:
   - `how-to-hire-software-developers.ts`
   - `outsourcing-software-development-2026.ts`
   - `telegram-bot-development-guide.ts`
   - `ai-chatbots-for-business.ts`, `future-of-ai-in-business.ts` (hire CTA links)
4. Validate build + internal link crawl (no 404 targets)

**Exit criteria:** Every service landing links to ≥3 cluster blog posts; 4 hire-relevant blogs link to hire pages; 4 services have marketplaceHire or equivalent.

---

### Phase 2 — Tier A content (Weeks 2–3)

**Goal:** Close cost/architecture gaps on highest-leverage clusters.

| Week | Deliverable |
|------|-------------|
| 2 | A7 AI automation cost/ROI guide |
| 2 | A8 Marketplace development cost guide |
| 3 | A9 Multi-tenant SaaS architecture guide |

Each article: 6 FAQs, internal links to service + hire (where exists) + `/contact`, category hub registration.

**Exit criteria:** SaaS category ≥3 posts; marketplace + AI clusters each have dedicated cost content.

---

### Phase 3 — Tier B expansion (Weeks 4–8)

1. Hire marketplace developers landing (B1)
2. Telegram Mini Apps + cost guides (B3)
3. Web app cost guide (B5)
4. Zapier vs custom automation (B4)
5. Hire Shopify developers (B7) when Shopify mesh proves conversion

**Exit criteria:** All 6 clusters have service + ≥4 blog posts + hire OR agency CTA path documented.

---

### Phase 4 — Measurement (Ongoing)

| KPI | Tool | Target (90 days post Phase 2) |
|-----|------|--------------------------------|
| Cluster impressions (GSC filter groups) | GSC | +25% on Tier A URLs |
| Service landing CTR from blog referrals | GA4 | Baseline → +15% |
| Hire page → listing/contact events | GA4 | +20% on wired blog paths |
| Indexed cluster URLs | GSC | +6–9 new/ strengthened |
| Avg position on “cost” + “hire” modifiers | GSC | Improve 3–5 positions |

---

## Cluster Readiness Matrix (Post-P3A)

| Cluster | Service | Hire | Blog depth | Comparisons | Cost | Mesh ready? |
|---------|---------|------|------------|-------------|------|-------------|
| Telegram | ✓ | ✓ | ⚠ (1) | ✗ | ✗ | Wire first |
| AI Automation | ✓✓ | ✓ | ✓ (3+) | ⚠ | ✗ | Wire + cost |
| Marketplace | ✓ | ✗ | ⚠ (3) | ⚠ | ✗ | Hire + cost |
| Web Apps | ✓ | ✓ | ✓ (4) | ✓ | ✗ | Wire first |
| Shopify | ✓✓✓ | ✗ | ✓✓ (7) | ✓✓ | ✓ | Wire only |
| SaaS | ✓ | ✗ | ✗ (2) | ✗ | ⚠ MVP | Content + wire |

---

## Verdict Rationale

### `AUTHORITY_MESH_READY`

**Why ready:**

- All 6 clusters have **production-grade service landings** with FAQ + Service schema
- **3 hire-intent funnels** are live with proven template (P2D + P3A)
- **20 blog articles** provide mesh endpoints; Shopify and Web clusters are publication-ready
- P3A added **reciprocal hire links** pattern (`marketplaceHire`) ready to extend
- No blocking technical debt (404 hygiene, i18n, sitemap, schema patterns)

**Why not “complete”:**

- Authority **mesh** (bidirectional linking) is not built — that is P3B implementation scope
- 3 clusters still lack hire pages (acceptable Tier B)
- SaaS and Telegram need **content depth** before competing on informational SERPs

**Recommendation:** Execute **Phase 1 mesh infrastructure immediately** (no new copy required beyond config/maps). Follow with Tier A cost/architecture guides in Phase 2. Reassess after Phase 2 — site should show measurable GSC cluster lift.

---

## Final Verdict

**AUTHORITY_MESH_READY**
