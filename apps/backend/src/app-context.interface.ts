import { Request, Response } from 'express';
import { session, user } from './auth/schema';

export interface AppContext {
  req: Request;
  res: Response;
  user: typeof user.$inferSelect;
  session: typeof session.$inferSelect;
}
