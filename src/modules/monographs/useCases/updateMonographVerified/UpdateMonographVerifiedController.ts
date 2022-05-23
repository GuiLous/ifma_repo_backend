import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateMonographVerifiedUseCase } from './UpdateMonographVerifiedUseCase';

class UpdateMonographVerifiedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const updateMonographVerifiedUseCase = container.resolve(
      UpdateMonographVerifiedUseCase,
    );

    await updateMonographVerifiedUseCase.execute(id);

    return response.status(204).send();
  }
}

export { UpdateMonographVerifiedController };
