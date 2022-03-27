import { inject, injectable } from 'tsyringe';

import { MonographsRepository } from '@modules/monographs/infra/prisma/repositories/MonographsRepository';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph } from '@prisma/client';

@injectable()
class ShowAllMonographUseCase {
  constructor(
    @inject(MonographsRepository)
    private monographsRepository: IMonographsRepository,
  ) {}
  async execute(): Promise<Monograph[]> {
    const all = await this.monographsRepository.showAll();

    return all;
  }
}

export { ShowAllMonographUseCase };
