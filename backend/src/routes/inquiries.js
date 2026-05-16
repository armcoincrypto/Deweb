import { Router } from "express";
import { db, uid, nowIso, GUEST_USER_ID, logActivity } from "../db.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { toOrder } from "../utils/helpers.js";

const router = Router();

function makeOrderId() {
  return `ORD-${Math.floor(Math.random() * 90000 + 10000)}`;
}

router.post("/", optionalAuth, (req, res) => {
  const body = req.body || {};
  const email = String(body.clientEmail || body.email || "").trim().toLowerCase();
  const details = String(body.details || body.message || "").trim();

  if (!email || !details) {
    return res.status(400).json({ error: "Email and details/message are required." });
  }

  const id = body.id || makeOrderId();
  const createdAt = nowIso();
  const userId = req.userId || GUEST_USER_ID;

  db.prepare(`
    INSERT INTO orders (
      id, user_id, items, total, currency, status, stage,
      service, budget, deadline, assigned_dev_id, order_date, created_at,
      client_email, client_name, client_phone, pay_method, details, source
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    userId,
    JSON.stringify(body.items || []),
    Number(body.total || 0),
    body.currency || "USD",
    body.status || "open",
    body.stage || "Inquiry",
    body.service || body.category || "",
    body.budget || "",
    body.deadline || "",
    null,
    createdAt.slice(0, 10),
    createdAt,
    email,
    body.clientName || body.name || "Client",
    body.phone || body.clientPhone || "",
    body.pay || body.payMethod || "",
    details,
    body.source || "index-order"
  );

  if (req.userId) logActivity(req.userId, "inquiry_created", { orderId: id });

  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(id);
  res.status(201).json({ order: toOrder(row) });
});

export default router;
