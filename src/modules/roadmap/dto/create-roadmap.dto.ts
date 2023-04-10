import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { UserPayload } from "src/modules/authentication/dto/user-payload.dto";

export class CreateRoadmapDto {
    @IsString({ message: "Título precisa ser uma string" })
    @IsNotEmpty({ message: "Título é obrigatório" })
    title: string;

    @IsString({ message: "Descrição precisa ser uma string" })
    @IsNotEmpty({ message: "Descrição é obrigatório" })
    description: string;

    @IsNumberString({}, { message: "Orçamento proposto precisa ser um número" })
    @IsNotEmpty({ message: "Orçamento proposto é obrigatório" })
    proposed_budget: number;

    file: string;

    @IsString({ message: "Id do risco precisa ser uma string" })
    @IsNotEmpty({ message: "Id do risco é obrigatório" })
    fk_risk: string;

    @IsString({ message: "Id da produtora precisa ser uma string" })
    @IsNotEmpty({ message: "Id da produtora é obrigatório" })
    fk_producer: string;

    userLogged: UserPayload;
}
