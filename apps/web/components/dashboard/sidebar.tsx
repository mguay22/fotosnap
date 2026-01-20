"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { authClient } from "@/lib/auth/client";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import { Camera, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/image";
import { useState } from "react";
import AvatarUpload from "./avatar-upload";
import { trpc } from "@/lib/trpc/client";

interface SuggestedUser {
  id: string;
  username: string;
  avatar: string;
  followedBy: string;
}

export default function Sidebar() {
  const { data: session } = authClient.useSession();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const { data: suggestedUsers = [] } =
    trpc.usersRouter.getSuggestedUsers.useQuery();
  const utils = trpc.useUtils();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const followMutation = trpc.usersRouter.follow.useMutation({
    onSuccess: () => {
      utils.usersRouter.getSuggestedUsers.invalidate();
    },
  });

  const handleAvatarUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const uploadResponse = await fetch("/api/upload/image", {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload avatar");
    }

    const { filename } = await uploadResponse.json();
    await authClient.updateUser({ image: filename });
    await utils.postsRouter.findAll.refetch();
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            {session?.user.image ? (
              <Image
                src={getImageUrl(session?.user.image)}
                alt="Your profile"
                width={60}
                height={60}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAvatarModal(true)}
              title="Change avatar"
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full p-1 hover:bg-primary/90"
            >
              <Camera className="w-3 h-3" />
            </Button>
          </div>

          <div className="flex-1 min-w-0">
            <Button
              variant="ghost"
              className="text-left w-full h-auto p-0 hover:bg-transparent hover:opacity-80 transition-opacity"
              onClick={() => router.push(`/users/${session?.user.id}`)}
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">
                  {session?.user.email}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {session?.user.name}
                </div>
              </div>
            </Button>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-muted-foreground">
            Suggestions for you
          </h3>
        </div>

        <div className="space-y-3">
          {suggestedUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No suggestions available
            </p>
          ) : (
            suggestedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => router.push(`/users/${user.id}`)}
                  className="flex items-center gap-3 h-auto p-0 hover:bg-transparent"
                >
                  {user.image ? (
                    <Image
                      src={getImageUrl(user.image)}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="min-w-0 text-left">
                    <div className="font-semibold text-sm">{user.name}</div>
                    {user.bio && (
                      <div className="text-xs text-muted-foreground truncate">
                        {user.bio}
                      </div>
                    )}
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/90 text-xs"
                  onClick={() => followMutation.mutate({ userId: user.id })}
                  disabled={followMutation.isPending}
                >
                  Follow
                </Button>
              </div>
            ))
          )}
        </div>
      </Card>

      <AvatarUpload
        open={showAvatarModal}
        onOpenChange={setShowAvatarModal}
        onSubmit={handleAvatarUpload}
        currentAvatar={session?.user.image}
      />
    </div>
  );
}
