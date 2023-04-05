import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/config/database/db.module';
import { CreateUserService } from './services/createUser.service';
import { ListUsersService } from './services/listUser.service';
import { UpdateUserService } from './services/updateUser.service';
import { UsersController } from './users.controller';
import { FindUserService } from './services/findUser.service';
import { Hash } from 'src/utils/hash/hash';
import { BcryptHashService } from 'src/utils/hash/implementations/BcryptHash.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateUserService, ListUsersService, UpdateUserService, FindUserService, { provide: Hash, useClass: BcryptHashService }],
})
export class UsersModule { }
