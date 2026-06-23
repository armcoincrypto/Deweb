# Deweb Safe Deployment Runbook

**Project:** `/var/www/deweb`  
**Production:** `https://dewebam.com`  
**Last updated:** 2026-06-23

Use this runbook for all production deployments. **Never** use `git reset --hard` on the server.

---

## Prerequisites

- SSH access to the VPS (`deweb` alias or `root@95.111.233.120`)
- GitHub credentials configured for push (local dev machine) or SSH deploy key (server)
- Services: `deweb-api`, `deweb-next`, `nginx`

---

## 0. Pre-flight checks

Run on the server before any deploy:

```bash
cd /var/www/deweb

# Working tree must be clean OR intentionally stashed
git status --short

# Confirm branch and remote alignment
git fetch origin main
git rev-parse HEAD
git rev-parse origin/main

# Services healthy
systemctl is-active deweb-api deweb-next nginx

# Quick smoke
curl -sf http://127.0.0.1:3000/api/health
curl -sf -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3001/en
```

**Stop if:**
- `git status` shows unexpected modifications you did not intend to deploy
- `HEAD` is behind `origin/main` and you have local uncommitted changes (resolve first — see § Rollback & recovery)
- Health checks fail before deploy

---

## 1. Backup (mandatory)

```bash
BACKUP="/var/backups/deweb-pre-deploy-$(date -u +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP"

# Git state snapshot
cd /var/www/deweb
git rev-parse HEAD > "$BACKUP/git-head.txt"
git status --short > "$BACKUP/git-status.txt"
git diff > "$BACKUP/git-diff.patch" 2>/dev/null || true

# Database (if present)
cp -a backend/data/deweb.sqlite "$BACKUP/deweb.sqlite" 2>/dev/null || true

# Optional: full tree archive (large)
tar -czf "$BACKUP/deweb-tree.tar.gz" \
  --exclude='./web/node_modules' \
  --exclude='./web/.next' \
  --exclude='./backend/node_modules' \
  -C /var/www deweb

echo "Backup saved to $BACKUP"
ls -lh "$BACKUP"
```

---

## 2. Pull changes

### Option A — Standard deploy (clean tree)

```bash
cd /var/www/deweb
git fetch origin main
git pull origin main
```

### Option B — Server has local commits to keep

```bash
cd /var/www/deweb
git fetch origin main

# If behind remote with local commits:
git pull --rebase origin main

# If pull fails due to uncommitted changes, stash first (preserves work):
git stash push -u -m "pre-deploy-$(date -u +%Y%m%d-%H%M%S)"
git pull origin main
# After deploy validation, restore: git stash pop
```

### Option C — Deploy from local machine (recommended)

```bash
# On your dev machine (after commit + push):
./deploy/push-and-deploy.sh

# Or with commit message:
./deploy/push-and-deploy.sh "fix: describe change"
```

**Never run:** `git reset --hard`

---

## 3. Build

### Backend (no compile step)

```bash
cd /var/www/deweb/backend
npm install --omit=dev
node --check src/index.js
```

### Frontend

```bash
cd /var/www/deweb/web
export NEXT_PUBLIC_LEGACY_URL="https://dewebam.com"
npm install
npm run favicons
npm run build
```

**Build must exit 0 before restarting services.**

```bash
# Verify build output exists
test -d /var/www/deweb/web/.next && echo "Next.js build OK"
```

---

## 4. Validate (before restart)

```bash
cd /var/www/deweb

# Frontend
cd web && npm run lint || true

# nginx config (if changed)
nginx -t

# Backend syntax
cd ../backend
for f in src/index.js src/routes/*.js; do node --check "$f"; done
```

---

## 5. Restart API

```bash
sudo systemctl restart deweb-api
sleep 3
systemctl is-active deweb-api
curl -sf http://127.0.0.1:3000/api/health | jq .
```

Expected:

```json
{"ok":true,"service":"deweb-backend","version":"3.0"}
```

---

## 6. Restart frontend

```bash
sudo systemctl restart deweb-next
sleep 5
systemctl is-active deweb-next
curl -sf -o /dev/null -w "homepage: %{http_code}\n" http://127.0.0.1:3001/en
```

Expected: `homepage: 200`

---

## 7. Reload nginx (if config changed)

```bash
# Only if deploy/nginx-deweb-production.conf was updated:
sudo cp /var/www/deweb/deploy/nginx-deweb-production.conf /etc/nginx/sites-available/deweb
sudo nginx -t && sudo systemctl reload nginx
```

---

## 8. Smoke tests

Run all — any failure triggers rollback investigation (§9).

