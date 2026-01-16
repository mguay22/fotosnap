"use client";

import { EditProfileModal } from "@/components/dashboard/edit-profile-modal";
import { FollowersFollowingModal } from "@/components/users/followers-following-modal";
import { PostModal } from "@/components/users/post-modal";
import ProfileHeader from "@/components/users/profile-header";
import { ProfileNavigation } from "@/components/users/profile-navigation";
import { ProfileTabs } from "@/components/users/profile-tabs";
import { authClient } from "@/lib/auth/client";
import { trpc } from "@/lib/trpc/client";
import { Post, UpdateProfileInput } from "@repo/trpc/schemas";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const { data: session } = authClient.useSession();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const { data: posts = [] } = trpc.postsRouter.findAll.useQuery({
    userId,
  });

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

  const updateProfileMutation = trpc.usersRouter.updateProfile.useMutation({
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

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleSaveProfile = (data: UpdateProfileInput) => {
    updateProfileMutation.mutate(data);
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
          isOwnProfile={session?.user.id === profile.id}
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

        <ProfileTabs
          userPosts={posts}
          savedPosts={[]}
          name={profile.name}
          onPostClick={handlePostClick}
        />
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}

      <EditProfileModal
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <FollowersFollowingModal
        open={followersFollowingModal.open}
        onOpenChange={(open) => {
          setFollowersFollowingModal({ ...followersFollowingModal, open });
        }}
        userId={userId}
        type={followersFollowingModal.type}
      />
    </div>
  );
}
