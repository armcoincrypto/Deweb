/** USDT-only top-up (1 USDT = 1 USD = 1 DEWEB). Separate treasury per wallet provider. */

export const USDT_DECIMALS = 6;
const TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55e4df523b3ef";

export function getUsdtConfig(provider) {
  const p = String(provider || "").trim();
  const treasury =
    p === "Ronin"
      ? process.env.TREASURY_USDT_RONIN || ""
      : process.env.TREASURY_USDT_METAMASK || "";
  const contract =
    p === "Ronin"
      ? process.env.USDT_CONTRACT_RONIN || "0x97a9107c1791bc656a31382e6A152ef171ad99cD"
      : process.env.USDT_CONTRACT_ETH || "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const chainId = p === "Ronin" ? Number(process.env.RONIN_CHAIN_ID || 2020) : 1;
  const rpcUrl =
    p === "Ronin"
      ? process.env.RONIN_RPC_URL || "https://api.roninchain.com/rpc"
      : process.env.ETH_RPC_URL ||
        (process.env.ALCHEMY_API_KEY
          ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
          : process.env.INFURA_PROJECT_ID
            ? `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
            : "");
  return { treasury, contract, decimals: USDT_DECIMALS, chainId, rpcUrl, provider: p };
}

export function usdtAmountToRaw(usdtAmount) {
  return BigInt(Math.round(Number(usdtAmount) * 10 ** USDT_DECIMALS));
}

export function rawToUsdt(raw) {
  return Number(raw) / 10 ** USDT_DECIMALS;
}

/** ERC-20 transfer(address,uint256) */
export function encodeUsdtTransfer(toAddress, amountRaw) {
  const selector = "a9059cbb";
  const addr = toAddress.replace(/^0x/i, "").toLowerCase().padStart(64, "0");
  const amt = amountRaw.toString(16).padStart(64, "0");
  return `0x${selector}${addr}${amt}`;
}

export { TRANSFER_TOPIC };
