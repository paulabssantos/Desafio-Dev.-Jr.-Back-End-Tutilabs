import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
import { RoadmapModule } from '../modules/roadmap/roadmap.module';

@Module({
  imports: [UsersModule, RoadmapModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { }
