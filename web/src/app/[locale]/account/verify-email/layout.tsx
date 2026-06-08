import { accountPageMetadata } from "@/lib/account-seo";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return accountPageMetadata("verify-email", "/account/verify-email", locale);
}

export default function VerifyEmailLayout({ children }: Props) {
  return children;
}
