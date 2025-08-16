"use client";

import SignupForm from "@/components/auth/signup-form";
import { authClient } from "@/lib/auth/client";
import { SignupFormData } from "@/lib/auth/schema";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (data: SignupFormData) => {
    await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign in here
            </a>
          </p>
        </div>
        <SignupForm onSubmit={handleSignup} />
      </div>
    </div>
  );
}
