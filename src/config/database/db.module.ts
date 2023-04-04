import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "./repositories/users/UserRepository";
import { UserRepositoryInPrisma } from "./repositories/users/UserRepositoryInPrisma";

@Module({ providers: [PrismaService, { provide: UserRepository, useClass: UserRepositoryInPrisma }], exports: [UserRepository] })

export class DatabaseModule { }