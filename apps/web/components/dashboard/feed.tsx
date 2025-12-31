"use client";

import Image from "next/image";
import { Post } from "@repo/trpc/schemas";
import { Heart, MessageCircle, User } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { getImageUrl } from "@/lib/image";
import { useState } from "react";
import PostComments from "./post-comments";
import { useRouter } from "next/navigation";

interface FeedProps {
  posts: Post[];
  onLikePost: (postId: number) => void;
  onAddComment: (postId: number, text: string) => void;
  onDeleteComment: (commentId: number) => void;
}

export default function Feed({
  posts,
  onLikePost,
  onAddComment,
  onDeleteComment,
}: FeedProps) {
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set()
  );

  const router = useRouter();
  const toggleComments = (postId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="p-0"
                onClick={() => router.push(`/users/${post.user.id}`)}
              >
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
              </Button>

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
                  onClick={() => toggleComments(post.id)}
                  className="p-0 h-auto"
                >
                  <MessageCircle
                    className={`w-6 h-6 ${expandedComments.has(post.id) ? "fill-primary text-primary" : "text-foreground"}`}
                  />
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

            {expandedComments.has(post.id) && (
              <div className="pt-4 border-t">
                <PostComments
                  postId={post.id}
                  onAddComment={onAddComment}
                  onDeleteComment={onDeleteComment}
                />
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
