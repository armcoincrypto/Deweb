# deweb-community

DeWeb community marketplace — full-stack demo (static frontend + Node API + SQLite).

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
