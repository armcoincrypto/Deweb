#!/bin/bash
# Enable automatic deploy on the VPS (polls GitHub every minute).
set -euo pipefail

APP_DIR="/var/www/deweb"
chmod +x "$APP_DIR/deploy/auto-deploy.sh"

CRON_LINE="* * * * * bash $APP_DIR/deploy/auto-deploy.sh"
(crontab -l 2>/dev/null | grep -v "deploy/auto-deploy.sh" || true; echo "$CRON_LINE") | crontab -

echo "==> Auto-deploy cron installed (checks GitHub every minute)"
crontab -l | grep auto-deploy
