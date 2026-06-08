import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { dashboardPageMetadata } from "@/lib/dashboard-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return dashboardPageMetadata("dashboard-customer", "/dashboard/customer", locale);
}

export default function CustomerDashboardPage() {
  return (
    <DashboardShell role="customer">
      <DashboardOverview role="customer" />
    </DashboardShell>
  );
}
