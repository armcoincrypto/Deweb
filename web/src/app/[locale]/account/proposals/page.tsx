import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { ProposalsView } from "@/components/account/ProposalsView";
import { accountPageMetadata } from "@/lib/account-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return accountPageMetadata("proposals", "/account/proposals", locale);
}

export default function AccountProposalsPage() {
  return (
    <AccountRoleShell>
      <ProposalsView />
    </AccountRoleShell>
  );
}
