#!/bin/bash
# Deploy Next.js homepage on the DEWEB server (run as root on VPS)
set -euo pipefail

APP_DIR="/var/www/deweb"
DOMAIN="${DEWEB_DOMAIN:-dewebam.com}"

echo "==> Pull latest code..."
cd "$APP_DIR"
git pull origin main

echo "==> Build Next.js homepage..."
cd "$APP_DIR/web"
export NEXT_PUBLIC_LEGACY_URL="https://${DOMAIN}"
# Install all deps (dev needed for build); NODE_ENV=production skips devDependencies
unset NODE_ENV
npm install
npm run build

echo "==> Install systemd service..."
cp "$APP_DIR/deploy/deweb-next.service" /etc/systemd/system/deweb-next.service
systemctl daemon-reload
systemctl enable deweb-next
systemctl restart deweb-next

echo "==> Configure nginx..."
if [[ -f /etc/letsencrypt/live/${DOMAIN}/fullchain.pem ]]; then
  cp "$APP_DIR/deploy/nginx-deweb-production.conf" /etc/nginx/sites-available/deweb
else
  echo "WARN: No SSL cert for ${DOMAIN}; using HTTP-only fallback"
  cp "$APP_DIR/deploy/nginx-deweb.conf" /etc/nginx/sites-available/deweb
fi
ln -sf /etc/nginx/sites-available/deweb /etc/nginx/sites-enabled/deweb
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

sleep 3
curl -sf http://127.0.0.1:3001/ >/dev/null && echo "Next.js: OK" || echo "Next.js: check logs: journalctl -u deweb-next"
curl -sf http://127.0.0.1:3000/api/health && echo "API: OK"
echo "Done. Open https://${DOMAIN}/"
