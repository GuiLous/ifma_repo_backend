import { inject, injectable } from 'tsyringe';

import { IKnowledgeAreaRepository } from '@modules/knowledgeArea/repositories/IKnowledgeAreaRepository';
import { Course } from '@prisma/client';

@injectable()
class ShowAllKnowledgeAreaUseCase {
  constructor(
    @inject('KnowledgeAreaRepository')
    private knowledgeAreaRepository: IKnowledgeAreaRepository,
  ) {}
  async execute(): Promise<Course[]> {
    const all = await this.knowledgeAreaRepository.showAll();

    return all;
  }
}

export { ShowAllKnowledgeAreaUseCase };
