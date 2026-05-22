import { Suspense } from "react";
import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { DealChatView } from "@/components/account/DealChatView";

export default function AccountMessagesPage() {
  return (
    <AccountRoleShell>
      <Suspense fallback={<p className="text-white/50">Loading…</p>}>
        <DealChatView />
      </Suspense>
    </AccountRoleShell>
  );
}
