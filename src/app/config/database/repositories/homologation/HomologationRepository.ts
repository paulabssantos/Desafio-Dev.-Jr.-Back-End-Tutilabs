import { HomologateRoadmapDto } from "src/modules/homologation/dto/homologate-roadmap.dto";
import { Homologation } from "src/modules/homologation/entities/homologation.entity";

export abstract class HomologationRepository {
    abstract homologate(homologateRoadmapDto: HomologateRoadmapDto): Promise<void>
    abstract findById(id: string): Promise<Homologation>
}