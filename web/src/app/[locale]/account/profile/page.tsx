import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { ProfileView } from "@/components/account/ProfileView";

export default function AccountProfilePage() {
  return (
    <AccountRoleShell>
      <ProfileView />
    </AccountRoleShell>
  );
}
