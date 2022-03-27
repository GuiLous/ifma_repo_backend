import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllMonographVerifiedUseCase } from './ShowAllMonographVerifiedUseCase';

class ShowAllMonographVerifiedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showAllMonographVerifiedUseCase = container.resolve(
      ShowAllMonographVerifiedUseCase,
    );

    const all = await showAllMonographVerifiedUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ShowAllMonographVerifiedController };
