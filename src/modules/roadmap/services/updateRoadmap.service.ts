import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";
import { UserRepository } from "src/app/config/database/repositories/users/UserRepository";
import { UpdateRoadmapDto } from "../dto/update-roadmap.dto";
import * as fs from 'fs'
import { roles } from "src/modules/authentication/enum/roles.enum";
import { risk } from "../enum/risk.enum";
@Injectable()
export class UpdateRoadmapService {
    constructor(private roadmapRepository: RoadmapRepository, private userRepository: UserRepository) { }

    async execute(id: string, file: Express.Multer.File, updateRoadmapDto: UpdateRoadmapDto) {
        const deleteFile = (filePath: string) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }

        if (updateRoadmapDto.fk_risk) {
            if (updateRoadmapDto.fk_risk != risk.high && updateRoadmapDto.fk_risk != risk.low && updateRoadmapDto.fk_risk != risk.medium) {
                throw new HttpException('Risco não é válido. O risco precisa ser alto, baixo ou médio', HttpStatus.BAD_REQUEST)
            }
        }

        const roadmap = await this.roadmapRepository.findById(id)

        if (!roadmap) {
            if (file) {
                deleteFile(file.path)
            }
            throw new HttpException('Roteiro não encontrado', HttpStatus.NOT_FOUND)
        }
        if (file) {
            deleteFile(roadmap.file)
        }
        if (updateRoadmapDto.fk_producer) {
            const user = await this.userRepository.find({ id: updateRoadmapDto.fk_producer });
            if (user) {
                if (user.fk_roles != roles.Producer) {
                    if (file) {
                        deleteFile(file.path)
                    }
                    throw new HttpException('Usuário precisa ser uma produtora', HttpStatus.BAD_REQUEST)
                }
            }
            else {
                if (file) {
                    deleteFile(file.path)
                }
                throw new HttpException('Produtora informada não encontrada', HttpStatus.NOT_FOUND)
            }
        }
        return await this.roadmapRepository.update(id, updateRoadmapDto)
    }

}