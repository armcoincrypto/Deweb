"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth-context";
import { dewebApi } from "@/lib/api";
import { PhoneInput } from "@/components/ui/PhoneInput";

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white disabled:opacity-50 focus:border-deweb-cyan/50 focus:outline-none";

export function ProfileView() {
  const t = useTranslations("account");
  const { user, refresh } = useAuth();
  const [form, setForm] = useState({
    name: "",
    username: "",
    phone: "",
    address: "",
    company: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState("");
  const [verifyUrl, setVerifyUrl] = useState("");
  const [sendingVerify, setSendingVerify] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        phone: user.phone || "",
        address: user.address || "",
        company: user.company || "",
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

      {user && !user.emailVerified && (
        <div className="mt-6 max-w-xl rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
          <p className="text-sm text-amber-200">Your email is not verified. Verify to post listings, submit offers, and use protected features.</p>
          <button
            type="button"
            disabled={sendingVerify}
            onClick={async () => {
              setSendingVerify(true);
              setVerifyMsg("");
              setVerifyUrl("");
              try {
                const res = await dewebApi.auth.sendVerification();
                setVerifyMsg(res.message);
                if (res.verifyUrl) setVerifyUrl(res.verifyUrl);
              } catch (err) {
                setVerifyMsg(err instanceof Error ? err.message : t("error"));
              } finally {
                setSendingVerify(false);
              }
            }}
            className="mt-3 rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-deweb-bg disabled:opacity-60"
          >
            {sendingVerify ? t("loading") : "Resend verification email"}
          </button>
          {verifyMsg && <p className="mt-2 text-sm text-amber-100">{verifyMsg}</p>}
          {verifyUrl && (
            <p className="mt-2 break-all text-xs text-white/60">
              Dev link: <a href={verifyUrl} className="text-deweb-cyan underline">{verifyUrl}</a>
            </p>
          )}
        </div>
      )}

      <form onSubmit={save} className="mt-8 max-w-xl space-y-4">
        {[
          { key: "username", label: t("nickname") },
          { key: "name", label: t("fullName") },
          { key: "email", label: t("email"), disabled: true, value: user?.email },
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
              className={inputClass}
            />
          </label>
        ))}

        <PhoneInput
          label={t("phone")}
          value={form.phone}
          onChange={(phone) => setForm((f) => ({ ...f, phone }))}
          placeholder={t("phonePlaceholder")}
          searchPlaceholder={t("phoneSearchCountry")}
        />

        {[
          { key: "address", label: t("address") },
          { key: "company", label: t("organization") },
        ].map((field) => (
          <label key={field.key} className="block text-xs font-bold uppercase text-white/40">
            {field.label}
            <input
              value={form[field.key as keyof typeof form]}
              onChange={(e) =>
                setForm((f) => ({ ...f, [field.key]: e.target.value }))
              }
              className={inputClass}
            />
          </label>
        ))}

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
