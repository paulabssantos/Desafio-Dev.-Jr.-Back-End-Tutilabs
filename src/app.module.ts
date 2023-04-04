import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoadmapModule } from './roadmap/roadmap.module';

@Module({
  imports: [UsersModule, RoadmapModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
