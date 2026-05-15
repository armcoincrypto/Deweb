# DEWEB Backend API

Node.js + Express + SQLite API for the DEWEB marketplace frontend.

## Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API default URL: `http://localhost:3000`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Current user (Bearer token) |
| PATCH | `/api/users/me` | Update profile |
| GET | `/api/users/developers` | Marketplace seller list |
| GET | `/api/products` | All marketplace products |
| GET | `/api/products/mine` | Seller products |
| POST | `/api/products` | Create/update product |
| GET | `/api/orders/mine` | User orders |
| GET | `/api/orders/open` | Open marketplace orders |
| POST | `/api/orders` | Create order |
| GET | `/api/wallet/me` | Wallet balance |
| PATCH | `/api/wallet/me` | Update wallet demo state |

## Auth

Send JWT in header:

```
Authorization: Bearer <token>
```

Frontend stores token in `localStorage` key `deweb_token`.
