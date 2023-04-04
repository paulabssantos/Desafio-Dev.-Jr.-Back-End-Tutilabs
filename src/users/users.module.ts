import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserService } from './services/createUser.service';
import { UserRepository } from '../main/config/db/repositories/users/UserRepository';
import { UserRepositoryInPrisma } from '../main/config/db/repositories/users/UserRepositoryInPrisma';
import { DatabaseModule } from 'src/main/config/db/db.module';
import { ListUsersService } from './services/listUser.service';
import { UpdateUserService } from './services/updateUser.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateUserService, ListUsersService, UpdateUserService],
})
export class UsersModule {}
