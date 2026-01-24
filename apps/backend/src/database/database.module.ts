import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database-connection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as authSchema from '../auth/schema';
import * as postsSchema from '../posts/schemas/schema';
import * as commentsSchema from '../comments/schemas/schema';
import * as storiesSchema from '../stories/schemas/schema';
import * as path from 'path';
import * as fs from 'fs';

export const schema = {
  ...authSchema,
  ...postsSchema,
  ...commentsSchema,
  ...storiesSchema,
};

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configSerivce: ConfigService) => {
        let ssl: any = false;
        if (configSerivce.get('NODE_ENV') === 'production') {
          const certPath = path.resolve(__dirname, '../../global-bundle.pem');
          const certificate = fs.readFileSync(certPath).toString();
          ssl = { ca: certificate };
        }

        const pool = new Pool({
          host: configSerivce.getOrThrow('DATABASE_HOST'),
          port: parseInt(configSerivce.getOrThrow('PORT')),
          user: configSerivce.getOrThrow('DATABASE_USER'),
          password: configSerivce.getOrThrow('DATABASE_PASSWORD'),
          database: configSerivce.getOrThrow('DATABASE_NAME'),
          ssl,
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
