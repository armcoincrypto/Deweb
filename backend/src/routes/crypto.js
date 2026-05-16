import { Router } from "express";
import { db, uid, nowIso, logActivity } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

/** Public config for frontend (swap URLs, deposit addresses). */
router.get("/config", (_req, res) => {
  res.json({
    swapBuyUrl: process.env.SWAP_SITE_BUY_URL || "",
    swapSellUrl: process.env.SWAP_SITE_SELL_URL || "",
    supportedCoins: ["USDT", "ETH", "BTC", "DASH"],
    depositAddresses: {
      USDT: process.env.TREASURY_USDT || "",
      ETH: process.env.TREASURY_ETH || "",
      BTC: process.env.TREASURY_BTC || "",
      DASH: process.env.TREASURY_DASH || ""
    },
    walletProviders: ["MetaMask", "Ronin"],
    dewebIsInternal: true
  });
});

/** Build swap URL with user context (your swap site can read query params). */
router.get("/swap-link", requireAuth, (req, res) => {
  const mode = req.query.mode === "sell" ? "sell" : "buy";
  const base = mode === "sell"
    ? process.env.SWAP_SITE_SELL_URL
    : process.env.SWAP_SITE_BUY_URL;

  if (!base) {
    return res.status(503).json({
      error: "Swap site URL not configured yet. Set SWAP_SITE_BUY_URL / SWAP_SITE_SELL_URL in backend .env."
    });
  }

  const amount = req.query.amount || "";
  const coin = req.query.coin || "USDT";
  const url = new URL(base);
  url.searchParams.set("userId", req.userId);
  url.searchParams.set("ref", "deweb");
  if (amount) url.searchParams.set("amount", amount);
  if (coin) url.searchParams.set("coin", coin);

  res.json({ url: url.toString(), mode });
});

/**
 * Webhook: your swap site calls this after crypto received → credit DEWEB.
 * Protect with SWAP_WEBHOOK_SECRET header.
 */
router.post("/webhook/credit", (req, res) => {
  const secret = req.headers["x-swap-webhook-secret"] || req.body.secret;
  if (!process.env.SWAP_WEBHOOK_SECRET || secret !== process.env.SWAP_WEBHOOK_SECRET) {
    return res.status(401).json({ error: "Invalid webhook secret." });
  }

  const userId = String(req.body.userId || "").trim();
  const dewebAmount = Number(req.body.dewebAmount || req.body.amount || 0);
  const txRef = String(req.body.txRef || req.body.txId || "").trim();

  if (!userId || dewebAmount <= 0) {
    return res.status(400).json({ error: "userId and dewebAmount required." });
  }

  creditWallet(userId, dewebAmount, {
    type: "crypto_deposit",
    txRef,
    coin: req.body.coin,
    cryptoAmount: req.body.cryptoAmount
  });

  logActivity(userId, "deweb_credited", { dewebAmount, txRef });
  res.json({ ok: true, credited: dewebAmount });
});

export function creditWallet(userId, amount, meta = {}) {
  const row = db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(userId);
  if (!row) {
    db.prepare(`
      INSERT INTO wallets (user_id, created, connected, deweb, pending_withdraw)
      VALUES (?, 1, 0, 0, 0)
    `).run(userId);
  }
  const current = db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(userId);
  const next = (current?.deweb || 0) + amount;
  db.prepare("UPDATE wallets SET deweb = ?, created = 1 WHERE user_id = ?").run(next, userId);
  insertTx(userId, null, "credit", amount, next, meta);
  return next;
}

export function debitWallet(userId, amount, meta = {}) {
  const current = db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(userId);
  const balance = current?.deweb || 0;
  if (balance < amount) {
    throw new Error("INSUFFICIENT_DEWEB");
  }
  const next = balance - amount;
  db.prepare("UPDATE wallets SET deweb = ? WHERE user_id = ?").run(next, userId);
  insertTx(userId, null, "debit", amount, next, meta);
  return next;
}

function insertTx(userId, counterpartyId, type, amount, balanceAfter, meta) {
  db.prepare(`
    INSERT INTO wallet_transactions (id, user_id, counterparty_id, type, amount, balance_after, meta, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    uid(), userId, counterpartyId, type, amount, balanceAfter,
    JSON.stringify(meta || {}), nowIso()
  );
}

export function transferDeweb(fromUserId, toUserId, amount, meta = {}) {
  const run = db.transaction(() => {
    debitWallet(fromUserId, amount, { ...meta, to: toUserId });
    creditWallet(toUserId, amount, { ...meta, from: fromUserId });
    insertTx(fromUserId, toUserId, "transfer_out", amount,
      db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(fromUserId).deweb, meta);
    insertTx(toUserId, fromUserId, "transfer_in", amount,
      db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(toUserId).deweb, meta);
  });
  run();
}

export default router;
