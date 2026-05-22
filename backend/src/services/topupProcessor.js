import { db, nowIso, logActivity } from "../db.js";
import { transferDeweb } from "../routes/crypto.js";
import { getAdminUserId } from "../utils/admin.js";
import { verifyUsdtTransfer } from "./chainVerify.js";
import { getUsdtConfig } from "../utils/usdt.js";

export async function processTopupVerification(topupId) {
  const topup = db.prepare("SELECT * FROM crypto_topups WHERE id = ?").get(topupId);
  if (!topup) return { status: "not_found" };
  if (topup.status === "credited") {
    return { status: "credited", credited: topup.deweb_amount };
  }
  if (topup.status === "failed") {
    return { status: "failed", error: topup.admin_note || "Verification failed" };
  }

  const { treasury } = getUsdtConfig(topup.provider);
  const result = await verifyUsdtTransfer(
    topup.provider,
    topup.tx_hash,
    topup.from_address,
    treasury,
    topup.deweb_amount
  );

  if (result.pending) {
    db.prepare("UPDATE crypto_topups SET status = 'verifying' WHERE id = ?").run(topupId);
    return { status: "verifying", message: result.reason || "Waiting for blockchain confirmation…" };
  }

  if (!result.ok) {
    db.prepare(`
      UPDATE crypto_topups SET status = 'failed', admin_note = ? WHERE id = ?
    `).run(result.reason || "Verification failed", topupId);
    return { status: "failed", error: result.reason };
  }

  try {
    transferDeweb(getAdminUserId(), topup.user_id, topup.deweb_amount, {
      type: "wallet_topup",
      txHash: topup.tx_hash,
      provider: topup.provider,
      verifiedAmount: result.amount
    });
  } catch (e) {
    if (e.message === "INSUFFICIENT_DEWEB") {
      return { status: "failed", error: "Platform treasury low. Contact support." };
    }
    throw e;
  }

  const t = nowIso();
  db.prepare(`
    UPDATE crypto_topups SET status = 'credited', credited_at = ?, admin_note = ? WHERE id = ?
  `).run(t, `Auto-verified ${result.amount} USDT`, topupId);
  logActivity(topup.user_id, "deweb_topup", {
    dewebAmount: topup.deweb_amount,
    txHash: topup.tx_hash,
    provider: topup.provider
  });

  const wallet = db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(topup.user_id);
  return {
    status: "credited",
    credited: topup.deweb_amount,
    balance: wallet?.deweb || 0
  };
}
