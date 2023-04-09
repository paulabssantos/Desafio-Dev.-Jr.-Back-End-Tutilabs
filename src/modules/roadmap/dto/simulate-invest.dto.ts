import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SimulateInvestDto {
    id: string;

    @ApiProperty()
    @IsNumber({}, { message: "Valor a ser investido precisa ser um número" })
    @IsNotEmpty({ message: "Valor a ser investido é obrigatório" })
    investValue: number;
}