import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";
import { UserRepository } from "src/app/config/database/repositories/users/UserRepository";
import { CreateRoadmapDto } from "../dto/create-roadmap.dto";
import { roles } from "src/modules/authentication/enum/roles.enum";
import { SendEmailCreationRoadmapService } from "src/modules/mail/services/sendEmailCreationRoadmap.service";
import { risk } from "../enum/risk.enum";

@Injectable()
export class CreateRoadmapService {
    constructor(private sendEmailCreationRoadmapService: SendEmailCreationRoadmapService, private roadmapRepository: RoadmapRepository, private userRepository: UserRepository) { }

    async execute(file: Express.Multer.File, createRoadmapDto: CreateRoadmapDto) {
        if (!file) {
            throw new HttpException('Arquivo de roteiro é obrigatório', HttpStatus.BAD_REQUEST)
        }

        if (createRoadmapDto.fk_risk != risk.high && createRoadmapDto.fk_risk != risk.low && createRoadmapDto.fk_risk != risk.medium) {
            throw new HttpException('O risco inputado não é válido. Os valores são: alto, baixo e médio', HttpStatus.BAD_REQUEST)
        }
        const user = await this.userRepository.find({ id: createRoadmapDto.fk_producer });
        if (user) {
            if (user.fk_roles != roles.Producer) {
                throw new HttpException('Você deve vincular o roteiro a uma produtora', HttpStatus.BAD_REQUEST)
            }
        }
        else {
            throw new HttpException('Produtora não encontrada', HttpStatus.NOT_FOUND)
        }
        const roadmap = await this.roadmapRepository.create(createRoadmapDto)
        await this.sendEmailCreationRoadmapService.execute(user, file, roadmap)
        return roadmap
    }
}