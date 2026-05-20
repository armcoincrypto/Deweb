import { Router } from "express";
import { db, uid, nowIso, logActivity } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { getAdminUserId } from "../utils/admin.js";

const router = Router();

/** Public config for frontend (swap URLs, deposit addresses). */
router.get("/config", (_req, res) => {
  res.json({
    swapBuyUrl: process.env.SWAP_SITE_BUY_URL || "",
    swapSellUrl: process.env.SWAP_SITE_SELL_URL || "",
    topUpCoin: "USDT",
    supportedCoins: ["USDT"],
    depositAddresses: {
      USDT: process.env.TREASURY_USDT || ""
    },
    usdtContracts: {
      MetaMask: process.env.USDT_CONTRACT_ETH || "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      Ronin: process.env.USDT_CONTRACT_RONIN || "0x97a9107c1791bc656a31382e6A152ef171ad99cD"
    },
    treasuryUsdt: process.env.TREASURY_USDT || "",
    dewebUsdRate: Number(process.env.DEWEB_USD_RATE || 1),
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

  const adminId = getAdminUserId();
  try {
    transferDeweb(adminId, userId, dewebAmount, {
      type: "crypto_deposit",
      txRef,
      coin: req.body.coin,
      cryptoAmount: req.body.cryptoAmount
    });
  } catch (e) {
    if (e.message === "INSUFFICIENT_DEWEB") {
      return res.status(503).json({ error: "Admin treasury has insufficient DEWEB. Contact platform admin." });
    }
    throw e;
  }

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
