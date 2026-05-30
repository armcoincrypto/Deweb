#!/bin/bash
# Run on the server after git pull: backend + Next.js + nginx
set -euo pipefail
APP_DIR="/var/www/deweb"
DOMAIN="${DEWEB_DOMAIN:-dewebam.com}"

cd "$APP_DIR"
git pull origin main

echo "==> Backend..."
cd "$APP_DIR/backend"
npm install --omit=dev
systemctl restart deweb-api

if [[ -f "$APP_DIR/web/package.json" ]]; then
  echo "==> Next.js homepage..."
  cd "$APP_DIR/web"
  export NEXT_PUBLIC_LEGACY_URL="https://${DOMAIN}"
  unset NODE_ENV
  npm install
  npm run build
  systemctl restart deweb-next
fi

nginx -t && systemctl reload nginx

sleep 2
curl -sf http://127.0.0.1:3000/api/health && echo ""
curl -sf http://127.0.0.1:3001/ >/dev/null && echo "Next.js: OK" || echo "Next.js: check journalctl -u deweb-next"
systemctl --no-pager is-active deweb-api
systemctl --no-pager is-active deweb-next 2>/dev/null || true
echo "Live: https://${DOMAIN}/"
