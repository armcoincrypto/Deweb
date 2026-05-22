# DEWEB — Premium Homepage (Next.js)

Futuristic SaaS landing page for the DEWEB IT marketplace: supplier bidding, competitive offers, AI automation, and trust at scale.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS**
- **Framer Motion**
- Mobile-first responsive layout

## Run locally

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for production

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/              layout, page, globals
  components/
    home/           Hero, LiveDashboard, sections 1–11
    layout/         Navbar, Footer
    ui/             GlassCard, GlowButton, Particles, SectionHeading
  lib/              data.ts, utils.ts
```

## Link to existing DEWEB app

Account and API still live on the static site. Set env or update links in `Navbar.tsx` / `Footer.tsx`:

```env
NEXT_PUBLIC_LEGACY_URL=https://dewebam.com
```

## Deploy

- **Vercel:** import `web/` as project root
- **Same server:** `npm run build && npm start` on port 3001, nginx proxy `/` to Next or subdomain `www`
