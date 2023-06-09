import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";
import { UserRepository } from "src/app/config/database/repositories/users/UserRepository";
import { ListRoadmapDto } from "../dto/list-roadmap.dto";

@Injectable()
export class ListHomologatedRoadmapsByProducerService {
    constructor(private roadmapRepository: RoadmapRepository, private userRepository: UserRepository) { }

    async execute({ fk_producer, fk_status }: ListRoadmapDto) {
        const user = await this.userRepository.find({ id: fk_producer })
        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
        }
        return await this.roadmapRepository.listHomologatedByProducer({ fk_producer, fk_status })
    }
}