import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { DatabaseModule } from 'src/config/database/db.module';
import { CreateRoadmapService } from './services/createRoadmap.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoadmapController],
  providers: [CreateRoadmapService]
})
export class RoadmapModule { }
