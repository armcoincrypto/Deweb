import { Router } from "express";
import { db, uid, nowIso, logActivity, GUEST_USER_ID } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { toOrder, sumCartItems } from "../utils/helpers.js";
import { debitWallet } from "./crypto.js";

const router = Router();
const PLATFORM_USER_ID = process.env.PLATFORM_USER_ID || GUEST_USER_ID;

router.post("/", requireAuth, (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  if (!items.length) {
    return res.status(400).json({ error: "Cart is empty." });
  }

  const promoCode = String(req.body.promoCode || "").trim().toUpperCase();
  let totalDeweb = Math.ceil(sumCartItems(items));

  if (promoCode === "HAYUGEN") {
    totalDeweb = 355;
  }

  if (totalDeweb <= 0) {
    return res.status(400).json({ error: "Invalid cart total." });
  }

  try {
    debitWallet(req.userId, totalDeweb, {
      type: "services_checkout",
      items: items.map((i) => i.name)
    });
  } catch (e) {
    if (e.message === "INSUFFICIENT_DEWEB") {
      return res.status(402).json({
        error: "Not enough DEWEB coins. Top up via the swap site first.",
        needTopUp: true
      });
    }
    throw e;
  }

  const id = uid();
  const createdAt = nowIso();

  db.prepare(`
    INSERT INTO orders (
      id, user_id, items, total, currency, status, stage,
      service, budget, deadline, assigned_dev_id, order_date, created_at,
      client_email, client_name, pay_method, details, source
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    req.userId,
    JSON.stringify(items),
    totalDeweb,
    "DEWEB",
    "paid",
    "In Progress",
    items.map((i) => i.name).join(", ").slice(0, 200),
    "",
    "",
    null,
    createdAt.slice(0, 10),
    createdAt,
    null,
    null,
    "deweb",
    `Checkout: ${items.length} item(s) — ${totalDeweb} DEWEB`,
    "services-checkout"
  );

  logActivity(req.userId, "checkout_deweb", { orderId: id, totalDeweb });

  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(id);
  res.status(201).json({
    ok: true,
    order: toOrder(row),
    message: `Paid ${totalDeweb} DEWEB. Order confirmed.`
  });
});

router.post("/promo", (req, res) => {
  const code = String(req.body.code || "").trim().toUpperCase();
  if (code === "HAYUGEN") {
    return res.json({ valid: true, code, price: "355 DEWEB", dewebAmount: 355 });
  }
  res.json({ valid: false, code, message: "Invalid promocode." });
});

export default router;
