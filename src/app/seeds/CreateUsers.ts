import { BcryptHashService } from "../../utils/hash/implementations/BcryptHash.service";
import { PrismaService } from "../config/database/prisma/prisma.service";
import { roles } from "../../modules/authentication/enum/roles.enum";
import { Logger } from "@nestjs/common";

export async function CreateUsers() {
    const prisma = new PrismaService()
    const hash = new BcryptHashService()
    const logger = new Logger()
    const users_table = await prisma.users.findMany()
    if (!users_table || users_table.length <= 0) {
        try {
            await prisma.users.create({
                data: {
                    email: "pb.santos@icomp.ufam.edu.br",
                    name: "admin",
                    password: await hash.hash('1234'),
                    fk_roles: roles.Admin,
                }
            })
            logger.log('Usuários criados com sucesso')
        } catch (error) {
            logger.log('Não foi possível criar usuários')
        }
    } else {
        logger.log('Usuários já criados')
    }
}