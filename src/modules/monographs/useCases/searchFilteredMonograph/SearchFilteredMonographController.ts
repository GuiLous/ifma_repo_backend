import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IMonographSearchDTO } from '@modules/monographs/dtos/IMonographSearchDTO';

import { SearchFilteredMonographUseCase } from './SearchFilteredMonographUseCase';

class SearchFilteredMonographController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, author } = request.query as IMonographSearchDTO;

    const searchFilteredMonographUseCase = container.resolve(
      SearchFilteredMonographUseCase,
    );

    const searchResult = await searchFilteredMonographUseCase.execute({
      title,
      author,
    });

    return response.status(200).json(searchResult);
  }
}

export { SearchFilteredMonographController };
