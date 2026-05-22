import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { WalletView } from "@/components/account/WalletView";

export default function AccountWalletPage() {
  return (
    <AccountRoleShell>
      <WalletView />
    </AccountRoleShell>
  );
}
