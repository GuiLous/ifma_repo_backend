import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllRecusedVerificationUseCase } from './ShowAllRecusedVerificationUseCase';

class ShowAllRecusedVerificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.params;
    const { user_email } = request.query;

    const showAllRecusedVerificationUseCase = container.resolve(
      ShowAllRecusedVerificationUseCase,
    );

    const all = await showAllRecusedVerificationUseCase.execute(
      Number(page),
      String(user_email),
    );

    return response.status(200).json(all);
  }
}

export { ShowAllRecusedVerificationController };
