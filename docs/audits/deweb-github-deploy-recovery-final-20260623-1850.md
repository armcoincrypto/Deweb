# Deweb GitHub Deploy Recovery Final Report

**Date:** 2026-06-23 18:50 CEST  
**Project:** `/var/www/deweb`  
**Production:** https://dewebam.com

---

## Executive Verdict

**`DEPLOYMENT_READY_AUTH_MANUAL_STEP_REQUIRED`**

Production is live and healthy. Three local commits are ready to push. Build, nginx, and live smoke tests pass. **Push and `git pull` deploy are blocked until a GitHub deploy key is added** (instructions below). Working tree remains intentionally dirty with WIP UI experiments (documented, non-blocking for build).

---

## Root Cause

GitHub remote access failed due to **missing server-side authentication**, not a wrong repository URL.

| Check | Result |
|-------|--------|
| Configured remote | `https://github.com/gagpoghosyan99/deweb-community.git` → converted to SSH |
| Repo URL in README / deploy scripts | Same URL — **consistent** |
| Unauthenticated GitHub web | HTTP 404 (consistent with **private repo** or no public access) |
| HTTPS `git ls-remote` | `fatal: could not read Username for 'https://github.com': No such device or address` |
| SSH before deploy key | `Permission denied (publickey)` |
| Credential helpers | None configured (global or local) |
| Prior user error | `Repository not found` + `Authentication failed` — typical for private repo without token/key |

**Conclusion:** The repository URL is correct per project docs and existing `origin/main` history (`8bd8559`). The server has no HTTPS credentials and had no GitHub SSH key. A deploy key was generated; **human action required** to register it on GitHub.

---

## What Was Fixed

1. **Full backups** — tree tar + git bundle under `/var/backups/deweb/`
2. **Remote converted to SSH** — `git@github-deweb:gagpoghosyan99/deweb-community.git`
3. **Deploy key generated** — `~/.ssh/deweb_github_ed25519` + SSH config host `github-deweb`
4. **Working tree classified** — see `docs/audits/deweb-working-tree-cleanup-20260623-1849.md`
5. **Stale duplicates archived** — copies in `docs/archive/stale-utils/` (originals not deleted)
6. **Build validated** from correct path `/var/www/deweb/web`
7. **Docs committed** — deployment audits + updated runbook
8. **Services not restarted** — live site already healthy; validation passed without restart

---

## Git Remote Status

```
origin  git@github-deweb:gagpoghosyan99/deweb-community.git (fetch)
origin  git@github-deweb:gagpoghosyan99/deweb-community.git (push)
```

```
main @ 91ce55a [origin/main: ahead 3]
```

| Local commit | Message |
|--------------|---------|
| `91ce55a` | docs: record deweb deployment and git recovery audits |
| `16cc14a` | fix: resolve deweb seo p0 technical blockers |
| `acfeed7` | fix: stabilize deweb production safety and deployment state |

**Remote sync:** `git ls-remote origin` → **FAIL** (deploy key not yet on GitHub)  
**Push:** **NOT attempted** (blocked by auth policy)

---

## GitHub Auth Status

### Deploy key (public — safe to share)

Add this key to GitHub → **gagpoghosyan99/deweb-community** → Settings → Deploy keys → **Add deploy key**:

- Title: `deweb-production-deploy-key`
- Key:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPDnKPPAULLah184s8qjUBSt298ogBts2JEKPrhTOkbs deweb-production-deploy-key
```

- **Enable “Allow write access”** (required for `git push`)

### After you add the key, run on the server:

```bash
ssh -T git@github-deweb
git ls-remote origin
cd /var/www/deweb && git push origin main
```

Expected: SSH greeting mentioning the repo; `ls-remote` lists refs; push updates `origin/main`.

---

## Working Tree Status

**53 modified/untracked entries remain** (intentional).

| Category | Handling |
|----------|----------|
| WIP 3D/homepage/premium/animations | Untracked; excluded from tsconfig; build passes |
| i18n JSON + components | Modified; defer to separate PR |
| `web/package.json` Three.js deps | WIP only — **not committed** |
| Stale `backend/src/utils/auth.js`, `loadEnv.js` | Untracked duplicates; archived copies committed |
| nginx config delta | Modified; live config OK; defer commit until reviewed |

See: `docs/audits/deweb-working-tree-cleanup-20260623-1849.md`

---

## Commits Created (this recovery)

| SHA | Message |
|-----|---------|
| `91ce55a` | docs: record deweb deployment and git recovery audits |

(Prior session commits `acfeed7`, `16cc14a` included in push queue.)

---

## Files Committed (91ce55a)

- `docs/audits/deweb-deployment-seo-p0-fix-20260623-1837.md`
- `docs/audits/deweb-working-tree-cleanup-20260623-1849.md`
- `docs/runbooks/deweb-safe-deployment.md`
- `docs/archive/stale-utils/auth.js.untracked-copy`
- `docs/archive/stale-utils/loadEnv.js.untracked-copy`

---

## Files Stashed or Archived

| Action | Paths |
|--------|-------|
| **Archived (copied)** | `backend/src/utils/auth.js` → `docs/archive/stale-utils/auth.js.untracked-copy` |
| **Archived (copied)** | `backend/src/utils/loadEnv.js` → `docs/archive/stale-utils/loadEnv.js.untracked-copy` |
| **Stash** | None — WIP left untracked (build-independent) |

---

## Build Results

```bash
cd /var/www/deweb/web && npm run build   → PASS (exit 0)
cd /var/www/deweb/web && npm run lint    → PASS (warnings only)
cd /var/www/deweb/backend && node --check src/index.js → PASS
find backend/src -name "*.js" | xargs node --check      → PASS
```

---

## Nginx Results

```
nginx -t → syntax ok, test successful
```

(Warnings about redefined protocol options on :443 — pre-existing, non-blocking.)

---

## Live Smoke Results

```
health: 200
home: 200
blog fake: 404
service fake: 404
```

---

## Correct Future Deploy Command

```bash
cd /var/www/deweb
git pull origin main

cd /var/www/deweb/web
npm ci
npm run build

nginx -t

sudo systemctl restart deweb-api
sudo systemctl restart deweb-next

curl -s -o /dev/null -w "health: %{http_code}\n" https://dewebam.com/api/health
curl -s -o /dev/null -w "home: %{http_code}\n" https://dewebam.com/en
```

Full runbook: `docs/runbooks/deweb-safe-deployment.md`

---

## Phase 8 — Deployment Test

**Skipped** — push blocked until deploy key is registered. After `git push origin main` succeeds, run:

```bash
cd /var/www/deweb && git pull origin main
cd /var/www/deweb/web && npm run build
nginx -t
sudo systemctl restart deweb-api deweb-next
# re-run live smoke tests
```

---

## Backups

| File | Size |
|------|------|
| `/var/backups/deweb/deweb-before-git-recovery-20260623-184711.tar.gz` | 37M |
| `/var/backups/deweb/deweb-local-git-20260623-184711.bundle` | 9.7M |
| `/var/backups/deweb/deweb-before-deploy-seo-p0-20260623-182715.tar.gz` | (prior session) |

---

## Remaining Risks

1. **Auto-deploy cron** — `deploy/auto-deploy.sh` runs `git pull` every minute; will fail until push succeeds and tree is clean enough for pull.
2. **Dirty working tree** — 53 local changes may conflict with future pulls; triage WIP into branches.
3. **Deploy key custody** — key lives on production server; rotate if compromised.
4. **nginx config drift** — modified `deploy/nginx-deweb-production.conf` not committed/applied.
5. **Cookie-policy i18n** — build-time `{date}` FORMATTING_ERROR warnings (non-fatal).

---

## Next Priority

1. **You:** Add deploy key to GitHub (public key above) with write access → confirm when done.
2. **Server:** `git push origin main` (3 commits).
3. **Verify:** `git pull origin main` + `deploy/update.sh` dry run.
4. **Triage:** i18n/component WIP into feature branch; keep production tree clean.
5. **Optional:** Commit nginx production config after diff review + controlled reload.

---

*Related: `docs/audits/deweb-working-tree-cleanup-20260623-1849.md`, `docs/audits/deweb-deployment-seo-p0-fix-20260623-1837.md`*
