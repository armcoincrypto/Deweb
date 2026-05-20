#!/bin/bash
# Connect GoDaddy domain to DEWEB on this server.
# Usage: sudo bash setup-domain.sh yourdomain.com
set -euo pipefail

DOMAIN="${1:-}"
if [[ -z "$DOMAIN" ]]; then
  echo "Usage: sudo bash setup-domain.sh yourdomain.com"
  echo "Example: sudo bash setup-domain.sh dewebcommunity.com"
  exit 1
fi

DOMAIN="${DOMAIN#https://}"
DOMAIN="${DOMAIN#http://}"
DOMAIN="${DOMAIN%%/*}"
DOMAIN="${DOMAIN#www.}"

APP_DIR="/var/www/deweb"
EMAIL="${ADMIN_EMAIL:-admin@${DOMAIN}}"

echo "==> Domain: $DOMAIN (and www.$DOMAIN)"
if [[ "${SKIP_CONFIRM:-}" != "1" ]]; then
  echo "==> Make sure GoDaddy DNS A records point to this server IP first."
  echo "    Press Enter to continue or Ctrl+C to cancel."
  read -r _
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx

NGINX_CONF="/etc/nginx/sites-available/deweb"
cat > "$NGINX_CONF" << EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN} 95.111.233.120;

    root ${APP_DIR}/deweb-community;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/deweb
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> Requesting free HTTPS certificate (Let's Encrypt)..."
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" \
  --non-interactive --agree-tos -m "$EMAIL" \
  --redirect || {
  echo ""
  echo "Certbot failed. Common fixes:"
  echo "  1. Wait 10–30 min after changing GoDaddy DNS"
  echo "  2. Check A record: $DOMAIN -> $(curl -s ifconfig.me 2>/dev/null || echo 'your server IP')"
  echo "  3. Run again: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
  exit 1
}

ENV_FILE="${APP_DIR}/backend/.env"
if [[ -f "$ENV_FILE" ]]; then
  if grep -q '^CORS_ORIGIN=' "$ENV_FILE"; then
    sed -i "s|^CORS_ORIGIN=.*|CORS_ORIGIN=https://${DOMAIN}|" "$ENV_FILE"
  else
    echo "CORS_ORIGIN=https://${DOMAIN}" >> "$ENV_FILE"
  fi
  echo "==> Updated CORS_ORIGIN in backend/.env"
fi

systemctl restart deweb-api 2>/dev/null || true

echo ""
echo "Done! Open: https://${DOMAIN}/"
echo "Also works: https://www.${DOMAIN}/"
