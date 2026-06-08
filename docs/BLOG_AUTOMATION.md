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
```

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

## Production cron (systemd timer)

Create `/etc/systemd/system/deweb-blog-cron.service`:

```ini
[Unit]
Description=DEWEB blog AI draft generator
After=network.target

[Service]
Type=oneshot
User=www-data
WorkingDirectory=/var/www/deweb/backend
Environment=NODE_ENV=production
ExecStart=/usr/bin/node scripts/generateBlogCron.js
```

Create `/etc/systemd/system/deweb-blog-cron.timer`:

```ini
[Unit]
Description=Run DEWEB blog cron twice daily

[Timer]
OnCalendar=*-*-* 06,18:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

Enable:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now deweb-blog-cron.timer
sudo systemctl list-timers | grep deweb-blog
```

## Alternative: crontab

```cron
0 6,18 * * * cd /var/www/deweb/backend && /usr/bin/node scripts/generateBlogCron.js >> /var/log/deweb-blog-cron.log 2>&1
```

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

- **No auto-publish** — all AI output is `pending_review`
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

# 2. Add a topic (admin UI or API)
# Visit http://localhost:8001/en/admin/blog/topic-queue

# 3. Run cron
npm run blog-cron

# 4. Review draft
# http://localhost:8001/en/admin/blog/pending
```
