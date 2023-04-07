import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { multerConfig } from 'src/app/config/multer-config';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { ListRoadmapDto } from './dto/list-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { CreateRoadmapService } from './services/createRoadmap.service';
import { DeleteRoadmapService } from './services/deleteRoadmap.service';
import { FindRoadmapService } from './services/findRoadMap.service';
import { ListHomologatedRoadmapsByProducerService } from './services/listHomologatedRoadmapsByProducer.service';
import { ListRoadmapService } from './services/listRoadmap.service';
import { UpdateRoadmapService } from './services/updateRoadmap.service';
import { RolesGuard } from '../authentication/guards/roles.guard';
import { Roles } from '../authentication/decorators/roles.decorator';
import { roles } from '../authentication/enum/roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly listHomologatedRoadmapsByProducerService: ListHomologatedRoadmapsByProducerService, private readonly createRoadmapService: CreateRoadmapService, private readonly updateRoadmapService: UpdateRoadmapService, private listRoadMapService: ListRoadmapService, private findRoadmapService: FindRoadmapService, private deleteRoadmapService: DeleteRoadmapService) { }

  @Roles(roles.Screenwriter)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  create(@UploadedFile() file: Express.Multer.File, @Body() { description, fk_risk, fk_producer, proposed_budget, title }: CreateRoadmapDto) {
    try {
      return this.createRoadmapService.execute(file, { description, file: file ? file.path : undefined, fk_producer, fk_risk, proposed_budget: Number(proposed_budget), title });
    } catch (error) {
      if (error instanceof multer.MulterError) {
        throw new HttpException(`Erro no upload do arquivo - ${error.message}`, HttpStatus.UNPROCESSABLE_ENTITY)
      }
    }
  }

  @Roles(roles.Screenwriter)
  @Get()
  findAll() {
    return this.listRoadMapService.execute();
  }

  @Roles(roles.Producer)
  @Get("/homologated")
  listHomologatedRoadmapsByProducer(@Body() { fk_status }: ListRoadmapDto) {
    return this.listHomologatedRoadmapsByProducerService.execute({ fk_producer: "a8554be9-0b22-4030-ab80-6e927b0ae20d", fk_status })
  }

  @Roles(roles.Screenwriter)
  @Get('/filter')
  filter(@Body() { fk_status, description, fk_producer, fk_risk, max_proposed_budget, min_proposed_budget, title }: ListRoadmapDto) {
    return this.findRoadmapService.execute({ fk_status, description, fk_producer, fk_risk, max_proposed_budget, min_proposed_budget, title })
  }

  @Roles(roles.Screenwriter)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  update(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() { description, fk_producer, fk_risk, proposed_budget, title }: UpdateRoadmapDto) {
    try {
      return this.updateRoadmapService.execute(id, file, { description, file: file ? file.path : undefined, fk_producer, fk_risk, proposed_budget: Number(proposed_budget), title });
    } catch (error) {
      if (error instanceof multer.MulterError) {
        throw new HttpException(`Erro no upload do arquivo - ${error.message}`, HttpStatus.UNPROCESSABLE_ENTITY)
      }
    }
  }

  @Roles(roles.Screenwriter)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteRoadmapService.execute(id);
  }
}
