#!/bin/bash
set -euo pipefail

APP_DIR="/var/www/deweb"
REPO="https://github.com/gagpoghosyan99/deweb-community.git"

echo "==> Installing system packages..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq git nginx curl build-essential

if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 18 ]]; then
  echo "==> Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi

echo "==> Node $(node -v) npm $(npm -v)"

mkdir -p /var/www
if [[ -d "$APP_DIR/.git" ]]; then
  echo "==> Pulling latest code..."
  cd "$APP_DIR"
  git pull origin main
else
  echo "==> Cloning repository..."
  rm -rf "$APP_DIR"
  git clone "$REPO" "$APP_DIR"
fi

cd "$APP_DIR/backend"
if [[ ! -f .env ]]; then
  echo "==> Creating .env from example (edit secrets on server)..."
  cp .env.example .env
fi

echo "==> Installing backend dependencies..."
npm install --omit=dev

echo "==> Configuring nginx..."
cp "$APP_DIR/deploy/nginx-deweb.conf" /etc/nginx/sites-available/deweb
ln -sf /etc/nginx/sites-available/deweb /etc/nginx/sites-enabled/deweb
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
systemctl enable nginx

echo "==> Configuring API service..."
cp "$APP_DIR/deploy/deweb-api.service" /etc/systemd/system/deweb-api.service
systemctl daemon-reload
systemctl enable deweb-api
systemctl restart deweb-api

echo "==> Done."
systemctl --no-pager status deweb-api | head -15
curl -sf http://127.0.0.1:3000/api/health && echo ""
echo "Site: http://$(hostname -I | awk '{print $1}')/"
