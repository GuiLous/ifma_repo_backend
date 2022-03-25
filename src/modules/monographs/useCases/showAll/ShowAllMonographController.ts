import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllMonographUseCase } from './ShowAllMonographUseCase';

class ShowAllMonographController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showAllMonographUseCase = container.resolve(ShowAllMonographUseCase);

    const all = await showAllMonographUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ShowAllMonographController };
