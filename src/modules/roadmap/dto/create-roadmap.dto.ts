export class CreateRoadmapDto {
    title: string;
    description: string;
    proposed_budget: number;
    file: string;
    fk_risk: string;
    fk_producer: string;
}
