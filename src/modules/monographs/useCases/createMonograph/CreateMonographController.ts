import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateMonographUseCase } from './CreateMonographUseCase';

class CreateMonographController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      authors,
      authors_emails,
      advisor,
      advisor_lattes,
      published_date,
      published_local,
      resumo,
      palavras_chave,
      number_pages,
      pdf_url,
      course_id,
      knowledge_id,
    } = request.body;

    const { id } = request.user;

    const createMonographUseCase = container.resolve(CreateMonographUseCase);

    const monograph = await createMonographUseCase.execute({
      title,
      authors,
      authors_emails,
      advisor,
      advisor_lattes,
      published_date,
      published_local,
      resumo,
      palavras_chave,
      number_pages,
      pdf_url,
      course_id,
      knowledge_id,
      user_id: id,
    });

    return response.status(201).json(monograph);
  }
}

export { CreateMonographController };
