import { IsEmail, IsString, ValidateIf } from "class-validator";

export class ListUserDto {
    @IsString({ message: "Id do usuário precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    id?: string;

    @IsEmail({}, { message: "Email precisa ser válido" })
    @ValidateIf((object, value) => value != null)
    email?: string;

    @IsString({ message: "Id do usuário precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    name?: string;

    @IsString({ message: "Id do nível de acesso precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    fk_roles?: string;
}