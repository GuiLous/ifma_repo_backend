import { inject, injectable } from 'tsyringe';

import { IMonographsListResponseDTO } from '@modules/monographs/dtos/IMonographsListResponseDTO';
import { MonographsRepository } from '@modules/monographs/infra/prisma/repositories/MonographsRepository';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';

@injectable()
class ShowAllMonographVerifiedByUserUseCase {
  constructor(
    @inject(MonographsRepository)
    private monographsRepository: IMonographsRepository,
  ) {}
  async execute(
    user_id: string,
    page: number,
  ): Promise<IMonographsListResponseDTO> {
    const result = await this.monographsRepository.showAllVerifiedByUser(
      user_id,
      page,
    );

    return result;
  }
}

export { ShowAllMonographVerifiedByUserUseCase };
