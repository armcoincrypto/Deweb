import { dashboardPageMetadata } from "@/lib/dashboard-seo";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return dashboardPageMetadata("dashboard-customer-offers", "/dashboard/customer/offers", locale);
}

export default function Layout({ children }: Props) {
  return children;
}
