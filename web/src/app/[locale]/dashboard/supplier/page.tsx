import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export default function SupplierDashboardPage() {
  return (
    <DashboardShell role="supplier">
      <DashboardOverview role="supplier" />
    </DashboardShell>
  );
}
