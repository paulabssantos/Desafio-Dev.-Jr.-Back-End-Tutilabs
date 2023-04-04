import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/config/database/repositories/roadmap/RoadmapRepository";
import { CreateRoadmapDto } from "../dto/create-roadmap.dto";
import { transporter } from "src/config/nodemailer-config";
import { UserRepository } from "src/config/database/repositories/users/UserRepository";

@Injectable()
export class CreateRoadmapService {
    constructor(private roadmapRepository: RoadmapRepository, private userRepository: UserRepository) { }

    async execute(file: Express.Multer.File, createRoadmapDto: CreateRoadmapDto) {
        const user = await this.userRepository.find({ id: createRoadmapDto.fk_produtora });
        if (user) {
            if (user.fk_roles != '2') {
                throw new HttpException('Usuário precisa ser uma produtora', HttpStatus.BAD_REQUEST)
            }
        }
        else {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
        }
        await this.roadmapRepository.create(createRoadmapDto)
        transporter.sendMail({ envelope: { to: user.email }, subject: "Novo roteiro criado", html: "<p>Novo roteiro criado<p>", attachments: [file] })
    }
}