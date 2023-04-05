import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/app/config/database/repositories/roadmap/RoadmapRepository";
import { UserRepository } from "src/app/config/database/repositories/users/UserRepository";
import { UpdateRoadmapDto } from "../dto/update-roadmap.dto";
import * as fs from 'fs'
@Injectable()
export class UpdateRoadmapService {
    constructor(private roadmapRepository: RoadmapRepository, private userRepository: UserRepository) { }

    async execute(id: string, file: Express.Multer.File, updateRoadmapDto: UpdateRoadmapDto) {
        const roadmap = await this.roadmapRepository.find(id)
        if (!roadmap) {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.log(err)
                }
            })
            throw new HttpException('Roteiro não encontrado', HttpStatus.NOT_FOUND)
        }
        if (file) {
            if (roadmap.file) {
                fs.unlink(roadmap.file, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        }
        if (updateRoadmapDto.fk_produtora) {
            const user = await this.userRepository.find({ id: updateRoadmapDto.fk_produtora });
            if (user) {
                if (user.fk_roles != '2') {
                    fs.unlink(file.path, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    throw new HttpException('Usuário precisa ser uma produtora', HttpStatus.BAD_REQUEST)
                }
            }
            else {
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
            }
        }
        await this.roadmapRepository.update(id, updateRoadmapDto)

    }

}