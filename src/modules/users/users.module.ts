import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/config/database/db.module';
import { CreateUserService } from './services/createUser.service';
import { ListUsersService } from './services/listUser.service';
import { UpdateUserService } from './services/updateUser.service';
import { UsersController } from './users.controller';
import { FindUserService } from './services/findUser.service';
import { DeleteUserService } from './services/deleteUser.service';
import { HashModule } from 'src/utils/hash/hash.module';

@Module({
  imports: [DatabaseModule, HashModule],
  controllers: [UsersController],
  providers: [CreateUserService, ListUsersService, UpdateUserService, FindUserService, DeleteUserService],
})
export class UsersModule { }
