import {
  Ctx,
  Input,
  Mutation,
  Query,
  Router,
  UseMiddlewares,
} from '@mguay/nestjs-trpc';
import {
  CreatePostInput,
  createPostSchema,
  FindAllPostsInput,
  findAllPostsSchema,
  LikePostInput,
  likePostSchema,
  postSchema,
} from '@repo/trpc/schemas';
import { PostsService } from './posts.service';
import z from 'zod';
import { AuthTrpcMiddleware } from '../auth/auth-trpc.middleware';
import { AppContext } from '../app-context.interface';

@Router()
@UseMiddlewares(AuthTrpcMiddleware)
export class PostsRouter {
  constructor(private readonly postsService: PostsService) {}

  @Mutation({ input: createPostSchema })
  async create(
    @Input() createPostInput: CreatePostInput,
    @Ctx() context: AppContext,
  ) {
    return this.postsService.create(createPostInput, context.user.id);
  }

  @Query({ output: z.array(postSchema), input: findAllPostsSchema })
  async findAll(
    @Ctx() context: AppContext,
    @Input() findAllPostsSchema: FindAllPostsInput,
  ) {
    return this.postsService.findAll(
      context.user.id,
      findAllPostsSchema.userId,
    );
  }

  @Mutation({ input: likePostSchema })
  async likePost(
    @Input() likePostInput: LikePostInput,
    @Ctx() context: AppContext,
  ) {
    return this.postsService.likePost(likePostInput.postId, context.user.id);
  }
}
