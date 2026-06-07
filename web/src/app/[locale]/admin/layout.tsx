import { buildPageMetadata } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({
    title: "Admin",
    description: "DEWEB administration panel.",
    path: "/admin",
    locale,
    noIndex: true,
  });
}

export default function AdminLayout({ children }: Props) {
  return children;
}
