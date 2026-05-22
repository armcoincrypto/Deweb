import { getUsdtConfig, rawToUsdt, TRANSFER_TOPIC } from "../utils/usdt.js";

async function rpcCall(rpcUrl, method, params) {
  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || "RPC error");
  return data.result;
}

function padAddress(addr) {
  return "0x" + addr.replace(/^0x/i, "").toLowerCase().padStart(64, "0");
}

/**
 * Verify USDT ERC-20 transfer in tx receipt logs.
 * Returns { ok, pending, amount, from, to, reason }
 */
export async function verifyUsdtTransfer(provider, txHash, expectedFrom, expectedTreasury, minUsdt) {
  const { contract, rpcUrl, treasury } = getUsdtConfig(provider);
  if (!rpcUrl) {
    return { ok: false, pending: false, reason: "RPC_URL not configured for " + provider };
  }
  if (!treasury) {
    return { ok: false, pending: false, reason: "Treasury address not configured" };
  }

  let receipt;
  try {
    receipt = await rpcCall(rpcUrl, "eth_getTransactionReceipt", [txHash]);
  } catch (e) {
    return { ok: false, pending: true, reason: e.message };
  }

  if (!receipt) {
    return { ok: false, pending: true, reason: "Transaction not mined yet" };
  }

  if (receipt.status !== "0x1") {
    return { ok: false, pending: false, reason: "Transaction failed on chain" };
  }

  const contractLower = contract.toLowerCase();
  const treasuryLower = expectedTreasury.toLowerCase();
  const fromLower = expectedFrom.toLowerCase();
  let matchedAmount = 0;

  for (const log of receipt.logs || []) {
    if (log.address?.toLowerCase() !== contractLower) continue;
    if (!log.topics?.[0] || log.topics[0].toLowerCase() !== TRANSFER_TOPIC) continue;

    const from = "0x" + (log.topics[1] || "").slice(-40);
    const to = "0x" + (log.topics[2] || "").slice(-40);
    const raw = BigInt(log.data || "0x0");
    const amount = rawToUsdt(raw);

    if (to.toLowerCase() === treasuryLower && from.toLowerCase() === fromLower) {
      matchedAmount += amount;
    }
  }

  if (matchedAmount < minUsdt * 0.99) {
    return {
      ok: false,
      pending: false,
      reason: `USDT amount mismatch. Expected ≥${minUsdt}, found ${matchedAmount.toFixed(2)}`
    };
  }

  return {
    ok: true,
    pending: false,
    amount: matchedAmount,
    from: expectedFrom,
    to: expectedTreasury
  };
}
