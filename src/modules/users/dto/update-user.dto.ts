import { IsDate, IsEmail, IsString, ValidateIf } from "class-validator";

export class UpdateUserDto {
    @IsString({ message: "Nome precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    name?: string;


    @IsString({ message: "Id do nível de acesso precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    fk_roles?: string;

    password?: string;

    @IsEmail({}, { message: "Email precisa ser válido" })
    @ValidateIf((object, value) => value != null)
    email?: string;

    @IsDate({ message: "Last_acces precisa ser uma data" })
    @ValidateIf((object, value) => value != null)
    last_access?: Date
}
