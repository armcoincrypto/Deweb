import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { ListingsView } from "@/components/account/ListingsView";
import { accountPageMetadata } from "@/lib/account-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return accountPageMetadata("listings", "/account/listings", locale);
}

export default function AccountListingsPage() {
  return (
    <AccountRoleShell>
      <ListingsView />
    </AccountRoleShell>
  );
}
