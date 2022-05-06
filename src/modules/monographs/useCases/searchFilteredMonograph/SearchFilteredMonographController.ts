import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IMonographSearchDTO } from '@modules/monographs/dtos/IMonographSearchDTO';

import { SearchFilteredMonographUseCase } from './SearchFilteredMonographUseCase';

class SearchFilteredMonographController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.params;
    const { title, author, advisor, palavras_chave, course_id, knowledge_id } =
      request.query as IMonographSearchDTO;

    const searchFilteredMonographUseCase = container.resolve(
      SearchFilteredMonographUseCase,
    );

    const searchResult = await searchFilteredMonographUseCase.execute(
      {
        title,
        author,
        advisor,
        palavras_chave,
        course_id,
        knowledge_id,
      },
      Number(page),
    );

    return response.status(200).json(searchResult);
  }
}

export { SearchFilteredMonographController };
