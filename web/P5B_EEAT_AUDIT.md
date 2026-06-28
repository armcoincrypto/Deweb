# P5B E-E-A-T Audit Report

**Project:** DEWEB  
**Path:** `/var/www/deweb/web`  
**Date:** 2026-06-28  
**Scope:** Full `src/` scan for unverifiable performance claims, fake social proof, and fabricated business statistics.

---

## Executive summary

Production homepage (`CinematicHome`) and high-traffic pages contained **fabricated metrics** in decorative UI (conversion lifts, project counts, satisfaction rates, live marketplace activity) and **implied client relationships** via technology logos presented as “trusted by” brands. Testimonials were already labeled illustrative (prior P0 work). Leadership team entries reference real DEWEB roles; named products **Exswaping**, **Kobbopay**, and **DEX** were **not found** in the codebase and were **not added** (no URLs or verifiable copy available).

**Remediation:** Replace numeric vanity metrics with capability/process language; reframe logo strips as technology stack; label marketplace demos as illustrative; soften industry copy that implied DEWEB-specific results.

---

## Findings by classification

### FABRICATED (removed)

| Location | Claim | Action |
|----------|-------|--------|
| `Floating3DPanels.tsx` | `+34% CVR`, `MRR +28%` | → Checkout UX, SaaS billing |
| `MarketplaceActivity.tsx` | `+34%`, `127 projects/week`, `↓ 12% avg savings` | → Illustrative workflow labels |
| `portfolio-data.ts` | `+34% sales`, `68%`, `500+ vendors`, `12 hours/week`, `2.4x leads` | → Qualitative outcomes |
| `about-data.ts` / `services-data.ts` | `500+`, `98%`, `50+`, `100%`, `$100M+` | → Capability pillars |
| `data.ts` | `98%`, `$100M+`, `240+ suppliers`, fake live bids/activity, `60%` cut | → Trust/process copy |
| `Hero.tsx` | `150+ projects`, `98% satisfaction` | → Service focus line |
| `HomepageHero.tsx` | `500+`, `98%` trust stats | → Non-numeric pillars |
| `ServiceBannerVisual.tsx` | `+24%`, `3.4%`, `65%`, `248`, `98%`, `+127%` | → Neutral UI labels |
| `WebSaasScene.tsx` | `MRR +32%`, `1,840 users` | → Dashboard copy |
| `LiveDashboard.tsx` | `save up to 18%`, `4 live bids` | → Illustrative demo labels |
| `FeaturedSuppliers.tsx` | Fake ratings, project counts, hourly rates | → Illustrative profile cards |
| `trustedCompanies` / `clientLogos` (as client logos) | Microsoft, Stripe, etc. as implied clients | → Technology stack framing |
| `en.json` (+ ru/es/am) `shopifySpotlight.stat2` | `36% conversion lift` | → Service capability line |
| `en.json` (+ ru/es/am) blog `body3` | `15–30% savings` | → Competitive comparison wording |

### UNVERIFIED (removed or reframed)

| Location | Claim | Action |
|----------|-------|--------|
| `ShopifySpotlight` stat1 | `10%+ US ecommerce on Shopify` | Reframed as platform context, not DEWEB result |
| `about` `techSubtitle` | “enterprise teams worldwide” | → “production projects” |
| `HomePortfolio` | “Real projects. Real results.” | → “Example project scenarios” (matches `demo: true`) |
| Marketplace demo sections | “Real-time”, “Live activity” | → “Example marketplace flow” |

### MARKETING_ONLY (retained with care)

| Location | Claim | Why retained |
|----------|-------|--------------|
| `conversion-data.ts` case studies | Qualitative outcomes, `demo: true` | Explicitly illustrative; no numeric claims |
| `conversion-data.ts` benefits | “Higher conversion rates”, “Hours saved” | Generic service outcomes, not fabricated statistics |
| `team-data.ts` | Founder & team roles | Identifiable leadership; LinkedIn → company page |
| `service-landing` pricing | “From $X” | Starting price ranges, not performance claims |
| `ShopifySpotlight.opportunityText` | Shopify platform scale (4.5M+ stores) | Third-party platform context; common industry framing |
| CSS/layout `%` values | Positioning only | Not business metrics |

### VERIFIED (retained)

| Location | Claim | Why verified |
|----------|-------|--------------|
| `team-data.ts` | Gagik Poghosyan, Founder & CEO | Consistent on-site leadership |
| `about-data.ts` technologies | Shopify, Next.js, OpenAI, etc. | Matches stated service stack |
| `conversion-data.ts` `trustSignals` | Process/tech capabilities | No numeric vanity metrics |
| Testimonial / scenario blocks | “Illustrative scenario” labels | Explicit non-testimonial disclosure (all locales) |
| `aboutServices` | Telegram bots, marketplace, SaaS | Aligns with live service routes |

---

## Products requested but not found

| Product | In codebase | Action |
|---------|-------------|--------|
| Exswaping | No | Not added — no verifiable URL/copy |
| Kobbopay | No | Not added — no verifiable URL/copy |
| DEX | No | Not added — no verifiable URL/copy |
| Telegram automation | Yes (services, landings, team skills) | Already represented in service catalog |

---

## Files changed (Phase 2–3)

- `src/components/ui/Floating3DPanels.tsx`
- `src/components/home/MarketplaceActivity.tsx`
- `src/components/home/LiveDashboard.tsx`
- `src/components/home/Hero.tsx`
- `src/components/home/StatsBar.tsx` (data source)
- `src/components/home/FeaturedSuppliers.tsx`
- `src/components/home/HomePortfolio.tsx`
- `src/components/homepage/HomepageHero.tsx`
- `src/components/cinematic/scenes/WebSaasScene.tsx`
- `src/components/services/ServiceBannerVisual.tsx`
- `src/lib/portfolio-data.ts`
- `src/lib/about-data.ts`
- `src/lib/services-data.ts`
- `src/lib/data.ts`
- `src/lib/social-proof-data.ts`
- `src/i18n/messages/en.json`
- `src/i18n/messages/ru.json`
- `src/i18n/messages/es.json`
- `src/i18n/messages/am.json`

---

## Validation commands

```bash
cd /var/www/deweb/web
npm run build
grep -R "34%" src
grep -R "52%" src
grep -R "500+" src
grep -R "1000+" src
```

**Note:** Layout CSS may still contain values like `52%` for positioning; these are not business claims.

---

## Risk reduction assessment

| Risk | Before | After |
|------|--------|-------|
| Fabricated conversion/revenue metrics | High | Low — removed from live UI |
| Fake client logo implication | High | Low — reframed as technology stack |
| Fake marketplace activity | Medium | Low — illustrative labeling |
| Misleading portfolio framing | Medium | Low — aligned with demo flag |
| Unverifiable aggregate stats (500+, 98%) | High | Low — replaced with capabilities |

---

## Verdict

**P5B_EEAT_HARDENING_PASS** — High-risk fabricated metrics and implied social proof removed from active surfaces; illustrative content labeled; no invented product claims added.

**Follow-up (optional):** Add verified case studies with client permission; publish Exswaping/Kobbopay/DEX only when URLs and ownership are confirmed.
