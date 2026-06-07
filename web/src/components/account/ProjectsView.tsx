"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { dewebApi, type Bid, type ProjectOrder } from "@/lib/api";

export function ProjectsView() {
  const t = useTranslations("account");
  const [orders, setOrders] = useState<ProjectOrder[]>([]);
  const [selected, setSelected] = useState<ProjectOrder | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    service: "",
    details: "",
    budget: "",
    deadline: "",
  });
  const [error, setError] = useState("");

  function loadOrders() {
    dewebApi.orders.mine().then((d) => setOrders(d.orders || [])).catch(() => setOrders([]));
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function postProject(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const price = Number(form.budget) || 0;
      await dewebApi.orders.create({
        service: form.service,
        details: form.details,
        budget: `$${price}`,
        deadline: form.deadline,
        total: price,
        stage: "Inquiry",
        status: "open",
      });
      setShowForm(false);
      setForm({ service: "", details: "", budget: "", deadline: "" });
      loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    }
  }

  async function openBids(order: ProjectOrder) {
    setSelected(order);
    const data = await dewebApi.bids.list(order.id);
    setBids(data.bids || []);
  }

  async function acceptBid(bidId: string) {
    setError("");
    try {
      await dewebApi.bids.accept(bidId);
      loadOrders();
      if (selected) openBids(selected);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    }
  }

  async function rejectBid(bidId: string) {
    await dewebApi.bids.reject(bidId);
    if (selected) openBids(selected);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("myProjects")}</h1>
          <p className="mt-2 text-white/50">{t("projectsSubtitle")}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="rounded-full bg-deweb-cyan px-6 py-3 text-sm font-bold text-deweb-bg shadow-glow"
        >
          {t("postProject")}
        </button>
      </div>

      {showForm && (
        <form onSubmit={postProject} className="mt-8 glass-panel-glow max-w-2xl space-y-4 p-6">
          <h3 className="font-bold text-white">{t("newProject")}</h3>
          <input
            placeholder={t("projectTitle")}
            value={form.service}
            onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
            required
          />
          <textarea
            placeholder={t("projectDetails")}
            value={form.details}
            onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          />
          <input
            type="number"
            min={1}
            placeholder={t("budgetDeweb")}
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
            required
          />
          <input
            placeholder={t("deadline")}
            value={form.deadline}
            onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="rounded-full bg-deweb-cyan px-8 py-3 font-bold text-deweb-bg">
            {t("publishProject")}
          </button>
        </form>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {orders.length === 0 && (
            <p className="text-white/45">{t("noProjects")}</p>
          )}
          {orders.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => openBids(o)}
              className={`w-full text-left glass-panel p-5 transition-all hover:border-deweb-cyan/30 ${
                selected?.id === o.id ? "border-deweb-cyan/40" : ""
              }`}
            >
              <h3 className="font-bold text-white">{o.service || t("untitled")}</h3>
              <p className="mt-1 text-sm text-deweb-cyan">{o.budget || (o.total ? `$${o.total}` : "Negotiable")}</p>
              <p className="mt-2 text-xs text-white/45">
                {o.stage} · {o.status}
                {o.assignedDevId ? ` · ${t("supplierSelected")}` : ""}
              </p>
            </button>
          ))}
        </div>

        <div className="glass-panel p-6 min-h-[200px]">
          {!selected ? (
            <p className="text-white/45">{t("selectProjectBids")}</p>
          ) : (
            <>
              <h3 className="font-bold text-white">{t("proposalsFor")} {selected.service}</h3>
              {bids.length === 0 && (
                <p className="mt-4 text-sm text-white/45">{t("noBidsYet")}</p>
              )}
              <ul className="mt-4 space-y-3">
                {bids.map((b) => (
                  <li
                    key={b.id}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold text-white">{b.sellerName}</span>
                      <span className="font-bold text-deweb-cyan">${b.price}</span>
                    </div>
                    {b.timeline && (
                      <p className="mt-1 text-xs text-white/45">{b.timeline}</p>
                    )}
                    {b.message && (
                      <p className="mt-2 text-sm text-white/60">{b.message}</p>
                    )}
                    <p className="mt-2 text-xs uppercase text-white/35">{b.status}</p>
                    {b.status === "pending" && !selected.assignedDevId && (
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => acceptBid(b.id)}
                          className="rounded-lg bg-deweb-cyan px-4 py-1.5 text-xs font-bold text-deweb-bg"
                        >
                          {t("chooseSupplier")}
                        </button>
                        <button
                          type="button"
                          onClick={() => rejectBid(b.id)}
                          className="rounded-lg border border-white/20 px-4 py-1.5 text-xs text-white/60"
                        >
                          {t("decline")}
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
