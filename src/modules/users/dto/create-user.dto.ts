import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString({ message: "Nome precisa ser uma string" })
    @IsNotEmpty({ message: "Nome é obrigatório" })
    @ApiProperty()
    name: string;


    @IsString({ message: "Id do nível de acesso precisa ser uma string" })
    @IsNotEmpty({ message: "Id do nível de acesso é obrigatório" })
    @ApiProperty()
    fk_roles: string;

    @ApiProperty()
    @IsString({ message: "Senha precisa ser uma string" })
    @IsNotEmpty({ message: "Senha é obrigatória" })
    password?: string;

    @IsEmail({}, { message: "Email precisa ser válido" })
    @IsNotEmpty({ message: "Email é obrigatório" })
    @ApiProperty()
    email: string;
}
