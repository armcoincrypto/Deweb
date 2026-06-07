import { Router } from "express";
import { db, uid, nowIso, toUserRow, logActivity } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { requireEmailVerified } from "../middleware/requireEmailVerified.js";

const router = Router();

function toProduct(row) {
  return {
    id: row.id,
    sellerId: row.seller_id,
    sellerName: row.seller_name,
    title: row.title,
    price: row.price,
    category: row.category,
    description: row.description,
    views: row.views,
    clicks: row.clicks,
    comments: row.comments,
    reviews: row.reviews,
    rating: row.rating,
    imageUrl: row.image_url || "",
    updatedAt: row.updated_at
  };
}

router.get("/", (_req, res) => {
  const rows = db.prepare("SELECT * FROM marketplace_products ORDER BY updated_at DESC").all();
  res.json({ products: rows.map(toProduct) });
});

router.get("/mine", requireAuth, (req, res) => {
  const rows = db.prepare(
    "SELECT * FROM marketplace_products WHERE seller_id = ? ORDER BY updated_at DESC"
  ).all(req.userId);
  res.json({ products: rows.map(toProduct) });
});

router.post("/", requireAuth, requireEmailVerified, (req, res) => {
  const user = toUserRow(db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId));
  if (user.accountMode !== "seller") {
    return res.status(403).json({ error: "Seller account required." });
  }

  const title = String(req.body.title || "").trim();
  if (!title) return res.status(400).json({ error: "Product title is required." });

  const id = req.body.id || uid();
  const existing = db.prepare("SELECT id FROM marketplace_products WHERE id = ?").get(id);
  const updatedAt = nowIso();

  const payload = {
    title,
    price: Number(req.body.price || 0),
    category: req.body.category || "Web development",
    description: req.body.description || "",
    views: Number(req.body.views || 120),
    clicks: Number(req.body.clicks || 24),
    comments: Number(req.body.comments || 3),
    reviews: Number(req.body.reviews || 1),
    rating: Number(req.body.rating || 4.8),
    imageUrl: String(req.body.imageUrl || req.body.image_url || "").trim()
  };

  if (existing) {
    db.prepare(`
      UPDATE marketplace_products
      SET title = ?, price = ?, category = ?, description = ?, image_url = ?,
          views = ?, clicks = ?, comments = ?, reviews = ?, rating = ?, updated_at = ?
      WHERE id = ? AND seller_id = ?
    `).run(
      payload.title, payload.price, payload.category, payload.description, payload.imageUrl,
      payload.views, payload.clicks, payload.comments, payload.reviews, payload.rating,
      updatedAt, id, req.userId
    );
  } else {
    db.prepare(`
      INSERT INTO marketplace_products (
        id, seller_id, seller_name, title, price, category, description, image_url,
        views, clicks, comments, reviews, rating, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, req.userId, user.name || "Seller",
      payload.title, payload.price, payload.category, payload.description, payload.imageUrl,
      payload.views, payload.clicks, payload.comments, payload.reviews, payload.rating,
      updatedAt
    );
  }

  const row = db.prepare("SELECT * FROM marketplace_products WHERE id = ?").get(id);
  res.status(existing ? 200 : 201).json({ product: toProduct(row) });
});

export default router;
