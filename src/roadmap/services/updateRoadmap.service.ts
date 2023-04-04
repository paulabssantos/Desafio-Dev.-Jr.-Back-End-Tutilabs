import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/config/database/repositories/roadmap/RoadmapRepository";
import { UserRepository } from "src/config/database/repositories/users/UserRepository";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { UpdateRoadmapDto } from "../dto/update-roadmap.dto";

@Injectable()
export class UpdateRoadmapService {
    constructor(private roadmapRepository: RoadmapRepository, private userRepository: UserRepository) { }

    async execute(id: string, updateRoadmapDto: UpdateRoadmapDto) {
        if (updateRoadmapDto.fk_produtora) {
            const user = await this.userRepository.find({ id: updateRoadmapDto.fk_produtora });
            if (user) {
                if (user.fk_roles != '2') {
                    throw new HttpException('Usuário precisa ser uma produtora', HttpStatus.BAD_REQUEST)
                }
            }
            else {
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
            }
        }
        await this.roadmapRepository.update(id, updateRoadmapDto)

    }

}