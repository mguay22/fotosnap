import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createPostSchema, postSchema, likePostSchema, userIdSchema, userSchema, updateProfileSchema, userProfileSchema, createCommentSchema, getCommentsSchema, commentSchema, deleteCommentSchema, createStorySchema, storyGroupSchema } from "@repo/trpc/schemas";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  postsRouter: t.router({
    create: publicProcedure.input(createPostSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findAll: publicProcedure.output(z.array(postSchema)).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    likePost: publicProcedure.input(likePostSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  usersRouter: t.router({
    follow: publicProcedure.input(userIdSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    unfollow: publicProcedure.input(userIdSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getFollowers: publicProcedure.input(userIdSchema).output(z.array(userSchema)).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getFollowing: publicProcedure.input(userIdSchema).output(z.array(userSchema)).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getSuggestedUsers: publicProcedure.output(z.array(userSchema)).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateProfile: publicProcedure.input(updateProfileSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getUserProfile: publicProcedure.input(userIdSchema).output(userProfileSchema).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  commentsRouter: t.router({
    create: publicProcedure.input(createCommentSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByPostId: publicProcedure.input(getCommentsSchema).output(z.array(commentSchema)).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    delete: publicProcedure.input(deleteCommentSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  storiesRouter: t.router({
    create: publicProcedure.input(createStorySchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getStories: publicProcedure.output(z.array(storyGroupSchema)).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

