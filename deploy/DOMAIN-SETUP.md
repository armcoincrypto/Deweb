# Connect GoDaddy domain to DEWEB server

Server IP: **95.111.233.120**

## Step 1 — GoDaddy DNS (5 minutes)

1. Log in at [godaddy.com](https://www.godaddy.com) → **My Products** → your domain → **DNS** (or **Manage DNS**).
2. Add or edit these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | `@` | `95.111.233.120` | 600 (or default) |
| **A** | `www` | `95.111.233.120` | 600 |

3. Remove old **A** records that point somewhere else (parking page, old host).
4. Save. DNS can take **10 minutes to 48 hours** (usually under 1 hour).

Check propagation: [https://dnschecker.org](https://dnschecker.org) — search your domain, type **A**, should show `95.111.233.120`.

## Step 2 — Server setup (HTTPS)

SSH into the server:

```bash
ssh root@95.111.233.120
```

Run (replace with your real domain):

```bash
cd /var/www/deweb
git pull origin main
sudo bash deploy/setup-domain.sh yourdomain.com
```

Example:

```bash
sudo bash deploy/setup-domain.sh dewebcommunity.com
```

This configures nginx + free SSL (HTTPS).

## Step 3 — Test

- `https://yourdomain.com/`
- `https://yourdomain.com/account.html`
- `https://yourdomain.com/api/health`

## Troubleshooting

**Site still shows GoDaddy parking page**  
DNS not updated yet, or wrong A record. Wait and check dnschecker.org.

**Certbot / SSL failed**  
DNS must point to the server before running `setup-domain.sh`. Wait, then run:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**API errors in browser**  
On the server, check `backend/.env`:

```env
CORS_ORIGIN=https://yourdomain.com
```

Then: `sudo systemctl restart deweb-api`
