import { Router } from "express";
import { db, uid, nowIso, parseJson } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function toOrder(row) {
  return {
    id: row.id,
    userId: row.user_id,
    sellerId: row.seller_id,
    items: parseJson(row.items, []),
    total: row.total,
    currency: row.currency,
    status: row.status,
    stage: row.stage,
    service: row.service,
    budget: row.budget,
    deadline: row.deadline,
    assignedDevId: row.assigned_dev_id,
    date: row.order_date,
    createdAt: row.created_at
  };
}

router.get("/mine", requireAuth, (req, res) => {
  const rows = db.prepare(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC"
  ).all(req.userId);
  res.json({ orders: rows.map(toOrder) });
});

router.get("/open", (_req, res) => {
  const rows = db.prepare(`
    SELECT * FROM orders
    WHERE stage = 'Inquiry' AND (assigned_dev_id IS NULL OR assigned_dev_id = '')
    ORDER BY created_at DESC
  `).all();
  res.json({ orders: rows.map(toOrder) });
});

router.post("/", requireAuth, (req, res) => {
  const id = uid();
  const createdAt = nowIso();

  db.prepare(`
    INSERT INTO orders (
      id, user_id, seller_id, items, total, currency, status, stage,
      service, budget, deadline, assigned_dev_id, order_date, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    req.userId,
    req.body.sellerId || null,
    JSON.stringify(req.body.items || []),
    Number(req.body.total || 0),
    req.body.currency || "USD",
    req.body.status || "pending",
    req.body.stage || "Inquiry",
    req.body.service || "",
    req.body.budget || "",
    req.body.deadline || "",
    req.body.assignedDevId || null,
    req.body.date || createdAt.slice(0, 10),
    createdAt
  );

  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(id);
  res.status(201).json({ order: toOrder(row) });
});

export default router;
