import { CreateRoadmapDto } from "src/modules/roadmap/dto/create-roadmap.dto";
import { UpdateRoadmapDto } from "src/modules/roadmap/dto/update-roadmap.dto";
import { Roadmap } from "src/modules/roadmap/entities/roadmap.entity";

export abstract class RoadmapRepository {
    abstract create(createRoadmapDto: CreateRoadmapDto): Promise<void>
    abstract update(id: string, updateRoadmapDto: UpdateRoadmapDto): Promise<void>
    abstract list(): Promise<Roadmap[]>
    abstract find(id: string): Promise<Roadmap>
    abstract delete(id: string): Promise<void>
}