import { inject, injectable } from 'tsyringe';

import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateMonographCommentsUseCase {
  constructor(
    @inject('MonographsRepository')
    private monographsRepository: IMonographsRepository,
  ) {}

  async execute(id: string, commentToReview: string): Promise<Monograph> {
    const monograph = await this.monographsRepository.findById(id);

    if (!monograph) {
      throw new AppError('Monograph does not exists!');
    }

    if (commentToReview === '') {
      monograph.comments_if_not_accept = null;
    } else {
      monograph.comments_if_not_accept = commentToReview;
    }
    const monographUpdated = { ...monograph };

    return this.monographsRepository.update(monographUpdated);
  }
}

export { UpdateMonographCommentsUseCase };
