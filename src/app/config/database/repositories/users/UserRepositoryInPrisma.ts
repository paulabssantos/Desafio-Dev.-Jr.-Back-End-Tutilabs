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
    async create({ email, fk_roles, name, password }: CreateUserDto): Promise<Omit<User, "password">> {
        const data = await this.prisma.users.create({
            data: {
                email,
                fk_roles,
                name,
                password
            },
            select: {
                id: true,
                name: true,
                email: true,
                fk_roles: true,
                last_access: true
            }
        })
        return data
    }
    async list(): Promise<User[]> {
        const data = await this.prisma.users.findMany();
        return data
    }
    async update(id: string, { email, fk_roles, name, password, last_access }: UpdateUserDto): Promise<void> {
        await this.prisma.users.update({
            where: {
                id
            },
            data: {
                email,
                fk_roles,
                name,
                password,
                last_access
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

    async find({ id }: ListUserDto): Promise<User> {
        const data = await this.prisma.users.findUnique({
            where: {
                id
            }
        })
        return data
    }

    async filter({ id, email, fk_roles, name }: ListUserDto): Promise<Omit<User, "password">[]> {
        const data = await this.prisma.users.findMany({
            where: {
                id,
                email: {
                    startsWith: email
                },
                name: {
                    startsWith: name
                },
                fk_roles
            },
            select: {
                id: true,
                name: true,
                email: true,
                fk_roles: true,
                last_access: true
            }
        })
        return data
    }

}