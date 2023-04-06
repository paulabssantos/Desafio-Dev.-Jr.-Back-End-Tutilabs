export class ListRoadmapDto {
    title?: string;
    description?: string;
    min_proposed_budget?: number;
    max_proposed_budget?: number;
    fk_risk?: string;
    fk_producer?: string;
    fk_status?: string;
}