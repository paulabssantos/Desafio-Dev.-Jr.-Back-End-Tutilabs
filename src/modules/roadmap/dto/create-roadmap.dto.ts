import { UserPayload } from "src/modules/authentication/dto/user-payload.dto";

export class CreateRoadmapDto {
    title: string;
    description: string;
    proposed_budget: number;
    file: string;
    fk_risk: string;
    fk_producer: string;
    userLogged: UserPayload;
}
