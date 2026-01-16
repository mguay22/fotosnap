import {
  Ctx,
  Input,
  Mutation,
  Query,
  Router,
  UseMiddlewares,
} from '@mguay/nestjs-trpc';
import {
  UpdateProfileInput,
  updateProfileSchema,
  UserIdInput,
  userIdSchema,
  userProfileSchema,
} from '@repo/trpc/schemas';
import { AuthTrpcMiddleware } from '../auth-trpc.middleware';
import { AppContext } from '../../app-context.interface';
import { UsersService } from './users.service';
import z from 'zod';

@Router()
@UseMiddlewares(AuthTrpcMiddleware)
export class UsersRouter {
  constructor(private readonly usersService: UsersService) {}

  @Mutation({ input: userIdSchema })
  async follow(@Input() input: UserIdInput, @Ctx() context: AppContext) {
    return this.usersService.follow(context.user.id, input.userId);
  }

  @Mutation({ input: userIdSchema })
  async unfollow(@Input() input: UserIdInput, @Ctx() context: AppContext) {
    return this.usersService.unfollow(context.user.id, input.userId);
  }

  @Query({ input: userIdSchema, output: z.array(userProfileSchema) })
  async getFollowers(@Input() input: UserIdInput, @Ctx() context: AppContext) {
    return this.usersService.getFollowers(input.userId, context.user.id);
  }

  @Query({ input: userIdSchema, output: z.array(userProfileSchema) })
  async getFollowing(@Input() input: UserIdInput, @Ctx() context: AppContext) {
    return this.usersService.getFollowing(input.userId, context.user.id);
  }

  @Query({ output: z.array(userProfileSchema) })
  async getSuggestedUsers(@Ctx() context: AppContext) {
    return this.usersService.getSuggestedUsers(context.user.id);
  }

  @Mutation({ input: updateProfileSchema })
  async updateProfile(
    @Input() input: UpdateProfileInput,
    @Ctx() context: AppContext,
  ) {
    return this.usersService.updateProfile(context.user.id, input);
  }

  @Query({ input: userIdSchema, output: userProfileSchema })
  async getUserProfile(
    @Input() input: UserIdInput,
    @Ctx() context: AppContext,
  ) {
    return this.usersService.getUserProfile(input.userId, context.user.id);
  }
}
