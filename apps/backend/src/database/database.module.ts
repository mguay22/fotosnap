import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database-connection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as authSchema from '../auth/schema';
import * as postsSchema from '../posts/schemas/schema';
import * as commentsSchema from '../comments/schemas/schema';

export const schema = {
  ...authSchema,
  ...postsSchema,
  ...commentsSchema,
};

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configSerivce: ConfigService) => {
        const pool = new Pool({
          connectionString: configSerivce.getOrThrow('DATABASE_URL'),
        });
        return drizzle(pool, {
          schema,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
