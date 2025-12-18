"use client";

import ProfileHeader from "@/components/users/profile-header";
import { ProfileNavigation } from "@/components/users/profile-navigation";
import { trpc } from "@/lib/trpc/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [followersFollowingModal, setFollowersFollowingModal] = useState<{
    open: boolean;
    type: "followers" | "following";
  }>({
    open: false,
    type: "followers",
  });
  const utils = trpc.useUtils();
  const { data: profile, isLoading } = trpc.usersRouter.getUserProfile.useQuery(
    {
      userId,
    }
  );

  const unfollowMutation = trpc.usersRouter.unfollow.useMutation({
    onSuccess: () => {
      utils.usersRouter.getUserProfile.invalidate({ userId });
    },
  });

  const followMutation = trpc.usersRouter.follow.useMutation({
    onSuccess: () => {
      utils.usersRouter.getUserProfile.invalidate({ userId });
    },
  });

  const handleFollowToggle = () => {
    if (!profile) {
      return;
    }
    if (profile?.isFollowing) {
      unfollowMutation.mutate({ userId: profile.id });
    } else {
      followMutation.mutate({ userId: profile.id });
    }
  };

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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileHeader
          profile={profile}
          onFollowToggle={handleFollowToggle}
          onEditProfile={() => setIsEditProfileOpen(true)}
          onOpenFollowers={() =>
            setFollowersFollowingModal({ open: true, type: "followers" })
          }
          onOpenFollowing={() =>
            setFollowersFollowingModal({ open: true, type: "following" })
          }
          isFollowLoading={
            followMutation.isPending || unfollowMutation.isPending
          }
        />
      </div>
    </div>
  );
}
