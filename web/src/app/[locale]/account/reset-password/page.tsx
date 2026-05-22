import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout active="forgot">
      <Suspense fallback={<p className="text-white/50">…</p>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
