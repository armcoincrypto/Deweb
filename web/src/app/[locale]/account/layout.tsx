import { buildPageMetadata } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({
    title: "Account",
    description: "Manage your DEWEB account, listings, and messages.",
    path: "/account",
    locale,
    noIndex: true,
  });
}

export default function AccountLayout({ children }: Props) {
  return children;
}
