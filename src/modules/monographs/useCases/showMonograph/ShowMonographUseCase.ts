import { inject, injectable } from 'tsyringe';

import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph } from '@prisma/client';

@injectable()
class ShowMonographUseCase {
  constructor(
    @inject('MonographsRepository')
    private monographsRepository: IMonographsRepository,
  ) {}

  async execute(id: string): Promise<Monograph> {
    const monograph = await this.monographsRepository.findById(id);

    return monograph;
  }
}

export { ShowMonographUseCase };
