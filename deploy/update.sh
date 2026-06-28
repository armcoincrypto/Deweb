#!/bin/bash
# Run on the server after git pull: backend + Next.js + nginx
set -euo pipefail
APP_DIR="/var/www/deweb"
DOMAIN="${DEWEB_DOMAIN:-dewebam.com}"
BUILD_LOCK="/tmp/deweb-next-build.lock"

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
  npm run favicons

  exec 9>"$BUILD_LOCK"
  if ! flock -n 9; then
    echo "FAIL: another Next.js build is already running ($BUILD_LOCK)"
    exit 1
  fi

  rm -rf .next
  if ! npm run build; then
    echo "FAIL: npm run build failed; deweb-next will NOT be restarted"
    exit 1
  fi

  if [[ ! -f ".next/BUILD_ID" ]]; then
    echo "FAIL: missing .next/BUILD_ID after build"
    exit 1
  fi

  if [[ ! -d ".next/server" ]]; then
    echo "FAIL: missing .next/server after build"
    exit 1
  fi

  systemctl restart deweb-next
  sleep 3

  if ! systemctl is-active --quiet deweb-next; then
    echo "FAIL: deweb-next is not active after restart"
    systemctl status deweb-next --no-pager -l || true
    exit 1
  fi

  local_code="$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3001/en || true)"
  if [[ "$local_code" != "200" ]]; then
    echo "FAIL: local Next.js health check returned HTTP $local_code (expected 200)"
    exit 1
  fi

  chunk_fail=0
  while IFS= read -r chunk_path; do
    [[ -z "$chunk_path" ]] && continue
    code="$(curl -s -o /dev/null -w "%{http_code}" "https://${DOMAIN}${chunk_path}" || true)"
    if [[ "$code" != "200" ]]; then
      echo "FAIL: chunk ${chunk_path} returned HTTP ${code}"
      chunk_fail=1
    fi
  done < <(curl -s "https://${DOMAIN}/en" | grep -o '/_next/static/[^"]*\.js' | sort -u)

  if [[ "$chunk_fail" -ne 0 ]]; then
    echo "FAIL: one or more live JS chunks did not return HTTP 200"
    exit 1
  fi
fi

if [[ -f "$APP_DIR/deploy/nginx-deweb-production.conf" ]]; then
  cp "$APP_DIR/deploy/nginx-deweb-production.conf" /etc/nginx/sites-available/deweb
fi
nginx -t && systemctl reload nginx

sleep 2
curl -sf http://127.0.0.1:3000/api/health && echo ""
curl -sf http://127.0.0.1:3001/ >/dev/null && echo "Next.js: OK" || echo "Next.js: check journalctl -u deweb-next"
systemctl --no-pager is-active deweb-api
systemctl --no-pager is-active deweb-next 2>/dev/null || true
echo "Live: https://${DOMAIN}/"
