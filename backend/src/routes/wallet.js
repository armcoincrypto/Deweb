import { Router } from "express";
import { db, nowIso } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

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
    deweb: req.body.deweb !== undefined ? Number(req.body.deweb) : (current?.deweb || 0),
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

export default router;
