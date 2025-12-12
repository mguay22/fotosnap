"use client";

import { ProfileNavigation } from "@/components/users/profile-navigation";
import { trpc } from "@/lib/trpc/client";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;

  const { data: profile, isLoading } = trpc.usersRouter.getUserProfile.useQuery(
    {
      userId,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">User not found</h1>
          <p className="text-muted-foreground">This user doesn't exist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProfileNavigation />

      <div className="max-w-4xl mx-auto px-4 py-8"></div>
    </div>
  );
}
