import Image from "next/image";
import { Card } from "../ui/card";
import { authClient } from "@/lib/auth/client";
import { getImageUrl } from "@/lib/image";
import { User } from "lucide-react";

interface Story {
  id: string;
  username: string;
  avatar: string;
}

const mockStories: Story[] = [
  {
    id: "1",
    username: "johndoe",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
  },
  {
    id: "2",
    username: "janedoe",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&h=60&fit=crop&crop=faces",
  },
  {
    id: "3",
    username: "photographer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  },
  {
    id: "4",
    username: "traveler",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
  },
  {
    id: "5",
    username: "foodie",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=60&h=60&fit=crop&crop=face",
  },
];

export function Stories() {
  const { data: session } = authClient.useSession();

  return (
    <Card className="p-4">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <div className="relative">
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 bg-gray-200">
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
          </div>
          <span
            className="text-xs text-center w-16 truncate"
            title="Your story"
          >
            Your story
          </span>
        </div>
        {mockStories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center space-y-1 flex-shrink-0"
          >
            <div className="relative">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 bg-gray-200">
                <Image
                  src={story.avatar}
                  alt={story.username}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
              </div>
            </div>
            <span
              className="text-xs text-center w-16 truncate"
              title={story.username}
            >
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
