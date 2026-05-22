import { Router } from "express";
import { db, uid, nowIso, logActivity } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { requireEmailVerified } from "../middleware/requireEmailVerified.js";
import { transferDeweb } from "./crypto.js";
import { getUsdtConfig, usdtAmountToRaw, encodeUsdtTransfer } from "../utils/usdt.js";
import { processTopupVerification } from "../services/topupProcessor.js";

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

router.get("/config", (_req, res) => {
  const mm = getUsdtConfig("MetaMask");
  const rn = getUsdtConfig("Ronin");
  res.json({
    providers: PROVIDERS,
    coin: "USDT",
    dewebUsdRate: Number(process.env.DEWEB_USD_RATE || 1),
    metamask: {
      treasuryAddress: mm.treasury,
      tokenContract: mm.contract,
      chainId: mm.chainId,
      rpcConfigured: Boolean(mm.rpcUrl)
    },
    ronin: {
      treasuryAddress: rn.treasury,
      tokenContract: rn.contract,
      chainId: rn.chainId,
      rpcConfigured: Boolean(rn.rpcUrl)
    }
  });
});

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
  const user = db.prepare("SELECT email_verified FROM users WHERE id = ?").get(req.userId);
  res.json({
    wallet: toWallet(row),
    linkedWallets: getLinkedWallets(req.userId),
    emailVerified: Boolean(user?.email_verified)
  });
});

router.get("/linked", requireAuth, (req, res) => {
  syncLegacyWallet(req.userId);
  res.json({ linkedWallets: getLinkedWallets(req.userId) });
});

router.post("/linked", requireAuth, requireEmailVerified, (req, res) => {
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

router.delete("/linked/:provider", requireAuth, requireEmailVerified, (req, res) => {
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

router.post("/topup/intent", requireAuth, requireEmailVerified, (req, res) => {
  const provider = String(req.body.provider || "").trim();
  const dewebAmount = Number(req.body.dewebAmount || 0);
  if (!PROVIDERS.includes(provider)) {
    return res.status(400).json({ error: "Select MetaMask or Ronin." });
  }
  if (dewebAmount <= 0) {
    return res.status(400).json({ error: "Enter a positive amount (1 DEWEB = 1 USDT)." });
  }

  const linked = db.prepare(`
    SELECT address FROM user_linked_wallets WHERE user_id = ? AND provider = ?
  `).get(req.userId, provider);
  if (!linked) {
    return res.status(400).json({ error: `Connect ${provider} first.` });
  }

  const cfg = getUsdtConfig(provider);
  if (!cfg.treasury) {
    return res.status(503).json({
      error: `Set TREASURY_USDT_${provider === "Ronin" ? "RONIN" : "METAMASK"} in server .env.`
    });
  }

  const usdtAmount = dewebAmount;
  const amountRaw = usdtAmountToRaw(usdtAmount);
  const txData = encodeUsdtTransfer(cfg.treasury, amountRaw);

  res.json({
    provider,
    coin: "USDT",
    dewebAmount,
    usdtAmount,
    fromAddress: linked.address,
    treasuryAddress: cfg.treasury,
    tokenContract: cfg.contract,
    chainId: cfg.chainId,
    txData,
    amountRaw: amountRaw.toString(),
    message: `Send exactly ${usdtAmount} USDT to the DEWEB treasury address shown. DEWEB is credited automatically after confirmation.`
  });
});

async function submitTopup(req, res) {
  const provider = String(req.body.provider || "").trim();
  const dewebAmount = Number(req.body.dewebAmount || 0);
  const txHash = String(req.body.txHash || "").trim();
  const fromAddress = String(req.body.fromAddress || "").trim();

  if (!txHash || dewebAmount <= 0 || !PROVIDERS.includes(provider)) {
    return res.status(400).json({ error: "provider, txHash, and dewebAmount required." });
  }

  const linked = db.prepare(`
    SELECT address FROM user_linked_wallets WHERE user_id = ? AND provider = ?
  `).get(req.userId, provider);
  if (!linked) {
    return res.status(400).json({ error: "Wallet not linked." });
  }

  const from = (fromAddress || linked.address).toLowerCase();
  const dup = db.prepare("SELECT id, status FROM crypto_topups WHERE tx_hash = ?").get(txHash);
  if (dup) {
    if (dup.status === "credited") {
      return res.status(409).json({ error: "This transaction was already credited." });
    }
    const result = await processTopupVerification(dup.id);
    const row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
    return res.json({ topupId: dup.id, ...result, wallet: toWallet(row) });
  }

  const topupId = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO crypto_topups (id, user_id, provider, from_address, tx_hash, deweb_amount, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, 'verifying', ?)
  `).run(topupId, req.userId, provider, from, txHash, dewebAmount, t);

  const result = await processTopupVerification(topupId);
  const row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  res.json({ topupId, ...result, wallet: toWallet(row), linkedWallets: getLinkedWallets(req.userId) });
}

router.post("/topup/submit", requireAuth, requireEmailVerified, (req, res) => {
  submitTopup(req, res).catch((e) => {
    console.error(e);
    res.status(500).json({ error: e.message || "Top-up failed." });
  });
});

router.post("/topup/confirm", requireAuth, requireEmailVerified, (req, res) => {
  submitTopup(req, res).catch((e) => {
    console.error(e);
    res.status(500).json({ error: e.message || "Top-up failed." });
  });
});

router.get("/topup/:id/status", requireAuth, requireEmailVerified, async (req, res) => {
  const topup = db.prepare("SELECT * FROM crypto_topups WHERE id = ? AND user_id = ?").get(
    req.params.id,
    req.userId
  );
  if (!topup) return res.status(404).json({ error: "Top-up not found." });

  const result =
    topup.status === "credited" || topup.status === "failed"
      ? { status: topup.status, credited: topup.status === "credited" ? topup.deweb_amount : 0 }
      : await processTopupVerification(topup.id);

  const row = db.prepare("SELECT * FROM wallets WHERE user_id = ?").get(req.userId);
  res.json({ topupId: topup.id, ...result, wallet: toWallet(row) });
});

router.post("/transfer", requireAuth, requireEmailVerified, (req, res) => {
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
