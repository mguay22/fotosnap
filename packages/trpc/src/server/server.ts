import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  postsRouter: t.router({
    create: publicProcedure.input(z.object({
      image: z.string().min(1, "Image is required"),
      caption: z.string().min(1, "Caption is required"),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findAll: publicProcedure.input(z.object({
      userId: z.string().optional(),
    })).output(z.array(z.object({
      id: z.number(),
      user: z.object({
        username: z.string(),
        id: z.string(),
        avatar: z.string(),
      }),
      image: z.string(),
      caption: z.string(),
      likes: z.number(),
      comments: z.number(),
      timestamp: z.string(),
      isLiked: z.boolean().optional(),
      isSaved: z.boolean().optional(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    likePost: publicProcedure.input(z.object({
      postId: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    savePost: publicProcedure.input(z.object({
      postId: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getSavedPosts: publicProcedure.output(z.array(z.object({
      id: z.number(),
      user: z.object({
        username: z.string(),
        id: z.string(),
        avatar: z.string(),
      }),
      image: z.string(),
      caption: z.string(),
      likes: z.number(),
      comments: z.number(),
      timestamp: z.string(),
      isLiked: z.boolean().optional(),
      isSaved: z.boolean().optional(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  usersRouter: t.router({
    follow: publicProcedure.input(z.object({
      userId: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    unfollow: publicProcedure.input(z.object({
      userId: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getFollowers: publicProcedure.input(z.object({
      userId: z.string(),
    })).output(z.array(z.object({
      id: z.string(),
      name: z.string(),
      bio: z.string().nullable(),
      website: z.string().nullable(),
      image: z.string().nullable(),
      followerCount: z.number(),
      followingCount: z.number(),
      postCount: z.number(),
      isFollowing: z.boolean(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getFollowing: publicProcedure.input(z.object({
      userId: z.string(),
    })).output(z.array(z.object({
      id: z.string(),
      name: z.string(),
      bio: z.string().nullable(),
      website: z.string().nullable(),
      image: z.string().nullable(),
      followerCount: z.number(),
      followingCount: z.number(),
      postCount: z.number(),
      isFollowing: z.boolean(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getSuggestedUsers: publicProcedure.output(z.array(z.object({
      id: z.string(),
      name: z.string(),
      bio: z.string().nullable(),
      website: z.string().nullable(),
      image: z.string().nullable(),
      followerCount: z.number(),
      followingCount: z.number(),
      postCount: z.number(),
      isFollowing: z.boolean(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateProfile: publicProcedure.input(z.object({
      name: z.string().optional(),
      bio: z.string().optional(),
      website: z.string().optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getUserProfile: publicProcedure.input(z.object({
      userId: z.string(),
    })).output(z.object({
      id: z.string(),
      name: z.string(),
      bio: z.string().nullable(),
      website: z.string().nullable(),
      image: z.string().nullable(),
      followerCount: z.number(),
      followingCount: z.number(),
      postCount: z.number(),
      isFollowing: z.boolean(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  commentsRouter: t.router({
    create: publicProcedure.input(z.object({
      postId: z.number(),
      text: z.string().min(1, "Comment cannot be empty"),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByPostId: publicProcedure.input(z.object({
      postId: z.number(),
    })).output(z.array(z.object({
      id: z.number(),
      text: z.string(),
      user: z.object({
        username: z.string(),
        id: z.string(),
        avatar: z.string(),
      }),
      createdAt: z.string(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    delete: publicProcedure.input(z.object({
      commentId: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  storiesRouter: t.router({
    create: publicProcedure.input(z.object({
      image: z.string().min(1, "Image is required"),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getStories: publicProcedure.output(z.array(z.object({
      userId: z.string(),
      username: z.string(),
      avatar: z.string(),
      stories: z.array(z.object({
        id: z.number(),
        user: z.object({
          id: z.string(),
          username: z.string(),
          avatar: z.string(),
        }),
        image: z.string(),
        createdAt: z.string(),
        expiresAt: z.string(),
      })),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

