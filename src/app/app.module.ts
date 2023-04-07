import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
import { RoadmapModule } from '../modules/roadmap/roadmap.module';
import { HomologationModule } from 'src/modules/homologation/homologation.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';

@Module({
  imports: [UsersModule, RoadmapModule, HomologationModule, AuthenticationModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { }
