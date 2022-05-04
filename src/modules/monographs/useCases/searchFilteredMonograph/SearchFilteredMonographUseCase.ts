import { inject, injectable } from 'tsyringe';

import { IMonographSearchDTO } from '@modules/monographs/dtos/IMonographSearchDTO';
import { IMonographsListResponseDTO } from '@modules/monographs/dtos/IMonographsListResponseDTO';
import { MonographsRepository } from '@modules/monographs/infra/prisma/repositories/MonographsRepository';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';

@injectable()
class SearchFilteredMonographUseCase {
  constructor(
    @inject(MonographsRepository)
    private monographsRepository: IMonographsRepository,
  ) {}
  async execute(
    data: IMonographSearchDTO,
    page: number,
  ): Promise<IMonographsListResponseDTO> {
    const result = await this.monographsRepository.searchFiltered(data, page);

    return result;
  }
}

export { SearchFilteredMonographUseCase };
