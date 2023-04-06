import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
import { RoadmapModule } from '../modules/roadmap/roadmap.module';
import { HomologationModule } from 'src/modules/homologation/homologation.module';

@Module({
  imports: [UsersModule, RoadmapModule, HomologationModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { }
