#!/bin/bash
# Push local commits to GitHub, then deploy on the VPS.
# Usage:
#   ./deploy/push-and-deploy.sh              # push main, deploy
#   ./deploy/push-and-deploy.sh "fix footer"   # commit all, push, deploy
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

BRANCH="${DEWEB_BRANCH:-main}"
SERVER="${DEWEB_SERVER:-deweb}"

if [[ "${1:-}" != "" ]]; then
  git add -A
  git commit -m "$1"
fi

echo "==> Pushing to GitHub (${BRANCH})..."
git push origin "$BRANCH"

echo "==> Deploying on server..."
ssh "$SERVER" "bash /var/www/deweb/deploy/update.sh"

echo "==> Done. https://dewebam.com/"
