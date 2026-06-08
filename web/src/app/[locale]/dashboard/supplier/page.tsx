import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { dashboardPageMetadata } from "@/lib/dashboard-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return dashboardPageMetadata("dashboard-supplier", "/dashboard/supplier", locale);
}

export default function SupplierDashboardPage() {
  return (
    <DashboardShell role="supplier">
      <DashboardOverview role="supplier" />
    </DashboardShell>
  );
}
