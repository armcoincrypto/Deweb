"use client";

import { useAuth } from "@/lib/auth-context";
import { AccountShell } from "./AccountShell";

export function AccountRoleShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const isSeller = user?.accountMode === "seller" || user?.account_mode === "seller";
  return (
    <AccountShell role={isSeller ? "supplier" : "customer"}>{children}</AccountShell>
  );
}
