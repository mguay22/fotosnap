import { getImageUrl } from "@/lib/image";
import { Comment } from "@repo/trpc/schemas";
import { Trash2, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

interface CommentsProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  onDeleteComment: (commentId: number) => void;
}

export default function Comments({
  comments,
  onAddComment,
  onDeleteComment,
}: CommentsProps) {
  const [commentText, setCommentText] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-2">
            <Button
              variant="ghost"
              className="p-0 pt-3"
              onClick={() => router.push(`/users/${comment.user.id}`)}
            >
              {getImageUrl(comment.user.avatar) ? (
                <Image
                  src={getImageUrl(comment.user.avatar)}
                  alt={comment.user.username}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </Button>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <Button
                    variant="ghost"
                    onClick={() => router.push(`/users/${comment.user.id}`)}
                    className="font-semibold text-sm p-0"
                  >
                    {comment.user.username}
                  </Button>
                  <p className="text-sm break-words">{comment.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto flex-shrink-0"
                  onClick={() => onDeleteComment(comment.id)}
                >
                  <Trash2 className="w-3 h-3 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
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
  );
}
