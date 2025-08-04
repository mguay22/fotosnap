export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-primary hover:text-primary/90"
            >
              Create one here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
