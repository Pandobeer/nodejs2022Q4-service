import { Module } from '@nestjs/common';
import InMemoryUsersStorage from '../store/users.storage';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, InMemoryUsersStorage],
})
export class UserModule {}
