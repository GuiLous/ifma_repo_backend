import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllMonographNotVerifiedUseCase } from './ShowAllMonographNotVerifiedUseCase';

class ShowAllMonographNotVerifiedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.params;

    const showAllMonographNotVerifiedUseCase = container.resolve(
      ShowAllMonographNotVerifiedUseCase,
    );

    const all = await showAllMonographNotVerifiedUseCase.execute(Number(page));

    return response.status(200).json(all);
  }
}

export { ShowAllMonographNotVerifiedController };
