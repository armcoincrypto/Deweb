# P9.1 Production Truth Audit

**Date:** 2026-06-29  
**Auditor scope:** Homepage, About, Services, Portfolio, GitHub docs  
**Production URL:** https://dewebam.com  
**Branch:** `main`  
**Baseline:** Build PASS · Lint PASS (post-cleanup)

---

## Executive summary

A skeptical, evidence-first review of public DEWEB claims found **no fake metrics, fake testimonials, fake awards, or fake partnerships** on live-rendered surfaces after cleanup. The highest-risk issues were:

1. **Live `/en/services` stats** fed by `backend/src/data/services-page.json` (`500+`, `98%`, etc.) — **removed**
2. **Unverifiable team profiles** (partial names, company LinkedIn masquerading as personal profiles) — **removed**
3. **“Verified” supplier/expert language** without published vetting criteria — **reworded**
4. **Superiority / default-platform vision copy** — **reworded**

Portfolio case studies are supported by on-site pages and `docs/projects/*` architecture notes. External production URLs were spot-checked where discoverable; the site does not publish inflated third-party deployment claims.

---

## Truth audit search (post-cleanup)

Targeted searches across `web/src` and `backend/src/data`:

| Pattern | Result |
|---------|--------|
| `500+` / `98%` | **0** in application source |
| `Elite` / `Shopify Experts` (unverified) | **0** |
| `verified DEWEB` / `verified suppliers` / `verified talent` | **0** in `web/src` |
| `industry-leading` / `world-class` / `award-winning` / `top agency` | **0** |
| `guaranteed growth` / `guaranteed outcomes` (marketing) | **0** (only negated disclaimers remain) |
| Fake testimonials | **0** — homepage scenarios explicitly labeled non-testimonial |

Blog article **titles** may contain editorial phrases (e.g. “Best Shopify Apps”) — acceptable as guide headlines, not site authority claims.

---

## Findings & remediation

### HIGH — fixed

| Area | Finding | Action |
|------|---------|--------|
| Services API | `stats`: 500+, 98%, 20+ countries, 50+ experts, 24/7 | Replaced with capability labels (🛠 Production delivery, etc.) |
| Services hero | “Elite Digital Solutions”, “Shopify Experts”, “Increase Conversions Up To 35%” | Reworded to factual service positioning |
| About team | Harut / Aram partial identities + unverifiable years | Removed; About shows **Gagik Poghosyan (Founder)** only |
| Service detail | Fake “Your expert” individuals | Replaced with **DEWEB delivery team** contact card |
| About mission/vision | “verified talent”, “default platform worldwide” | Reworded to marketplace discovery / transparent platform |
| Service landings | “Verified experts, transparent delivery…” | Reworded |
| Legal privacy intro | “verified developers” | Reworded to “developers” |
| SEO metadata | “verified DEWEB developers” in fallbacks | Reworded |

### MEDIUM — fixed

| Area | Finding | Action |
|------|---------|--------|
| `service-banners-data.ts` | “Verified talent”, “Higher rankings”, “High-converting stores” | Softened to marketplace / SEO-structure language |
| `about-data.ts` | “Verified suppliers”, “High-converting Shopify” | Reworded |
| `conversion-data.ts` | Demo case results read as past-tense client outcomes | Prefixed with **“Example outcome:”** |
| `HomePortfolio.tsx` | “Case Studies” without demo emphasis | Heading → “Illustrative project examples” |
| `ServicesView.tsx` | “measurable business growth” | → “maintainable delivery” |
| i18n EN/ES/RU/AM | About team / mission / vision / verified strings | Localized rewording applied |

### LOW — accepted / documented

| Area | Notes |
|------|-------|
| Homepage `home.*` dormant strings | Many marketplace strings not rendered by `CinematicHome`; cleaned where high-risk |
| AM locale body copy | Mixed English in long-form marketplace blocks — UI copy debt, not SEO meta |
| Blog “Expert guides” | Editorial category label, not certification |
| `serviceDetail.yourExpert` key | Label retained; content now shows delivery team, not named individuals |
| Pricing “From $X” | Planning estimates with discovery disclaimers elsewhere — not guarantees |

---

## Section verdicts

### Homepage (`/en`, `/es`, `/ru`, `/am`)

**PASS**

Live stack: `CinematicHome` → pinned services, `SocialProof` (labeled example scenarios), `HomePortfolio` (demo badges + example outcomes).

- No fake metrics on rendered sections
- No client testimonials presented as real
- Social proof uses tech stack tags, not fake client logos
- Shopify partner badge removed in prior P8.2 pass

### About (`/en/about` + locales)

**PASS**

- Founder-only team section (verifiable public name)
- Mission/vision no longer claim market dominance or unverifiable “verified talent”
- Process step no longer says “Verified suppliers”
- Capability stats use emoji labels, not numeric inflation

### Services (`/en/services` + service detail)

**PASS**

- API `/api/services/page` returns capability labels, not fake counters
- Hero and featured highlights no longer promise conversion percentages
- Service banners softened ranking/revenue implication language
- Service detail expert card is generic delivery team

### Portfolio (`/projects/*`)

**PASS**

| Project | Portfolio page | GitHub doc | Architecture claims | External URL check |
|---------|----------------|------------|---------------------|-------------------|
| Kobbopay | ✅ 200 | ✅ `kobbopay-architecture.md` | Multi-rail USDT, NestJS, treasury — documented | No public URL claimed on site; `kobbopay.com` did not respond in audit curl |
| Exswaping | ✅ 200 | ✅ `exswaping-architecture.md` | Exchange workflows, admin ops, SEO engineering | `exswaping.com` → 302 (live redirect) |
| Changetext | ✅ 200 | ✅ `changetext-case-study.md` | Telegram + OpenAI + Sheets automation | `changetext.com` → 200 |
| DEX Kobbex | ✅ 200 | ✅ `dex-kobbex-architecture.md` | Web3 swap UI, wallet flows — no volume claims | `dex.kobbex.com` → 200 |

Project copy explicitly avoids fabricated metrics, ranking guarantees, and trading volume claims.

### GitHub documentation (`README.md`, `docs/projects/*`)

**PASS**

- README portfolio table links to case studies + architecture docs only
- No customer counts, volume claims, or partnership badges in project docs
- Engineering focus: stack, architecture, lessons learned

---

## Evidence matrix

| Claim type | Evidence required | Status |
|------------|-------------------|--------|
| Portfolio projects | On-site case study + architecture doc | ✅ 4/4 |
| Team identity | Verifiable public profile | ✅ Founder only |
| Service outcomes | Scoped capabilities, not guarantees | ✅ |
| Marketplace suppliers | Platform mechanics, not “verified” without criteria | ✅ |
| Shopify partnership | Official partner status | ✅ Removed (P8.2) |
| Client metrics | Documented deployments | ✅ None published |

---

## Validation

```bash
cd /var/www/deweb/web
npm run build   # PASS
npm run lint    # PASS

# Post-deploy API check
curl -s http://localhost:3000/api/services/page | jq '.stats'
# → capability emoji labels, no 500+/98%

# Grep (web/src)
# verified DEWEB / Elite / 500+ / 98% → 0 matches
```

Services restarted: `deweb-api`, `deweb-next`.

---

## Remaining risks

| Risk | Level | Notes |
|------|-------|-------|
| Google SERP lag | LOW | Old snippets may persist until recrawl |
| AM mixed-language UI | LOW | Body copy debt; SEO meta Armenian |
| Blog editorial titles (“Best …”) | LOW | Guide headlines, not site E-E-A-T claims |
| Kobbopay external URL | LOW | Not marketed on site; optional future doc link if stable |
| Marketplace escrow mechanics | LOW | Described as platform feature; functional proof is operational, not marketing |
| Dependency CVEs | LOW (dev) | Documented in P8.2 `DEPENDENCY_AUDIT_REPORT.md` |

---

## Final verdict

```text
P9.1_PRODUCTION_TRUTH_AUDIT

PASS

Homepage:
PASS

About:
PASS

Services:
PASS

Portfolio:
PASS

GitHub Docs:
PASS

Truthfulness:
PASS

Evidence Coverage:
PASS

Risk Level:
LOW

READY FOR:
P9.2 ENTITY AUTHORITY BUILDING
```

---

## Files changed (cleanup)

- `backend/src/data/services-page.json`
- `web/src/lib/services-data.ts`
- `web/src/lib/team-data.ts`
- `web/src/lib/about-data.ts`
- `web/src/lib/service-banners-data.ts`
- `web/src/lib/conversion-data.ts`
- `web/src/lib/seo-metadata.ts`
- `web/src/lib/legal-content.ts`
- `web/src/components/about/AboutView.tsx`
- `web/src/components/services/ServicesView.tsx`
- `web/src/components/home/HomePortfolio.tsx`
- `web/src/components/seo/ServiceLandingView.tsx`
- `web/src/components/admin/blog/AdminBlogEditor.tsx`
- `web/src/lib/blog/{server.ts,cms.ts,admin-utils.ts}`
- `web/src/i18n/messages/{en,es,ru,am}.json`
