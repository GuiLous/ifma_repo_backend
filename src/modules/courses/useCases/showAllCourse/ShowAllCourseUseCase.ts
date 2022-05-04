import { inject, injectable } from 'tsyringe';

import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { Course } from '@prisma/client';

@injectable()
class ShowAllCourseUseCase {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}
  async execute(): Promise<Course[]> {
    const all = await this.coursesRepository.showAll();

    return all;
  }
}

export { ShowAllCourseUseCase };
