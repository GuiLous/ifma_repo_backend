import { inject, injectable } from 'tsyringe';

import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateMonographVerifiedUseCase {
  constructor(
    @inject('MonographsRepository')
    private monographsRepository: IMonographsRepository,
  ) {}

  async execute(id: string): Promise<Monograph> {
    const monograph = await this.monographsRepository.findById(id);

    if (!monograph) {
      throw new AppError('Monograph does not exists!');
    }

    monograph.verified = true;
    const monographUpdated = { ...monograph };

    return this.monographsRepository.update(monographUpdated);
  }
}

export { UpdateMonographVerifiedUseCase };