```bash
# Local (via services)
curl -sf http://127.0.0.1:3000/api/health
curl -sf -o /dev/null -w "services/page: %{http_code}\n" http://127.0.0.1:3000/api/services/page
curl -sf -o /dev/null -w "wallet/me: %{http_code}\n" http://127.0.0.1:3000/api/wallet/me
curl -sf -o /dev/null -w "test-ai: %{http_code}\n" http://127.0.0.1:3000/api/test-ai

# Public (via nginx + SSL)
curl -sfI https://dewebam.com/en | head -3
curl -sfI https://dewebam.com/api/health | head -3
curl -sfI https://dewebam.com/api/services/page | head -3
curl -sfI https://dewebam.com/en/marketplace | head -3
curl -sfI https://dewebam.com/en/blog | head -3
```

### Expected results (post-P0)

| Endpoint | Expected |
|----------|----------|
| `/api/health` | 200 |
| `/api/services/page` | 200 |
| `/api/wallet/me` (no auth) | 401 |
| `/api/test-ai` | 404 |
| `/en` | 200 |

### Log check

```bash
journalctl -u deweb-api -n 30 --no-pager
journalctl -u deweb-next -n 30 --no-pager
tail -20 /var/log/deweb-auto-deploy.log
```

---

## 9. Rollback

### If deploy fails after git pull (code issue)

```bash
cd /var/www/deweb
BACKUP=$(ls -td /var/backups/deweb-pre-deploy-* 2>/dev/null | head -1)

# Restore previous commit
git checkout "$(cat "$BACKUP/git-head.txt")"

# Rebuild + restart
cd backend && npm install --omit=dev
sudo systemctl restart deweb-api

cd ../web && npm install && npm run build
sudo systemctl restart deweb-next

# Verify
curl -sf http://127.0.0.1:3000/api/health
```

### If deploy fails after restart (service issue)

```bash
# Check logs first
journalctl -u deweb-api -n 50 --no-pager
journalctl -u deweb-next -n 50 --no-pager

# Restore database if corrupted (last resort)
BACKUP=$(ls -td /var/backups/deweb-pre-deploy-* 2>/dev/null | head -1)
cp -a "$BACKUP/deweb.sqlite" /var/www/deweb/backend/data/deweb.sqlite
sudo systemctl restart deweb-api
```

### If stash was used during deploy

```bash
cd /var/www/deweb
git stash list
git stash show -p stash@{0}   # review before applying
git stash pop                   # only after deploy is stable
```

**Never:** `git reset --hard`, `git clean -fd` without backup

---

## 10. Full automated deploy script

The canonical server script (used by cron and GitHub Actions):

```bash
bash /var/www/deweb/deploy/update.sh
```

Contents summary:
1. `git pull origin main`
2. Backend `npm install --omit=dev` + restart API
3. Frontend `npm install` + `npm run favicons` + `npm run build` + restart Next
4. Copy nginx config + reload
5. Health curl checks

**Known failure:** Step 1 fails when working tree has uncommitted changes that overlap incoming commits. Fix git state before relying on auto-deploy.

---

## 11. Auto-deploy cron

Current crontab entry:

```
* * * * * bash /var/www/deweb/deploy/auto-deploy.sh
```

**Recommendation:** Change to every 5 minutes after git hygiene is restored:

```bash
# After approval:
(crontab -l 2>/dev/null | grep -v "deploy/auto-deploy.sh"; \
 echo "*/5 * * * * bash /var/www/deweb/deploy/auto-deploy.sh") | crontab -
```

---

## 12. Deployment checklist

```
[ ] Backup created in /var/backups/deweb-pre-deploy-*
[ ] git status clean or stash documented
[ ] git pull succeeded
[ ] npm run build passed (web)
[ ] node --check passed (backend)
[ ] nginx -t passed (if config changed)
[ ] deweb-api restarted and healthy
[ ] deweb-next restarted and healthy
[ ] Smoke tests passed (§8)
[ ] No new errors in journalctl
```

---

## Quick reference

| Action | Command |
|--------|---------|
| Deploy (server) | `bash /var/www/deweb/deploy/update.sh` |
| Deploy (local push) | `./deploy/push-and-deploy.sh "message"` |
| API logs | `journalctl -u deweb-api -f` |
| Next logs | `journalctl -u deweb-next -f` |
| API restart | `sudo systemctl restart deweb-api` |
| Next restart | `sudo systemctl restart deweb-next` |
| Health | `curl -s http://127.0.0.1:3000/api/health` |

---

*See also: `docs/audits/deweb-git-state-investigation.md`*
