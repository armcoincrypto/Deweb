import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { ProfileView } from "@/components/account/ProfileView";
import { accountPageMetadata } from "@/lib/account-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return accountPageMetadata("profile", "/account/profile", locale);
}

export default function AccountProfilePage() {
  return (
    <AccountRoleShell>
      <ProfileView />
    </AccountRoleShell>
  );
}
