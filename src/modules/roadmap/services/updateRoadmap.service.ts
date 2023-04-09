import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";
import { UserRepository } from "src/app/config/database/repositories/users/UserRepository";
import { UpdateRoadmapDto } from "../dto/update-roadmap.dto";
import * as fs from 'fs'
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

        const roadmap = await this.roadmapRepository.findById(id)

        if (!roadmap) {
            deleteFile(file.path)
            throw new HttpException('Roteiro não encontrado', HttpStatus.NOT_FOUND)
        }
        if (file) {
            deleteFile(roadmap.file)
        }
        if (updateRoadmapDto.fk_producer) {
            const user = await this.userRepository.find({ id: updateRoadmapDto.fk_producer });
            if (user) {
                if (user.fk_roles != '2') {
                    deleteFile(file.path)
                    throw new HttpException('Usuário precisa ser uma produtora', HttpStatus.BAD_REQUEST)
                }
            }
            else {
                deleteFile(file.path)
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
            }
        }
        await this.roadmapRepository.update(id, updateRoadmapDto)

    }

}