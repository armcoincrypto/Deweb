import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { accountPageMetadata } from "@/lib/account-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return accountPageMetadata("reset-password", "/account/reset-password", locale);
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout active="forgot">
      <Suspense fallback={<p className="text-white/50">…</p>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
