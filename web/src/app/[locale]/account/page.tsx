"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { useAuth } from "@/lib/auth-context";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AccountHomePage() {
  const t = useTranslations("account");
  const { displayName } = useAuth();

  return (
    <AccountRoleShell>
      <h1 className="text-2xl font-bold text-white">
        {t("hello")}, {displayName}
      </h1>
      <p className="mt-2 text-white/50">{t("overviewSubtitle")}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/account/listings">
          <GlassCard className="p-6 hover:border-deweb-cyan/30">
            <h3 className="font-bold text-deweb-cyan">{t("myListings")}</h3>
            <p className="mt-2 text-sm text-white/50">{t("listingsSubtitle")}</p>
          </GlassCard>
        </Link>
        <Link href="/account/messages">
          <GlassCard className="p-6">
            <h3 className="font-bold text-deweb-cyan">{t("messages")}</h3>
            <p className="mt-2 text-sm text-white/50">{t("chatSubtitle")}</p>
          </GlassCard>
        </Link>
        <Link href="/account/submit-offer">
          <GlassCard className="p-6 hover:border-deweb-cyan/30">
            <h3 className="font-bold text-deweb-cyan">Submit Offer</h3>
            <p className="mt-2 text-sm text-white/50">Offer a service or request what you need — we negotiate by contact.</p>
          </GlassCard>
        </Link>
        <Link href="/contact">
          <GlassCard className="p-6 hover:border-deweb-cyan/30">
            <h3 className="font-bold text-deweb-cyan">Contact Us</h3>
            <p className="mt-2 text-sm text-white/50">Questions about pricing or projects? Get in touch.</p>
          </GlassCard>
        </Link>
        <Link href="/account/profile">
          <GlassCard className="p-6">
            <h3 className="font-bold text-deweb-cyan">{t("profile")}</h3>
            <p className="mt-2 text-sm text-white/50">{t("profileHint")}</p>
          </GlassCard>
        </Link>
      </div>
    </AccountRoleShell>
  );
}
