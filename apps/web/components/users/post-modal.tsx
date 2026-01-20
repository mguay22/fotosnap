"use client";

import { Post } from "@repo/trpc/schemas";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { getImageUrl } from "@/lib/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Bookmark, Heart, Trash2, User } from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import { authClient } from "@/lib/auth/client";
import { Input } from "../ui/input";
import React, { useState } from "react";

interface PostModalProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostModal({
  post: initialPost,
  open,
  onOpenChange,
}: PostModalProps) {
  const { data: allPosts } = trpc.postsRouter.findAll.useQuery({});
  const post = allPosts?.find((p) => p.id === initialPost.id) || initialPost;
  const [commentText, setCommentText] = useState("");
  const { data: comments = [] } = trpc.commentsRouter.findByPostId.useQuery({
    postId: post.id,
  });
  const router = useRouter();
  const utils = trpc.useUtils();
  const { data: session } = authClient.useSession();
  const deleteCommentMutation = trpc.commentsRouter.delete.useMutation({
    onSuccess: () => {
      utils.commentsRouter.findByPostId.invalidate({ postId: post.id });
      utils.postsRouter.findAll.invalidate();
    },
  });

  const handleDeleteComment = async (commentId: number) => {
    await deleteCommentMutation.mutateAsync({ commentId });
  };

  const likePostMutation = trpc.postsRouter.likePost.useMutation({
    onSuccess: () => {
      utils.postsRouter.findAll.invalidate();
      utils.usersRouter.getUserProfile.invalidate();
    },
  });
  const createCommentMutation = trpc.commentsRouter.create.useMutation({
    onSuccess: (_, variables) => {
      utils.commentsRouter.findByPostId.invalidate({
        postId: variables.postId,
      });
      utils.postsRouter.findAll.invalidate();
      setCommentText("");
    },
  });

  const savePostMutation = trpc.postsRouter.savePost.useMutation({
    onSuccess: () => {
      utils.postsRouter.findAll.invalidate();
      utils.postsRouter.getSavedPosts.invalidate();
    },
  });

  const handleSave = async () => {
    await savePostMutation.mutateAsync({ postId: post.id });
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      await createCommentMutation.mutateAsync({
        postId: post.id,
        text: commentText,
      });
    }
  };

  const handleLike = async () => {
    await likePostMutation.mutateAsync({ postId: post.id });
  };

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
                onClick={() => router.push(`/users/${post.user.id}`)}
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
                  onClick={() => router.push(`/users/${post.user.id}`)}
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
                        onClick={() => router.push(`/users/${post.user.id}`)}
                        className="font-semibold mr-2 p-0 h-auto hover:opacity-80 hover:bg-transparent"
                      >
                        {post.user.username}
                      </Button>
                      <span className="text-sm">{post.caption}</span>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => router.push(`/users/${comment.user.id}`)}
                      className="flex-shrink-0 p-0 h-auto hover:opacity-80 hover:bg-transparent"
                    >
                      {getImageUrl(comment.user.avatar) ? (
                        <Image
                          src={getImageUrl(comment.user.avatar)}
                          alt={comment.user.username}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-mutd flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </Button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <Button
                            variant="ghost"
                            onClick={() =>
                              router.push(`/users/${comment.user.id}`)
                            }
                            className="font-semibold text-sm p-0 h-auto hover:opacity-80 hover:bg-transparent"
                          >
                            {comment.user.username}
                          </Button>
                          <p className="text-sm break-words">{comment.text}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {session?.user.id === comment.user.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto flex-shrink-0"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash2 className="w-3 h-3 text-muted-foreground" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center p-4">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>
            </div>

            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLike}
                    disabled={likePostMutation.isPending}
                    className="p-0 h-auto"
                  >
                    <Heart
                      className={`h-6 w-6 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                  <div className="font-semibold text-sm">
                    {post.likes} likes
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  disabled={savePostMutation.isPending}
                  className="p-0 h-auto"
                >
                  <Bookmark
                    className={`h-6 w-6 ${post.isSaved ? "fill-foreground" : ""}`}
                  />
                </Button>
              </div>

              <div className="border-t p-4">
                <form
                  onSubmit={handleAddComment}
                  className="flex items-center space-x-2"
                >
                  <Input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!commentText.trim()}>
                    Post
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
