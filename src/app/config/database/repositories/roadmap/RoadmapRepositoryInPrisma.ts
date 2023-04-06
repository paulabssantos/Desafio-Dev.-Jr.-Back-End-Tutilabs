import { Injectable } from "@nestjs/common";
import { RoadmapRepository } from "./RoadmapRepository";
import { CreateRoadmapDto } from "src/modules/roadmap/dto/create-roadmap.dto";
import { UpdateRoadmapDto } from "src/modules/roadmap/dto/update-roadmap.dto";
import { Roadmap } from "src/modules/roadmap/entities/roadmap.entity";
import { PrismaService } from "../../prisma/prisma.service";
import { ListRoadmapDto } from "src/modules/roadmap/dto/list-roadmap.dto";

@Injectable()
export class RoadmapRepositoryInPrisma implements RoadmapRepository {
    constructor(private prisma: PrismaService) { }
    async findById(id: string): Promise<Roadmap> {
        const data = await this.prisma.roadmap.findUnique({
            where: {
                id
            }
        })
        return data
    }
    async create({ description, file, fk_producer, proposed_budget, fk_risk, title }: CreateRoadmapDto): Promise<void> {
        await this.prisma.roadmap.create({
            data: {
                description,
                file,
                proposed_budget,
                title,
                fk_producer,
                fk_risk,
                homologation: {
                    create: {
                        fk_status: '3',
                        createdBy: 'a8554be9-0b22-4030-ab80-6e927b0ae20d'
                    }
                }
            }
        })
    }
    async update(id: string, { description, file, fk_producer, fk_risk, proposed_budget, title }: UpdateRoadmapDto): Promise<void> {
        await this.prisma.roadmap.update({
            data: {
                description, file, fk_producer, fk_risk, proposed_budget, title
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
    async filter({ description, fk_producer, fk_risk, max_proposed_budget, min_proposed_budget, title, fk_status }: ListRoadmapDto): Promise<Roadmap[]> {
        const data = await this.prisma.roadmap.findMany({
            where: {
                description: {
                    contains: description
                },
                fk_producer,
                fk_risk,
                proposed_budget: {
                    gte: min_proposed_budget,
                    lte: max_proposed_budget
                },
                title: {
                    startsWith: title
                },
                homologation: {
                    fk_status
                }
            },
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
    async delete(id: string): Promise<void> {
        await this.prisma.roadmap.delete({
            where: {
                id
            }
        })
    }

}