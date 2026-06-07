#!/bin/bash
# Server-side auto-deploy: pull main when GitHub has new commits.
# Install via: deploy/install-auto-deploy.sh (runs on VPS as root)
set -euo pipefail

APP_DIR="/var/www/deweb"
LOG="/var/log/deweb-auto-deploy.log"
BRANCH="${DEWEB_BRANCH:-main}"

cd "$APP_DIR"
git fetch origin "$BRANCH" --quiet

LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse "origin/${BRANCH}")"

if [[ "$LOCAL" == "$REMOTE" ]]; then
  exit 0
fi

echo "$(date -Is) Deploying ${LOCAL:0:8} -> ${REMOTE:0:8}" >> "$LOG"
bash "$APP_DIR/deploy/update.sh" >> "$LOG" 2>&1
