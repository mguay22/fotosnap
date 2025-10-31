import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createPostSchema, postSchema, likePostSchema, createCommentSchema, getCommentsSchema, commentSchema, deleteCommentSchema } from "@repo/trpc/schemas";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  postsRouter: t.router({
    create: publicProcedure.input(createPostSchema).output(postSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findAll: publicProcedure.output(z.array(postSchema)).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    likePost: publicProcedure.input(likePostSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  commentsRouter: t.router({
    create: publicProcedure.input(createCommentSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByPostId: publicProcedure.input(getCommentsSchema).output(z.array(commentSchema)).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    delete: publicProcedure.input(deleteCommentSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

