import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { ProjectsView } from "@/components/account/ProjectsView";
import { accountPageMetadata } from "@/lib/account-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return accountPageMetadata("projects", "/account/projects", locale);
}

export default function AccountProjectsPage() {
  return (
    <AccountRoleShell>
      <ProjectsView />
    </AccountRoleShell>
  );
}
