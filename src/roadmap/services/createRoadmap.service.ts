import { Injectable } from "@nestjs/common";
import { RoadmapRepository } from "src/config/database/repositories/roadmap/RoadmapRepository";
import { CreateRoadmapDto } from "../dto/create-roadmap.dto";
import { transporter } from "src/config/nodemailer-config";

@Injectable()
export class CreateRoadmapService {
    constructor(private roadmapRepository: RoadmapRepository) { }

    async execute(file: Express.Multer.File, createRoadmapDto: CreateRoadmapDto) {
        await this.roadmapRepository.create(createRoadmapDto)

        transporter.sendMail({ envelope: { to: 'paulabia2001@gmail.com' }, subject: "Novo roteiro criado", html: "<p>Novo roteiro criado<p>", attachments: [file] })
    }
}