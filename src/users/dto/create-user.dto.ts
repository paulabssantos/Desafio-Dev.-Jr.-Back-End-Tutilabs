import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString({message: "Nome precisa ser uma string"})
    @IsNotEmpty({message: "Nome é obrigatório"})
    name: string;


    @IsString({message: "Id do nível de acesso precisa ser uma string"})
    @IsNotEmpty({message: "Id dpo nível de acesso é obrigatório"})
    fk_roles: string;

    @IsString({message: "Senha precisa ser uma string"})
    @IsNotEmpty({message: "Senha é obrigatória"})
    password: string;

    @IsEmail({},{message: "Email precisa ser válido"})
    @IsNotEmpty({message: "Email é obrigatório"})
    email: string;
}
