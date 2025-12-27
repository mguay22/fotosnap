"use client";

import { Post } from "@repo/trpc/schemas";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { getImageUrl } from "@/lib/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

interface PostModalProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostModal({ post, open, onOpenChange }: PostModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-5xl w-full h-[90vh] p-0 overflow-hidden flex flex-col">
        <div className="grid md:grid-cols-[1.5fr_1fr] h-full flex-1 overflow-hidden">
          <div className="relative bg-black flex items-center justify-center min-h-0">
            <div className="relative w-full h-full">
              <Image
                src={getImageUrl(post.image)}
                alt={post.caption}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="flex flex-col h-full bg-background">
            <div className="flex items-center justify-between p-4 border-b">
              <Button
                variant="ghost"
                className="flex items-center space-x-3 h-auto p-0"
              >
                {post.user.avatar ? (
                  <Image
                    src={getImageUrl(post.user.avatar)}
                    alt={post.user.username}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <span className="font-semibold">{post.user.username}</span>
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex space-x-3 mb-4">
                <Button
                  variant="ghost"
                  className="flex-shrink-0 p-0 h-auto hover:opacity-80 hover:bg-transparent"
                >
                  {post.user.avatar ? (
                    <Image
                      src={getImageUrl(post.user.avatar)}
                      alt={post.user.username}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </Button>
                <div className="flex-1">
                  <div className="space-y-1">
                    <div>
                      <Button
                        variant="ghost"
                        className="font-semibold mr-2 p-0 h-auto hover:opacity-80 hover:bg-transparent"
                      >
                        {post.user.username}
                      </Button>
                      <span className="text-sm">{post.caption}</span>
                      <div className="text-xs text-muted-foreground">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
