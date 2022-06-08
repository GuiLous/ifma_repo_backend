import { inject, injectable } from 'tsyringe';

import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  title: string;
  authors: string;
  authors_emails?: string;
  advisor: string;
  advisor_lattes?: string;
  published_date: Date;
  published_local: string;
  resumo: string;
  palavras_chave: string;
  number_pages: number;
  pdf_url?: string;
  knowledge_id: string;
  course_id: string;
}

@injectable()
class UpdateMonographUseCase {
  constructor(
    @inject('MonographsRepository')
    private monographsRepository: IMonographsRepository,
  ) {}

  async execute(data: IRequest): Promise<Monograph> {
    const monograph = await this.monographsRepository.findById(data.id);

    if (!monograph) {
      throw new AppError('Monograph does not exists!');
    }

    const monographUpdated = { ...monograph, ...data };

    return this.monographsRepository.update(monographUpdated);
  }
}

export { UpdateMonographUseCase };
