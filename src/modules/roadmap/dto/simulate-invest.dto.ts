import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SimulateInvestDto {
    @IsString({ message: "Id do roteiro precisa ser uma string" })
    @IsNotEmpty({ message: "Id do roteiro é obrigatório" })
    id: string;

    @IsNumber({}, { message: "Valor a ser investido precisa ser um número" })
    @IsNotEmpty({ message: "Valor a ser investido é obrigatório" })
    investValue: number;
}