import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Roadmap } from "src/modules/roadmap/entities/roadmap.entity";
import { User } from "src/modules/users/entities/user.entity";

@Injectable()
export class SendEmailCreationRoadmapService {
    constructor(private mailer: MailerService) { }

    async execute(producer: User, file: Express.Multer.File, roadmap: Roadmap) {
        this.mailer.sendMail({
            to: producer.email,
            subject: "Novo roteiro criado",
            template: "roadmapCreation",
            attachments: [file],
            context: {
                name: producer.name,
                screenwriter: roadmap,
                title: roadmap.title,
                description: roadmap.description,
                proposed_budget: roadmap.proposed_budget,
            }
        })
    }
}