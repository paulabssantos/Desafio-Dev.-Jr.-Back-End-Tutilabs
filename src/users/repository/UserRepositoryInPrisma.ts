import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/main/config/db/prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { UserRepository } from "./UserRepository";

@Injectable()
export class UserRepositoryInPrisma implements UserRepository{
    constructor(private prisma: PrismaService){}
   async create({email,fk_roles,name,password}: CreateUserDto): Promise<void> {
        await this.prisma.users.create({
            data: {
                email,
                name,
                password,
                fk_roles
            }
        })
    }
    
}