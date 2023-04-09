import { Logger } from "@nestjs/common"
import { PrismaService } from "../config/database/prisma/prisma.service"

export async function CreateStatus() {
    const prisma = new PrismaService()
    const logger = new Logger()
    const status = [{ id: '1', description: 'aprovado' }, { id: '2', description: 'reprovado' }, { id: '3', description: 'em análise' }]
    const status_table = await prisma.status.findMany()
    if (!status_table || status_table.length <= 0) {
        try {
            await prisma.status.createMany({
                data: status
            })
            logger.log('Status criados com sucesso')
        } catch (error) {
            logger.log('Não foi possível criar status')
        }
    } else {
        logger.log('Status já criados')

    }
}