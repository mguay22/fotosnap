import Image from "next/image";
import { Card } from "../ui/card";
import { authClient } from "@/lib/auth/client";
import { getImageUrl } from "@/lib/image";
import { Plus, User } from "lucide-react";
import { StoryGroup } from "@repo/trpc/schemas";
import { useState } from "react";
import { Button } from "../ui/button";
import StoryUpload from "./story-upload";
import { StoryViewer } from "./story-viewer";

interface StoriesProps {
  storyGroups: StoryGroup[];
  onStoryUpload: (file: File) => Promise<void>;
}

export function Stories({ storyGroups, onStoryUpload }: StoriesProps) {
  const { data: session } = authClient.useSession();
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

  const ownStoryGroup = storyGroups.find(
    (group) => group.userId === session?.user.id
  );
  const otherStoryGroups = storyGroups.filter(
    (group) => group.userId !== session?.user.id
  );

  return (
    <Card className="p-4">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <div className="relative">
            <div
              className={`p-0.5 rounded-full ${ownStoryGroup ? `bg-gradient-to-tr from-yellow-400 to-fuchsia-600` : `bg-gray-200`}`}
              onClick={() => {
                if (ownStoryGroup) {
                  setSelectedGroupIndex(0);
                  setShowStoryViewer(true);
                }
              }}
            >
              {session?.user.image ? (
                <Image
                  src={getImageUrl(session?.user.image)}
                  alt="Your profile picture"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <Button
              onClick={() => setShowCreateStory(true)}
              size="icon"
              className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <span
            className="text-xs text-center w-16 truncate"
            title="Your story"
          >
            Your story
          </span>
        </div>
        {otherStoryGroups?.map((storyGroup, index) => (
          <div
            key={storyGroup.userId}
            className="flex flex-col items-center space-y-1 flex-shrink-0"
            onClick={() => {
              setSelectedGroupIndex(ownStoryGroup ? index + 1 : index);
              setShowStoryViewer(true);
            }}
          >
            <div className="relative">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 bg-gray-200">
                {storyGroup.avatar ? (
                  <Image
                    src={getImageUrl(storyGroup.avatar)}
                    alt={storyGroup.username}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-white">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
            <span
              className="text-xs text-center w-16 truncate"
              title={storyGroup.username}
            >
              {storyGroup.username}
            </span>
          </div>
        ))}
      </div>

      <StoryUpload
        open={showCreateStory}
        onOpenChange={setShowCreateStory}
        onSubmit={onStoryUpload}
      />

      <StoryViewer
        storyGroups={storyGroups}
        initialGroupIndex={selectedGroupIndex}
        open={showStoryViewer}
        onOpenChange={setShowStoryViewer}
      />
    </Card>
  );
}
