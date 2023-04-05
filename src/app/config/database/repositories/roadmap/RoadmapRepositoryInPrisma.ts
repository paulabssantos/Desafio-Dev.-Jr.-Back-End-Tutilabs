import { Injectable } from "@nestjs/common";
import { RoadmapRepository } from "./RoadmapRepository";
import { CreateRoadmapDto } from "src/modules/roadmap/dto/create-roadmap.dto";
import { UpdateRoadmapDto } from "src/modules/roadmap/dto/update-roadmap.dto";
import { Roadmap } from "src/modules/roadmap/entities/roadmap.entity";
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
                fk_risk,
                homologation: {
                    create: {
                        fk_status: '3',
                        createdBy: '9da6c272-5595-4b1b-8aaa-62d27b0a633f'
                    }
                }
            }
        })
    }
    async update(id: string, { descricao, file, fk_produtora, fk_risk, orcamento_proposto, title }: UpdateRoadmapDto): Promise<void> {
        await this.prisma.roadmap.update({
            data: {
                descricao, file, fk_produtora, fk_risk, orcamento_proposto, title
            },
            where: {
                id
            }
        })
    }
    async list(): Promise<Roadmap[]> {
        const data = await this.prisma.roadmap.findMany({
            include: {
                homologation: {
                    select: {
                        status: {
                            select: {
                                id: true,
                                description: true
                            }
                        }
                    }
                }
            }
        })
        return data
    }
    async find(id: string): Promise<Roadmap> {
        const data = await this.prisma.roadmap.findUnique({
            where: {
                id
            }
        })
        return data
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}