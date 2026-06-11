import { Router } from "express";
import { db } from "../db.js";
import {
  toBlogCategory,
  toBlogPost,
  toBlogPostListItem,
} from "../utils/blogHelpers.js";
import blogTrackingRoutes from "./blogTracking.js";

const router = Router();

router.use(blogTrackingRoutes);

const POST_SELECT = `
  SELECT p.*, c.name AS category_name, c.slug AS category_slug
  FROM blog_posts p
  JOIN blog_categories c ON c.id = p.category_id
`;

function getPostTags(postId) {
  return db
    .prepare(
      `SELECT t.* FROM blog_tags t
       JOIN blog_post_tags pt ON pt.tag_id = t.id
       WHERE pt.post_id = ?`
    )
    .all(postId)
    .map((t) => t.name);
}

router.get("/categories", (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM blog_categories ORDER BY name ASC")
    .all();
  res.json({ categories: rows.map(toBlogCategory) });
});

router.get("/sitemap", (_req, res) => {
  const rows = db
    .prepare(
      `SELECT slug, published_at, updated_at FROM blog_posts
       WHERE status = 'published' ORDER BY published_at DESC`
    )
    .all();
  res.json({
    posts: rows.map((r) => ({
      slug: r.slug,
      date: r.published_at || r.updated_at,
    })),
  });
});

router.get("/", (_req, res) => {
  const rows = db
    .prepare(
      `${POST_SELECT} WHERE p.status = 'published' ORDER BY p.published_at DESC, p.updated_at DESC`
    )
    .all();
  res.json({ posts: rows.map(toBlogPostListItem) });
});

router.get("/:slug", (req, res) => {
  const row = db
    .prepare(`${POST_SELECT} WHERE p.slug = ? AND p.status = 'published'`)
    .get(req.params.slug);
  if (!row) return res.status(404).json({ error: "Article not found." });
  const tags = getPostTags(row.id);
  res.json({ post: toBlogPost(row, tags) });
});

export default router;
