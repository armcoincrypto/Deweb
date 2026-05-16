import { Router } from "express";
import { db, nowIso, logActivity } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { transferDeweb, debitWallet } from "./crypto.js";

const router = Router();

function toWallet(row) {
  if (!row) {
    return {
      created: false,
      connected: false,
      provider: "",
      address: "",
      deweb: 0,
      pendingWithdraw: 0
    };
  }
  return {
    created: Boolean(row.created),
    connected: Boolean(row.connected),
    provider: row.provider || "",
    address: row.address || "",
    deweb: row.deweb,
    pendingWithdraw: row.pending_withdraw
  };
}

router.get("/me", requireAuth, (req, res) => {
  let row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  if (!row) {
    db.prepare(`
      INSERT INTO wallets (user_id, created, connected, deweb, pending_withdraw)
      VALUES (?, 0, 0, 0, 0)
    `).run(req.userId);
    row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  }
  res.json({ wallet: toWallet(row) });
});

router.patch("/me", requireAuth, (req, res) => {
  const current = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  if (!current) {
    db.prepare(`
      INSERT INTO wallets (user_id, created, connected, deweb, pending_withdraw)
      VALUES (?, 0, 0, 0, 0)
    `).run(req.userId);
  }

  const next = {
    created: req.body.created !== undefined ? (req.body.created ? 1 : 0) : (current?.created || 0),
    connected: req.body.connected !== undefined ? (req.body.connected ? 1 : 0) : (current?.connected || 0),
    provider: req.body.provider !== undefined ? req.body.provider : (current?.provider || ""),
    address: req.body.address !== undefined ? req.body.address : (current?.address || ""),
    deweb: current?.deweb || 0,
    pendingWithdraw: req.body.pendingWithdraw !== undefined
      ? Number(req.body.pendingWithdraw)
      : (current?.pending_withdraw || 0)
  };

  db.prepare(`
    UPDATE wallets
    SET created = ?, connected = ?, provider = ?, address = ?, deweb = ?, pending_withdraw = ?
    WHERE user_id = ?
  `).run(
    next.created, next.connected, next.provider, next.address, next.deweb, next.pendingWithdraw,
    req.userId
  );

  const row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  res.json({ wallet: toWallet(row), updatedAt: nowIso() });
});

/** Connect MetaMask / Ronin — stores address only; deposits credited via swap webhook or chain watcher. */
router.post("/connect", requireAuth, (req, res) => {
  const provider = String(req.body.provider || "").trim();
  const address = String(req.body.address || "").trim();
  if (!provider || !address) {
    return res.status(400).json({ error: "provider and address required." });
  }

  db.prepare(`
    UPDATE wallets SET created = 1, connected = 1, provider = ?, address = ?
    WHERE user_id = ?
  `).run(provider, address, req.userId);

  logActivity(req.userId, "wallet_connected", { provider, address });
  const row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  res.json({ wallet: toWallet(row) });
});

/** Pay another user (customer → seller) in DEWEB. */
router.post("/transfer", requireAuth, (req, res) => {
  const toUserId = String(req.body.toUserId || "").trim();
  const amount = Number(req.body.amount || 0);
  if (!toUserId || amount <= 0) {
    return res.status(400).json({ error: "toUserId and positive amount required." });
  }
  if (toUserId === req.userId) {
    return res.status(400).json({ error: "Cannot transfer to yourself." });
  }
  const recipient = db.prepare("SELECT id FROM users WHERE id = ?").get(toUserId);
  if (!recipient) return res.status(404).json({ error: "Recipient not found." });

  try {
    transferDeweb(req.userId, toUserId, amount, {
      orderId: req.body.orderId,
      productId: req.body.productId,
      note: req.body.note
    });
    logActivity(req.userId, "deweb_transfer", { toUserId, amount });
    const row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
    res.json({ ok: true, wallet: toWallet(row) });
  } catch (e) {
    if (e.message === "INSUFFICIENT_DEWEB") {
      return res.status(402).json({ error: "Not enough DEWEB coins." });
    }
    throw e;
  }
});

router.get("/transactions", requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM wallet_transactions WHERE user_id = ?
    ORDER BY created_at DESC LIMIT 50
  `).all(req.userId);
  res.json({
    transactions: rows.map((r) => ({
      id: r.id,
      type: r.type,
      amount: r.amount,
      balanceAfter: r.balance_after,
      counterpartyId: r.counterparty_id,
      createdAt: r.created_at,
      meta: r.meta ? JSON.parse(r.meta) : {}
    }))
  });
});

export default router;
