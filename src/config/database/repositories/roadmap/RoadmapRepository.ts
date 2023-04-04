import { CreateRoadmapDto } from "src/roadmap/dto/create-roadmap.dto";
import { UpdateRoadmapDto } from "src/roadmap/dto/update-roadmap.dto";
import { Roadmap } from "src/roadmap/entities/roadmap.entity";

export abstract class RoadmapRepository {
    abstract create(createRoadmapDto: CreateRoadmapDto): Promise<void>
    abstract update(id: string, updateRoadmapDto: UpdateRoadmapDto): Promise<void>
    abstract list(): Promise<Roadmap[]>
    abstract find(id: string): Promise<Roadmap>
    abstract delete(id: string): Promise<void>
}