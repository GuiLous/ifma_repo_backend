import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAdvisorUseCase } from './UpdateUserAdvisorUseCase';

class UpdateUserAdvisorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    const updateUserAdvisorUseCase = container.resolve(
      UpdateUserAdvisorUseCase,
    );

    await updateUserAdvisorUseCase.execute(user_id);

    return response.status(204).send();
  }
}

export { UpdateUserAdvisorController };
