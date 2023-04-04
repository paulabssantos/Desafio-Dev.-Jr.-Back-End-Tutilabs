import { Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/config/database/repositories/roadmap/RoadmapRepository";
import { CreateRoadmapDto } from "../dto/create-roadmap.dto";

@Injectable()
export class CreateRoadmapService {
    constructor(private roadmapRepository: RoadmapRepository) { }

    async execute(createRoadmapDto: CreateRoadmapDto) {
        await this.roadmapRepository.create(createRoadmapDto)
    }
}