/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { IKnowledgeAreaRepository } from '@modules/knowledgeArea/repositories/IKnowledgeAreaRepository';
import { Knowledge_Area, PrismaClient } from '@prisma/client';
import { prisma } from '@shared/infra/database/prismaClient';

class KnowledgeAreaRepository implements IKnowledgeAreaRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async create(name: string): Promise<Knowledge_Area> {
    const knowledge_Area = await this.repository.knowledge_Area.create({
      data: {
        name,
      },
    });

    return knowledge_Area;
  }

  async showAll(): Promise<Knowledge_Area[]> {
    const knowledgeArea = await this.repository.knowledge_Area.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return knowledgeArea;
  }

  async findByName(name: string): Promise<Knowledge_Area> {
    const knowledgeArea = await this.repository.knowledge_Area.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return knowledgeArea;
  }
}

export { KnowledgeAreaRepository };
