import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  postsRouter: t.router({
    create: publicProcedure.input(z.object({
      image: z.string().min(1, 'Image is required'),
      caption: z.string().min(1, 'Caption is required'),
    })).output(z.object({
      id: z.number(),
      user: z.object({
        username: z.string(),
        avatar: z.string(),
      }),
      image: z.string(),
      caption: z.string(),
      likes: z.number(),
      comments: z.number(),
      timestamp: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findAll: publicProcedure.output(z.array(z.object({
      id: z.number(),
      user: z.object({
        username: z.string(),
        avatar: z.string(),
      }),
      image: z.string(),
      caption: z.string(),
      likes: z.number(),
      comments: z.number(),
      timestamp: z.string(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

