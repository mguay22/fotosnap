"use client";

import Image from "next/image";
import { Heart, MessageCircle, User } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { getImageUrl } from "@/lib/image";

interface Post {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
}

interface FeedProps {
  posts: Post[];
  onLikePost: (postId: number) => void;
}

export default function Feed({ posts, onLikePost }: FeedProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              {getImageUrl(post.user.avatar) ? (
                <Image
                  src={getImageUrl(post.user.avatar)}
                  alt={post.user.username}
                  width={64}
                  height={64}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}

              <span className="font-semibold text-sm">
                {post.user.username}
              </span>
            </div>
          </div>

          <div className="aspect-square relative">
            <Image
              src={getImageUrl(post.image)}
              alt="Post"
              className="object-cover"
              fill
            />
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLikePost(post.id)}
                  className="p-0 h-auto"
                >
                  <Heart
                    className={`w-6 h-6 ${post.isLiked ? "fill-red-500 text-red-500" : "text-foreground"}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}}
                  className="p-0 h-auto"
                >
                  <MessageCircle className="w-6 h-6 text-foreground" />
                </Button>
              </div>
            </div>

            <div className="text-sm font-semibold">{post.likes} likes</div>

            <div className="text-sm">
              <span className="font-semibold">{post.user.username} </span>
              {post.caption}
            </div>

            {post.comments > 0 && (
              <div className="text-sm text-muted-foreground">
                View all {post.comments} comments
              </div>
            )}

            <div className="text-xs text-muted-foreground uppercase">
              {new Date(post.timestamp).toLocaleDateString()}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
