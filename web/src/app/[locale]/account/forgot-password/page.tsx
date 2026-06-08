import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { accountPageMetadata } from "@/lib/account-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return accountPageMetadata("forgot-password", "/account/forgot-password", locale);
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout active="forgot">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
