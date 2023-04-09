import { CreateRoadmapDto } from "src/modules/roadmap/dto/create-roadmap.dto";
import { UpdateRoadmapDto } from "src/modules/roadmap/dto/update-roadmap.dto";
import { ListRoadmapDto } from "src/modules/roadmap/dto/list-roadmap.dto";
import { Roadmap } from "src/modules/roadmap/entities/roadmap.entity";

export abstract class RoadmapRepository {
    abstract create(createRoadmapDto: CreateRoadmapDto): Promise<Roadmap>
    abstract update(id: string, updateRoadmapDto: UpdateRoadmapDto): Promise<void>
    abstract list(): Promise<Roadmap[]>
    abstract filter(listRoadmapDto: ListRoadmapDto): Promise<Roadmap[]>
    abstract findById(id: string): Promise<Roadmap>
    abstract delete(id: string): Promise<void>
    abstract listHomologatedByProducer({ fk_producer, fk_status }: ListRoadmapDto): Promise<Roadmap[]>
}