import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/app/config/multer-config';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { CreateRoadmapService } from './services/createRoadmap.service';
import { UpdateRoadmapService } from './services/updateRoadmap.service';
import multer from 'multer';
import { ListRoadmapService } from './services/listRoadmap.service';
import { FindRoadmapService } from './services/findRoadMap.service';
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly createRoadmapService: CreateRoadmapService, private readonly updateRoadmapService: UpdateRoadmapService, private listRoadMapService: ListRoadmapService, private findRoadmapService: FindRoadmapService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  create(@UploadedFile() file: Express.Multer.File, @Body() { descricao, fk_risk, fk_produtora, orcamento_proposto, title }: CreateRoadmapDto) {
    try {
      return this.createRoadmapService.execute(file, { descricao, file: file ? file.path : undefined, fk_produtora, fk_risk, orcamento_proposto: Number(orcamento_proposto), title });
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findRoadmapService.execute(id)
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  update(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() { descricao, fk_produtora, fk_risk, orcamento_proposto, title }: UpdateRoadmapDto) {
    try {
      return this.updateRoadmapService.execute(id, file, { descricao, file: file ? file.path : undefined, fk_produtora, fk_risk, orcamento_proposto: Number(orcamento_proposto), title });
    } catch (error) {
      if (error instanceof multer.MulterError) {
        throw new HttpException(`Erro no upload do arquivo - ${error.message}`, HttpStatus.UNPROCESSABLE_ENTITY)
      }
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roadmapService.remove(+id);
  // }
}
