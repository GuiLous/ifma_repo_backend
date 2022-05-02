import { inject, injectable } from 'tsyringe';

import { IMonographsListResponseDTO } from '@modules/monographs/dtos/IMonographsListResponseDTO';
import { MonographsRepository } from '@modules/monographs/infra/prisma/repositories/MonographsRepository';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph } from '@prisma/client';

@injectable()
class ShowAllMonographVerifiedUseCase {
  constructor(
    @inject(MonographsRepository)
    private monographsRepository: IMonographsRepository,
  ) {}
  async execute(page: number): Promise<IMonographsListResponseDTO> {
    const result = await this.monographsRepository.showAllVerified(page);

    return result;
  }
}

export { ShowAllMonographVerifiedUseCase };
