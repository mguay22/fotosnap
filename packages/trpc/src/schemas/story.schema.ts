import z from "zod";

export const createStorySchema = z.object({
  image: z.string().min(1, "Image is required"),
});

export const storySchema = z.object({
  id: z.number(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    avatar: z.string(),
  }),
  image: z.string(),
  createdAt: z.string(),
  expiresAt: z.string(),
});

export const storyGroupSchema = z.object({
  userId: z.string(),
  username: z.string(),
  avatar: z.string(),
  stories: z.array(storySchema),
});

export type Story = z.infer<typeof storySchema>;
export type StoryGroup = z.infer<typeof storyGroupSchema>;
export type CreateStoryInput = z.infer<typeof createStorySchema>;
