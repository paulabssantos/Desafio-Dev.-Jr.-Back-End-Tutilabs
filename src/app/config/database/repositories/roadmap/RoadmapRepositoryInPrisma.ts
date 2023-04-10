import { Injectable } from "@nestjs/common";
import { RoadmapRepository } from "./RoadmapRepository";
import { CreateRoadmapDto } from "src/modules/roadmap/dto/create-roadmap.dto";
import { UpdateRoadmapDto } from "src/modules/roadmap/dto/update-roadmap.dto";
import { Roadmap } from "src/modules/roadmap/entities/roadmap.entity";
import { PrismaService } from "../../prisma/prisma.service";
import { ListRoadmapDto } from "src/modules/roadmap/dto/list-roadmap.dto";
import { status } from "src/modules/homologation/enum/status.enum";

@Injectable()
export class RoadmapRepositoryInPrisma implements RoadmapRepository {
    constructor(private prisma: PrismaService) { }
    async listHomologatedByProducer({ fk_producer, fk_status }: ListRoadmapDto): Promise<Roadmap[]> {
        const data = await this.prisma.roadmap.findMany({
            where: {
                fk_producer,
                homologation: {
                    every: {
                        fk_status: !fk_status ? { notIn: [status.in_progress] } : fk_status,
                    }
                }
            }
        })
        return data
    }
    async findById(id: string): Promise<Roadmap> {
        const data = await this.prisma.roadmap.findUnique({
            where: {
                id
            }
        })
        return data
    }
    async create({ userLogged, description, file, fk_producer, proposed_budget, fk_risk, title }: CreateRoadmapDto): Promise<Roadmap> {
        const data = await this.prisma.roadmap.create({
            data: {
                description,
                file,
                proposed_budget,
                title,
                fk_producer,
                fk_risk,
                homologation: {
                    create: {
                        fk_status: status.in_progress,
                        createdBy: userLogged.id
                    }
                }
            },
            include: {
                producer: {
                    select: {
                        name: true,
                        email: true,
                    }
                },
                homologation: {
                    select: {
                        fk_screenwriter: {
                            select: {
                                name: true,
                                email: true
                            }
                        },
                        status: {
                            select: {
                                id: true,
                                description: true,
                            }
                        },
                        comment: true,
                    }
                },
                risk: {
                    select: {
                        id: true, description: true
                    }
                }
            }
        })
        return data
    }
    async update(id: string, { description, file, fk_producer, fk_risk, proposed_budget, title }: UpdateRoadmapDto): Promise<Roadmap> {
        const data = await this.prisma.roadmap.update({
            data: {
                description,
                file,
                proposed_budget,
                title,
                fk_producer,
                fk_risk,
            },
            where: {
                id
            }
        })
        return data
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
                        },

                    }
                }
            }
        })

        return data
    }
    async filter({ createdBy, description, fk_producer, fk_risk, max_proposed_budget, min_proposed_budget, title, fk_status }: ListRoadmapDto): Promise<Roadmap[]> {
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
                    every: {
                        fk_status,
                        createdBy
                    }
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