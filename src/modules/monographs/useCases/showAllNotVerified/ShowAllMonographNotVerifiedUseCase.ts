import { inject, injectable } from 'tsyringe';

import { IMonographsListResponseDTO } from '@modules/monographs/dtos/IMonographsListResponseDTO';
import { MonographsRepository } from '@modules/monographs/infra/prisma/repositories/MonographsRepository';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';

@injectable()
class ShowAllMonographNotVerifiedUseCase {
  constructor(
    @inject(MonographsRepository)
    private monographsRepository: IMonographsRepository,
  ) {}
  async execute(page: number): Promise<IMonographsListResponseDTO> {
    const all = await this.monographsRepository.showAllNotVerified(page);

    return all;
  }
}

export { ShowAllMonographNotVerifiedUseCase };
