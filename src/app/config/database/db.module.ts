import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "./repositories/users/UserRepository";
import { UserRepositoryInPrisma } from "./repositories/users/UserRepositoryInPrisma";
import { RoadmapRepository } from "./repositories/roadmap/RoadmapRepository";
import { RoadmapRepositoryInPrisma } from "./repositories/roadmap/RoadmapRepositoryInPrisma";
import { HomologationRepository } from "./repositories/homologation/HomologationRepository";
import { HomologationRepositoryInPrisma } from "./repositories/homologation/HomologationRepositoryInPrisma";

@Module({ providers: [PrismaService, { provide: UserRepository, useClass: UserRepositoryInPrisma }, { provide: RoadmapRepository, useClass: RoadmapRepositoryInPrisma }, { provide: HomologationRepository, useClass: HomologationRepositoryInPrisma }], exports: [UserRepository, RoadmapRepository, HomologationRepository] })

export class DatabaseModule { }