import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { HomologateRoadmapDto } from './dto/homologate-roadmap.dto';
import { HomologateRoadmapService } from './services/homologateRoadmap.service';
import { roles } from '../authentication/enum/roles.enum';
import { Roles } from '../authentication/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('homologation')
export class HomologationController {
  constructor(private homologateRoadmapService: HomologateRoadmapService) { }

  @Roles(roles.Producer)
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
