import { Router } from "express";
import { db, uid, nowIso, logActivity } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { transferDeweb, debitWallet } from "./crypto.js";
import { getAdminUserId } from "../utils/admin.js";

const router = Router();
const PROVIDERS = ["MetaMask", "Ronin"];

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

function getLinkedWallets(userId) {
  return db.prepare(`
    SELECT provider, address, connected_at AS connectedAt
    FROM user_linked_wallets WHERE user_id = ?
    ORDER BY provider
  `).all(userId);
}

function syncLegacyWallet(userId) {
  const row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(userId);
  if (row?.provider && row?.address) {
    const exists = db.prepare(`
      SELECT 1 FROM user_linked_wallets WHERE user_id = ? AND provider = ?
    `).get(userId, row.provider);
    if (!exists) {
      db.prepare(`
        INSERT INTO user_linked_wallets (user_id, provider, address, connected_at)
        VALUES (?, ?, ?, ?)
      `).run(userId, row.provider, row.address, nowIso());
    }
  }
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
  syncLegacyWallet(req.userId);
  const linked = getLinkedWallets(req.userId);
  res.json({ wallet: toWallet(row), linkedWallets: linked });
});

router.get("/linked", requireAuth, (req, res) => {
  syncLegacyWallet(req.userId);
  res.json({ linkedWallets: getLinkedWallets(req.userId) });
});

router.post("/linked", requireAuth, (req, res) => {
  const provider = String(req.body.provider || "").trim();
  const address = String(req.body.address || "").trim();
  if (!PROVIDERS.includes(provider)) {
    return res.status(400).json({ error: "provider must be MetaMask or Ronin." });
  }
  if (!address || !/^0x[a-f0-9]{40}$/i.test(address)) {
    return res.status(400).json({ error: "Valid wallet address required." });
  }

  const taken = db.prepare(`
    SELECT user_id FROM user_linked_wallets
    WHERE provider = ? AND address = ? AND user_id != ?
  `).get(provider, address, req.userId);
  if (taken) {
    return res.status(409).json({ error: "This wallet is already linked to another account." });
  }

  db.prepare(`
    INSERT INTO user_linked_wallets (user_id, provider, address, connected_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id, provider) DO UPDATE SET address = excluded.address, connected_at = excluded.connected_at
  `).run(req.userId, provider, address, nowIso());

  db.prepare(`
    UPDATE wallets SET created = 1, connected = 1, provider = ?, address = ? WHERE user_id = ?
  `).run(provider, address, req.userId);

  logActivity(req.userId, "wallet_connected", { provider, address });
  res.json({ linkedWallets: getLinkedWallets(req.userId) });
});

router.delete("/linked/:provider", requireAuth, (req, res) => {
  const provider = String(req.params.provider || "").trim();
  if (!PROVIDERS.includes(provider)) {
    return res.status(400).json({ error: "Invalid provider." });
  }
  db.prepare("DELETE FROM user_linked_wallets WHERE user_id = ? AND provider = ?").run(
    req.userId, provider
  );
  const remaining = getLinkedWallets(req.userId);
  const last = remaining[0];
  db.prepare(`
    UPDATE wallets SET connected = ?, provider = ?, address = ? WHERE user_id = ?
  `).run(remaining.length ? 1 : 0, last?.provider || "", last?.address || "", req.userId);
  res.json({ linkedWallets: remaining });
});

router.patch("/me", requireAuth, (req, res) => {
  const current = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  if (!current) {
    db.prepare(`
      INSERT INTO wallets (user_id, created, connected, deweb, pending_withdraw)
      VALUES (?, 0, 0, 0, 0)
    `).run(req.userId);
  }

  const row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  const next = {
    created: req.body.created !== undefined ? (req.body.created ? 1 : 0) : (row?.created || 0),
    connected: req.body.connected !== undefined ? (req.body.connected ? 1 : 0) : (row?.connected || 0),
    provider: req.body.provider !== undefined ? req.body.provider : (row?.provider || ""),
    address: req.body.address !== undefined ? req.body.address : (row?.address || ""),
    deweb: row?.deweb || 0,
    pendingWithdraw: req.body.pendingWithdraw !== undefined
      ? Number(req.body.pendingWithdraw)
      : (row?.pending_withdraw || 0)
  };

  db.prepare(`
    UPDATE wallets
    SET created = ?, connected = ?, provider = ?, address = ?, deweb = ?, pending_withdraw = ?
    WHERE user_id = ?
  `).run(
    next.created, next.connected, next.provider, next.address, next.deweb, next.pendingWithdraw,
    req.userId
  );

  const updated = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  res.json({ wallet: toWallet(updated), linkedWallets: getLinkedWallets(req.userId), updatedAt: nowIso() });
});

