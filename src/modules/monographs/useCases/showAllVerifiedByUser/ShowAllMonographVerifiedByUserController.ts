import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllMonographVerifiedByUserUseCase } from './ShowAllMonographVerifiedByUserUseCase';

class ShowAllMonographVerifiedByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, email } = request.params;

    const showAllMonographVerifiedByUserUseCase = container.resolve(
      ShowAllMonographVerifiedByUserUseCase,
    );

    const all = await showAllMonographVerifiedByUserUseCase.execute(
      String(email),
      Number(page),
    );

    return response.status(200).json(all);
  }
}

export { ShowAllMonographVerifiedByUserController };
