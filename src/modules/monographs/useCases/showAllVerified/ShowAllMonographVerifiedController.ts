import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllMonographVerifiedUseCase } from './ShowAllMonographVerifiedUseCase';

class ShowAllMonographVerifiedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.params;

    const showAllMonographVerifiedUseCase = container.resolve(
      ShowAllMonographVerifiedUseCase,
    );

    const all = await showAllMonographVerifiedUseCase.execute(Number(page));

    return response.status(200).json(all);
  }
}

export { ShowAllMonographVerifiedController };
