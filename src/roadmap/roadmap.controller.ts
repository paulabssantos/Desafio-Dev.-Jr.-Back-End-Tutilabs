import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer-config';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { CreateRoadmapService } from './services/createRoadmap.service';
import { UpdateRoadmapService } from './services/updateRoadmap.service';
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly createRoadmapService: CreateRoadmapService, private readonly updateRoadmapService: UpdateRoadmapService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  create(@UploadedFile() file: Express.Multer.File, @Body() { descricao, fk_risk, fk_produtora, orcamento_proposto, title }: CreateRoadmapDto) {
    return this.createRoadmapService.execute(file, { descricao, file: file.path, fk_produtora, fk_risk, orcamento_proposto: Number(orcamento_proposto), title });
  }

  // @Get()
  // findAll() {
  //   return this.roadmapService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.roadmapService.findOne(+id);
  // }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  update(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() { descricao, fk_produtora, fk_risk, orcamento_proposto, title }: UpdateRoadmapDto) {
    return this.updateRoadmapService.execute(id, { descricao, file: file.path, fk_produtora, fk_risk, orcamento_proposto: Number(orcamento_proposto), title });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roadmapService.remove(+id);
  // }
}
