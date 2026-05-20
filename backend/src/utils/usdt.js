/** USDT-only top-up helpers (1 USDT = 1 USD = 1 DEWEB). */

export const USDT_DECIMALS = 6;

export function getUsdtConfig(provider) {
  const treasury = process.env.TREASURY_USDT || "";
  const contract =
    provider === "Ronin"
      ? process.env.USDT_CONTRACT_RONIN || "0x97a9107c1791bc656a31382e6A152ef171ad99cD"
      : process.env.USDT_CONTRACT_ETH || "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  return { treasury, contract, decimals: USDT_DECIMALS };
}

export function usdtAmountToRaw(usdtAmount) {
  return BigInt(Math.round(Number(usdtAmount) * 10 ** USDT_DECIMALS));
}

/** ERC-20 transfer(address,uint256) */
export function encodeUsdtTransfer(toAddress, amountRaw) {
  const selector = "a9059cbb";
  const addr = toAddress.replace(/^0x/i, "").toLowerCase().padStart(64, "0");
  const amt = amountRaw.toString(16).padStart(64, "0");
  return `0x${selector}${addr}${amt}`;
}
