import { Router, UseMiddlewares } from '@mguay/nestjs-trpc';
import { AuthTrpcMiddleware } from '../auth/auth-trpc.middleware';

@Router()
@UseMiddlewares(AuthTrpcMiddleware)
export class StoriesRouter {}
