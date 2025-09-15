import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import {
  CreatePostInput,
  createPostSchema,
  postSchema,
} from './schemas/trpc.schema';
import { PostsService } from './posts.service';
import z from 'zod';

@Router()
export class PostsRouter {
  constructor(private readonly postsService: PostsService) {}

  @Mutation({ input: createPostSchema, output: postSchema })
  async create(@Input() createPostInput: CreatePostInput) {
    return this.postsService.create(
      createPostInput,
      '3HkKbFCQ6pNnt76Zdfe29Iyk8qDo7Mqv',
    );
  }

  @Query({ output: z.array(postSchema) })
  async findAll() {
    return this.postsService.findAll();
  }
}
