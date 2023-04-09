import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, ValidateIf } from "class-validator";

export class ListRoadmapDto {
    @IsString({ message: "Title precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    title?: string;

    @IsString({ message: "Description precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    description?: string;

    @IsNumber({}, { message: "min_proposed_budget precisa ser um number" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    min_proposed_budget?: number;


    @IsNumber({}, { message: "max_proposed_budget precisa ser um number" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    max_proposed_budget?: number;

    @IsString({ message: "fk_risk precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    fk_risk?: string;

    @IsString({ message: "fk_producer precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    fk_producer?: string;

    @IsString({ message: "fk_status precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    fk_status?: string;

    @IsString({ message: "createdBy precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    @ApiProperty()
    createdBy?: string;
}