import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function AccountLoginPage() {
  return (
    <AuthLayout active="login">
      <Suspense fallback={<p className="text-white/50">…</p>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
