import { Router } from "express";
import { db, uid, nowIso, logActivity } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { toOrder } from "../utils/helpers.js";

const router = Router();

router.get("/mine", requireAuth, (req, res) => {
  const user = db.prepare("SELECT email FROM users WHERE id = ?").get(req.userId);
  const rows = db.prepare(`
    SELECT * FROM orders
    WHERE user_id = ? OR client_email = ?
    ORDER BY created_at DESC
  `).all(req.userId, user?.email || "");
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
      service, budget, deadline, assigned_dev_id, order_date, created_at,
      client_email, client_name, client_phone, pay_method, details, source
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    createdAt,
    req.body.clientEmail || null,
    req.body.clientName || null,
    req.body.clientPhone || null,
    req.body.payMethod || null,
    req.body.details || null,
    req.body.source || "api"
  );

  logActivity(req.userId, "order_created", { orderId: id });
  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(id);
  res.status(201).json({ order: toOrder(row) });
});

router.patch("/:id/claim", requireAuth, (req, res) => {
  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Order not found." });
  if (row.assigned_dev_id) {
    return res.status(409).json({ error: "Order already claimed." });
  }

  db.prepare(`
    UPDATE orders SET assigned_dev_id = ?, stage = 'In Progress', status = 'in_progress'
    WHERE id = ?
  `).run(req.userId, req.params.id);

  logActivity(req.userId, "order_claimed", { orderId: req.params.id });

  const updated = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  res.json({ order: toOrder(updated) });
});

router.patch("/:id", requireAuth, (req, res) => {
  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Order not found." });

  const stage = req.body.stage !== undefined ? req.body.stage : row.stage;
  const status = req.body.status !== undefined ? req.body.status : row.status;
  const assignedDevId = req.body.assignedDevId !== undefined
    ? req.body.assignedDevId
    : row.assigned_dev_id;

  db.prepare(`
    UPDATE orders SET stage = ?, status = ?, assigned_dev_id = ?
    WHERE id = ?
  `).run(stage, status, assignedDevId, req.params.id);

  const updated = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  res.json({ order: toOrder(updated) });
});

export default router;
