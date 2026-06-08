"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/lib/auth-context";
import {
  dewebApi,
  type AdminStats,
  type AdminUser,
  type AdminOrder,
  type Product,
  type SupportThread,
  type Lead,
  type LeadStatus,
} from "@/lib/api";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type Tab = "overview" | "leads" | "users" | "orders" | "products" | "support" | "stats";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "leads", label: "Leads & Offers" },
  { id: "users", label: "Users" },
  { id: "orders", label: "Projects" },
  { id: "products", label: "Products" },
  { id: "support", label: "Support" },
  { id: "stats", label: "Public stats" },
];

const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "negotiating", "closed"];

export function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadFilter, setLeadFilter] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userQ, setUserQ] = useState("");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [threads, setThreads] = useState<SupportThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [threadMessages, setThreadMessages] = useState<{ sender: string; body: string }[]>([]);
  const [reply, setReply] = useState("");

  const [displayUsers, setDisplayUsers] = useState("");
  const [displayOrders, setDisplayOrders] = useState("");
  const [displayVolume, setDisplayVolume] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState("94");

  const loadStats = useCallback(async () => {
    const s = await dewebApi.admin.stats();
    setStats(s);
    setDisplayUsers(s.displayStats?.users || String(s.users));
    setDisplayOrders(s.displayStats?.orders || String(s.orders));
    setDisplayVolume(s.displayStats?.volume || String(s.totalLeads));
    setDisplaySuccess(s.displayStats?.successRate || "94");
  }, []);

  const loadTab = useCallback(async () => {
    setError("");
    if (tab === "leads") {
      const { leads: l } = await dewebApi.admin.leads(leadFilter || undefined);
      setLeads(l);
    } else if (tab === "users") {
      const { users: u } = await dewebApi.admin.users(userQ || undefined);
      setUsers(u);
    } else if (tab === "orders") {
      const { orders: o } = await dewebApi.admin.orders();
      setOrders(o);
    } else if (tab === "products") {
      const { products: p } = await dewebApi.admin.products();
      setProducts(p);
    } else if (tab === "support") {
      const { threads: th } = await dewebApi.admin.supportThreads();
      setThreads(th);
    }
  }, [tab, userQ, leadFilter]);

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

  async function updateLead(id: string, body: { status?: LeadStatus; adminNote?: string }) {
    await dewebApi.admin.updateLead(id, body);
    setMsg("Lead updated");
    loadTab();
  }

  async function saveStats() {
    await dewebApi.admin.savePlatformStats({
      display_users: displayUsers,
      display_orders: displayOrders,
      display_volume: displayVolume,
      display_success_rate: displaySuccess,
    });
    setMsg("Public stats saved");
    loadStats();
  }

  if (loading || !user?.isAdmin) {
    return <p className="py-32 text-center text-white/50">Loading…</p>;
  }

  return (
    <div className="min-h-screen bg-deweb-bg px-4 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-2 text-white/50">Lead generation & platform management</p>
          </div>
          <Link
            href="/admin/blog"
            className="rounded-full border border-deweb-cyan/40 px-4 py-2 text-sm font-semibold text-deweb-cyan hover:bg-deweb-cyan/10"
          >
            Blog management →
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold",
                tab === t.id ? "bg-deweb-cyan text-deweb-bg" : "border border-white/15 text-white/60"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error && <p className="mt-4 text-red-400">{error}</p>}
        {msg && <p className="mt-4 text-emerald-400">{msg}</p>}

        {tab === "overview" && stats && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Users", value: stats.users },
              { label: "New leads", value: stats.newLeads },
              { label: "Total leads", value: stats.totalLeads },
              { label: "Open support", value: stats.openSupport },
            ].map((s) => (
              <GlassCard key={s.label} className="p-6">
                <p className="text-xs uppercase text-white/40">{s.label}</p>
                <p className="mt-2 text-3xl font-bold text-deweb-cyan">{s.value}</p>
              </GlassCard>
            ))}
          </div>
        )}

        {tab === "leads" && (
          <div className="mt-8">
            <select
              value={leadFilter}
              onChange={(e) => setLeadFilter(e.target.value)}
              className="mb-4 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white"
            >
              <option value="">All statuses</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="space-y-4">
              {leads.map((lead) => (
                <GlassCard key={lead.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-deweb-cyan">{lead.submissionType}</span>
                      <h3 className="font-bold text-white">{lead.title || lead.productName || lead.name || lead.email}</h3>
                      <p className="mt-1 text-sm text-white/55">{lead.message}</p>
                      <p className="mt-2 text-xs text-white/40">
                        {lead.email} {lead.phone && `· ${lead.phone}`}
                        {lead.offeredPrice != null && ` · Offer: $${lead.offeredPrice}`}
                        {lead.askingPrice != null && ` · Ask: $${lead.askingPrice}`}
                      </p>
                    </div>
                    <select
                      value={lead.status}
                      onChange={(e) => updateLead(lead.id, { status: e.target.value as LeadStatus })}
                      className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white"
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    defaultValue={lead.adminNote || ""}
                    placeholder="Internal note…"
                    rows={2}
                    className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                    onBlur={(e) => {
                      if (e.target.value !== (lead.adminNote || "")) {
                        updateLead(lead.id, { adminNote: e.target.value });
                      }
                    }}
                  />
                </GlassCard>
              ))}
              {leads.length === 0 && <p className="text-white/45">No leads yet.</p>}
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="mt-8">
            <input
              value={userQ}
              onChange={(e) => setUserQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadTab()}
              placeholder="Search users…"
              className="mb-4 w-full max-w-md rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white"
            />
            <div className="space-y-2">
              {users.map((u) => (
                <GlassCard key={u.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold text-white">{u.name || u.username}</p>
                    <p className="text-sm text-white/50">{u.email}</p>
                  </div>
                  <span className="text-xs text-white/40">
                    {u.accountMode} {u.emailVerified ? "· verified" : "· unverified"}
                  </span>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="mt-8 space-y-3">
            {orders.map((o) => (
              <GlassCard key={o.id} className="p-4">
                <p className="font-bold text-white">{o.service || o.id}</p>
                <p className="text-sm text-white/50">{o.budget} · {o.stage} · {o.status}</p>
              </GlassCard>
            ))}
          </div>
        )}

        {tab === "products" && (
          <div className="mt-8 space-y-3">
            {products.map((p) => (
              <GlassCard key={p.id} className="flex justify-between p-4">
                <div>
                  <p className="font-bold text-white">{p.title}</p>
                  <p className="text-sm text-deweb-cyan">${p.price?.toLocaleString()}</p>
                </div>
                <p className="text-xs text-white/40">{p.sellerName}</p>
              </GlassCard>
            ))}
          </div>
        )}

        {tab === "support" && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              {threads.map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={async () => {
                    setSelectedThread(th.id);
                    const { messages } = await dewebApi.admin.supportMessages(th.id);
                    setThreadMessages(messages);
                  }}
                  className="w-full text-left"
                >
                  <GlassCard className="p-4 hover:border-deweb-cyan/30">
                    <p className="text-sm font-bold text-white">{th.email || th.id}</p>
                    <p className="text-xs text-white/45">{th.status}</p>
                  </GlassCard>
                </button>
              ))}
            </div>
            {selectedThread && (
              <GlassCard className="p-4">
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {threadMessages.map((m, i) => (
                    <p key={i} className="text-sm text-white/70">
                      <strong>{m.sender}:</strong> {m.body}
                    </p>
                  ))}
                </div>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={3}
                  className="mt-4 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white text-sm"
                />
                <button
                  type="button"
                  onClick={async () => {
                    await dewebApi.admin.supportReply(selectedThread, reply);
                    setReply("");
                    const { messages } = await dewebApi.admin.supportMessages(selectedThread);
                    setThreadMessages(messages);
                  }}
                  className="mt-2 rounded-full bg-deweb-cyan px-5 py-2 text-sm font-bold text-deweb-bg"
                >
                  Reply
                </button>
              </GlassCard>
            )}
          </div>
        )}

        {tab === "stats" && (
          <GlassCard className="mt-8 max-w-md space-y-4 p-6">
            {[
              { key: "displayUsers", label: "Display users", value: displayUsers, set: setDisplayUsers },
              { key: "displayOrders", label: "Display projects", value: displayOrders, set: setDisplayOrders },
              { key: "displayVolume", label: "Display inquiries", value: displayVolume, set: setDisplayVolume },
              { key: "displaySuccess", label: "Success rate %", value: displaySuccess, set: setDisplaySuccess },
            ].map((f) => (
              <label key={f.key} className="block text-xs font-bold uppercase text-white/40">
                {f.label}
                <input
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white"
                />
              </label>
            ))}
            <button type="button" onClick={saveStats} className="rounded-full bg-deweb-cyan px-6 py-2 font-bold text-deweb-bg">
              Save
            </button>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
