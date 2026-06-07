import { buildPageMetadata } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({
    title: "Dashboard",
    description: "DEWEB customer and supplier dashboard.",
    path: "/dashboard",
    locale,
    noIndex: true,
  });
}

export default function DashboardLayout({ children }: Props) {
  return children;
}
