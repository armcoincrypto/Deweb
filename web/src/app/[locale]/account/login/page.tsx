import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { accountPageMetadata } from "@/lib/account-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return accountPageMetadata("login", "/account/login", locale);
}

export default function AccountLoginPage() {
  return (
    <AuthLayout active="login">
      <Suspense fallback={<p className="text-white/50">…</p>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
