import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsRouter } from './comments.router';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CommentsService, CommentsRouter],
})
export class CommentsModule {}
