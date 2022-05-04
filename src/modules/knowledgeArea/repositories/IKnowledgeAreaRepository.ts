import { Knowledge_Area } from '@prisma/client';

interface IKnowledgeAreaRepository {
  create(name: string): Promise<Knowledge_Area>;
  showAll(): Promise<Knowledge_Area[]>;
  findByName(name: string): Promise<Knowledge_Area>;
}

export { IKnowledgeAreaRepository };
