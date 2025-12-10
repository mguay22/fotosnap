import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '../../database/database.module';
import { UsersRouter } from './users.router';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UsersRouter],
  exports: [UsersService],
})
export class UsersModule {}
