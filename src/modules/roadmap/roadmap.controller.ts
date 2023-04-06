import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/app/config/multer-config';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { CreateRoadmapService } from './services/createRoadmap.service';
import { UpdateRoadmapService } from './services/updateRoadmap.service';
import multer from 'multer';
import { ListRoadmapService } from './services/listRoadmap.service';
import { FindRoadmapService } from './services/findRoadMap.service';
import { DeleteRoadmapService } from './services/deleteRoadmap.service';
import { ListRoadmapDto } from './dto/list-roadmap.dto';
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly createRoadmapService: CreateRoadmapService, private readonly updateRoadmapService: UpdateRoadmapService, private listRoadMapService: ListRoadmapService, private findRoadmapService: FindRoadmapService, private deleteRoadmapService: DeleteRoadmapService) { }

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

  @Get()
  findAll() {
    return this.listRoadMapService.execute();
  }

  @Get('/filter')
  filter(@Body() { fk_status, description, fk_producer, fk_risk, max_proposed_budget, min_proposed_budget, title }: ListRoadmapDto) {
    return this.findRoadmapService.execute({ fk_status, description, fk_producer, fk_risk, max_proposed_budget, min_proposed_budget, title })
  }

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

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteRoadmapService.execute(id);
  }
}
