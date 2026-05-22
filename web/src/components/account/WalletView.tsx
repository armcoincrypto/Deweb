"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth-context";
import { dewebApi, type LinkedWallet, type Wallet } from "@/lib/api";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
    ronin?: { provider?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } };
  }
}

type WalletConfig = {
  metamask: { treasuryAddress: string; tokenContract: string; chainId: number };
  ronin: { treasuryAddress: string; tokenContract: string; chainId: number };
};

export function WalletView() {
  const t = useTranslations("account");
  const { user, refresh } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [linked, setLinked] = useState<LinkedWallet[]>([]);
  const [config, setConfig] = useState<WalletConfig | null>(null);
  const [amount, setAmount] = useState("100");
  const [provider, setProvider] = useState<"MetaMask" | "Ronin">("MetaMask");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [verifyUrl, setVerifyUrl] = useState("");
  const [polling, setPolling] = useState(false);

  const emailVerified = Boolean(user?.emailVerified);

  const load = useCallback(async () => {
    const [w, l, c] = await Promise.all([
      dewebApi.wallet.me(),
      dewebApi.wallet.linked(),
      dewebApi.wallet.config(),
    ]);
    setWallet(w.wallet);
    setLinked(l.linkedWallets || []);
    setConfig(c as WalletConfig);
    if (l.linkedWallets?.length) {
      setProvider(l.linkedWallets[0].provider as "MetaMask" | "Ronin");
    }
  }, []);

  useEffect(() => {
    load().catch(() => setError(t("walletLoadError")));
  }, [load, t]);

  async function sendVerification() {
    setError("");
    try {
      const r = await dewebApi.auth.sendVerification();
      setMsg(r.message);
      if (r.verifyUrl) setVerifyUrl(r.verifyUrl);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : t("error"));
    }
  }

  async function ensureChain(chainId: number, prov: "MetaMask" | "Ronin") {
    const eth = prov === "Ronin" ? window.ronin?.provider : window.ethereum;
    if (!eth) return;
    const hex = "0x" + chainId.toString(16);
    try {
      await eth.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hex }],
      });
    } catch {
      if (prov === "Ronin") {
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: hex,
              chainName: "Ronin",
              rpcUrls: ["https://api.roninchain.com/rpc"],
              nativeCurrency: { name: "RON", symbol: "RON", decimals: 18 },
            },
          ],
        });
      }
    }
  }

  async function connectWallet(prov: "MetaMask" | "Ronin") {
    if (!emailVerified) {
      setError(t("verifyEmailFirst"));
      return;
    }
    setError("");
    const eth = prov === "Ronin" ? window.ronin?.provider : window.ethereum;
    if (!eth) {
      setError(prov === "Ronin" ? t("installRonin") : t("installMetaMask"));
      return;
    }
    const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
    await dewebApi.wallet.link({ provider: prov, address: accounts[0] });
    await load();
    setMsg(t("connected"));
  }

  async function pollTopup(topupId: string) {
    setPolling(true);
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 3000));
      const st = await dewebApi.wallet.topupStatus(topupId);
      if (st.status === "credited") {
        setPolling(false);
        await load();
        setMsg(t("topupSuccess"));
        return;
      }
      if (st.status === "failed") {
        setPolling(false);
        setError(st.error || t("topupFailed"));
        return;
      }
    }
    setPolling(false);
    setMsg(t("topupVerifying"));
  }

  async function getDeweb() {
    if (!emailVerified) {
      setError(t("verifyEmailFirst"));
      return;
    }
    setError("");
    setMsg("");
    try {
      const intent = await dewebApi.wallet.topupIntent({
        dewebAmount: Number(amount),
        provider,
      });
      await ensureChain(intent.chainId, provider);
      const eth = provider === "Ronin" ? window.ronin?.provider : window.ethereum;
      if (!eth) throw new Error(t("walletNotFound"));

      setMsg(
        `${t("sendUsdtTo")} ${intent.treasuryAddress.slice(0, 10)}…${intent.treasuryAddress.slice(-8)}`
      );

      const txHash = (await eth.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: intent.fromAddress,
            to: intent.tokenContract,
            data: intent.txData,
          },
        ],
      })) as string;

      const result = await dewebApi.wallet.topupSubmit({
        txHash: String(txHash),
        provider,
        dewebAmount: Number(amount),
        fromAddress: intent.fromAddress,
      });

      if (result.status === "credited") {
        await load();
        setMsg(t("topupSuccess"));
      } else if (result.status === "verifying" && result.topupId) {
        setMsg(t("topupVerifying"));
        await pollTopup(result.topupId);
      } else if (result.status === "failed") {
        setError(result.error || t("topupFailed"));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : t("topupFailed"));
    }
  }

  const treasury =
    provider === "Ronin" ? config?.ronin?.treasuryAddress : config?.metamask?.treasuryAddress;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">{t("wallet")}</h1>
      <p className="mt-2 text-white/50">{t("walletSubtitle")}</p>

      {!emailVerified && (
        <div className="mt-6 glass-panel-glow max-w-xl border-amber-400/30 p-6">
          <p className="font-bold text-amber-300">{t("emailVerifyRequired")}</p>
          <p className="mt-2 text-sm text-white/55">{t("emailVerifyHint")}</p>
          <button
            type="button"
            onClick={sendVerification}
            className="mt-4 rounded-full bg-deweb-cyan px-5 py-2.5 text-sm font-bold text-deweb-bg"
          >
            {t("sendVerificationEmail")}
          </button>
          {verifyUrl && (
            <p className="mt-3 break-all text-xs text-deweb-cyan">
              <a href={verifyUrl}>{verifyUrl}</a>
            </p>
          )}
        </div>
      )}

      <div className="mt-8 glass-panel-glow max-w-lg p-8">
        <p className="text-xs font-bold uppercase text-white/40">{t("dewebBalance")}</p>
        <p className="mt-2 text-4xl font-bold text-deweb-cyan">
          {(wallet?.deweb ?? 0).toLocaleString()} DEWEB
        </p>
        <p className="mt-1 text-sm text-white/45">1 DEWEB = 1 USDT = $1 USD</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-2xl">
        {(["MetaMask", "Ronin"] as const).map((prov) => (
          <div key={prov} className="glass-panel p-6">
            <h3 className="font-bold text-white">{prov}</h3>
            <p className="mt-1 text-xs text-white/40">
              {t("treasury")}:{" "}
              <span className="font-mono text-deweb-cyan break-all">
                {prov === "MetaMask"
                  ? config?.metamask?.treasuryAddress || "—"
                  : config?.ronin?.treasuryAddress || "—"}
              </span>
            </p>
            <p className="mt-2 text-xs text-white/45 font-mono break-all">
              {linked.find((w) => w.provider === prov)?.address || t("notConnected")}
            </p>
            <button
              type="button"
              onClick={() => connectWallet(prov)}
              disabled={!emailVerified}
              className="mt-4 w-full rounded-full border border-deweb-cyan/50 py-2.5 text-sm font-bold text-deweb-cyan disabled:opacity-40"
            >
              {prov === "MetaMask" ? t("connectMetaMask") : t("connectRonin")}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 glass-panel max-w-lg p-6 space-y-4">
        <h3 className="font-bold text-white">{t("getDeweb")}</h3>
        <p className="text-sm text-white/50">{t("usdtOnly")}</p>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
        />
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value as "MetaMask" | "Ronin")}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          disabled={!linked.length || !emailVerified}
        >
          {linked.map((w) => (
            <option key={w.provider} value={w.provider}>
              {w.provider}
            </option>
          ))}
        </select>
        {treasury && (
          <div className="rounded-xl border border-deweb-cyan/20 bg-deweb-cyan/5 p-4">
            <p className="text-xs font-bold uppercase text-deweb-cyan">{t("yourSendTo")}</p>
            <p className="mt-2 font-mono text-sm text-white break-all">{treasury}</p>
            <p className="mt-2 text-xs text-white/45">{t("autoCreditHint")}</p>
          </div>
        )}
        <button
          type="button"
          onClick={getDeweb}
          disabled={!linked.length || !emailVerified || polling}
          className="w-full rounded-full bg-deweb-cyan py-3 font-bold text-deweb-bg disabled:opacity-40"
        >
          {polling ? t("checkingBlockchain") : t("getDeweb")}
        </button>
      </div>

      {msg && <p className="mt-4 text-sm text-emerald-400">{msg}</p>}
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </div>
  );
}
