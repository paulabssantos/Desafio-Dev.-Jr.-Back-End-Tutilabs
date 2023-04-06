import { IsNotEmpty, IsString } from "class-validator";

export class HomologateRoadmapDto {
    @IsNotEmpty({ message: "O id da homologação é obrigatório" })
    @IsString({ message: "O id da homologação precisa ser uma string" })
    id: string;

    @IsNotEmpty({ message: "O fk_status é obrigatório" })
    @IsString({ message: "O fk_status precisa ser uma string" })
    fk_status: string;

    @IsNotEmpty({ message: "A observação é obrigatória" })
    @IsString({ message: "A observação precisa ser uma string" })
    comment: string;
}
