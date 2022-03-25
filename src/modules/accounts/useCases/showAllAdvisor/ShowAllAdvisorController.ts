import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllAdvisorUseCase } from './ShowAllAdvisorUseCase';

class ShowAllAdvisorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showAllAdvisorUseCase = container.resolve(ShowAllAdvisorUseCase);

    const all = await showAllAdvisorUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ShowAllAdvisorController };
