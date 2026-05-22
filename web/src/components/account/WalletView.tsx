"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { dewebApi, type LinkedWallet, type Wallet } from "@/lib/api";

declare global {
  interface Window {
    ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<string> };
    ronin?: { provider?: { request: (args: { method: string; params?: unknown[] }) => Promise<string> } };
  }
}

export function WalletView() {
  const t = useTranslations("account");
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [linked, setLinked] = useState<LinkedWallet[]>([]);
  const [amount, setAmount] = useState("100");
  const [provider, setProvider] = useState("MetaMask");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const [w, l] = await Promise.all([
      dewebApi.wallet.me(),
      dewebApi.wallet.linked(),
    ]);
    setWallet(w.wallet);
    setLinked(l.wallets || []);
    if (l.wallets?.length) setProvider(l.wallets[0].provider);
  }, []);

  useEffect(() => {
    load().catch(() => setError(t("walletLoadError")));
  }, [load, t]);

  async function connectMetaMask() {
    if (!window.ethereum) {
      setError(t("installMetaMask"));
      return;
    }
    const accounts = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as unknown as string[];
    const address = accounts[0];
    await dewebApi.wallet.link({ provider: "MetaMask", address });
    await load();
    setMsg(t("connected"));
  }

  async function connectRonin() {
    const ronin = window.ronin?.provider;
    if (!ronin) {
      setError(t("installRonin"));
      return;
    }
    const accounts = (await ronin.request({ method: "eth_requestAccounts" })) as unknown as string[];
    await dewebApi.wallet.link({ provider: "Ronin", address: accounts[0] });
    await load();
    setMsg(t("connected"));
  }

  async function getDeweb() {
    setError("");
    try {
      const intent = await dewebApi.wallet.topupIntent({
        dewebAmount: Number(amount),
        provider,
      }) as {
        txData: string;
        tokenContract: string;
        treasuryAddress: string;
        fromAddress: string;
        usdtAmount: number;
      };
      const eth = provider === "Ronin" ? window.ronin?.provider : window.ethereum;
      if (!eth) throw new Error(t("walletNotFound"));
      const txHash = await eth.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: intent.fromAddress,
            to: intent.tokenContract,
            data: intent.txData,
          },
        ],
      });
      await dewebApi.wallet.topupConfirm({
        txHash: String(txHash),
        provider,
        dewebAmount: Number(amount),
        fromAddress: intent.fromAddress,
      });
      await load();
      setMsg(t("topupSuccess"));
    } catch (e) {
      setError(e instanceof Error ? e.message : t("topupFailed"));
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">{t("wallet")}</h1>
      <p className="mt-2 text-white/50">{t("walletSubtitle")}</p>

      <div className="mt-8 glass-panel-glow max-w-lg p-8">
        <p className="text-xs font-bold uppercase text-white/40">{t("dewebBalance")}</p>
        <p className="mt-2 text-4xl font-bold text-deweb-cyan">
          {(wallet?.deweb ?? 0).toLocaleString()} DEWEB
        </p>
        <p className="mt-1 text-sm text-white/45">1 DEWEB = 1 USDT = $1 USD</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-2xl">
        <div className="glass-panel p-6">
          <h3 className="font-bold text-white">MetaMask</h3>
          <p className="mt-2 text-xs text-white/45 font-mono break-all">
            {linked.find((w) => w.provider === "MetaMask")?.address || t("notConnected")}
          </p>
          <button
            type="button"
            onClick={connectMetaMask}
            className="mt-4 w-full rounded-full border border-deweb-cyan/50 py-2.5 text-sm font-bold text-deweb-cyan"
          >
            {t("connectMetaMask")}
          </button>
        </div>
        <div className="glass-panel p-6">
          <h3 className="font-bold text-white">Ronin</h3>
          <p className="mt-2 text-xs text-white/45 font-mono break-all">
            {linked.find((w) => w.provider === "Ronin")?.address || t("notConnected")}
          </p>
          <button
            type="button"
            onClick={connectRonin}
            className="mt-4 w-full rounded-full border border-deweb-cyan/50 py-2.5 text-sm font-bold text-deweb-cyan"
          >
            {t("connectRonin")}
          </button>
        </div>
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
          onChange={(e) => setProvider(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          disabled={!linked.length}
        >
          {linked.map((w) => (
            <option key={w.provider} value={w.provider}>
              {w.provider}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={getDeweb}
          disabled={!linked.length}
          className="w-full rounded-full bg-deweb-cyan py-3 font-bold text-deweb-bg disabled:opacity-40"
        >
          {t("getDeweb")}
        </button>
      </div>

      {msg && <p className="mt-4 text-sm text-emerald-400">{msg}</p>}
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </div>
  );
}
