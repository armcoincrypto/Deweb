import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export default function CustomerDashboardPage() {
  return (
    <DashboardShell role="customer">
      <DashboardOverview role="customer" />
    </DashboardShell>
  );
}
