import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { DatabaseModule } from 'src/app/config/database/db.module';
import { CreateRoadmapService } from './services/createRoadmap.service';
import { UpdateRoadmapService } from './services/updateRoadmap.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoadmapController],
  providers: [CreateRoadmapService, UpdateRoadmapService]
})
export class RoadmapModule { }
