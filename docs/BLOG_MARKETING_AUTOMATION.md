# DEWEB Blog Marketing Automation (Phases 8–12)

Extends the blog automation pipeline with social drafts, GSC-ready analytics, internal linking, trend intelligence, and translation preparation.

**Safety rules (always):**
- No social auto-posting
- No translation auto-publishing
- AI articles still require admin approval
- Publish cron only publishes approved scheduled posts
- Tracking privacy unchanged (hashed IP only)

---

## Phase 8 — Social Media Distribution Center

When a blog post becomes **published**, social drafts are created in `blog_social_posts` (idempotent per platform).

| Platform | Content |
|----------|---------|
| LinkedIn | Post + blog URL + DEWEB CTA |
| Facebook | Excerpt + URL + CTA |
| X | Thread with article link |
| Instagram | Caption + hashtags + URL |

**Triggers:**
- `npm run blog-publish-cron` (after each scheduled publish)
- Admin immediate approve / manual publish
- `npm run blog-social-cron` (backfill published posts missing drafts)

**Admin UI:** `/en/admin/blog/social`

- Filter by platform / status
- Copy, edit, approve, reject
- Linked article URL

**Cron (optional, 15 min after publish):**
```cron
15 18 * * * cd /var/www/deweb/backend && /usr/bin/npm run blog-social-cron >> /var/log/deweb-blog-social-cron.log 2>&1
```

---

## Phase 9 — Google Search Console

**Table:** `blog_search_console_daily`

**Env:**
```env
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://dewebam.com
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

If credentials are missing, admin shows **Not connected** — no crashes.

**Admin UI:** GSC panel on `/en/admin/blog/analytics` and per-post analytics.

API sync from Google is structured but not required; import rows into `blog_search_console_daily` for reporting.

---

## Phase 10 — Automatic Internal Linking

Service: `backend/src/services/blogInternalLinks.js`

Runs during AI generation pipeline before `pending_review`:
- Category → service page (Shopify, AI, SaaS, Marketplace, Web Dev)
- Contact CTA link
- Related blog articles by category/keyword
- Max **6 links**, no duplicate URLs

Saved to `content.internalLinks` and `ai_meta.internalLinks`.

**Admin preview** shows detected internal links.

---

## Phase 11 — Trend Intelligence

`npm run blog-topics` uses **trend intelligence mode** in OpenAI prompts.

Each queued topic stores in `blog_topic_queue.topic_meta`:
- `trendType`: evergreen | trending | buyer_intent | competitor_gap
- `urgencyScore`: 1–10
- `expectedLeadValue`: low | medium | high
- `recommendedService`: shopify-development | ai-automation | etc.

**Admin:** Topic queue table shows these fields.

---

## Phase 12 — Multi-language Publishing (preparation)

**Table:** `blog_post_translations` (locales: `ru`, `am`, `es`)

**Workflow:**
1. English article is **published**
2. Admin opens preview → **Translations** tab
3. Click **Generate translations** (OpenAI)
4. Translations saved as `pending_review`
5. Admin approves / rejects / publishes manually later

**No auto-publish** of translations. Public locale routing can be wired in a future phase.

---

## NPM scripts

| Script | Purpose |
|--------|---------|
| `npm run blog-cron` | Generate 1 AI draft (pending_review) |
| `npm run blog-publish-cron` | Publish scheduled posts + social drafts |
| `npm run blog-social-cron` | Backfill social drafts |
| `npm run blog-topics` | Fresh topics with trend intelligence |
| `npm run test:blog-analytics` | Analytics smoke test |

---

## API routes (admin)

| Route | Purpose |
|-------|---------|
| `GET /api/admin/blog/social` | List social drafts |
| `PATCH /api/admin/blog/social/:id` | Edit / approve / reject |
| `POST /api/admin/blog/social/generate/:postId` | Force generate for post |
| `GET /api/admin/blog/:id/translations` | List translations |
| `POST /api/admin/blog/:id/translations/generate` | AI translate RU/AM/ES |
| `PATCH /api/admin/blog/translations/:id` | Update translation status |

---

## Related docs

- [BLOG_AUTOMATION.md](./BLOG_AUTOMATION.md) — generation, approval, publish cron
- [BLOG_ANALYTICS.md](./BLOG_ANALYTICS.md) — views, events, lead attribution
