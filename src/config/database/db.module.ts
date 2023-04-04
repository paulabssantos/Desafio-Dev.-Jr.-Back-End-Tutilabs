import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "./repositories/users/UserRepository";
import { UserRepositoryInPrisma } from "./repositories/users/UserRepositoryInPrisma";
import { RoadmapRepository } from "./repositories/roadmap/RoadmapRepository";
import { RoadmapRepositoryInPrisma } from "./repositories/roadmap/RoadmapRepositoryInPrisma";

@Module({ providers: [PrismaService, { provide: UserRepository, useClass: UserRepositoryInPrisma }, { provide: RoadmapRepository, useClass: RoadmapRepositoryInPrisma }], exports: [UserRepository, RoadmapRepository] })

export class DatabaseModule { }