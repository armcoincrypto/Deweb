# deweb-community

DeWeb community marketplace — full-stack SaaS platform (Next.js + legacy UI + Node API + SQLite).

**GitHub:** https://github.com/gagpoghosyan99/deweb-community  
**Live site:** https://dewebam.com (redirects to `/en`)

## GitHub — connect & sync

This folder is already linked to the repo:

```text
origin  https://github.com/gagpoghosyan99/deweb-community.git
```

### Clone on a new computer

```bash
git clone https://github.com/gagpoghosyan99/deweb-community.git
cd deweb-community
```

### Push your changes

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

### Update production server from GitHub

On the VPS (after you push to `main`):

```bash
cd /var/www/deweb
git pull origin main
bash deploy/setup-next-homepage.sh   # Next.js site
# API only:
cd backend && npm install --omit=dev && systemctl restart deweb-api
```

### What is **not** on GitHub (secrets)

- `backend/.env` — passwords, JWT, Gmail, treasury wallets (keep local + on server only)
- `web/node_modules/`, `web/.next/`

Copy secrets manually: `cp backend/.env.example backend/.env` then edit.

## Quick start (full working site)

You need **two terminals** and **Node.js** installed.

### Terminal 1 — API

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Check: http://localhost:3000/api/health → `{"ok":true,...}`

### Terminal 2 — Frontend

```bash
cd deweb-community
python3 -m http.server 8001
```

Open: http://localhost:8001/index.html

## What works end-to-end

| Feature | Page | Backend |
|---------|------|---------|
| Sign up / sign in | `account.html` | `/api/auth/*` |
| Profile, wallet, products, orders | `account-dashboard.html` | users, wallet, products, orders, cards |
| Marketplace sellers & products | `index.html` (slide 5) | developers, products |
| Custom order inquiry | `index.html` (Order slide) | `/api/inquiries` |
| Open orders & claim | `index.html` (Marketplace) | `/api/orders/open`, `claim` |
| Contact message | `index.html` (Contact) | `/api/contact` |
| Services offer form | `services.html` | `/api/offers` |
| Cart → checkout | `cart.html` → `payment.html` | `/api/checkout` (sign in required) |
| Promocode HAYUGEN | `services.html` | `/api/checkout/promo` |

## Demo seller logins

After starting the API (seed runs automatically):

- `aram@deweb.demo` / `demo1234`
- `mariam@deweb.demo` / `demo1234`
- `gor@deweb.demo` / `demo1234`

Switch to **Seller** in My Profile to add products; they appear on the main marketplace.

## Project structure

- **web/** — Premium Next.js homepage (Tailwind, Framer Motion) — `cd web && npm run dev`
- **deweb-community/** — Frontend (HTML/CSS/JS), `api.js` client
- **backend/** — Express API, SQLite, seed data

## Troubleshooting

**"Failed to fetch" on sign up** — backend is not running. Start Terminal 1 (`npm run dev`).

**Checkout asks to sign in** — create an account on `account.html`, then pay from `payment.html`.

**Different API URL** — before `api.js`:

```html
<script>window.DEWEB_API_URL = "http://localhost:3000/api";</script>
```
