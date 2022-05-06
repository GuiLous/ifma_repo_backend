import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateMonographAndVerifiedUseCase } from './UpdateMonographAndVerifiedUseCase';

class UpdateMonographAndVerifiedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      title,
      authors,
      advisor,
      coAdvisors,
      published_date,
      published_local,
      resumo,
      abstract,
      palavras_chave,
      keyWords,
      number_pages,
      references,
      knowledge_id,
      course_id,
    } = request.body;

    const updateMonographAndVerifiedUseCase = container.resolve(
      UpdateMonographAndVerifiedUseCase,
    );

    await updateMonographAndVerifiedUseCase.execute({
      id,
      title,
      authors,
      advisor,
      coAdvisors,
      published_date,
      published_local,
      resumo,
      abstract,
      palavras_chave,
      keyWords,
      number_pages,
      references,
      knowledge_id,
      course_id,
    });

    return response.status(204).send();
  }
}

export { UpdateMonographAndVerifiedController };
