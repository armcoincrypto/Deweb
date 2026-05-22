"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth-context";
import { dewebApi } from "@/lib/api";

export function ProfileView() {
  const t = useTranslations("account");
  const { user, refresh } = useAuth();
  const [form, setForm] = useState({
    name: "",
    username: "",
    phone: "",
    address: "",
    company: "",
    currency: "USD",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        phone: user.phone || "",
        address: user.address || "",
        company: user.company || "",
        currency: user.currency || "USD",
      });
    }
  }, [user]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await dewebApi.users.updateMe(form);
      await refresh();
      setMsg(t("saved"));
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">{t("profile")}</h1>
      <p className="mt-2 text-white/50">{t("profileSubtitle")}</p>

      <form onSubmit={save} className="mt-8 max-w-xl space-y-4">
        {[
          { key: "username", label: t("nickname") },
          { key: "name", label: t("fullName") },
          { key: "email", label: t("email"), disabled: true, value: user?.email },
          { key: "phone", label: t("phone") },
          { key: "address", label: t("address") },
          { key: "company", label: t("organization") },
        ].map((field) => (
          <label key={field.key} className="block text-xs font-bold uppercase text-white/40">
            {field.label}
            <input
              disabled={field.disabled}
              value={
                field.disabled
                  ? field.value
                  : form[field.key as keyof typeof form]
              }
              onChange={(e) =>
                setForm((f) => ({ ...f, [field.key]: e.target.value }))
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white disabled:opacity-50 focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
        ))}
        <label className="block text-xs font-bold uppercase text-white/40">
          {t("currency")}
          <select
            value={form.currency}
            onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="AMD">AMD</option>
          </select>
        </label>
        {msg && <p className="text-sm text-emerald-400">{msg}</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-deweb-cyan px-8 py-3 text-sm font-bold text-deweb-bg shadow-glow"
        >
          {saving ? t("loading") : t("save")}
        </button>
      </form>
    </div>
  );
}
