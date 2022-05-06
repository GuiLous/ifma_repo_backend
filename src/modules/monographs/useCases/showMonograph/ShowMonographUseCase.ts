import { inject, injectable } from 'tsyringe';

import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ShowMonographUseCase {
  constructor(
    @inject('MonographsRepository')
    private monographsRepository: IMonographsRepository,
  ) {}

  async execute(id: string): Promise<Monograph> {
    const monograph = await this.monographsRepository.showMonograph(id);

    if (!monograph) {
      throw new AppError('Monograph does not found!');
    }

    return monograph;
  }
}

export { ShowMonographUseCase };
