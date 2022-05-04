/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { Course, PrismaClient } from '@prisma/client';
import { prisma } from '@shared/infra/database/prismaClient';

class CoursesRepository implements ICoursesRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async create(name: string): Promise<Course> {
    const course = await this.repository.course.create({
      data: {
        name,
      },
    });

    return course;
  }

  async showAll(): Promise<Course[]> {
    const courses = await this.repository.course.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return courses;
  }
  async findByName(name: string): Promise<Course> {
    const course = await this.repository.course.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return course;
  }
}

export { CoursesRepository };
