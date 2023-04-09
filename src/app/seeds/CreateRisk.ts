import { Logger } from "@nestjs/common"
import { PrismaService } from "../config/database/prisma/prisma.service"

export async function CreateRisk() {
    const logger = new Logger()
    const prisma = new PrismaService()
    const risk = [{ id: '1', description: 'alto' }, { id: '2', description: 'médio' }, { id: '3', description: 'baixo' }]
    const risk_table = await prisma.risk.findMany()
    if (!risk_table || risk_table.length <= 0) {
        try {
            await prisma.risk.createMany({
                data: risk
            })
            logger.log('Riscos criados com sucesso')
        } catch (error) {
            logger.log('Não foi possível criar riscos')
        }
    } else {
        logger.log('Riscos já criados')
    }
}