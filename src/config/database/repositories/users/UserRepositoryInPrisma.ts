import { Injectable } from "@nestjs/common";
import { UserRepository } from "./UserRepository";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { User } from "src/users/entities/user.entity";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UserRepositoryInPrisma implements UserRepository {
    constructor(private prisma: PrismaService) { }
    async create({ email, fk_roles, name, password }: CreateUserDto): Promise<void> {
        await this.prisma.users.create({
            data: {
                email,
                fk_roles,
                name,
                password
            }
        })
    }
    async list(): Promise<User[]> {
        const data = await this.prisma.users.findMany();
        return data
    }
    async update(id: string, { email, fk_roles, name, password }: UpdateUserDto): Promise<void> {
        await this.prisma.users.update({
            where: {
                id
            },
            data: {
                email,
                fk_roles,
                name,
                password
            }
        })
    }
    async findByEmail(email: string): Promise<User> {
        const data = await this.prisma.users.findUnique({
            where: {
                email
            }
        })
        return data
    }

}