import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsString, ValidateIf } from "class-validator";

export class UpdateUserDto {
    @IsString({ message: "Nome precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    name?: string;


    @IsString({ message: "Id do nível de acesso precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    fk_roles?: string;

    @ApiProperty()
    @IsString({ message: "Senha precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    password?: string;

    @IsEmail({}, { message: "Email precisa ser válido" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    email?: string;

    @IsDate({ message: "Last_acces precisa ser uma data" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    last_access?: Date
}
