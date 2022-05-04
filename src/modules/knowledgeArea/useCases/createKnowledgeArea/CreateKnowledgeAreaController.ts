import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateKnowledgeAreaUseCase } from './CreateKnowledgeAreaUseCase';

class CreateKnowledgeAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createKnowledgeAreaUseCase = container.resolve(
      CreateKnowledgeAreaUseCase,
    );

    const course = await createKnowledgeAreaUseCase.execute(name);

    return response.status(201).json(course);
  }
}

export { CreateKnowledgeAreaController };
