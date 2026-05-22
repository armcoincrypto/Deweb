import { AuthForm } from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <div className="container-narrow px-4 py-28 sm:px-6 lg:px-8">
      <AuthForm mode="signup" />
    </div>
  );
}
