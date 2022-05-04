import { Course } from '@prisma/client';

interface ICoursesRepository {
  create(name: string): Promise<Course>;
  showAll(): Promise<Course[]>;
  findByName(name: string): Promise<Course>;
}

export { ICoursesRepository };
