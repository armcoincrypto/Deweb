import { Router } from "express";
import { db, toUserRow, nowIso } from "../db.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { transferDeweb, creditWallet } from "./crypto.js";
import { getAdminUserId, DEWEB_USD_RATE } from "../utils/admin.js";
import { sendAdminEmail } from "../services/mail.js";

const router = Router();
router.use(requireAdmin);

router.get("/stats", (req, res) => {
  const adminId = getAdminUserId();
  const adminWallet = db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(adminId);
  const users = db.prepare("SELECT COUNT(*) AS c FROM users").get().c;
  const orders = db.prepare("SELECT COUNT(*) AS c FROM orders").get().c;
  const openSupport = db.prepare(`
    SELECT COUNT(*) AS c FROM support_threads WHERE status IN ('human_pending', 'human_active')
  `).get().c;

  res.json({
    adminBalance: adminWallet?.deweb || 0,
    dewebUsdRate: DEWEB_USD_RATE,
    users,
    orders,
    openSupport
  });
});

router.get("/users", (req, res) => {
  const q = String(req.query.q || "").trim().toLowerCase();
  let rows;
  if (q) {
    rows = db.prepare(`
      SELECT u.*, w.deweb FROM users u
      LEFT JOIN wallets w ON w.user_id = u.id
      WHERE lower(u.email) LIKE ? OR lower(u.username) LIKE ? OR lower(u.name) LIKE ?
      ORDER BY u.created_at DESC LIMIT 100
    `).all(`%${q}%`, `%${q}%`, `%${q}%`);
  } else {
    rows = db.prepare(`
      SELECT u.*, w.deweb FROM users u
      LEFT JOIN wallets w ON w.user_id = u.id
      ORDER BY u.created_at DESC LIMIT 100
    `).all();
  }
  res.json({
    users: rows.map((r) => ({
      ...toUserRow(r),
      dewebBalance: r.deweb || 0
    }))
  });
});

router.get("/orders", (_req, res) => {
  const rows = db.prepare(`
    SELECT o.*, u.email AS client_email_lookup
    FROM orders o
    LEFT JOIN users u ON u.id = o.user_id
    ORDER BY o.created_at DESC LIMIT 200
  `).all();
  res.json({ orders: rows });
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

router.post("/wallet/mint", (req, res) => {
  const amount = Number(req.body.amount || 0);
  if (amount <= 0) return res.status(400).json({ error: "Positive amount required." });
  const adminId = getAdminUserId();
  const next = creditWallet(adminId, amount, { type: "admin_mint" });
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

  const id = `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
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

export default router;
