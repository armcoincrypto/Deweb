import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { accountPageMetadata } from "@/lib/account-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return accountPageMetadata("signup", "/account/signup", locale);
}

export default function AccountSignupPage() {
  return (
    <AuthLayout active="signup">
      <SignupForm />
    </AuthLayout>
  );
}
