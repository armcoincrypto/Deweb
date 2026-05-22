"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/lib/auth-context";
import {
  dewebApi,
  type AdminStats,
  type AdminUser,
  type AdminOrder,
  type CryptoTopup,
  type EscrowHold,
  type Product,
  type SupportThread,
} from "@/lib/api";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type Tab =
  | "overview"
  | "treasury"
  | "users"
  | "orders"
  | "escrow"
  | "topups"
  | "products"
  | "wallets"
  | "support"
  | "stats";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "treasury", label: "Treasury" },
  { id: "users", label: "Users" },
  { id: "orders", label: "Orders & deals" },
  { id: "escrow", label: "Escrow" },
  { id: "topups", label: "Top-ups" },
  { id: "products", label: "Products" },
  { id: "wallets", label: "Connections" },
  { id: "support", label: "Support" },
  { id: "stats", label: "Public stats" },
];

export function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userQ, setUserQ] = useState("");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [topups, setTopups] = useState<CryptoTopup[]>([]);
  const [escrow, setEscrow] = useState<EscrowHold[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [connections, setConnections] = useState<Record<string, unknown>[]>([]);
  const [threads, setThreads] = useState<SupportThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [threadMessages, setThreadMessages] = useState<{ sender: string; body: string }[]>([]);
  const [reply, setReply] = useState("");

  const [mintAmount, setMintAmount] = useState("10000");
  const [creditUserId, setCreditUserId] = useState("");
  const [creditAmount, setCreditAmount] = useState("100");
  const [displayUsers, setDisplayUsers] = useState("");
  const [displayOrders, setDisplayOrders] = useState("");
  const [displayVolume, setDisplayVolume] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState("94");

  const loadStats = useCallback(async () => {
    const s = await dewebApi.admin.stats();
    setStats(s);
    setDisplayUsers(s.displayStats?.users || String(s.users));
    setDisplayOrders(s.displayStats?.orders || String(s.orders));
    setDisplayVolume(s.displayStats?.volume || String(s.transactionVolume));
    setDisplaySuccess(s.displayStats?.successRate || "94");
  }, []);

  const loadTab = useCallback(async () => {
    setError("");
    if (tab === "users") {
      const { users: u } = await dewebApi.admin.users(userQ || undefined);
      setUsers(u);
    } else if (tab === "orders") {
      const { orders: o } = await dewebApi.admin.orders();
      setOrders(o);
    } else if (tab === "topups") {
      const { topups: t } = await dewebApi.admin.topups("pending");
      setTopups(t);
    } else if (tab === "escrow") {
      const { escrow: e } = await dewebApi.admin.escrow("held");
      setEscrow(e);
    } else if (tab === "products") {
      const { products: p } = await dewebApi.admin.products();
      setProducts(p);
    } else if (tab === "wallets") {
      const { connections: c } = await dewebApi.admin.linkedWallets();
      setConnections(c);
    } else if (tab === "support") {
      const { threads: th } = await dewebApi.admin.supportThreads();
      setThreads(th);
    }
  }, [tab, userQ]);

  useEffect(() => {
    if (loading) return;
    if (!user?.isAdmin) {
      router.replace("/account/login");
      return;
    }
    loadStats().catch((e) => setError(e instanceof Error ? e.message : "Failed"));
  }, [user, loading, router, loadStats]);

  useEffect(() => {
    if (!user?.isAdmin) return;
    loadTab().catch((e) => setError(e instanceof Error ? e.message : "Failed"));
  }, [tab, user, loadTab]);

  async function doMint() {
    await dewebApi.admin.mint(Number(mintAmount));
    setMsg(`Minted ${mintAmount} DEWEB to treasury`);
    await loadStats();
  }

  async function doCredit() {
    await dewebApi.admin.creditUser(creditUserId, Number(creditAmount));
    setMsg("Credited user");
    await loadStats();
    await loadTab();
  }

  async function approveTopup(id: string) {
    await dewebApi.admin.approveTopup(id);
    setMsg("Top-up approved");
    await loadStats();
    await loadTab();
  }

  async function releaseDeal(id: string) {
    await dewebApi.admin.releaseEscrow(id);
    setMsg("Escrow released to supplier");
    await loadStats();
    await loadTab();
  }

  async function savePublicStats() {
    await dewebApi.admin.savePlatformStats({
      display_users: displayUsers,
      display_orders: displayOrders,
      display_volume: displayVolume,
      display_success_rate: displaySuccess,
    });
    setMsg("Public stats saved");
  }

  async function openThread(id: string) {
    setSelectedThread(id);
    const data = await dewebApi.admin.supportMessages(id);
    setThreadMessages(data.messages);
  }

  async function sendReply() {
    if (!selectedThread || !reply.trim()) return;
    await dewebApi.admin.supportReply(selectedThread, reply);
    setReply("");
    await openThread(selectedThread);
    const { threads: th } = await dewebApi.admin.supportThreads();
    setThreads(th);
  }

  if (loading || !user?.isAdmin) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-white/50">
        Loading admin…
      </div>
    );
  }

  return (
    <div className="container-narrow px-4 py-28 pb-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-deweb-cyan">Platform control</p>
          <h1 className="text-3xl font-bold text-white">DEWEB Admin</h1>
          <p className="mt-1 text-sm text-white/50">
            Treasury, users, deals, escrow, wallet connections, and public statistics.
          </p>
        </div>
        <a
          href="/admin.html"
          className="text-xs text-white/40 hover:text-deweb-cyan"
          target="_blank"
          rel="noreferrer"
        >
          Legacy admin ↗
        </a>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      {msg && (
        <p className="mb-4 text-sm text-emerald-400" onAnimationEnd={() => setMsg("")}>
          {msg}
        </p>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-bold transition-all",
              tab === t.id
                ? "bg-deweb-cyan text-deweb-bg"
                : "border border-white/10 text-white/60 hover:border-deweb-cyan/40"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Treasury DEWEB" value={fmt(stats.adminBalance)} />
          <Stat label="Users" value={String(stats.users)} />
          <Stat label="Orders" value={String(stats.orders)} />
          <Stat label="Pending top-ups" value={String(stats.pendingTopups)} />
          <Stat label="Escrow held" value={fmt(stats.heldEscrow)} />
          <Stat label="Open support" value={String(stats.openSupport)} />
          <Stat label="Wallet connections" value={String(stats.linkedWallets)} />
          <Stat label="TX volume" value={fmt(stats.transactionVolume)} />
        </div>
      )}

      {tab === "treasury" && (
        <GlassCard className="space-y-4 p-6">
          <p className="text-sm text-white/50">
            1 DEWEB = 1 USD. Mint increases treasury; credit sends DEWEB to a user.
          </p>
          <div className="flex flex-wrap gap-3">
            <input
              type="number"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white"
              placeholder="Mint amount"
            />
            <button
              type="button"
              onClick={() => doMint().catch((e) => setError(e.message))}
              className="rounded-full bg-deweb-cyan px-5 py-2 text-sm font-bold text-deweb-bg"
            >
              Mint to treasury
            </button>
          </div>
          <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
            <input
              value={creditUserId}
              onChange={(e) => setCreditUserId(e.target.value)}
              className="min-w-[200px] flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white"
              placeholder="User ID"
            />
            <input
              type="number"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              className="w-32 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white"
            />
            <button
              type="button"
              onClick={() => doCredit().catch((e) => setError(e.message))}
              className="rounded-full border border-deweb-cyan/50 px-5 py-2 text-sm font-bold text-deweb-cyan"
            >
              Credit user
            </button>
          </div>
        </GlassCard>
      )}

      {tab === "users" && (
        <div className="space-y-4">
          <input
            value={userQ}
            onChange={(e) => setUserQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadTab()}
            placeholder="Search email, username, ID…"
            className="w-full max-w-md rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white"
          />
          <DataTable
            headers={["Email", "Role", "Mode", "DEWEB", "ID"]}
            rows={users.map((u) => [
              u.email,
              u.role || "—",
              u.accountMode || "—",
              fmt(u.dewebBalance),
              u.id.slice(0, 10) + "…",
            ])}
          />
        </div>
      )}

      {tab === "orders" && (
        <DataTable
          headers={["Service", "Status", "Stage", "Total", "Escrow", "ID"]}
          rows={orders.map((o) => [
            o.service || "—",
            o.status || "—",
            o.stage || "—",
            fmt(o.total),
            o.escrowStatus || "—",
            String(o.id).slice(0, 12) + "…",
          ])}
        />
      )}

      {tab === "escrow" && (
        <div className="space-y-3">
          {escrow.length === 0 && (
            <p className="text-white/50">No held escrow. Customer pays DEWEB when accepting a bid.</p>
          )}
          {escrow.map((e) => (
            <GlassCard key={e.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
              <div>
                <p className="font-bold text-white">{fmt(e.amount)} DEWEB</p>
                <p className="text-xs text-white/50">
                  Order {e.orderId.slice(0, 12)}… · {e.status}
                </p>
              </div>
              <button
                type="button"
                onClick={() => releaseDeal(e.id).catch((er) => setError(er.message))}
                className="rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300"
              >
                Release to supplier
              </button>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "topups" && (
        <div className="space-y-3">
          {topups.map((t) => (
            <GlassCard key={t.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
              <div>
                <p className="font-bold text-white">
                  {fmt(t.deweb_amount)} DEWEB · {t.email}
                </p>
                <p className="text-xs text-white/50 font-mono">{t.tx_hash}</p>
              </div>
              <button
                type="button"
                onClick={() => approveTopup(t.id).catch((er) => setError(er.message))}
                className="rounded-full bg-deweb-cyan px-4 py-2 text-xs font-bold text-deweb-bg"
              >
                Approve
              </button>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "products" && (
        <div className="space-y-3">
          {products.map((p) => (
            <GlassCard key={p.id} className="p-4">
              <div className="flex gap-4">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt="" className="h-16 w-16 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/5 text-xs text-white/30">
                    No img
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-white">{p.title}</p>
                  <p className="text-sm text-deweb-cyan">{fmt(p.price)} DEWEB</p>
                  <input
                    defaultValue={p.imageUrl || ""}
                    placeholder="Image URL"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-1 text-xs text-white"
                    onBlur={(e) =>
                      dewebApi.admin
                        .updateProduct(p.id, { imageUrl: e.target.value })
                        .then(() => setMsg("Product image updated"))
                        .catch((er) => setError(er.message))
                    }
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "wallets" && (
        <DataTable
          headers={["User", "Provider", "Address"]}
          rows={connections.map((c) => [
            String(c.email || c.user_id),
            String(c.provider),
            String(c.address).slice(0, 20) + "…",
          ])}
        />
      )}

      {tab === "support" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {threads.map((th) => (
              <button
                key={th.id}
                type="button"
                onClick={() => openThread(th.id)}
                className={cn(
                  "w-full rounded-xl border p-3 text-left text-sm",
                  selectedThread === th.id
                    ? "border-deweb-cyan/50 bg-deweb-cyan/10"
                    : "border-white/10 bg-white/5"
                )}
              >
                <strong className="text-white">{th.email || "Guest"}</strong>
                <span className="text-white/40"> · {th.status}</span>
              </button>
            ))}
          </div>
          <GlassCard className="p-4">
            <div className="mb-3 max-h-48 space-y-2 overflow-y-auto text-sm">
              {threadMessages.map((m, i) => (
                <p key={i} className="text-white/80">
                  <strong>{m.sender}:</strong> {m.body}
                </p>
              ))}
            </div>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-white text-sm"
              rows={3}
              placeholder="Reply as admin…"
            />
            <button
              type="button"
              onClick={() => sendReply().catch((e) => setError(e.message))}
              className="mt-2 rounded-full bg-deweb-cyan px-4 py-2 text-xs font-bold text-deweb-bg"
            >
              Send
            </button>
          </GlassCard>
        </div>
      )}

      {tab === "stats" && (
        <GlassCard className="space-y-4 p-6">
          <p className="text-sm text-white/50">
            Override numbers shown on the public homepage (marketing stats).
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs text-white/50">
              Display users
              <input
                value={displayUsers}
                onChange={(e) => setDisplayUsers(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white"
              />
            </label>
            <label className="text-xs text-white/50">
              Display orders
              <input
                value={displayOrders}
                onChange={(e) => setDisplayOrders(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white"
              />
            </label>
            <label className="text-xs text-white/50">
              Display volume
              <input
                value={displayVolume}
                onChange={(e) => setDisplayVolume(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white"
              />
            </label>
            <label className="text-xs text-white/50">
              Success rate %
              <input
                value={displaySuccess}
                onChange={(e) => setDisplaySuccess(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={() => savePublicStats().catch((e) => setError(e.message))}
            className="rounded-full bg-deweb-cyan px-5 py-2 text-sm font-bold text-deweb-bg"
          >
            Save public stats
          </button>
        </GlassCard>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="p-4">
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-1 text-xl font-bold text-deweb-cyan">{value}</p>
    </GlassCard>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-bold uppercase text-white/40">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-white/80">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function fmt(n: number | undefined) {
  return Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}
