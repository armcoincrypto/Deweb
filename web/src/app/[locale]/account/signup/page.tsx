import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export default function AccountSignupPage() {
  return (
    <AuthLayout active="signup">
      <SignupForm />
    </AuthLayout>
  );
}
