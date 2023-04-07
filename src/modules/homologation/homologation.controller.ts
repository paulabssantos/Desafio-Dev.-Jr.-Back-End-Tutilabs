import { Body, Controller, Put, Request, UseGuards } from '@nestjs/common';
import { Roles } from '../authentication/decorators/roles.decorator';
import { UserPayload } from '../authentication/dto/user-payload.dto';
import { roles } from '../authentication/enum/roles.enum';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RolesGuard } from '../authentication/guards/roles.guard';
import { HomologateRoadmapDto } from './dto/homologate-roadmap.dto';
import { HomologateRoadmapService } from './services/homologateRoadmap.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('homologation')
export class HomologationController {
  constructor(private homologateRoadmapService: HomologateRoadmapService) { }

  @Roles(roles.Producer)
  @Put()
  homologate(@Request() req, @Body() homologateRoadmapDto: HomologateRoadmapDto) {
    const user: UserPayload = req.user
    return this.homologateRoadmapService.execute(user, homologateRoadmapDto);
  }
}
