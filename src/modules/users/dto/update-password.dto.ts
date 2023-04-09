import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class UpdatePasswordDTO {
    @IsString({ message: "Senha atual precisa ser uma string" })
    @IsNotEmpty({ message: "Senha atual é obrigatória" })
    @ApiProperty()
    actual_password: string;

    @IsString({ message: "Nova senha precisa ser uma string" })
    @IsNotEmpty({ message: "Nova senha é obrigatória" })
    @ApiProperty()
    new_password: string
}