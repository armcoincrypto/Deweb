import { AccountRoleShell } from "@/components/account/AccountRoleShell";
import { ProjectsView } from "@/components/account/ProjectsView";

export default function AccountProjectsPage() {
  return (
    <AccountRoleShell>
      <ProjectsView />
    </AccountRoleShell>
  );
}
