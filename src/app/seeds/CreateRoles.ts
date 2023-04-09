import { Logger } from "@nestjs/common"
import { PrismaService } from "../config/database/prisma/prisma.service"

export async function CreateRoles() {
    const prisma = new PrismaService()
    const logger = new Logger()
    const roles = [{ id: '1', description: 'admin' }, { id: '2', description: 'produtora' }, { id: '3', description: 'roteirista' }]
    const roles_table = await prisma.roles.findMany()
    if (!roles_table || roles_table.length <= 0) {
        try {
            await prisma.roles.createMany({
                data: roles
            })
            logger.log('Níveis de acesso criados com sucesso')
        } catch (error) {
            logger.log('Não foi possível criar níveis de acesso')
        }
    } else {
        logger.log('Níveis de acesso já criados')
    }
}