import { Suspense } from "react";
import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { DealChatView } from "@/components/account/DealChatView";
import { accountPageMetadata } from "@/lib/account-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return accountPageMetadata("messages", "/account/messages", locale);
}

export default function AccountMessagesPage() {
  return (
    <AccountRoleShell>
      <Suspense fallback={<p className="text-white/50">Loading…</p>}>
        <DealChatView />
      </Suspense>
    </AccountRoleShell>
  );
}
