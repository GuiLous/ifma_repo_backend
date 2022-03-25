import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllUserUseCase } from './ShowAllUserUseCase';

class ShowAllUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showAllUserUseCase = container.resolve(ShowAllUserUseCase);

    const all = await showAllUserUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ShowAllUserController };
