import { Injectable } from "@nestjs/common";
import { RoadmapRepository } from "./RoadmapRepository";
import { CreateRoadmapDto } from "src/roadmap/dto/create-roadmap.dto";
import { UpdateRoadmapDto } from "src/roadmap/dto/update-roadmap.dto";
import { Roadmap } from "src/roadmap/entities/roadmap.entity";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class RoadmapRepositoryInPrisma implements RoadmapRepository {
    constructor(private prisma: PrismaService) { }
    async create({ descricao, file, fk_produtora, orcamento_proposto, fk_risk, title }: CreateRoadmapDto): Promise<void> {
        await this.prisma.roadmap.create({
            data: {
                descricao,
                file,
                orcamento_proposto,
                title,
                fk_produtora,
                fk_risk
            }
        })
    }
    update(updateRoadmapDto: UpdateRoadmapDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Roadmap[]> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Roadmap> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}