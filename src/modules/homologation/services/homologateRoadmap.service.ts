import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HomologationRepository } from 'src/app/config/database/repositories/homologation/HomologationRepository';
import { HomologateRoadmapDto } from '../dto/homologate-roadmap.dto';
import { RoadmapRepository } from 'src/app/config/database/repositories/roadmap/RoadmapRepository';
import { UserPayload } from 'src/modules/authentication/dto/user-payload.dto';

@Injectable()
export class HomologateRoadmapService {
    constructor(private homologationRepository: HomologationRepository, private roadmapRepository: RoadmapRepository) { }

    async execute(user: UserPayload, { comment, fk_status, id }: HomologateRoadmapDto) {
        const homologation = await this.homologationRepository.findById(id)

        if (!homologation) {
            throw new HttpException('Homologação não encontrada', HttpStatus.NOT_FOUND)
        }

        const roadmap = await this.roadmapRepository.findById(homologation.fk_roadmap)

        if (roadmap.fk_producer != user.id) {
            throw new HttpException('Você não tem permissão para homologar roteiros vinculados a outras produtoras', HttpStatus.UNAUTHORIZED)
        }

        if (homologation.fk_status != '3') {
            throw new HttpException('Roteiro já homologado', HttpStatus.BAD_REQUEST)
        }
        if (fk_status == '3') {
            throw new HttpException('O status precisa ser aprovado ou reprovado', HttpStatus.BAD_REQUEST)
        }

        return await this.homologationRepository.homologate({ comment, fk_status, id })
    }
}
