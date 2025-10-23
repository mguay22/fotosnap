import { z } from "zod";

export const createCommentSchema = z.object({
  postId: z.number(),
  text: z.string().min(1, "Comment cannot be empty"),
});

export const deleteCommentSchema = z.object({
  commentId: z.number(),
});

export const getCommentsSchema = z.object({
  postId: z.number(),
});

export const commentSchema = z.object({
  id: z.number(),
  text: z.string(),
  user: z.object({
    username: z.string(),
    avatar: z.string(),
  }),
  createdAt: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type DeleteCommentInput = z.infer<typeof deleteCommentSchema>;
export type GetCommentsInput = z.infer<typeof getCommentsSchema>;
