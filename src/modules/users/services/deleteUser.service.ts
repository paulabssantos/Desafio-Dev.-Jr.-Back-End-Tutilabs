import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";
import { UserRepository } from "src/app/config/database/repositories/users/UserRepository";
import { roles } from "src/modules/authentication/enum/roles.enum";
import { status } from "src/modules/homologation/enum/status.enum";

@Injectable()
export class DeleteUserService {
    constructor(private userRepository: UserRepository, private roadmapRepository: RoadmapRepository) { }
    async execute(id: string) {
        const user = await this.userRepository.find({ id })

        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
        }

        if (user.fk_roles == roles.Producer) {
            const roadmapsApprovedByProducer = await this.roadmapRepository.filter({ fk_producer: user.id, fk_status: status.approved })
            if (roadmapsApprovedByProducer) {
                throw new HttpException('A produtora possui roteiros aprovados', HttpStatus.BAD_REQUEST)
            }
        } else if (user.fk_roles == roles.Screenwriter) {
            const roadmapsCreatedByScreenWriter = await this.roadmapRepository.filter({ createdBy: user.id })
            if (roadmapsCreatedByScreenWriter) {
                throw new HttpException('O roteirista possui roteiros criados', HttpStatus.BAD_REQUEST)
            }
        }

        await this.userRepository.delete(user.id)
    }
} 