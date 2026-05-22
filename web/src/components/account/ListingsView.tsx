"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { dewebApi, type ListingApplication, type MarketplaceListing } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { Link, useRouter } from "@/i18n/routing";
import { GlassCard } from "@/components/ui/GlassCard";

export function ListingsView() {
  const t = useTranslations("account");
  const { user } = useAuth();
  const router = useRouter();
  const isSeller = user?.accountMode === "seller" || user?.account_mode === "seller";
  const [mine, setMine] = useState<MarketplaceListing[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "Web development",
  });
  const [apps, setApps] = useState<ListingApplication[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  function load() {
    dewebApi.listings.mine().then((d) => setMine(d.listings || []));
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await dewebApi.listings.create({
      listingType: isSeller ? "worker_offer" : "customer_request",
      title: form.title,
      description: form.description,
      budget: Number(form.budget) || 0,
      budgetLabel: form.budget ? `$${form.budget}` : "",
      deadline: form.deadline,
      category: form.category,
    });
    setShowForm(false);
    setForm({ title: "", description: "", budget: "", deadline: "", category: "Web development" });
    load();
    setMsg(t("listingCreated"));
  }

  async function remove(id: string) {
    await dewebApi.listings.remove(id);
    load();
  }

  async function openApps(id: string) {
    setSelectedId(id);
    const d = await dewebApi.listings.applications(id);
    setApps(d.applications || []);
  }

  async function accept(appId: string) {
    const r = await dewebApi.listings.acceptApplication(appId);
    setMsg(t("dealStarted"));
    router.push(`/account/messages?chat=${r.chatId}`);
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("myListings")}</h1>
          <p className="mt-2 text-white/50">{t("listingsSubtitle")}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="rounded-full bg-deweb-cyan px-6 py-3 text-sm font-bold text-deweb-bg"
        >
          {isSeller ? t("addService") : t("addRequirement")}
        </button>
      </div>

      {showForm && (
        <form onSubmit={create} className="mt-8 glass-panel-glow max-w-2xl space-y-4 p-6">
          <input
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder={t("listingTitle")}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder={t("listingDescription")}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          />
          <input
            type="number"
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
            placeholder={t("budgetUsd")}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          />
          <input
            value={form.deadline}
            onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
            placeholder={t("deadlineExample")}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          />
          <button type="submit" className="rounded-full bg-deweb-cyan px-6 py-3 font-bold text-deweb-bg">
            {t("publish")}
          </button>
        </form>
      )}

      <div className="mt-8 space-y-4">
        {mine.map((l) => (
          <GlassCard key={l.id} className="p-5">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <span className="text-xs text-deweb-cyan uppercase font-bold">
                  {l.listingType === "customer_request" ? t("requirement") : t("service")}
                </span>
                <h3 className="font-bold text-white">{l.title}</h3>
                <p className="text-sm text-white/50">{l.budgetLabel} · {l.deadline}</p>
                <p className="text-xs text-white/35 mt-1">{l.status}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openApps(l.id)}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold text-white/70"
                >
                  {t("viewRequests")}
                </button>
                <button
                  type="button"
                  onClick={() => remove(l.id)}
                  className="rounded-lg border border-red-400/30 px-3 py-1.5 text-xs text-red-400"
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {selectedId && (
        <div className="mt-8 glass-panel p-6">
          <h3 className="font-bold text-white">{t("incomingRequests")}</h3>
          <ul className="mt-4 space-y-3">
            {apps.map((a) => (
              <li key={a.id} className="rounded-xl border border-white/10 p-4">
                <p className="font-semibold text-white">{a.applicantName}</p>
                <p className="text-sm text-deweb-cyan">{a.price} USD · {a.timeline}</p>
                <p className="mt-2 text-sm text-white/60">{a.message}</p>
                {a.status === "pending" && (
                  <button
                    type="button"
                    onClick={() => accept(a.id)}
                    className="mt-3 rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-300"
                  >
                    {t("acceptAndChat")}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {msg && <p className="mt-4 text-emerald-400 text-sm">{msg}</p>}
      <p className="mt-6 text-sm text-white/40">
        <Link href="/marketplace" className="text-deweb-cyan hover:underline">
          {t("viewMarketplace")}
        </Link>
      </p>
    </div>
  );
}
