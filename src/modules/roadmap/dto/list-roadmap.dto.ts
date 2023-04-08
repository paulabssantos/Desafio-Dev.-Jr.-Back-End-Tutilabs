import { IsNumber, IsString, ValidateIf } from "class-validator";

export class ListRoadmapDto {
    @IsString({ message: "Title precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    title?: string;

    @IsString({ message: "Description precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    description?: string;

    @IsNumber({}, { message: "min_proposed_budget precisa ser um number" })
    @ValidateIf((object, value) => value != null)
    min_proposed_budget?: number;


    @IsNumber({}, { message: "max_proposed_budget precisa ser um number" })
    @ValidateIf((object, value) => value != null)
    max_proposed_budget?: number;

    @IsString({ message: "fk_risk precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    fk_risk?: string;

    @IsString({ message: "fk_producer precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    fk_producer?: string;

    @IsString({ message: "fk_status precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    fk_status?: string;

    @IsString({ message: "createdBy precisa ser uma string" })
    @ValidateIf((object, value) => value != null)
    createdBy?: string;
}