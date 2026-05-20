#!/bin/bash
# Run on the server after git pull: npm install, restart API, reload nginx
set -euo pipefail
APP_DIR="/var/www/deweb"
cd "$APP_DIR"
git pull origin main
cd backend
npm install --omit=dev
systemctl restart deweb-api
nginx -t && systemctl reload nginx
sleep 2
curl -sf http://127.0.0.1:3000/api/health
echo ""
echo "Frontend: $(grep -E '^\s*server_name' /etc/nginx/sites-enabled/deweb 2>/dev/null | head -1)"
systemctl --no-pager is-active deweb-api
