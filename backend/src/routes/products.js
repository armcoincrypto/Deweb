import { Router } from "express";
import { db, uid, nowIso, toUserRow, logActivity } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { transferDeweb } from "./crypto.js";

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

router.post("/", requireAuth, (req, res) => {
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
    rating: Number(req.body.rating || 4.8)
  };

  if (existing) {
    db.prepare(`
      UPDATE marketplace_products
      SET title = ?, price = ?, category = ?, description = ?,
          views = ?, clicks = ?, comments = ?, reviews = ?, rating = ?, updated_at = ?
      WHERE id = ? AND seller_id = ?
    `).run(
      payload.title, payload.price, payload.category, payload.description,
      payload.views, payload.clicks, payload.comments, payload.reviews, payload.rating,
      updatedAt, id, req.userId
    );
  } else {
    db.prepare(`
      INSERT INTO marketplace_products (
        id, seller_id, seller_name, title, price, category, description,
        views, clicks, comments, reviews, rating, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, req.userId, user.name || "Seller",
      payload.title, payload.price, payload.category, payload.description,
      payload.views, payload.clicks, payload.comments, payload.reviews, payload.rating,
      updatedAt
    );
  }

  const row = db.prepare("SELECT * FROM marketplace_products WHERE id = ?").get(id);
  res.status(existing ? 200 : 201).json({ product: toProduct(row) });
});

router.post("/:id/purchase", requireAuth, (req, res) => {
  const product = db.prepare("SELECT * FROM marketplace_products WHERE id = ?").get(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found." });
  if (product.seller_id === req.userId) {
    return res.status(400).json({ error: "You cannot buy your own product." });
  }

  const price = Number(product.price || 0);
  if (price <= 0) return res.status(400).json({ error: "Invalid product price." });

  try {
    transferDeweb(req.userId, product.seller_id, price, {
      productId: product.id,
      title: product.title
    });
  } catch (e) {
    if (e.message === "INSUFFICIENT_DEWEB") {
      return res.status(402).json({ error: "Not enough DEWEB coins.", needTopUp: true });
    }
    throw e;
  }

  logActivity(req.userId, "product_purchase", { productId: product.id, sellerId: product.seller_id, price });
  const buyerWallet = db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(req.userId);
  res.json({
    ok: true,
    message: `Paid ${price} DEWEB to seller.`,
    balance: buyerWallet?.deweb || 0
  });
});

export default router;
