import { Body, Controller, Put } from '@nestjs/common';
import { HomologateRoadmapDto } from './dto/homologate-roadmap.dto';
import { HomologateRoadmapService } from './services/homologateRoadmap.service';

@Controller('homologation')
export class HomologationController {
  constructor(private homologateRoadmapService: HomologateRoadmapService) { }

  @Put()
  homologate(@Body() homologateRoadmapDto: HomologateRoadmapDto) {
    return this.homologateRoadmapService.execute(homologateRoadmapDto);
  }

  // @Get()
  // findAll() {
  //   return this.homologationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.homologationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHomologationDto: UpdateHomologationDto) {
  //   return this.homologationService.update(+id, updateHomologationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.homologationService.remove(+id);
  // }
}
