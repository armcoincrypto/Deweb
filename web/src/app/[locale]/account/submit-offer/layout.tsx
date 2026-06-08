import { accountPageMetadata } from "@/lib/account-seo";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return accountPageMetadata("submit-offer", "/account/submit-offer", locale);
}

export default function SubmitOfferLayout({ children }: Props) {
  return children;
}
