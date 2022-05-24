import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllUserUseCase } from './ShowAllUserUseCase';

class ShowAllUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.params;

    const showAllUserUseCase = container.resolve(ShowAllUserUseCase);

    const all = await showAllUserUseCase.execute(Number(page));

    return response.status(200).json(all);
  }
}

export { ShowAllUserController };
