import { Router } from "express";
import { db, toUserRow, nowIso, uid, setPlatformStat, getPlatformStat } from "../db.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { transferDeweb, creditWallet, debitWallet } from "./crypto.js";
import { getAdminUserId, DEWEB_USD_RATE } from "../utils/admin.js";
import { sendAdminEmail } from "../services/mail.js";
import { releaseEscrow, refundEscrow, toEscrowRow } from "../services/escrow.js";
import { toOrder } from "../utils/helpers.js";

const router = Router();
router.use(requireAdmin);

function toProduct(row) {
  return {
    id: row.id,
    sellerId: row.seller_id,
    sellerName: row.seller_name,
    title: row.title,
    price: row.price,
    category: row.category,
    description: row.description,
    imageUrl: row.image_url || "",
    views: row.views,
    rating: row.rating,
    updatedAt: row.updated_at
  };
}

router.get("/stats", (req, res) => {
  const adminId = getAdminUserId();
  const adminWallet = db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(adminId);
  const users = db.prepare("SELECT COUNT(*) AS c FROM users").get().c;
  const orders = db.prepare("SELECT COUNT(*) AS c FROM orders").get().c;
  const openSupport = db.prepare(`
    SELECT COUNT(*) AS c FROM support_threads WHERE status IN ('human_pending', 'human_active')
  `).get().c;
  const pendingTopups = db.prepare(`
    SELECT COUNT(*) AS c FROM crypto_topups WHERE status = 'pending'
  `).get().c;
  const heldEscrow = db.prepare(`
    SELECT COALESCE(SUM(amount), 0) AS s FROM escrow_holds WHERE status = 'held'
  `).get().s;
  const linkedWallets = db.prepare("SELECT COUNT(*) AS c FROM user_linked_wallets").get().c;
  const volume = db.prepare(`
    SELECT COALESCE(SUM(ABS(amount)), 0) AS s FROM wallet_transactions
  `).get().s;

  const displayStats = {
    users: getPlatformStat("display_users", String(users)),
    orders: getPlatformStat("display_orders", String(orders)),
    volume: getPlatformStat("display_volume", String(volume)),
    successRate: getPlatformStat("display_success_rate", "94")
  };

  res.json({
    adminBalance: adminWallet?.deweb || 0,
    dewebUsdRate: DEWEB_USD_RATE,
    users,
    orders,
    openSupport,
    pendingTopups,
    heldEscrow,
    linkedWallets,
    transactionVolume: volume,
    displayStats
  });
});

router.get("/platform-stats", (_req, res) => {
  const rows = db.prepare("SELECT key, value, label, updated_at AS updatedAt FROM platform_stats").all();
  res.json({ stats: rows });
});

router.put("/platform-stats", (req, res) => {
  const items = req.body.stats || req.body;
  if (!items || typeof items !== "object") {
    return res.status(400).json({ error: "stats object required." });
  }
  for (const [key, val] of Object.entries(items)) {
    const label = typeof val === "object" && val?.label ? val.label : key;
    const value = typeof val === "object" ? val.value : val;
    setPlatformStat(key, value, label);
  }
  res.json({ ok: true });
});

router.get("/users", (req, res) => {
  const q = String(req.query.q || "").trim().toLowerCase();
  let rows;
  if (q) {
    rows = db.prepare(`
      SELECT u.*, w.deweb FROM users u
      LEFT JOIN wallets w ON w.user_id = u.id
      WHERE lower(u.email) LIKE ? OR lower(u.username) LIKE ? OR lower(u.name) LIKE ? OR u.id = ?
      ORDER BY u.created_at DESC LIMIT 200
    `).all(`%${q}%`, `%${q}%`, `%${q}%`, q);
  } else {
    rows = db.prepare(`
      SELECT u.*, w.deweb FROM users u
      LEFT JOIN wallets w ON w.user_id = u.id
      ORDER BY u.created_at DESC LIMIT 200
    `).all();
  }
  res.json({
    users: rows.map((r) => ({
      ...toUserRow(r),
      dewebBalance: r.deweb || 0
    }))
  });
});

router.get("/users/:id", (req, res) => {
  const row = db.prepare(`
    SELECT u.*, w.deweb, w.connected, w.provider, w.address
    FROM users u LEFT JOIN wallets w ON w.user_id = u.id WHERE u.id = ?
  `).get(req.params.id);
  if (!row) return res.status(404).json({ error: "User not found." });
  const linked = db.prepare(`
    SELECT provider, address, connected_at AS connectedAt FROM user_linked_wallets WHERE user_id = ?
  `).all(req.params.id);
  res.json({ user: { ...toUserRow(row), dewebBalance: row.deweb || 0 }, linkedWallets: linked });
});

