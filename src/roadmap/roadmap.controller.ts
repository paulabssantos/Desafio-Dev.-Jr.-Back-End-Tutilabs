import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer-config';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { CreateRoadmapService } from './services/createRoadmap.service';
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly createRoadmapService: CreateRoadmapService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  create(@UploadedFile() file: Express.Multer.File, @Body() { descricao, fk_risk, fk_produtora, orcamento_proposto, title }: CreateRoadmapDto) {
    return this.createRoadmapService.execute({ descricao, file: file.path, fk_produtora, fk_risk, orcamento_proposto: Number(orcamento_proposto), title });
  }

  // @Get()
  // findAll() {
  //   return this.roadmapService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.roadmapService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoadmapDto: UpdateRoadmapDto) {
  //   return this.roadmapService.update(+id, updateRoadmapDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roadmapService.remove(+id);
  // }
}
