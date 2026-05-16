# DEWEB Backend API

Node.js + Express + SQLite API for the full DEWEB frontend (auth, marketplace, orders, wallet, checkout, contact).

## Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API: `http://localhost:3000`  
Health: `http://localhost:3000/api/health`

Set `CORS_ORIGIN=http://localhost:8001` in `.env` to match your static frontend server.

## Demo data (auto-seed on start)

| Account | Password | Role |
|---------|----------|------|
| `aram@deweb.demo` | `demo1234` | Seller / dev |
| `mariam@deweb.demo` | `demo1234` | Seller / dev |
| `gor@deweb.demo` | `demo1234` | Seller / dev |

Each demo seller has a sample marketplace product. Register your own account on `account.html` for a fresh customer profile.

## API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | — | Health check |
| POST | `/api/auth/register` | — | Create account + wallet |
| POST | `/api/auth/login` | — | Sign in |
| GET | `/api/auth/me` | JWT | Current user |
| PATCH | `/api/users/me` | JWT | Update profile, seller info, KYC flags |
| GET | `/api/users/developers` | — | Marketplace sellers |
| GET | `/api/products` | — | All products |
| GET | `/api/products/mine` | JWT | Seller products |
| POST | `/api/products` | JWT | Create/update product (seller) |
| GET | `/api/orders/mine` | JWT | Your orders + inquiries by email |
| GET | `/api/orders/open` | — | Open inquiries for devs |
| POST | `/api/orders` | JWT | Create order |
| PATCH | `/api/orders/:id/claim` | JWT | Claim inquiry as developer |
| PATCH | `/api/orders/:id` | JWT | Update stage/status |
| POST | `/api/inquiries` | optional JWT | Custom order form (index) |
| POST | `/api/offers` | optional JWT | Services “offer your price” form |
| POST | `/api/contact` | — | Contact slide message |
| POST | `/api/checkout` | JWT | Pay cart → creates paid order |
| POST | `/api/checkout/promo` | — | Validate promocode (`HAYUGEN`) |
| GET | `/api/cards` | JWT | Saved cards (last4 only) |
| POST | `/api/cards` | JWT | Save card |
| DELETE | `/api/cards/:id` | JWT | Remove card |
| GET | `/api/wallet/me` | JWT | Wallet |
| PATCH | `/api/wallet/me` | JWT | Wallet demo actions |
| GET | `/api/activity/me` | JWT | Activity log |
| GET | `/api/services/catalog` | — | Services catalog JSON |

## Auth

```
Authorization: Bearer <token>
```

Token is stored in the browser as `localStorage.deweb_token` by `deweb-community/api.js`.

## Database

SQLite file: `backend/data/deweb.sqlite` (created automatically, gitignored).

Tables: `users`, `orders`, `marketplace_products`, `wallets`, `saved_cards`, `activity`, `contact_messages`, `service_inquiries`.