router.patch("/users/:id", (req, res) => {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found." });

  const fields = {
    name: "name",
    username: "username",
    email: "email",
    phone: "phone",
    role: "role",
    accountMode: "account_mode",
    kycStatus: "kyc_status",
    avatarUrl: "avatar_url"
  };
  const updates = [];
  const values = [];
  for (const [key, col] of Object.entries(fields)) {
    if (req.body[key] !== undefined) {
      updates.push(`${col} = ?`);
      values.push(req.body[key]);
    }
  }
  if (req.body.emailVerified !== undefined) {
    updates.push("email_verified = ?");
    values.push(req.body.emailVerified ? 1 : 0);
  }
  if (!updates.length) return res.status(400).json({ error: "No fields to update." });
  values.push(req.params.id);
  db.prepare(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`).run(...values);
  const updated = toUserRow(db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id));
  res.json({ user: updated });
});

router.get("/wallets/linked", (_req, res) => {
  const rows = db.prepare(`
    SELECT l.*, u.email, u.username, u.name
    FROM user_linked_wallets l
    JOIN users u ON u.id = l.user_id
    ORDER BY l.connected_at DESC LIMIT 300
  `).all();
  res.json({ connections: rows });
});

router.get("/transactions", (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 100, 500);
  const rows = db.prepare(`
    SELECT t.*, u.email AS user_email
    FROM wallet_transactions t
    LEFT JOIN users u ON u.id = t.user_id
    ORDER BY t.created_at DESC LIMIT ?
  `).all(limit);
  res.json({
    transactions: rows.map((r) => ({
      id: r.id,
      userId: r.user_id,
      userEmail: r.user_email,
      type: r.type,
      amount: r.amount,
      balanceAfter: r.balance_after,
      counterpartyId: r.counterparty_id,
      createdAt: r.created_at,
      meta: r.meta ? JSON.parse(r.meta) : {}
    }))
  });
});

router.get("/topups", (req, res) => {
  const status = req.query.status || "";
  let sql = `
    SELECT t.*, u.email, u.username FROM crypto_topups t
    JOIN users u ON u.id = t.user_id
  `;
  const params = [];
  if (status) {
    sql += " WHERE t.status = ?";
    params.push(status);
  }
  sql += " ORDER BY t.created_at DESC LIMIT 200";
  const rows = db.prepare(sql).all(...params);
  res.json({ topups: rows });
});

router.post("/topups/:id/approve", (req, res) => {
  const topup = db.prepare("SELECT * FROM crypto_topups WHERE id = ?").get(req.params.id);
  if (!topup) return res.status(404).json({ error: "Top-up not found." });
  if (topup.status !== "pending") {
    return res.status(400).json({ error: "Top-up is not pending." });
  }
  try {
    transferDeweb(getAdminUserId(), topup.user_id, topup.deweb_amount, {
      type: "wallet_topup_approved",
      txHash: topup.tx_hash,
      topupId: topup.id,
      by: req.adminUser.id
    });
  } catch (e) {
    if (e.message === "INSUFFICIENT_DEWEB") {
      return res.status(400).json({ error: "Treasury insufficient. Mint DEWEB first." });
    }
    throw e;
  }
  const t = nowIso();
  db.prepare(`
    UPDATE crypto_topups SET status = 'credited', credited_at = ?, admin_note = ? WHERE id = ?
  `).run(t, req.body.note || "Approved by admin", topup.id);
  res.json({ ok: true });
});

router.post("/topups/:id/reject", (req, res) => {
  const topup = db.prepare("SELECT * FROM crypto_topups WHERE id = ?").get(req.params.id);
  if (!topup) return res.status(404).json({ error: "Top-up not found." });
  db.prepare(`
    UPDATE crypto_topups SET status = 'rejected', admin_note = ? WHERE id = ?
  `).run(req.body.note || "Rejected", topup.id);
  res.json({ ok: true });
});

router.get("/orders", (_req, res) => {
  const rows = db.prepare(`
    SELECT o.*, u.email AS client_email_lookup, u.username AS client_username
    FROM orders o
    LEFT JOIN users u ON u.id = o.user_id
    ORDER BY o.created_at DESC LIMIT 300
  `).all();
  res.json({ orders: rows.map((r) => ({ ...toOrder(r), raw: r })) });
});

router.get("/orders/:id", (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found." });
  const bids = db.prepare("SELECT * FROM project_bids WHERE order_id = ? ORDER BY created_at DESC").all(order.id);
  const escrow = db.prepare("SELECT * FROM escrow_holds WHERE order_id = ? ORDER BY created_at DESC").get(order.id);
  res.json({
    order: toOrder(order),
    bids: bids.map((b) => ({
      id: b.id,
      sellerId: b.seller_id,
      sellerName: b.seller_name,
      price: b.price,
      status: b.status,
      timeline: b.timeline,
      message: b.message
    })),
    escrow: toEscrowRow(escrow)
  });
});

router.patch("/orders/:id", (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found." });
  const fieldMap = {
    status: "status",
    stage: "stage",
    service: "service",
    budget: "budget",
    deadline: "deadline",
    total: "total",
    details: "details",
    assigned_dev_id: "assigned_dev_id",
    assignedDevId: "assigned_dev_id",
    seller_id: "seller_id",
    sellerId: "seller_id"
  };
  const updates = [];
  const values = [];
  for (const [key, col] of Object.entries(fieldMap)) {
    if (req.body[key] !== undefined) {
      if (!updates.some((u) => u.startsWith(`${col} `))) {
        updates.push(`${col} = ?`);
        values.push(req.body[key]);
      }
    }
  }
  if (!updates.length) return res.status(400).json({ error: "No fields." });
  values.push(req.params.id);
  db.prepare(`UPDATE orders SET ${updates.join(", ")} WHERE id = ?`).run(...values);
  res.json({ order: toOrder(db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id)) });
});

router.get("/bids", (_req, res) => {
  const rows = db.prepare(`
    SELECT b.*, o.service, o.user_id AS buyer_id, u.email AS seller_email
    FROM project_bids b
    JOIN orders o ON o.id = b.order_id
    LEFT JOIN users u ON u.id = b.seller_id
    ORDER BY b.created_at DESC LIMIT 200
  `).all();
  res.json({ bids: rows });
});

router.get("/escrow", (req, res) => {
  const status = req.query.status || "held";
  const rows = db.prepare(`
    SELECT e.*, o.service, ub.email AS buyer_email, us.email AS seller_email
    FROM escrow_holds e
    JOIN orders o ON o.id = e.order_id
    LEFT JOIN users ub ON ub.id = e.buyer_id
    LEFT JOIN users us ON us.id = e.seller_id
    WHERE e.status = ?
    ORDER BY e.created_at DESC LIMIT 100
  `).all(status);
  res.json({ escrow: rows.map(toEscrowRow) });
});

router.post("/escrow/:id/release", (req, res) => {
  try {
    const row = releaseEscrow(req.params.id, req.adminUser.id, { note: req.body.note });
    res.json({ ok: true, escrow: toEscrowRow(row) });
  } catch (e) {
    if (e.message === "NOT_FOUND") return res.status(404).json({ error: "Escrow not found." });
    if (e.message === "INVALID_STATUS") return res.status(400).json({ error: "Escrow not in held state." });
    if (e.message === "INSUFFICIENT_DEWEB") {
      return res.status(400).json({ error: "Treasury insufficient to release." });
    }
    throw e;
  }
});

router.post("/escrow/:id/refund", (req, res) => {
  try {
    const row = refundEscrow(req.params.id, req.adminUser.id, { note: req.body.note });
    res.json({ ok: true, escrow: toEscrowRow(row) });
  } catch (e) {
    if (e.message === "NOT_FOUND") return res.status(404).json({ error: "Escrow not found." });
    if (e.message === "INVALID_STATUS") return res.status(400).json({ error: "Escrow not in held state." });
    throw e;
  }
});

router.get("/products", (_req, res) => {
  const rows = db.prepare("SELECT * FROM marketplace_products ORDER BY updated_at DESC LIMIT 200").all();
  res.json({ products: rows.map(toProduct) });
});

router.patch("/products/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM marketplace_products WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Product not found." });
  const fields = ["title", "price", "category", "description", "image_url", "seller_name", "views", "rating"];
  const updates = [];
  const values = [];
  for (const col of fields) {
    const key = col === "image_url" ? "imageUrl" : col === "seller_name" ? "sellerName" : col;
    if (req.body[key] !== undefined || req.body[col] !== undefined) {
      updates.push(`${col} = ?`);
      values.push(req.body[key] ?? req.body[col]);
    }
  }
  if (!updates.length) return res.status(400).json({ error: "No fields." });
  updates.push("updated_at = ?");
  values.push(nowIso(), req.params.id);
  db.prepare(`UPDATE marketplace_products SET ${updates.join(", ")} WHERE id = ?`).run(...values);
  res.json({ product: toProduct(db.prepare("SELECT * FROM marketplace_products WHERE id = ?").get(req.params.id)) });
});

router.delete("/products/:id", (req, res) => {
  db.prepare("DELETE FROM marketplace_products WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

router.post("/wallet/credit", (req, res) => {
  const userId = String(req.body.userId || "").trim();
  const amount = Number(req.body.amount || 0);
  if (!userId || amount <= 0) {
    return res.status(400).json({ error: "userId and positive amount required." });
  }
  const adminId = getAdminUserId();
  try {
    transferDeweb(adminId, userId, amount, { type: "admin_credit", by: req.adminUser.id });
  } catch (e) {
    if (e.message === "INSUFFICIENT_DEWEB") {
      return res.status(400).json({ error: "Admin treasury has insufficient DEWEB." });
    }
    throw e;
  }
  const balance = db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(userId);
  res.json({ ok: true, userBalance: balance?.deweb || 0 });
});

router.post("/wallet/debit", (req, res) => {
  const userId = String(req.body.userId || "").trim();
  const amount = Number(req.body.amount || 0);
  if (!userId || amount <= 0) {
    return res.status(400).json({ error: "userId and positive amount required." });
  }
  try {
    debitWallet(userId, amount, { type: "admin_debit", by: req.adminUser.id });
  } catch (e) {
    if (e.message === "INSUFFICIENT_DEWEB") {
      return res.status(400).json({ error: "User has insufficient DEWEB." });
    }
    throw e;
  }
  const balance = db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(userId);
  res.json({ ok: true, userBalance: balance?.deweb || 0 });
});

router.post("/wallet/mint", (req, res) => {
  const amount = Number(req.body.amount || 0);
  if (amount <= 0) return res.status(400).json({ error: "Positive amount required." });
  const adminId = getAdminUserId();
  const next = creditWallet(adminId, amount, { type: "admin_mint", by: req.adminUser.id });
  res.json({ ok: true, adminBalance: next });
});

router.get("/support/threads", (_req, res) => {
  const rows = db.prepare(`
    SELECT t.*, u.email, u.name,
      (SELECT body FROM support_messages WHERE thread_id = t.id ORDER BY created_at DESC LIMIT 1) AS last_message
    FROM support_threads t
    LEFT JOIN users u ON u.id = t.user_id
    ORDER BY
      CASE t.status WHEN 'human_pending' THEN 0 WHEN 'human_active' THEN 1 ELSE 2 END,
      t.updated_at DESC
    LIMIT 100
  `).all();
  res.json({ threads: rows });
});

router.get("/support/threads/:id/messages", (req, res) => {
  const thread = db.prepare("SELECT * FROM support_threads WHERE id = ?").get(req.params.id);
  if (!thread) return res.status(404).json({ error: "Thread not found." });
  const messages = db.prepare(`
    SELECT id, sender, body, created_at AS createdAt
    FROM support_messages WHERE thread_id = ? ORDER BY created_at ASC
  `).all(thread.id);
  const user = thread.user_id
    ? toUserRow(db.prepare("SELECT * FROM users WHERE id = ?").get(thread.user_id))
    : null;
  res.json({ thread, user, messages });
});

router.post("/support/threads/:id/reply", async (req, res) => {
  const text = String(req.body.message || "").trim();
  if (!text) return res.status(400).json({ error: "Message required." });

  const thread = db.prepare("SELECT * FROM support_threads WHERE id = ?").get(req.params.id);
  if (!thread) return res.status(404).json({ error: "Thread not found." });

  const id = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO support_messages (id, thread_id, sender, body, created_at)
    VALUES (?, ?, 'admin', ?, ?)
  `).run(id, thread.id, text, t);
  db.prepare("UPDATE support_threads SET status = 'human_active', updated_at = ? WHERE id = ?").run(t, thread.id);

  const userRow = thread.user_id
    ? db.prepare("SELECT email, name FROM users WHERE id = ?").get(thread.user_id)
    : null;
  if (userRow?.email) {
    await sendAdminEmail({
      subject: "[DEWEB] Support reply sent to user",
      text: `You replied to ${userRow.email}:\n\n${text}`
    });
  }

  res.json({ ok: true, message: { id, sender: "admin", body: text, createdAt: t } });
});

router.patch("/support/threads/:id", (req, res) => {
  const status = String(req.body.status || "").trim();
  if (!["ai", "human_pending", "human_active", "closed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }
  db.prepare("UPDATE support_threads SET status = ?, updated_at = ? WHERE id = ?").run(
    status, nowIso(), req.params.id
  );
  res.json({ ok: true });
});

router.get("/contact", (_req, res) => {
  const rows = db.prepare("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 100").all();
  res.json({ messages: rows });
});

router.get("/inquiries", (_req, res) => {
  const rows = db.prepare("SELECT * FROM service_inquiries ORDER BY created_at DESC LIMIT 100").all();
  res.json({ inquiries: rows });
});

export default router;
