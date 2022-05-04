import { inject, injectable } from 'tsyringe';

import { IMonographSearchDTO } from '@modules/monographs/dtos/IMonographSearchDTO';
import { MonographsRepository } from '@modules/monographs/infra/prisma/repositories/MonographsRepository';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph } from '@prisma/client';

@injectable()
class SearchFilteredMonographUseCase {
  constructor(
    @inject(MonographsRepository)
    private monographsRepository: IMonographsRepository,
  ) {}
  async execute(data: IMonographSearchDTO): Promise<Monograph[]> {
    const result = await this.monographsRepository.searchFiltered(data);
    return result;
  }
}

export { SearchFilteredMonographUseCase };
