import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateMonographUseCase } from './UpdateMonographUseCase';

class UpdateMonographController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      title,
      authors,
      authors_emails,
      advisor,
      advisor_lattes,
      published_date,
      published_local,
      resumo,
      palavras_chave,
      keyWords,
      number_pages,
      pdf_url,
      knowledge_id,
      course_id,
    } = request.body;

    const updateMonographUseCase = container.resolve(UpdateMonographUseCase);

    await updateMonographUseCase.execute({
      id,
      title,
      authors,
      authors_emails,
      advisor,
      advisor_lattes,
      published_date,
      published_local,
      resumo,
      palavras_chave,
      keyWords,
      number_pages,
      pdf_url,
      knowledge_id,
      course_id,
    });

    return response.status(204).send();
  }
}

export { UpdateMonographController };
