import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowMonographUseCase } from './ShowMonographUseCase';

class ShowMonographController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showMonographUseCase = container.resolve(ShowMonographUseCase);

    const monograph = await showMonographUseCase.execute(String(id));

    return response.status(200).json(monograph);
  }
}

export { ShowMonographController };
