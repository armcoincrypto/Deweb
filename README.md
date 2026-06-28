# DEWEB

**DEWEB** is an IT marketplace and engineering agency for Shopify, AI automation, SaaS, marketplaces, fintech-style payment systems, and custom web applications.

- **Live site:** [dewebam.com](https://dewebam.com) (default locale: `/en`)
- **GitHub:** [github.com/armcoincrypto/Deweb](https://github.com/armcoincrypto/Deweb)

## Multilingual site

| Locale | URL |
|--------|-----|
| English | [dewebam.com/en](https://dewebam.com/en) |
| Spanish | [dewebam.com/es](https://dewebam.com/es) |
| Russian | [dewebam.com/ru](https://dewebam.com/ru) |
| Armenian | [dewebam.com/am](https://dewebam.com/am) |

## Production portfolio

Real project case studies (architecture, stack, operations — no fabricated metrics):

| Project | Portfolio | GitHub doc |
|---------|-----------|------------|
| Kobbopay — multi-rail crypto payments | [/en/projects/kobbopay](https://dewebam.com/en/projects/kobbopay) | [docs/projects/kobbopay-architecture.md](docs/projects/kobbopay-architecture.md) |
| Exswaping — cryptocurrency exchange | [/en/projects/exswaping](https://dewebam.com/en/projects/exswaping) | [docs/projects/exswaping-architecture.md](docs/projects/exswaping-architecture.md) |
| Changetext — AI Telegram automation | [/en/projects/changetext](https://dewebam.com/en/projects/changetext) | [docs/projects/changetext-case-study.md](docs/projects/changetext-case-study.md) |
| DEX Kobbex — decentralized swap UI | [/en/projects/dex-kobbex](https://dewebam.com/en/projects/dex-kobbex) | [docs/projects/dex-kobbex-architecture.md](docs/projects/dex-kobbex-architecture.md) |

Full index: [dewebam.com/en/projects](https://dewebam.com/en/projects)

## Engineering documentation

Architecture notes and engineering references for production systems:

- [Project architecture index](docs/projects/README.md)
- [Engineering docs index](docs/engineering/README.md)
- [Crypto payment gateway architecture](docs/engineering/crypto-payment-gateway-architecture.md)
- [Multi-rail settlement system](docs/engineering/multi-rail-settlement-system.md)

## Repository structure

| Path | Description |
|------|-------------|
| **web/** | Next.js marketing site, marketplace UI, portfolio, SEO (port 3001 production) |
| **backend/** | Express API, SQLite, seed data |
| **deweb-community/** | Legacy frontend (HTML/CSS/JS) |
| **docs/** | Engineering docs, runbooks, audit history |
| **deploy/** | Deployment scripts |

---

## GitHub — connect & sync

This folder is linked to the repo:

```text
origin  git@github-deweb:armcoincrypto/Deweb.git
```

### Clone on a new computer

```bash
git clone git@github.com:armcoincrypto/Deweb.git
cd Deweb
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
ssh deweb
bash /var/www/deweb/deploy/update.sh
```

Or from your Mac — one command (push + deploy):

```bash
./deploy/push-and-deploy.sh              # push already-committed changes
./deploy/push-and-deploy.sh "fix footer" # commit, push, deploy
```

SSH alias `deweb` → `root@95.111.233.120` (passwordless key auth).

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

### Terminal 2 — Frontend (Next.js)

```bash
cd web
npm install
npm run dev
```

Open: http://localhost:3000/en

## What works end-to-end

| Feature | Page | Backend |
|---------|------|---------|
| Sign up / sign in | `/en/account/login` | `/api/auth/*` |
| Profile, wallet, products, orders | `/en/account/profile` | users, wallet, products, orders, cards |
| Marketplace sellers & products | `/en/marketplace` | developers, products |
| Custom order inquiry | `/en/contact` | `/api/inquiries` |
| Open orders & claim | `/en/marketplace` | `/api/orders/open`, `claim` |
| Contact message | `/en/contact` | `/api/contact` |
| Services offer form | `/en/services` | `/api/offers` |
| Cart → checkout | legacy + API | `/api/checkout` (sign in required) |
| Promocode HAYUGEN | `/en/services` | `/api/checkout/promo` |

## Demo seller logins

After starting the API (seed runs automatically):

- `aram@deweb.demo` / `demo1234`
- `mariam@deweb.demo` / `demo1234`
- `gor@deweb.demo` / `demo1234`

Switch to **Seller** in My Profile to add products; they appear on the main marketplace.

## Troubleshooting

**"Failed to fetch" on sign up** — backend is not running. Start Terminal 1 (`npm run dev`).

**502 on homepage** — rebuild Next.js from `web/`: `cd web && npm run build`, then restart `deweb-next`.

**Different API URL** — set `NEXT_PUBLIC_API_URL` in web env or legacy:

```html
<script>window.DEWEB_API_URL = "http://localhost:3000/api";</script>
```
