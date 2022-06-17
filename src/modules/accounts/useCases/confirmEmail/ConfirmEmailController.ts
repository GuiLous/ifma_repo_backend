import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ConfirmEmailUseCase } from './ConfirmEmailUseCase';

class ConfirmEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    const confirmEmailUseCase = container.resolve(ConfirmEmailUseCase);

    await confirmEmailUseCase.execute(String(token));

    return response.status(204).send();
  }
}

export { ConfirmEmailController };
