import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HomologationRepository } from 'src/app/config/database/repositories/homologation/HomologationRepository';
import { HomologateRoadmapDto } from '../dto/homologate-roadmap.dto';
import { RoadmapRepository } from 'src/app/config/database/repositories/roadmap/RoadmapRepository';
import { UserPayload } from 'src/modules/authentication/dto/user-payload.dto';
import { SendEmailHomologateRoadmapService } from 'src/modules/mail/services/sendEmailHomologateRoadmap.service';
import { UserRepository } from 'src/app/config/database/repositories/users/UserRepository';
import { status } from '../enum/status.enum';

@Injectable()
export class HomologateRoadmapService {
    constructor(private sendEmailHomologateRoadmap: SendEmailHomologateRoadmapService, private homologationRepository: HomologationRepository, private roadmapRepository: RoadmapRepository, private userRepository: UserRepository) { }

    async execute(user: UserPayload, { comment, fk_status, id }: HomologateRoadmapDto) {
        const homologation = await this.homologationRepository.findById(id)

        if (!homologation) {
            throw new HttpException('Homologação não encontrada', HttpStatus.NOT_FOUND)
        }

        if (fk_status != status.approved && fk_status != status.disapproved && fk_status != status.in_progress) {
            throw new HttpException('Status informado é inválido. O status só pode ser aprovado, reprovado e em análise.', HttpStatus.BAD_REQUEST)
        }

        const roadmap = await this.roadmapRepository.findById(homologation.fk_roadmap)

        if (roadmap.fk_producer != user.id) {
            throw new HttpException('Você não tem permissão para homologar roteiros vinculados a outras produtoras', HttpStatus.UNAUTHORIZED)
        }

        if (homologation.fk_status != status.in_progress) {
            throw new HttpException('Roteiro já homologado', HttpStatus.BAD_REQUEST)
        }
        if (fk_status == status.in_progress) {
            throw new HttpException('O status precisa ser aprovado ou reprovado', HttpStatus.BAD_REQUEST)
        }

        const screenwriter = await this.userRepository.find({ id: homologation.createdBy })
        const producer = await this.userRepository.find({ id: user.id })

        const updtedHomologation = await this.homologationRepository.homologate({ comment, fk_status, id })
        this.sendEmailHomologateRoadmap.execute(screenwriter, producer, updtedHomologation, roadmap)
    }
}
