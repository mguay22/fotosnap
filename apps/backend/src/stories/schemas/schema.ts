import { text } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { user } from '../../auth/schema';
import { timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const story = pgTable('story', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  image: text('image').notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

export const storyRelations = relations(story, ({ one }) => ({
  user: one(user, {
    fields: [story.userId],
    references: [user.id],
  }),
}));
