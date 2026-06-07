import { Router } from "express";
import { db, uid, nowIso, logActivity } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { requireEmailVerified } from "../middleware/requireEmailVerified.js";
import { toOrder } from "../utils/helpers.js";

const router = Router();

function toBid(row) {
  if (!row) return null;
  return {
    id: row.id,
    orderId: row.order_id,
    sellerId: row.seller_id,
    sellerName: row.seller_name,
    price: row.price,
    timeline: row.timeline,
    message: row.message,
    status: row.status,
    createdAt: row.created_at
  };
}

router.get("/order/:orderId", requireAuth, (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.orderId);
  if (!order) return res.status(404).json({ error: "Project not found." });

  const user = db.prepare("SELECT account_mode, role FROM users WHERE id = ?").get(req.userId);
  const isOwner = order.user_id === req.userId;
  const isSeller = user?.account_mode === "seller" || user?.role === "dev";

  let rows;
  if (isOwner) {
    rows = db.prepare(`
      SELECT b.*, u.username, u.name FROM project_bids b
      LEFT JOIN users u ON u.id = b.seller_id
      WHERE b.order_id = ? ORDER BY b.price ASC
    `).all(req.params.orderId);
  } else if (isSeller) {
    rows = db.prepare("SELECT * FROM project_bids WHERE order_id = ? AND seller_id = ?").all(
      req.params.orderId,
      req.userId
    );
  } else {
    return res.status(403).json({ error: "Access denied." });
  }

  res.json({
    bids: rows.map((r) =>
      toBid({
        ...r,
        seller_name: r.seller_name || r.name || r.username || "Supplier"
      })
    )
  });
});

router.post("/order/:orderId", requireAuth, requireEmailVerified, (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.orderId);
  if (!order) return res.status(404).json({ error: "Project not found." });
  if (order.assigned_dev_id) {
    return res.status(409).json({ error: "This project already has a selected supplier." });
  }

  const user = db.prepare("SELECT username, name, account_mode, role FROM users WHERE id = ?").get(
    req.userId
  );
  if (user?.account_mode !== "seller" && user?.role !== "dev") {
    return res.status(403).json({ error: "Only suppliers can submit proposals." });
  }
  if (order.user_id === req.userId) {
    return res.status(400).json({ error: "You cannot bid on your own project." });
  }

  const price = Number(req.body.price || 0);
  if (price <= 0) return res.status(400).json({ error: "Valid price is required." });

  const existing = db.prepare(
    "SELECT id FROM project_bids WHERE order_id = ? AND seller_id = ? AND status = 'pending'"
  ).get(req.params.orderId, req.userId);
  if (existing) {
    return res.status(409).json({ error: "You already submitted a proposal for this project." });
  }

  const id = uid();
  const sellerName = user.name || user.username || "Supplier";
  db.prepare(`
    INSERT INTO project_bids (id, order_id, seller_id, seller_name, price, timeline, message, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)
  `).run(
    id,
    req.params.orderId,
    req.userId,
    sellerName,
    price,
    req.body.timeline || "",
    req.body.message || "",
    nowIso()
  );

  logActivity(req.userId, "bid_submitted", { orderId: req.params.orderId, bidId: id });
  const row = db.prepare("SELECT * FROM project_bids WHERE id = ?").get(id);
  res.status(201).json({ bid: toBid(row) });
});

router.post("/:bidId/accept", requireAuth, requireEmailVerified, (req, res) => {
  const bid = db.prepare("SELECT * FROM project_bids WHERE id = ?").get(req.params.bidId);
  if (!bid) return res.status(404).json({ error: "Proposal not found." });

  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(bid.order_id);
  if (!order || order.user_id !== req.userId) {
    return res.status(403).json({ error: "Only the project owner can accept proposals." });
  }

  db.prepare(`
    UPDATE orders SET assigned_dev_id = ?, seller_id = ?, total = ?, stage = 'Negotiating', status = 'in_progress'
    WHERE id = ?
  `).run(bid.seller_id, bid.seller_id, bid.price, bid.order_id);

  db.prepare("UPDATE project_bids SET status = 'accepted' WHERE id = ?").run(bid.id);
  db.prepare(`
    UPDATE project_bids SET status = 'rejected' WHERE order_id = ? AND id != ? AND status = 'pending'
  `).run(bid.order_id, bid.id);

  logActivity(req.userId, "bid_accepted", { orderId: bid.order_id, bidId: bid.id });

  const updated = db.prepare("SELECT * FROM orders WHERE id = ?").get(bid.order_id);
  res.json({ order: toOrder(updated), bid: toBid(bid) });
});

router.post("/:bidId/reject", requireAuth, (req, res) => {
  const bid = db.prepare("SELECT * FROM project_bids WHERE id = ?").get(req.params.bidId);
  if (!bid) return res.status(404).json({ error: "Proposal not found." });

  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(bid.order_id);
  if (!order || order.user_id !== req.userId) {
    return res.status(403).json({ error: "Only the project owner can reject proposals." });
  }

  db.prepare("UPDATE project_bids SET status = 'rejected' WHERE id = ?").run(bid.id);
  res.json({ bid: toBid(db.prepare("SELECT * FROM project_bids WHERE id = ?").get(bid.id)) });
});

export default router;
