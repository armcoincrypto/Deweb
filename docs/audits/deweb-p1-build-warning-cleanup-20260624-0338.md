# DEWEB P1 Build Warning Cleanup

**Date:** 2026-06-24 03:38 CEST  
**Project:** `/var/www/deweb/web`

---

## Verdict

**Build clean — warnings resolved, behavior unchanged.**

---

## Warnings Fixed

| File | Issue | Fix |
|------|-------|-----|
| `app/[locale]/contact/page.tsx` | Unused `metadataFromEntry` | Removed import |
| `app/[locale]/marketplace/page.tsx` | Unused `metadataFromEntry` | Removed import |
| `app/[locale]/services/[slug]/page.tsx` | Unused `metadataFromEntry`, `getLocalizedLandingSeo` | Removed imports |
| `components/3d/HomepageHeroScene.tsx` | Unused `Float` | Removed import |
| `components/homepage/HomepageBlog.tsx` | Unused `Link` | Removed import |
| `components/admin/blog/AdminBlogPreview.tsx` | Missing `loadTranslations` in `useEffect` deps | Wrapped in `useCallback([postId])` |
| `components/marketplace/MarketplaceView.tsx` | Missing `load` in `useEffect` deps | Wrapped in `useCallback([filter])` |

---

## Validation

```bash
cd /var/www/deweb/web && npm run build
# ✓ Compiled successfully — no ESLint warnings
```

Live smoke:

```
home: 200
blog fake: 404
service fake: 404
```

---

## Commit

```
chore: clean deweb frontend build warnings
```

No product, SEO, or UI behavior changes.
