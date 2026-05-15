# deweb-community

DeWeb community marketplace platform.

## Run frontend (static)

```bash
cd deweb-community
python3 -m http.server 8001
```

Open: `http://localhost:8001/index.html`

## Run backend (API)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API: `http://localhost:3000/api/health`

## Project structure

- **deweb-community/** — Frontend (HTML/CSS/JS)
  - `index.html` — Main entry (slider: Home → Services → Packages → Order → Marketplace → About → Contact)
  - `services.html` — Service details page
  - `style.css` — Global styles
  - `script.js` — Main app (slider, i18n, account, orders, marketplace)
  - `account-dashboard.js` — Account dashboard
  - `api.js` — Backend API client helper
- **backend/** — Node.js API (Express + SQLite)
