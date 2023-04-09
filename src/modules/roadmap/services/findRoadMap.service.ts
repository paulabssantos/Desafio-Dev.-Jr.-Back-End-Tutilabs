import { Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";
import { ListRoadmapDto } from "../dto/list-roadmap.dto";

@Injectable()
export class FindRoadmapService {
    constructor(private roadmapRepository: RoadmapRepository) { }

    async execute({ description, fk_producer, fk_risk, max_proposed_budget, min_proposed_budget, title, fk_status }: ListRoadmapDto) {
        return await this.roadmapRepository.filter({ description, fk_producer, fk_risk, max_proposed_budget, min_proposed_budget, title, fk_status })
    }
}