import { inject, injectable } from 'tsyringe';

import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { Course } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCourseUseCase {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  async execute(name: string): Promise<Course> {
    const courseAlreadyExist = await this.coursesRepository.findByName(name);

    if (courseAlreadyExist) {
      throw new AppError('Course Already Exists!');
    }

    const course = await this.coursesRepository.create(name);

    return course;
  }
}

export { CreateCourseUseCase };
