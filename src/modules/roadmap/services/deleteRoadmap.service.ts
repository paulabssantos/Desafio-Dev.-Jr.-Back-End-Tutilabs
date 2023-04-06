import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";

@Injectable()
export class DeleteRoadmapService {
    constructor(private roadmapRepository: RoadmapRepository) { }

    async execute(id: string) {
        const roadmap = await this.roadmapRepository.find(id)

        if (!roadmap) {
            throw new HttpException('Roteiro não encontrado', HttpStatus.NOT_FOUND)
        }

        await this.roadmapRepository.delete(id)
    }
}