import { Injectable } from "@nestjs/common";
import { UserRepository } from "./UserRepository";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";
import { User } from "src/modules/users/entities/user.entity";
import { PrismaService } from "../../prisma/prisma.service";
import { ListUserDto } from "src/modules/users/dto/list-user.dto";

@Injectable()
export class UserRepositoryInPrisma implements UserRepository {
    constructor(private prisma: PrismaService) { }
    async delete(id: string): Promise<void> {
        await this.prisma.users.delete({
            where: {
                id
            }
        })
    }
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

    async find({ id, fk_roles }: ListUserDto): Promise<User> {
        const data = await this.prisma.users.findFirst({
            where: {
                id,
                fk_roles
            }
        })
        return data
    }

}