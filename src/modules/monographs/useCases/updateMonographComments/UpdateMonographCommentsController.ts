import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateMonographCommentsUseCase } from './UpdateMonographCommentsUseCase';

class UpdateMonographCommentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, commentToReview } = request.body;

    const updateMonographCommentsUseCase = container.resolve(
      UpdateMonographCommentsUseCase,
    );

    await updateMonographCommentsUseCase.execute(id, commentToReview);

    return response.status(204).send();
  }
}

export { UpdateMonographCommentsController };
