import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllCourseUseCase } from './ShowAllCourseUseCase';

class ShowAllCourseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showAllCourseUseCase = container.resolve(ShowAllCourseUseCase);

    const all = await showAllCourseUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ShowAllCourseController };
