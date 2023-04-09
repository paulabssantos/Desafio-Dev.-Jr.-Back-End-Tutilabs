import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, ValidateIf } from "class-validator";

export class ListUserDto {
    @IsString({ message: "Id do usuário precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    id?: string;

    @IsEmail({}, { message: "Email precisa ser válido" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    email?: string;

    @IsString({ message: "Id do usuário precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    name?: string;

    @IsString({ message: "Id do nível de acesso precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    fk_roles?: string;
}