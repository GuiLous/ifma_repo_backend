import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllKnowledgeAreaUseCase } from './ShowAllKnowledgeAreaUseCase';

class ShowAllKnowledgeAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showAllKnowledgeAreaUseCase = container.resolve(
      ShowAllKnowledgeAreaUseCase,
    );

    const all = await showAllKnowledgeAreaUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ShowAllKnowledgeAreaController };
