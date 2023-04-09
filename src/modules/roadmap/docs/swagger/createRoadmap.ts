export const createRoadmapOperation = {
    description: "Cria um roteiro",
    summary: "Cria um roteiro"
}

export const createRoadmaBody = {
    type: 'object',
    properties: {
        title: { type: 'string', description: 'Título do roteiro' },
        description: { type: 'string', description: 'Descrição do roteiro' },
        proposed_budget: { type: 'number', format: 'float', description: 'Orçamento proposto' },
        file: { type: 'string', format: 'binary' },
        fk_risk: { type: 'string', description: 'Id do risco (1 - alto, 2 - baixo, 3 - médio)', enum: [1, 2, 3] },
        fk_producer: {
            type: 'string', description: 'Id da produtora a ser vinculada'
        }
    }

}