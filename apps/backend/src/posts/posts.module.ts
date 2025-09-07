import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsRouter } from './posts.router';
import { UsersModule } from '../auth/users/users.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  providers: [PostsService, PostsRouter],
})
export class PostsModule {}
