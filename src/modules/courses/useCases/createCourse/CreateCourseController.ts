import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCourseUseCase } from './CreateCourseUseCase';

class CreateCourseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCourseUseCase = container.resolve(CreateCourseUseCase);

    const course = await createCourseUseCase.execute(name);

    return response.status(201).json(course);
  }
}

export { CreateCourseController };
