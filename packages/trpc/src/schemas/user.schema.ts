import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const userIdSchema = z.object({
  userId: z.string(),
});

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
});

export const userProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  website: z.string().nullable(),
  image: z.string().nullable(),
  followerCount: z.number(),
  followingCount: z.number(),
  postCount: z.number(),
  isFollowing: z.boolean(),
});

export type UserIdInput = z.infer<typeof userIdSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
