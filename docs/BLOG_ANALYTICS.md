# DEWEB Blog Analytics & Lead Tracking

Track which blog posts drive traffic, engagement, and leads — without storing raw IP addresses.

## Overview

| Layer | What it does |
|-------|----------------|
| **Frontend** (`web/src/lib/blog/tracking.ts`) | Creates `visitor_id` in localStorage, sends view/event beacons, stores `last_blog_slug` |
| **Public API** | `POST /api/blog/track-view`, `POST /api/blog/track-event` |
| **SQLite** | `blog_post_views`, `blog_post_events`, `blog_lead_attribution` |
| **Lead forms** | Contact, leads, and service inquiry forms attach attribution when a blog slug exists |
| **Admin** | `/en/admin/blog/analytics` and per-post detail pages |

## How tracking works

1. A visitor opens a blog article (`BlogArticleView`).
2. The client ensures a persistent `deweb_visitor_id` in `localStorage`.
3. On load, `track-view` is called (fire-and-forget). The slug is saved as `deweb_last_blog_slug`.
4. Scroll milestones (50%, 90%), CTA clicks, service links, and contact buttons send `track-event`.
5. If the visitor later submits a contact/lead/offer form, the form includes:
   - `visitorId`
   - `lastBlogSlug` (if they read a blog post)
   - UTM params (captured from URL on first visit)
   - `referrer` and `landingPage`
6. The backend writes `blog_lead_attribution` only when `lastBlogSlug` is present.

Tracking uses `fetch` with `keepalive: true` and swallows errors — **a failed API call never breaks the page**.

### View deduplication

The same `visitor_id` + `slug` within **30 minutes** does not create a duplicate view row.

### Event types

- `blog_view` — recorded with each new view
- `cta_click` — primary/secondary CTA buttons
- `contact_click` — CTA linking to `/contact`
- `service_link_click` — internal service links in the article sidebar
- `social_share_click` — reserved for future share buttons
- `scroll_50` / `scroll_90` — scroll depth milestones

## Privacy: no raw IP

Client IPs are **never stored**. The backend hashes the IP with SHA-256:

```
sha256(IP_HASH_SALT + ":" + ip)
```

Set `IP_HASH_SALT` in `backend/.env` in production. Falls back to `JWT_SECRET` or a static default.

Only the hash, user-agent, referrer, and anonymized `visitor_id` are persisted.

## Lead attribution

Attribution runs in:

- `POST /api/contact`
- `POST /api/leads`
- `POST /api/offers`

If the request body has no `lastBlogSlug` / `last_blog_slug`, **nothing is written** to `blog_lead_attribution`.

When present, a row links the lead to the blog post slug (and `post_id` when the slug matches a CMS post).

## Reading analytics (admin)

**Dashboard cards** — `/en/admin/blog`  
Total views, total leads, best converting article, articles published this month.

**Analytics overview** — `/en/admin/blog/analytics`  
Table per CMS article: views, CTA clicks, leads, conversion rate, published date, status.  
Also shows top referrers and top keywords/topics.

**Single post** — `/en/admin/blog/analytics/[id]`  
Views over time, event breakdown, attributed leads, referrers, UTM campaigns, quality score, buyer stage, target keyword.

Admin routes require authentication (`requireAdmin`).

## Test locally

### 1. Start backend and web

```bash
cd deweb/backend && npm run dev
cd deweb/web && npm run dev
```

### 2. Track a view manually

```bash
curl -s -X POST http://localhost:3000/api/blog/track-view \
  -H "Content-Type: application/json" \
  -d '{"slug":"your-article-slug","visitorId":"test-visitor-1","locale":"en"}'
```

### 3. Track an event

```bash
curl -s -X POST http://localhost:3000/api/blog/track-event \
  -H "Content-Type: application/json" \
  -d '{"slug":"your-article-slug","visitorId":"test-visitor-1","eventType":"cta_click","eventData":{"href":"/contact"}}'
```

### 4. Simulate lead attribution

```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","message":"Hello","lastBlogSlug":"your-article-slug","visitorId":"test-visitor-1"}'
```

### 5. Check admin analytics

Log in as admin → `/en/admin/blog/analytics`.

### Automated smoke test

```bash
cd deweb/backend && node scripts/testBlogAnalytics.js
```

## Deploy

```bash
git add -A && git commit -m "Add blog analytics and lead tracking"
git push
ssh deweb "bash /var/www/deweb/deploy/update.sh"
```

No extra cron jobs required. Tables are created automatically on backend startup via `db.js` migrations.

## Related docs

- [BLOG_AUTOMATION.md](./BLOG_AUTOMATION.md) — AI generation, approval, and publishing schedule
