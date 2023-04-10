import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class UpdatePasswordDTO {
    @IsEmail({}, { message: "Email inválido" })
    @IsNotEmpty({ message: "Email é obrigatório" })
    @ApiProperty()
    email: string;

    @IsString({ message: "Senha atual precisa ser uma string" })
    @IsNotEmpty({ message: "Senha atual é obrigatória" })
    @ApiProperty()
    password: string;

    @IsString({ message: "Nova senha precisa ser uma string" })
    @IsNotEmpty({ message: "Nova senha é obrigatória" })
    @ApiProperty()
    new_password: string
}