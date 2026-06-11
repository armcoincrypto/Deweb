# DEWEB Blog Automation

Automated AI blog draft generation for dewebam.com. Drafts are always saved as `pending_review` — **never auto-published**.

## Overview

```
Topic queue (SQLite)
       ↓
Cron script (generateBlogCron.js)
       ↓
OpenAI via blogAi.js
       ↓
Save as pending_review + admin email
       ↓
Admin approves/rejects at /en/admin/blog/pending
       ↓
Approve → scheduled (default 18:00 Asia/Yerevan) or publish immediately
       ↓
Publish cron at 18:00 → live on /blog
```

## Status flow

```
draft → pending_review → scheduled → published
                      ↘ immediate publish on approve
rejected (never publishes)
```

| Status | Meaning |
|--------|---------|
| `pending_review` | AI draft awaiting admin review |
| `scheduled` | Admin approved; waits for `scheduled_publish_at` |
| `published` | Live on /blog |
| `rejected` | Rejected; may re-queue for regeneration |

## Scheduled generation & publishing

**Default timezone:** `Asia/Yerevan` (`BLOG_TIMEZONE`)

| Job | Default time | Command |
|-----|--------------|---------|
| Generate AI draft | **10:00** daily | `npm run blog-cron` |
| Publish approved posts | **18:00** daily | `npm run blog-publish-cron` |

### Approval behavior

When admin clicks **Approve** (default):

- `status` → `scheduled`
- `approved_at` → now
- `scheduled_publish_at` → next **18:00** Armenia time (today if before 18:00, else tomorrow)
- **Does not publish immediately**

Options in approve modal:

1. **Default** — next 18:00 Asia/Yerevan (recommended)
2. **Custom** — pick date/time
3. **Publish immediately** — skips schedule, goes live now

Manual **Publish now** button still works for any non-published post.

### Production crontab (Armenia local server time)

```cron
# Generate one AI draft daily at 10:00
0 10 * * * cd /var/www/deweb/backend && /usr/bin/npm run blog-cron >> /var/log/deweb-blog-cron.log 2>&1

# Publish scheduled approved posts daily at 18:00
0 18 * * * cd /var/www/deweb/backend && /usr/bin/npm run blog-publish-cron >> /var/log/deweb-blog-publish-cron.log 2>&1
```

### Change schedule times

Set in `backend/.env`:

```env
BLOG_TIMEZONE=Asia/Yerevan
BLOG_GENERATE_HOUR=10
BLOG_PUBLISH_HOUR=18
BLOG_PUBLISH_MINUTE=0
```

Update server crontab hours to match. The approve modal default slot uses `BLOG_PUBLISH_HOUR`.

### Publish cron manual run

```bash
cd backend
npm run blog-publish-cron
```

Publishes posts where `status = scheduled` AND `scheduled_publish_at <= now` AND `published_at IS NULL`.

## Topic queue

Table: `blog_topic_queue`

| Field | Description |
|-------|-------------|
| `topic` | Article subject |
| `target_keyword` | SEO keyword |
| `category_id` | Blog category FK |
| `priority` | Higher = processed first |
| `status` | `queued`, `generating`, `done`, `failed` |
| `scheduled_for` | ISO datetime — cron only picks due items |
| `generated_post_id` | Links to created draft post |
| `last_error` | Error message on failure |

### Admin UI

**URL:** `/en/admin/blog/topic-queue`

- List all queue items
- Add / edit / delete topics
- Retry failed items (sets status back to `queued`)
- Open generated draft from post link

### API (admin auth required)

| Method | Path |
|--------|------|
| GET | `/api/admin/blog/topic-queue` |
| POST | `/api/admin/blog/topic-queue` |
| PUT | `/api/admin/blog/topic-queue/:id` |
| DELETE | `/api/admin/blog/topic-queue/:id` |
| POST | `/api/admin/blog/topic-queue/:id/retry` |

## Run cron manually

From the backend directory:

```bash
cd backend
npm run blog-cron
```

Or directly:

```bash
node scripts/generateBlogCron.js
```

**Behavior:**
1. Picks one row: `status = queued` AND `scheduled_for <= now`
2. Orders by `priority DESC`, `scheduled_for ASC`
3. Marks `generating`
4. Calls OpenAI via `generateBlogDraft()`
5. Saves post as `pending_review`
6. Marks queue item `done` with `generated_post_id`
7. Sends admin email: `[DEWEB] New AI blog draft ready for review`

Exit code `0` if nothing due or success; `1` on generation failure.

## Production cron (systemd timers)

See **Scheduled generation & publishing** above for recommended 10:00 generate + 18:00 publish times.

## Reject → regenerate flow

When an admin **rejects** an AI-generated post at `/en/admin/blog/pending`:

1. Post status → `rejected`
2. System finds original topic/keyword from `blog_topic_queue` or `blog_ai_generations`
3. Creates a **new** queue item:
   - Same topic + keyword
   - `status = queued`
   - `priority = previous + 10`
   - `last_error = REGENERATE_AFTER_REJECT` (internal marker)
4. Next cron run sends a special prompt to OpenAI:

   > The previous article was rejected by admin. Generate a completely new, stronger, more specific, more useful SEO article. Do not repeat the same structure or wording.

5. New draft appears in pending review — admin must approve/publish manually.

## Safety rules

- **No auto-publish from AI** — generation always creates `pending_review`
- **Publish cron only publishes `scheduled` posts** that admin approved
- **Rejected posts never publish**
- Manual AI generator (`/admin/blog/ai-generator`) unchanged; also sends admin email
- Manual generator rate limit: 5/hour per admin (cron bypasses HTTP rate limit)
- Static blog slugs in `RESERVED_BLOG_SLUGS` are never overwritten

## Environment

Required in `backend/.env`:

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
ADMIN_NOTIFY_EMAIL=your-admin@gmail.com
SMTP_USER=...
SMTP_PASS=...
```

Optional:

```env
SITE_URL=https://dewebam.com
```

## Quick start (local)

```bash
# 1. Start backend
cd backend && npm run dev

# 2. Generate fresh SEO topics (5–10 ideas → topic queue)
npm run blog-topics

# 3. Or add a topic manually in admin UI
# http://localhost:8001/en/admin/blog/topic-queue

# 4. Run cron (one article per run)
npm run blog-cron

# 5. Review draft
# http://localhost:8001/en/admin/blog/pending
```

## Smart SEO Growth Engine (Phase 3–7)

| Feature | Command / location |
|---------|-------------------|
| Fresh topic ideas | `npm run blog-topics` |
| Article generation | `npm run blog-cron` |
| Quality scoring | Auto — `ai_meta.qualityScore` (improves once if &lt; 75) |
| Featured images | Auto — `OPENAI_IMAGE_MODEL=gpt-image-1` |
| Social drafts | Stored in `ai_meta` — LinkedIn, Facebook, X, Instagram |

### Environment

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_IMAGE_MODEL=gpt-image-1
```