router.post("/connect", requireAuth, (req, res) => {
  req.body.provider = req.body.provider;
  req.body.address = req.body.address;
  const provider = String(req.body.provider || "").trim();
  const address = String(req.body.address || "").trim();
  if (!provider || !address) {
    return res.status(400).json({ error: "provider and address required." });
  }
  db.prepare(`
    INSERT INTO user_linked_wallets (user_id, provider, address, connected_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id, provider) DO UPDATE SET address = excluded.address, connected_at = excluded.connected_at
  `).run(req.userId, provider, address, nowIso());
  db.prepare(`
    UPDATE wallets SET created = 1, connected = 1, provider = ?, address = ? WHERE user_id = ?
  `).run(provider, address, req.userId);
  logActivity(req.userId, "wallet_connected", { provider, address });
  const row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  res.json({ wallet: toWallet(row), linkedWallets: getLinkedWallets(req.userId) });
});

router.post("/topup/intent", requireAuth, (req, res) => {
  const provider = String(req.body.provider || "").trim();
  const dewebAmount = Number(req.body.dewebAmount || 0);
  if (!PROVIDERS.includes(provider)) {
    return res.status(400).json({ error: "Select MetaMask or Ronin." });
  }
  if (dewebAmount <= 0) {
    return res.status(400).json({ error: "Enter a positive DEWEB amount (1 DEWEB = 1 USD)." });
  }

  const linked = db.prepare(`
    SELECT address FROM user_linked_wallets WHERE user_id = ? AND provider = ?
  `).get(req.userId, provider);
  if (!linked) {
    return res.status(400).json({ error: `Connect ${provider} first.` });
  }

  const treasury =
    provider === "Ronin"
      ? process.env.TREASURY_RONIN || process.env.TREASURY_ETH || ""
      : process.env.TREASURY_ETH || "";
  if (!treasury) {
    return res.status(503).json({ error: "Treasury wallet not configured on server." });
  }

  const ethUsd = Number(process.env.ETH_USD_RATE || 3500);
  const ethAmount = dewebAmount / ethUsd;
  const wei = BigInt(Math.floor(ethAmount * 1e18));

  res.json({
    provider,
    dewebAmount,
    usdAmount: dewebAmount,
    fromAddress: linked.address,
    treasuryAddress: treasury,
    ethAmount,
    valueWei: "0x" + wei.toString(16),
    chainHint: provider === "Ronin" ? "ronin" : "ethereum",
    message: `Send ~${ethAmount.toFixed(6)} ETH (≈ $${dewebAmount} USD) to receive ${dewebAmount} DEWEB.`
  });
});

router.post("/topup/confirm", requireAuth, (req, res) => {
  const provider = String(req.body.provider || "").trim();
  const dewebAmount = Number(req.body.dewebAmount || 0);
  const txHash = String(req.body.txHash || "").trim();
  const fromAddress = String(req.body.fromAddress || "").trim();

  if (!txHash || dewebAmount <= 0) {
    return res.status(400).json({ error: "txHash and dewebAmount required." });
  }

  const linked = db.prepare(`
    SELECT address FROM user_linked_wallets WHERE user_id = ? AND provider = ?
  `).get(req.userId, provider);
  if (!linked) {
    return res.status(400).json({ error: "Wallet not linked." });
  }

  const dup = db.prepare("SELECT id FROM crypto_topups WHERE tx_hash = ?").get(txHash);
  if (dup) {
    return res.status(409).json({ error: "This transaction was already processed." });
  }

  const topupId = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO crypto_topups (id, user_id, provider, from_address, tx_hash, deweb_amount, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, 'credited', ?)
  `).run(topupId, req.userId, provider, fromAddress || linked.address, txHash, dewebAmount, t);

  try {
    transferDeweb(getAdminUserId(), req.userId, dewebAmount, {
      type: "wallet_topup",
      txHash,
      provider,
      fromAddress: fromAddress || linked.address
    });
  } catch (e) {
    if (e.message === "INSUFFICIENT_DEWEB") {
      return res.status(503).json({ error: "Platform treasury low. Contact support with your tx hash." });
    }
    throw e;
  }

  db.prepare("UPDATE crypto_topups SET credited_at = ? WHERE id = ?").run(nowIso(), topupId);
  logActivity(req.userId, "deweb_topup", { dewebAmount, txHash, provider });

  const row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  res.json({
    ok: true,
    credited: dewebAmount,
    wallet: toWallet(row),
    linkedWallets: getLinkedWallets(req.userId)
  });
});

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
