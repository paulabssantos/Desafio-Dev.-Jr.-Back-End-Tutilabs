import { Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";

@Injectable()
export class ListRoadmapService {
    constructor(private roadmapRepository: RoadmapRepository) { }

    async execute() {
        return await this.roadmapRepository.list()
    }
}