import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Homologation } from "src/modules/homologation/entities/homologation.entity";
import { status } from "src/modules/homologation/enum/status.enum";
import { Roadmap } from "src/modules/roadmap/entities/roadmap.entity";
import { User } from "src/modules/users/entities/user.entity";

@Injectable()
export class SendEmailHomologateRoadmapService {
    constructor(private mailer: MailerService) { }

    async execute(screenwriter: User, produtora: User, homologation: Homologation, roadmap: Roadmap) {
        this.mailer.sendMail({
            to: screenwriter.email,
            subject: `Roteiro ${homologation.fk_status == status.approved ? "aprovado" : "reprovado"}`,
            template: "roadmapHomologation",
            context: {
                name: screenwriter.name,
                producer_name: produtora.name,
                roadmap_title: roadmap.title,
                comment: homologation.comment,
                status: homologation.fk_status == status.approved ? "aprovado" : "reprovado",
            }
        })
    }
}