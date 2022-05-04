import { inject, injectable } from 'tsyringe';

import { IKnowledgeAreaRepository } from '@modules/knowledgeArea/repositories/IKnowledgeAreaRepository';
import { Knowledge_Area } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateKnowledgeAreaUseCase {
  constructor(
    @inject('KnowledgeAreaRepository')
    private knowledgeAreaRepository: IKnowledgeAreaRepository,
  ) {}

  async execute(name: string): Promise<Knowledge_Area> {
    const knowledgeAreaAlreadyExist =
      await this.knowledgeAreaRepository.findByName(name);

    if (knowledgeAreaAlreadyExist) {
      throw new AppError('knowledgeArea Already Exists!');
    }

    const knowledgeArea = await this.knowledgeAreaRepository.create(name);

    return knowledgeArea;
  }
}

export { CreateKnowledgeAreaUseCase };
