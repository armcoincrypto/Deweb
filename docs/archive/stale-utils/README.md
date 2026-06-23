# Archived stale utility copies

These files were copied here during deployment recovery (2026-06-23) because they duplicate production routes and must not be committed:

- `auth.js` — stale copy of `backend/src/routes/auth.js` (missing login rate limit)
- `loadEnv.js` — duplicate of `backend/src/loadEnv.js`

Canonical sources remain in `backend/src/routes/` and `backend/src/loadEnv.js`.
