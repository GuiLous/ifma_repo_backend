import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowMonographNotVerifiedUseCase } from './ShowMonographNotVerifiedUseCase';

class ShowMonographNotVerifiedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showMonographNotVerifiedUseCase = container.resolve(
      ShowMonographNotVerifiedUseCase,
    );

    const monograph = await showMonographNotVerifiedUseCase.execute(String(id));

    return response.status(200).json(monograph);
  }
}

export { ShowMonographNotVerifiedController };
