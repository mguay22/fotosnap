import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesRouter } from './stories.router';

@Module({
  providers: [StoriesService, StoriesRouter],
})
export class StoriesModule {}
