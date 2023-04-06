import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { DatabaseModule } from 'src/app/config/database/db.module';
import { CreateRoadmapService } from './services/createRoadmap.service';
import { UpdateRoadmapService } from './services/updateRoadmap.service';
import { ListRoadmapService } from './services/listRoadmap.service';
import { FindRoadmapService } from './services/findRoadMap.service';
import { DeleteRoadmapService } from './services/deleteRoadmap.service';
import { ListHomologatedRoadmapsByProducerService } from './services/listHomologatedRoadmapsByProducer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoadmapController],
  providers: [CreateRoadmapService, UpdateRoadmapService, ListRoadmapService, FindRoadmapService, DeleteRoadmapService, ListHomologatedRoadmapsByProducerService]
})
export class RoadmapModule { }
