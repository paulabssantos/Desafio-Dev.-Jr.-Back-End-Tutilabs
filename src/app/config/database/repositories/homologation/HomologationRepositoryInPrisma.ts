import { HomologateRoadmapDto } from "src/modules/homologation/dto/homologate-roadmap.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { HomologationRepository } from "./HomologationRepository";
import { Homologation } from "src/modules/homologation/entities/homologation.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HomologationRepositoryInPrisma implements HomologationRepository {
    constructor(private prisma: PrismaService) { }
    async findById(id: string): Promise<Homologation> {
        const data = await this.prisma.homologation.findUnique({
            where: {
                id
            }
        })
        return data
    }
    async homologate({ comment, fk_status, id }: HomologateRoadmapDto): Promise<Homologation> {
        const data = await this.prisma.homologation.update({
            where: {
                id
            },
            data: {
                fk_status,
                comment
            }
        })
        return data
    }

}