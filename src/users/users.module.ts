import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserService } from './services/createUser.service';
import { UserRepository } from './repository/UserRepository';
import { UserRepositoryInPrisma } from './repository/UserRepositoryInPrisma';
import { DatabaseModule } from 'src/main/config/db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [{provide: UserRepository, useClass: UserRepositoryInPrisma}, CreateUserService],
})
export class UsersModule {}
