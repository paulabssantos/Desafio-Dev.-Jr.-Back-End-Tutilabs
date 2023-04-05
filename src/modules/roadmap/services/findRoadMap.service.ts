import { Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";

@Injectable()
export class FindRoadmapService {
    constructor(private roadmapRepository: RoadmapRepository) { }

    async execute(id: string) {
        return await this.roadmapRepository.find(id)
    }
}