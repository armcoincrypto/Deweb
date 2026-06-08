import { redirect } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export default async function LegacyRedirect({ params }: Props) {
  const { locale } = await params;
  redirect({ href: "/services/marketplace-development", locale });
}
