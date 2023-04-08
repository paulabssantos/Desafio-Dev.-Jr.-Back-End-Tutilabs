import { Module } from '@nestjs/common';
import { HomologationController } from './homologation.controller';
import { HomologateRoadmapService } from './services/homologateRoadmap.service';
import { DatabaseModule } from 'src/app/config/database/db.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [HomologationController],
  providers: [HomologateRoadmapService]
})
export class HomologationModule { }
