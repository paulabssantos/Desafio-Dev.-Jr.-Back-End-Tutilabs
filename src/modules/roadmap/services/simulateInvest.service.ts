import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";
import { risk } from "../enum/risk.enum";
import { SimulateInvestDto } from "../dto/simulate-invest.dto";

@Injectable()
export class SimulateInvestService {
    constructor(private roadmapRepository: RoadmapRepository) { }
    async execute({ id, investValue }: SimulateInvestDto) {
        const roadmap = await this.roadmapRepository.findById(id)
        if (!roadmap) {
            throw new HttpException('Roteiro não encontrado', HttpStatus.NOT_FOUND)
        }

        let investReturnValue = 0
        if (roadmap.fk_risk == risk.low) {
            investReturnValue = 0.05 * investValue
        }
        else if (roadmap.fk_risk == risk.medium) {
            investReturnValue = 0.10 * investValue
        }
        else if (roadmap.fk_risk == risk.high) {
            investReturnValue = 0.20 * investValue
        }

        return { investReturnValue }
    }
}