import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthenticationDto {
    @IsEmail({}, { message: 'Formato inválido de email' })
    @IsNotEmpty({ message: 'Email não informado' })
    email: string;

    @IsString({ message: 'Senha precisa ser uma string' })
    @IsNotEmpty({ message: 'Senha não informada' })
    password: string;
}
