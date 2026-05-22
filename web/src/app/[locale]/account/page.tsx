"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { useAuth } from "@/lib/auth-context";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AccountHomePage() {
  const t = useTranslations("account");
  const { user, displayName } = useAuth();
  const isSeller = user?.accountMode === "seller" || user?.account_mode === "seller";

  return (
    <AccountRoleShell>
      <h1 className="text-2xl font-bold text-white">
        {t("hello")}, {displayName}
      </h1>
      <p className="mt-2 text-white/50">{t("overviewSubtitle")}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {!isSeller && (
          <Link href="/account/projects">
            <GlassCard className="p-6 hover:border-deweb-cyan/30">
              <h3 className="font-bold text-deweb-cyan">{t("postProject")}</h3>
              <p className="mt-2 text-sm text-white/50">{t("postProjectHint")}</p>
            </GlassCard>
          </Link>
        )}
        {isSeller && (
          <Link href="/account/proposals">
            <GlassCard className="p-6">
              <h3 className="font-bold text-deweb-cyan">{t("proposals")}</h3>
              <p className="mt-2 text-sm text-white/50">{t("proposalsHint")}</p>
            </GlassCard>
          </Link>
        )}
        <Link href="/account/wallet">
          <GlassCard className="p-6">
            <h3 className="font-bold text-deweb-cyan">{t("wallet")}</h3>
            <p className="mt-2 text-sm text-white/50">{t("walletHint")}</p>
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
